# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step, no dependencies (user's choice; Node.js is not installed on this machine). Deploy target: GitHub Pages.

## Users

Recruiters, engineering leads and internship coordinators screening Nawat Wattanawong, a 3rd-year Computer Science student at Chiang Mai University, for a software engineering internship. They usually arrive from the link on his résumé or GitHub profile, skim in a minute or two, and decide whether to shortlist. No specific employer is targeted yet (inferred: generic backend & AI internship audience).

## Product Purpose

A personal portfolio that is the "linked proof" behind the one-page résumé: it shows how he works on real projects, not just a list of tools. Success = a reviewer understands within the first screen what he does (backend + AI-integrated web systems), sees evidence in Project Z, and either emails him or downloads the résumé.

## Positioning

He was the Software Architect on Project Z, a delivered multi-tenant AI chat-widget SaaS for an external client (Saka), and drove its security and test hardening. The claim a neighbouring student can't copy: architecture + hardening on a client-accepted product, with real numbers from Jira and the test suite.

## Operating Context

Visitors read on laptops and phones, often between other applications. Résumé PDF is the companion artifact; the site must link to it and stay consistent with it.

## Capabilities and Constraints

- English only.
- Public contact: email (nawat_wattanawong@cmu.ac.th) and GitHub (github.com/Vector033). No phone number on the site; the phone stays only in the downloadable PDF.
- One page, with Project Z as the lead case study; other projects shorter.
- Undecided: custom domain, LinkedIn profile (none provided), English test score.

## Evidence on Hand

- Résumé: `C:\Users\User\Desktop\resume\Nawat_Wattanawong_Resume_v2.pdf` / `.docx`.
- Project Z final report (Team 08), source repo github.com/NexusG0/Project-Z, High-Level Architecture diagrams in the repo's `documents&designs/`.
- Project Z facts: 22/22 user stories + 7 beyond-MVP features, client sign-off; 161/161 Jira work items, 212 story points, velocity 8 → 68; his share 36 issues, 42 points, 57 commits; mutation score 90–100% on core services; job-claim race fixed (10 concurrent workers → 1 winner); SettingsPage.vue 2,329 → 765 lines; login rate limit 10/min, public widget endpoints 30/min per IP; lead regex pre-parse < 0.5 ms; analysis fast-exit ~36 ms (p95 46 ms).
- Other projects: QuizMaster (g11-quizmaster.vercel.app), Text Checker IMDb sentiment (~88% val accuracy, 50,000 reviews), Kin-Arai-Dee FoodBot (kinaraidee.streamlit.app).
- Absent, must not be fabricated: testimonials, work experience, employer logos, awards, client quotes, live Project Z deployment (it runs on Docker Compose; not on Cloud Run yet).

## Product Principles

1. Proof over adjectives: every claim is backed by a number, a link or an artifact.
2. Show the reasoning: architecture decisions and trade-offs, not just screenshots.
3. Honest scope: mark team work as team work and his share as his.
4. One clear next step: email or download the résumé.
5. Plain, selectable, fast: readable by people and by screening tools.
