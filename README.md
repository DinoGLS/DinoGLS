<div align="center">

```
┌─────────────────────────────────────────────────┐
│  DinoGLS // GARLENS CHARLES                      │
│  BTS SIO — Option SISR  ·  2025—2026              │
│  status: en formation → recherche alternance      │
└─────────────────────────────────────────────────┘
```

### 🇫🇷 Étudiant BTS SIO SISR, futur DevSecOps — je construis, casse et documente mon propre lab pour de vrai.
### 🇬🇧 SISR student (network/systems admin track), aiming for DevSecOps — I build, break and document my own homelab for real.

[![Portfolio](https://img.shields.io/badge/Portfolio-0a2a49?style=for-the-badge&logo=vercel&logoColor=C6F135)](https://portfolio-charles-garlens.vercel.app)
[![Portfolio repo](https://img.shields.io/badge/portfolio--v2-0a2a49?style=for-the-badge&logo=github&logoColor=C6F135)](https://github.com/DinoGLS/portfolio-v2)

</div>

---

## // 01 — À PROPOS · ABOUT

**FR** — En BTS SIO SISR (Systèmes & Réseaux), je vise une alternance DevSecOps. Plutôt que des labs jetables, j'ai monté un **homelab Proxmox permanent** (`dino`) où j'héberge et j'exploite mes propres projets : réseau segmenté (OPNsense, VLANs), reverse proxy, CI/CD self-hosted, monitoring, et une app mobile que j'utilise réellement au quotidien.

**EN** — Currently completing a BTS in Network & Systems Administration (SISR), targeting a DevSecOps apprenticeship. Instead of throwaway labs, I run a **permanent Proxmox homelab** (`dino`) where I host and operate my own projects: segmented network (OPNsense, VLANs), reverse proxy, self-hosted CI/CD, monitoring, and a mobile app I actually use every day.

---

## // 02 — STACK

**Réseau / Infra**
![Proxmox](https://img.shields.io/badge/Proxmox_VE-0a2a49?style=flat-square&logoColor=C6F135)
![OPNsense](https://img.shields.io/badge/OPNsense-0a2a49?style=flat-square&logoColor=C6F135)
![Traefik](https://img.shields.io/badge/Traefik-0a2a49?style=flat-square&logo=traefikproxy&logoColor=C6F135)
![Docker](https://img.shields.io/badge/Docker-0a2a49?style=flat-square&logo=docker&logoColor=C6F135)
![Ansible](https://img.shields.io/badge/Ansible-0a2a49?style=flat-square&logo=ansible&logoColor=C6F135)
![Terraform](https://img.shields.io/badge/Terraform-0a2a49?style=flat-square&logo=terraform&logoColor=C6F135)

**Dev**
![TypeScript](https://img.shields.io/badge/TypeScript-0a2a49?style=flat-square&logo=typescript&logoColor=C6F135)
![Next.js](https://img.shields.io/badge/Next.js_16-0a2a49?style=flat-square&logo=nextdotjs&logoColor=C6F135)
![React Native](https://img.shields.io/badge/React_Native-0a2a49?style=flat-square&logo=react&logoColor=C6F135)
![Python](https://img.shields.io/badge/Python-0a2a49?style=flat-square&logo=python&logoColor=C6F135)
![Flask](https://img.shields.io/badge/Flask-0a2a49?style=flat-square&logo=flask&logoColor=C6F135)

---

## // 03 — PROJETS PHARES · FEATURED PROJECTS

| Projet | FR | EN | Lien |
|---|---|---|---|
| **N.C0re** | App fitness perso (React Native/Expo) — IA locale d'entraînement/nutrition, suivi menstruel, social, 21 sports. Utilisée en vrai 2-3h/jour. | Personal fitness app (React Native/Expo) — local training/nutrition AI, cycle tracking, social features, 21 sports. Actually used daily. | [Portfolio →](https://portfolio-charles-garlens.vercel.app/projects/app-track-muscu) |
| **DocForge** | Générateur de livrables BTS : notes brutes → Markdown/PDF structuré (Flask, Groq/Gemini, pandoc, WeasyPrint). | BTS deliverable generator: raw notes → structured Markdown/PDF (Flask, Groq/Gemini, pandoc, WeasyPrint). | [Portfolio →](https://portfolio-charles-garlens.vercel.app/projects/docforge) |
| **Générateur CV** | CV + lettre de motivation personnalisés par entreprise : couleurs de marque extraites, texte adapté par IA, PDF via Playwright. | Company-personalized resume + cover letter generator: brand colors extraction, AI-adapted text, Playwright PDF rendering. | [Portfolio →](https://portfolio-charles-garlens.vercel.app/projects/generateur-cv) |
| **Portfolio** | Ce site : Next.js 16 / React 19 / Tailwind v4, double hébergement Vercel + auto-hébergé sur mon lab. | This site: Next.js 16 / React 19 / Tailwind v4, dual-hosted on Vercel + self-hosted on my lab. | [Repo →](https://github.com/DinoGLS/portfolio-v2) |

---

## // 04 — LAB & INFRA

```
Internet
   │
OPNsense (firewall/routeur)
   │
   ├── LXC edge     — Traefik (reverse proxy)
   ├── LXC dns      — Pi-hole
   ├── LXC git      — Gitea (CI/CD self-hosted)
   ├── LXC db       — PostgreSQL
   └── VM apps      — Docker (services persos)
```

Provisionné en IaC (Terraform + Ansible), réseau segmenté par VLAN, exposition publique via Cloudflare Tunnel (zéro port ouvert côté box).

---

## // 05 — STATS

<div align="center">

![GitHub stats](https://github-readme-stats-alpha-blond-t1rfz3eqbe.vercel.app/api?username=DinoGLS&show_icons=true&hide_border=true&bg_color=0a2a49&title_color=C6F135&text_color=ffffff&icon_color=C6F135)
![Top langages](https://github-readme-stats-alpha-blond-t1rfz3eqbe.vercel.app/api/top-langs/?username=DinoGLS&layout=compact&hide_border=true&bg_color=0a2a49&title_color=C6F135&text_color=ffffff)

</div>

---

<div align="center">

**Contact** — [Portfolio / Contact](https://portfolio-charles-garlens.vercel.app/#contact)

</div>
