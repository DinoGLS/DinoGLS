// Génère les cartes de stats du profil : assets/stats.svg et assets/top-langs.svg
//
//   node scripts/generate-stats.mjs
//
// Aucun service externe, aucune dépendance : l'API GitHub est appelée directement.
// Dans GitHub Actions, le jeton intégré (GITHUB_TOKEN) suffit : pas de jeton personnel à créer ni à renouveler.
// Sans jeton, le script marche aussi (limite de 60 requêtes par heure), ce qui permet de le tester en local.
import fs from "node:fs";

const USER = process.env.GH_USER || "DinoGLS";
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const HEADERS = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "profile-stats",
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

async function get(url) {
  const r = await fetch(url, { headers: HEADERS });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}
// total_count d'une recherche (commits, pull requests, tickets) ; "—" si la recherche échoue
async function total(url) {
  try { return (await get(url)).total_count; } catch { return null; }
}

// Couleurs de langage (celles de GitHub pour les plus courantes)
const COULEURS = {
  Python: "#3572A5", TypeScript: "#3178c6", JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#563d7c", Shell: "#89e051",
  PowerShell: "#6aa6e0", Dockerfile: "#6c8fa3", HCL: "#844FBA", C: "#9a9a9a", "Jupyter Notebook": "#DA5B0B", Batchfile: "#C1F12E",
  PHP: "#4F5D95", Java: "#b07219", Go: "#00ADD8", Rust: "#dea584", Kotlin: "#A97BFF", Swift: "#F05138", Lua: "#000080", Makefile: "#427819",
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const FOND = "#0a2a49", TITRE = "#C6F135", TEXTE = "#ffffff", DISCRET = "#8fb0cf";
const POLICE = "'Segoe UI', Ubuntu, 'Helvetica Neue', Arial, sans-serif";
const fmt = (n) => (n == null ? "—" : n.toLocaleString("fr-FR"));
const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });

// ── Données ────────────────────────────────────────────────────────────────
const profil = await get(`https://api.github.com/users/${USER}`);
const depots = [];
for (let page = 1; page <= 5; page++) {
  const lot = await get(`https://api.github.com/users/${USER}/repos?type=owner&per_page=100&page=${page}`);
  depots.push(...lot);
  if (lot.length < 100) break;
}
const etoiles = depots.reduce((a, r) => a + (r.stargazers_count || 0), 0);
const [commits, pulls, tickets] = await Promise.all([
  total(`https://api.github.com/search/commits?q=author:${USER}&per_page=1`),
  total(`https://api.github.com/search/issues?q=author:${USER}+type:pr&per_page=1`),
  total(`https://api.github.com/search/issues?q=author:${USER}+type:issue&per_page=1`),
]);

// Langages : octets cumulés sur les dépôts qui ne sont pas des forks
const octets = new Map();
for (const r of depots.filter((d) => !d.fork && !d.archived)) {
  try {
    const l = await get(`https://api.github.com/repos/${USER}/${r.name}/languages`);
    for (const [nom, n] of Object.entries(l)) octets.set(nom, (octets.get(nom) || 0) + n);
  } catch { /* dépôt vide ou inaccessible : ignoré */ }
}
const somme = [...octets.values()].reduce((a, b) => a + b, 0) || 1;
const langages = [...octets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([nom, n]) => ({ nom, pct: (n / somme) * 100 }));

// ── Carte « stats » ────────────────────────────────────────────────────────
const lignes = [
  ["Étoiles reçues", etoiles],
  ["Commits (total)", commits],
  ["Pull requests", pulls],
  ["Tickets ouverts", tickets],
  ["Dépôts publics", profil.public_repos],
  ["Abonnés", profil.followers],
];
const H1 = 62 + lignes.length * 26 + 34;
const stats = `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="${H1}" viewBox="0 0 495 ${H1}" role="img" aria-label="Statistiques GitHub de ${esc(USER)}">
  <rect width="495" height="${H1}" rx="6" fill="${FOND}"/>
  <text x="25" y="38" font-family="${POLICE}" font-size="19" font-weight="700" fill="${TITRE}">Statistiques GitHub de ${esc(profil.name || USER)}</text>
${lignes.map(([nom, v], i) => `  <text x="25" y="${78 + i * 26}" font-family="${POLICE}" font-size="14" fill="${TEXTE}">${esc(nom)}</text>
  <text x="330" y="${78 + i * 26}" font-family="${POLICE}" font-size="14" font-weight="700" fill="${TEXTE}" text-anchor="end">${esc(fmt(v))}</text>`).join("\n")}
  <text x="25" y="${H1 - 12}" font-family="${POLICE}" font-size="10" fill="${DISCRET}">Mis à jour le ${esc(date)}</text>
</svg>
`;

// ── Carte « langages » ─────────────────────────────────────────────────────
const LARG = 300, BARRE = 250;
let x = 0;
const segments = langages.map((l) => {
  const w = Math.max((l.pct / 100) * BARRE, 2);
  const seg = `<rect x="${25 + x}" y="54" width="${w}" height="8" fill="${COULEURS[l.nom] || "#8a8998"}"/>`;
  x += w;
  return seg;
}).join("\n    ");
// Même hauteur que la carte des stats : les deux images s'alignent côte à côte sur le profil
const H2 = Math.max(90 + Math.ceil(langages.length / 2) * 24 + 30, H1);
const langs = `<svg xmlns="http://www.w3.org/2000/svg" width="${LARG}" height="${H2}" viewBox="0 0 ${LARG} ${H2}" role="img" aria-label="Langages les plus utilisés">
  <rect width="${LARG}" height="${H2}" rx="6" fill="${FOND}"/>
  <text x="25" y="38" font-family="${POLICE}" font-size="19" font-weight="700" fill="${TITRE}">Top langages</text>
  <clipPath id="rond"><rect x="25" y="54" width="${BARRE}" height="8" rx="4"/></clipPath>
  <g clip-path="url(#rond)">
    <rect x="25" y="54" width="${BARRE}" height="8" fill="#16405f"/>
    ${segments}
  </g>
${langages.map((l, i) => {
  const cx = 25 + (i % 2) * 130, cy = 90 + Math.floor(i / 2) * 24;
  return `  <circle cx="${cx + 5}" cy="${cy - 4}" r="5" fill="${COULEURS[l.nom] || "#8a8998"}"/>
  <text x="${cx + 16}" y="${cy}" font-family="${POLICE}" font-size="12" fill="${TEXTE}">${esc(l.nom)} ${l.pct.toFixed(1).replace(".", ",")} %</text>`;
}).join("\n")}
  <text x="25" y="${H2 - 12}" font-family="${POLICE}" font-size="10" fill="${DISCRET}">Mis à jour le ${esc(date)}</text>
</svg>
`;

fs.mkdirSync("assets", { recursive: true });
fs.writeFileSync("assets/stats.svg", stats);
fs.writeFileSync("assets/top-langs.svg", langs);
console.log(`stats.svg et top-langs.svg écrits : ${depots.length} dépôts, ${etoiles} étoiles, ${fmt(commits)} commits, langages : ${langages.map((l) => `${l.nom} ${l.pct.toFixed(0)} %`).join(", ")}`);
