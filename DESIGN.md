---
name: Nawat Wattanawong Portfolio
description: Dark glass portfolio; measured readings lead, MorPlan is the flagship, Project Z's real architecture can be traced flow by flow.
colors:
  bg0: "#07080a"
  bg1: "#0d0f14"
  text: "#eceff3"
  text-2: "#a4adb8"
  emerald: "#10b981"
  emerald-hi: "#34d399"
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

Chosen by the user on 2026-11-15 (replaces the light "Bench Report" design).

## Overview

Deep near-black ground (#07080a to #0d0f14) lit by soft fixed emerald light. Content sits on frosted glass cards: 1px translucent border, 16px backdrop blur, faint inner highlight. Emerald (#10b981 / #34d399) is the only accent and marks what is measured, live or clickable. Product screenshots are the colour on the page.

## Signature interactions

- **Cursor:** on fine pointers without reduced motion, a 6px emerald dot follows the pointer and a 36px ring trails it, growing to 1.8x over links and buttons. Touch and reduced-motion users keep the native cursor.
- **Tilt:** `.tilt` cards rotate up to 2.5 degrees toward the pointer (perspective 1000px) with a radial specular light at the pointer. Off for touch and reduced motion.
- **Hero:** portrait in a slowly turning emerald conic ring (the ring from the hero wireframe), pulsing radar pill, gradient name, five floating glance cards that link to each project.
- **MorPlan switcher:** five screens behind pill buttons (`aria-pressed`); clicking the shot opens a native `<dialog>`.
- **Project Z circuit:** the real architecture (not a generic client/edge/backend/database picture), tier labels per node, five flow buttons that send glowing pulses along the traces. Logic lives in the first block of `main.js`.
- **Contact:** copy-email button with a polite status message, live local clock (Chiang Mai, GMT+7).

## Typography

Plus Jakarta Sans (variable 400–800) for everything read; JetBrains Mono (400–600) for readings, labels, tags and diagram text. Both are self-hosted Latin subsets.

## Layout

Max width 1200px. Hero 7fr/5fr; flagship card 7fr/5fr; the other four projects in a 2-column bento; Project Z circuit full width then two panels; skills in a 3-column bento; contact 5fr/6fr.

- 999px and below: hero, flagship and contact stack; glance cards go 2 across; skills 2 across.
- 720px and below: one column everywhere; nav wraps under the name; buttons go full width; diagram hides small labels and enlarges node names.

## Rules

- Only numbers that come from each project's own eval or test output, labelled with the set they were measured on.
- Every project keeps a status line that says plainly if it has no real users or used synthetic data.
- No phone number, no links to private repositories, never "hand-built".
- Motion: transforms and opacity only; every animation is off under `prefers-reduced-motion`.
