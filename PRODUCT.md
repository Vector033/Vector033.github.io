# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step, no dependencies (user's choice, reconfirmed 2026-11-14 even though Node.js is now installed). Deploy target: GitHub Pages.

## Users

Recruiters and engineering leads screening Nawat Wattanawong, a 3rd-year Computer Science student at Chiang Mai University, for a full-term co-op placement (June to October 2027, Bangkok; companies recruit November 2026 to February 2027). They arrive from the link on his résumé or GitHub profile, skim for one or two minutes, and decide whether to shortlist.

## Product Purpose

A personal portfolio that is the "linked proof" behind the one-page résumé. Success = a reviewer understands within the first screen that he is a full-stack developer with five live solo apps and one client-accepted team project, opens at least one live link, and either emails him or downloads the résumé.

## Positioning

Full-stack developer who ships and measures. Five solo apps are deployed, MorPlan first (MorPlan, FactFit, HarnKan, SlipJot, PingKhana), each with an eval that has a held-out set, and each with an honest status line. Project Z remains the large team piece: he was the Software Architect on a multi-tenant AI chat-widget SaaS delivered to an external client (Saka).

## Operating Context

Visitors read on laptops and phones, often between other applications. Résumé PDF is the companion artifact; the site must link to it and stay consistent with it.

## Capabilities and Constraints

- English only.
- Public contact: email (nawat_wattanawong@cmu.ac.th) and GitHub (github.com/Vector033). No phone number on the site; the phone stays only in the downloadable PDF.
- One page: hero with portrait and readings, MorPlan flagship, four other solo projects, Project Z, skills (with how I work and education), contact.
- The five solo repositories are private. No source links to them until the owner makes them public.
- AI coding agents were used to build the projects and this site. Never claim "hand-built".

## Evidence on Hand

- Résumé: `C:\Users\User\Desktop\resume\Nawat_Wattanawong_Resume_v6.pdf` / `.docx`.
- MorPlan numbers: `Desktop\MorPlan\README.md`, section RAG evaluation (production BM25: R@5 90.3% on 145 answerable questions; 78.8% right answer-vs-not-found call on the held-out split). There is no clash-detection accuracy number; do not invent one.
- Numbers for the four solo projects: `C:\Users\User\Desktop\PORTFOLIO_REDESIGN_PROMPT.md` (as of 2026-11-14). Use only those. Do not use the old FactFit figure 180/186.
- Project Z final report (Team 08), source repo github.com/NexusG0/Project-Z.
- Project Z facts: 22/22 user stories + 7 beyond-MVP features, client sign-off; 161/161 Jira work items, 212 story points, velocity 8 → 68; his share 36 issues, 57 commits; mutation score 90–100% on core services; job-claim race fixed (10 concurrent workers → 1 winner); SettingsPage.vue 2,329 → 765 lines; login rate limit 10/min, public widget endpoints 30/min per IP; analysis fast-exit ~36 ms.
- Earlier coursework: QuizMaster (g11-quizmaster.vercel.app), Text Checker IMDb sentiment (~88% val accuracy, 50,000 reviews), Kin-Arai-Dee FoodBot (kinaraidee.streamlit.app).
- Absent, must not be fabricated: real users of the five solo apps, testimonials, work experience, employer logos, awards, client quotes, live Project Z deployment (it runs on Docker Compose; not on Cloud Run yet).

## Product Principles

1. Proof over adjectives: every claim is backed by a number, a link or an artifact.
2. Honest status: say plainly when an app has no real users or an eval uses synthetic data.
3. Honest scope: mark team work as team work and his share as his.
4. One clear next step: email or download the résumé.
5. Plain, selectable, fast: readable by people and by screening tools.
