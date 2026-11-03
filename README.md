# Nawat Wattanawong — portfolio

A one-page portfolio built as a printed circuit board: Project Z's real architecture is the main circuit, and the five request flows (login, chat, lead capture, handover, analysis) can be traced on it.

Plain HTML, CSS and JavaScript. No build step and no dependencies.

## Run locally

```bash
python -m http.server 5500
```

Then open http://localhost:5500.

## Deploy (GitHub Pages)

1. Create a GitHub repository (for example `Vector033.github.io` to get `https://vector033.github.io`) and push this folder to `main`.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/pages.yml`. It publishes only the site files (`index.html`, `styles.css`, `main.js`, `favicon.svg`, `fonts/` and the résumé PDF).

## Updating content

- Résumé: replace `Nawat_Wattanawong_Resume.pdf` with the newest export of the résumé.
- Projects, test points and skills are written directly in `index.html`.
- Flow captions live in `main.js` (`FLOWS`).

Fonts: Chakra Petch and Bai Jamjuree by Cadson Demak (SIL Open Font License), self-hosted in `fonts/`.
