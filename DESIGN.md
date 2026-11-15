---
name: Nawat Wattanawong Portfolio
description: Dark glass portfolio with a pink accent; measured readings lead, MorPlan is the flagship, Project Z's real architecture can be traced flow by flow.
colors:
  bg0: "#07080a"
  bg1: "#0d0f14"
  text: "#eceff3"
  text-2: "#a4adb8"
  accent: "#ec4899"
  accent-hi: "#f472b6"
  line: "rgba(255,255,255,0.08)"
  glass: "rgba(255,255,255,0.035)"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6.4vw, 5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.08
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  reading:
    fontFamily: "JetBrains Mono, ui-monospace, Consolas, monospace"
    fontSize: "clamp(1.6rem, 2.4vw, 2rem)"
    fontWeight: 600
    fontFeature: "tnum"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Consolas, monospace"
    fontSize: "0.8rem"
    fontWeight: 500
rounded:
  card: "20px"
  glance: "16px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  step: "clamp(72px, 9vw, 128px)"
---

# Design System: Nawat Wattanawong Portfolio

Chosen by the user on 2026-11-15 (replaces the light "Bench Report" design). Accent changed from emerald to pink at the user's request on 2026-11-16.

## Overview

Deep near-black ground (#07080a to #0d0f14) lit by soft fixed pink light. Content sits on frosted glass cards: 1px translucent border, 16px backdrop blur, faint inner highlight. Pink (#ec4899 / #f472b6) is the only accent and marks what is measured, live or clickable. Product screenshots are the colour on the page.

## Signature interactions

- **Cursor:** on fine pointers without reduced motion, a 6px pink dot follows the pointer and a 36px ring trails it, growing to 1.8x over links and buttons. Touch and reduced-motion users keep the native cursor.
- **Tilt:** `.tilt` cards rotate up to 2.5 degrees toward the pointer (perspective 1000px) with a radial specular light at the pointer. Off for touch and reduced motion.
- **Hero:** portrait in a slowly turning pink conic ring (the ring from the hero wireframe), pulsing radar pill, gradient name, five floating glance cards that link to each project.
- **MorPlan switcher:** five screens behind pill buttons (`aria-pressed`); clicking the shot opens a native `<dialog>`.
- **Project Z circuit:** the real architecture (not a generic client/edge/backend/database picture), tier labels per node, five flow buttons that send glowing pulses along the traces. Logic lives in the first block of `main.js`.
- **Link preview:** `img/og-card.png` (1200x630, made with PIL and Segoe UI) via og:/twitter: meta tags.
- **Contact:** copy-email button with a polite status message, live local clock (Chiang Mai, GMT+7).

## Typography

Plus Jakarta Sans (variable 400–800) for everything read; JetBrains Mono (400–600) for readings, labels, tags and diagram text. Both are self-hosted Latin subsets.

## Layout

Max width 1200px. Hero 7fr/5fr with a 240px portrait; two featured cards 7fr/5fr (MorPlan, then PingKhana, which the user values most after MorPlan); FactFit, HarnKan and SlipJot in a 3-column bento (2 columns with the last card full width at 999px and below); Project Z circuit full width then two panels; skills in a 3-column bento; contact 5fr/6fr.

- 999px and below: hero, flagship and contact stack; glance cards go 2 across; skills 2 across.
- 720px and below: one column everywhere; nav wraps under the name; buttons go full width; diagram hides small labels and enlarges node names.

## Rules

- Only numbers that come from each project's own eval or test output, labelled with the set they were measured on.
- Every project keeps a status line that says plainly if it has no real users or used synthetic data.
- No phone number, no links to private repositories, never "hand-built".
- Motion: transforms and opacity only; every animation is off under `prefers-reduced-motion`.
