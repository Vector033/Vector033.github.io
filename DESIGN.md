---
name: Nawat Wattanawong Portfolio
description: A bench report on light paper; measured readings lead, and one circuit board carries Project Z.
colors:
  paper: "#f5f3ec"
  ink: "#14201b"
  ink-2: "#44524b"
  green: "#0e5a41"
  board-mask: "#0e3b2c"
  board-mask-deep: "#0a2e22"
  board-silk: "#efece1"
  board-silk-2: "#b8cbbd"
  board-copper: "#c8873a"
  board-copper-hi: "#e8ac63"
  board-copper-low: "#6f5532"
  board-gold: "#d8b35b"
  board-chip: "#15191a"
typography:
  display:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  reading:
    fontFamily: "IBM Plex Mono, ui-monospace, Consolas, monospace"
    fontSize: "clamp(1.9rem, 3vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1
    fontFeature: "tnum"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, Consolas, monospace"
    fontSize: "0.82rem"
    fontWeight: 500
    lineHeight: 1.7
  board:
    fontFamily: "Chakra Petch, IBM Plex Sans, system-ui, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 600
    letterSpacing: "0.07em"
rounded:
  button: "4px"
  shot: "6px"
  board: "12px"
  board-switch: "2px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  step: "clamp(56px, 8vw, 112px)"
components:
  button:
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    height: "48px"
    padding: "0 20px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-primary-hover:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
---

# Design System: Nawat Wattanawong Portfolio

## Overview

**Creative North Star: "The Bench Report"**

The page reads like a test report printed on warm paper. Ink text, hairline rules, and one accent, a deep green, that marks only what was measured or what you can open: readings, links, live dots. The colour on the page comes from the product screenshots themselves, which are loud (white and green, forest and pink, red and yellow, navy and mint), so the frame stays quiet.

Project Z keeps the one object from the previous design: its architecture drawn as a green circuit board with copper traces and a pulse that follows a real request. The board is a panel set into the paper, with its own materials and its own typeface.

**Key characteristics**
- Measured numbers in IBM Plex Mono, large and green, with a plain label under each.
- Every project has a status line with a green dot that says where it really stands.
- Sections are divided by a full-width ink rule; lists are rows divided by hairlines. No cards, no shadows.
- One dark object on the page: the circuit board.

## Colors

- **Paper** (`paper`): page background, text on ink buttons, drill holes on the board.
- **Ink** (`ink`): headings, body text, button borders, section rules. 15.1:1 on paper.
- **Ink 2** (`ink-2`): secondary text, stack lines, column heads. 7.4:1 on paper.
- **Green** (`green`): readings, links, status dots, the role line, primary-button hover. 7.4:1 on paper.
- **Board tokens** (`board-*`): used only inside `.circuit`. Mask green ground, off-white silkscreen, copper traces, gold vias and focus ring, near-black chips.

Hairlines are ink at 0.18 alpha (`--rule`).

**The One Accent Rule.** Green is the only accent outside the board. Do not add a second accent colour; the screenshots supply the rest.

**The Board Stays On The Board Rule.** Copper, gold and mask green never leave `.circuit`.

## Typography

- **IBM Plex Sans** (variable, 400 and 600): everything that is read as a sentence or a heading. Sentence case. Never uppercase.
- **IBM Plex Mono 500**: readings, the hero role line, stack lines, table column heads, test-point readings, tabular figures.
- **Chakra Petch 500/600**: only inside the circuit board (chip names, designators, flow switches), where uppercase and tracking read as silkscreen.

The self-hosted Plex files are the Latin subset. They have no arrow glyphs, so write "to" or draw an SVG instead of typing an arrow.

## Layout

- One column of content, max 1200px, centred, with a `gutter` side padding. Sections are spaced by `step` and open with an ink rule.
- **Hero:** 7fr / 5fr. Left: role, name, pitch, status, two buttons. Right: "Readings at a glance", five rows that link to each project.
- **Project:** 6fr / 5fr, sides alternating. One side holds the screenshots with the extra evidence and the stack under them; the other holds the name, tagline, two readings, description, status and the live link. Screenshots share one row and end at the same height: each image's flex-grow is its aspect ratio (`--r`).
- **Rows:** a 240px term column beside a description, used for How I work, Skills and Education.

Responsive:
- **979px and below:** hero and projects become one column. Project order is name, screenshots, readings and description, then extra evidence and stack. Coursework table rows stack.
- **700px and below:** nav wraps under the name; a phone shot beside a desktop shot is hidden and three phone shots become two; test-point rows become a two-column grid; contact buttons go full width; chip sub-labels on the board hide.

## Elevation & Depth

Flat. No shadows anywhere on the paper. Screenshots get a 1px hairline frame and a 6px radius. The only glow is the moving pulse on the circuit board.

## Components

- **Button:** 48px high, 4px radius, 1px ink border, ink text; hover fills ink. Primary is filled ink and turns green on hover. One primary per group, and it is always the email action.
- **Reading:** a `dl` pair. The number (`dd`) sits above its label (`dt`) through `column-reverse`, so the label still comes first for screen readers.
- **Status line:** green dot, bold "Status:", then one or two plain sentences. Must state missing real users or synthetic eval data.
- **Glance list:** project name (link), one-line label, big mono number on the right.
- **Circuit board:** unchanged from the previous design: chips, copper traces, gold vias, flow switches, pulse and wake, live caption, static fallback under reduced motion. See `main.js`.

## Motion

Only two: 0.2s colour transitions on buttons and links, and the circuit pulse. No scroll reveals; the reader has a minute or two and should never wait for content.

## Do's and Don'ts

**Do**
- Use only numbers from each project's own eval or test output, and label what set they were measured on.
- Keep a status line on every project.
- Resize screenshots to WebP and write alt text that says what the screen shows.
- Keep focus visible: 2px ink outline on paper, gold on the board.

**Don't**
- Don't claim real users, testimonials or "hand-built".
- Don't link to private repositories.
- Don't add cards, gradients, shadows or a second accent colour.
- Don't put a phone number on the site.
- Don't set IBM Plex in uppercase, or use Chakra Petch outside the board.
