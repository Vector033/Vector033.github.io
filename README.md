# Nawat Wattanawong — portfolio

A one-page dark glass portfolio: five live solo apps led by MorPlan, each with screenshots, its stack, measured readings and a plain status line, followed by Project Z, a team project whose real architecture you can trace flow by flow (login, chat, lead capture, handover, analysis).

Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Run locally

```bash
python -m http.server 5500
```

Then open http://localhost:5500.

## Deploy (GitHub Pages)

1. Create a GitHub repository (for example `Vector033.github.io` to get `https://vector033.github.io`) and push this folder to `main`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/pages.yml`. It publishes only the site files (`index.html`, `styles.css`, `main.js`, `favicon.svg`, `fonts/`, `img/` and the résumé PDF).

## Updating content

- Résumé: replace `Nawat_Wattanawong_Resume.pdf` with the newest export of the résumé.
- Projects, readings, test points and skills are written directly in `index.html`. Use only numbers that come from each project's own eval or test output.
- Screenshots live in `img/` as WebP (project shots at 640/1280 or 800/1600 px wide, portrait at 320/640). Resize new ones before adding them, strip metadata and write alt text. Original photos stay in `references/`, which is not published.
- Flow captions for the circuit live in `main.js` (`FLOWS`).

Fonts, self-hosted in `fonts/` under the SIL Open Font License: Plus Jakarta Sans and JetBrains Mono.
