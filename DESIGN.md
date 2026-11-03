---
name: Nawat Wattanawong Portfolio
description: One printed circuit board; the visitor traces a real backend architecture flow by flow.
colors:
  outside: "#06170f"
  mask: "#0e3b2c"
  mask-deep: "#0a2e22"
  pour: "#12473a"
  silk: "#efece1"
  silk-2: "#b8cbbd"
  silk-3: "#86a596"
  copper: "#c8873a"
  copper-hi: "#e8ac63"
  copper-low: "#6f5532"
  gold: "#d8b35b"
  chip: "#15191a"
  chip-edge: "#2b3234"
typography:
  display:
    fontFamily: "Chakra Petch, Bai Jamjuree, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 13cqi, 5rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Chakra Petch, Bai Jamjuree, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 4.6vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Chakra Petch, Bai Jamjuree, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.08em"
  lede:
    fontFamily: "Bai Jamjuree, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Bai Jamjuree, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Chakra Petch, Bai Jamjuree, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  designator:
    fontFamily: "Chakra Petch, Bai Jamjuree, system-ui, sans-serif"
    fontSize: "1em"
    fontWeight: 600
    letterSpacing: "0.06em"
    fontFeature: "tnum"
  column-head:
    fontFamily: "Chakra Petch, Bai Jamjuree, system-ui, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  board: "14px"
  pad: "2px"
  round: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  step: "clamp(72px, 9vw, 128px)"
  pad-gap: "14px"
  bus-indent: "40px"
components:
  pad-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.outside}"
    typography: "{typography.label}"
    rounded: "{rounded.pad}"
    padding: "0 20px 0 18px"
    height: "48px"
  pad-primary-hover:
    backgroundColor: "{colors.copper-hi}"
    textColor: "{colors.outside}"
  pad-outline:
    textColor: "{colors.silk}"
    typography: "{typography.label}"
    rounded: "{rounded.pad}"
    padding: "0 20px 0 18px"
    height: "48px"
  edge-connector:
    backgroundColor: "{colors.silk}"
    textColor: "{colors.outside}"
    typography: "{typography.label}"
    rounded: "{rounded.pad}"
    padding: "9px 16px 9px 40px"
  edge-connector-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.outside}"
  switch:
    backgroundColor: "{colors.mask-deep}"
    textColor: "{colors.silk-2}"
    typography: "{typography.label}"
    rounded: "{rounded.pad}"
    padding: "0 14px 0 10px"
    height: "40px"
  switch-on:
    backgroundColor: "{colors.silk}"
    textColor: "{colors.outside}"
  nav-pin:
    textColor: "{colors.silk-2}"
    typography: "{typography.label}"
    padding: "6px 0"
  chip:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.silk}"
    typography: "{typography.label}"
  copper-pour:
    backgroundColor: "{colors.pour}"
    textColor: "{colors.silk}"
    padding: "clamp(24px, 3vw, 40px)"
---

# Design System: Nawat Wattanawong Portfolio

## Overview

**Creative North Star: "The Silkscreen Board"**

The whole site is one printed circuit board resting on a dark bench. A single rounded board of matte green solder mask carries every section; type is silkscreen printed on it, the work is drawn as chips, copper traces and test pads, and every component wears a reference designator (U1, M1, TP3, P2, J1) that is also a deep link. The page reads as an engineering artifact rather than a marketing page: hairline silkscreen rules divide the board, tables are bills of materials, and the sprint timeline is a copper bus that keeps running down the board to the contact connector.

Density is calm and technical. Large uppercase display type in Chakra Petch sets the designators and headings; Bai Jamjuree carries reading text at a comfortable 1.6 leading. Colour is almost entirely the board's own materials: green mask, off-white silk, copper and gold metal, near-black chip packages. Motion is reserved for one signature act, a pulse of current that runs along the real request path and lights chips in sequence, leaving a brightened copper wake that settles.

The world rejects the category default for developer portfolios: a dark hero with a gradient, a "Hi, I'm" greeting, skill pills and a grid of equal project cards.

**Key Characteristics:**
- One continuous board (14px corners, gold-ringed drill holes) on a near-black bench.
- Reference designators on every component, set in Chakra Petch with tabular figures and used as anchors.
- Copper and gold are the only warm colours, and they always read as exposed metal.
- Lists are BOM tables and definition rows separated by silkscreen hairlines, never card grids.
- A copper bus with gold vias ties the sections together down the left margin.
- One signature motion: pulse and wake along traces, with a static fallback under reduced motion.

## Colors

A green-mask board palette: cool green grounds, warm off-white silkscreen, and two metals (copper, gold) as the only warm accents.

### Primary
- **Exposed Copper** (copper): trace stroke in the circuit, the sprint rail and section bus, the `owned` list bullets, the trace-link underline, nav hover underline and text selection. It is structure first, accent second.
- **Polished Copper** (copper-hi): lit chip outlines, the wake behind a pulse, inline links, `code`, designators inside headings and BOM rows, test-point readings, the status LED. The brightest warm value; it signals "live" or "follow this".

### Secondary
- **Gold Plating** (gold): edge-connector fingers, the primary pad (the one main action per group), drill-hole rings, vias on the bus and in the circuit, test-point pad marks, and the keyboard focus ring.

### Tertiary
- **Bottom-Layer Copper** (copper-low): copper seen through laminate; the one bottom-layer trace in the circuit and the scrollbar thumb. Decorative only; never used for text.

### Neutral
- **Bench Black** (outside): the surface under the board, page background, text on gold and silk fills.
- **Solder Mask** (mask): the board itself, the default ground for all content.
- **Deep Mask** (mask-deep): mask over bare laminate; the resting fill of SW1 switches.
- **Mask Over Pour** (pour): the chamfered copper-pour panel that holds the case study's problem and ownership text.
- **Silkscreen** (silk): headings, primary text, pressed switches, the edge connector body.
- **Faded Silk** (silk-2): secondary text, nav pins, captions, table body cells.
- **Ghost Silk** (silk-3): tertiary text, column heads, BOM dates, footnotes. Holds about 4.7:1 on the mask; keep it off the pour panel for body copy.
- **Chip Package** (chip) and **Package Edge** (chip-edge): the dark rectangles and outlines of chips in the circuit.

Silkscreen hairlines are the silk colour at low alpha, not separate tokens: rgba(239,236,225,0.14) between table rows and list rows, 0.16 for section and board-edge rules, 0.2 around the meta strip, 0.35 under column heads, 0.55 for outline pads.

### Named Rules
**The Bare Metal Rule.** Warmth appears only as metal: copper, polished copper, bottom-layer copper, gold. The mask, silk and chip packages stay cool or neutral. No other warm hue enters the system.

**The Gold Means Contact Rule.** Gold marks places where something connects: the main action pad, the edge connector, drill holes, vias, test pads and focus. Do not use gold as decoration on text or rules.

## Typography

**Display Font:** Chakra Petch 500/600/700, self-hosted (with Bai Jamjuree, system-ui, sans-serif)
**Body Font:** Bai Jamjuree 400/400 italic/500/600, self-hosted (with system-ui, sans-serif)
**Label/Mono Font:** Chakra Petch doubles as the designator and data face; there is no monospace.

**Character:** Both faces are Cadson Demak (Bangkok) designs. Chakra Petch's squared, chamfered letterforms read like silkscreen legends and component markings; Bai Jamjuree is its softer, open companion for sentences.

### Hierarchy
- **Display** (700, clamp(2.3rem, 13cqi, 5rem), 0.92, uppercase): the name in the first viewport only. Sized in container units from `.intro` (container-type: inline-size), never from the viewport, because the board stops growing at 1360px and a vw size would push the name into the circuit on wide screens.
- **Headline** (700, clamp(2.2rem, 4.6vw, 3.75rem), 1, uppercase, balanced wrap): section titles. A designator may precede it at max(0.95rem, 0.42em), raised and in polished copper.
- **Title** (600, 1.05rem, 1.3, 0.08em, uppercase): sub-headings inside a section.
- **Lede** (400, clamp(1.2rem, 1.8vw, 1.45rem), 1.45, max 46ch): the opening sentence of a case study; the hero pitch uses the same voice at clamp(1.25rem, 1.9vw, 1.5rem), max 30ch.
- **Body** (400, 1.0625rem, 1.6; 1rem under 600px): reading text, held to 62-72ch.
- **Label** (600, 0.82-0.95rem, 0.07-0.08em, uppercase): board-edge nav, pads, switches, role line, BOM project names (1.25rem), definition terms.
- **Designator** (600, 0.06em, tabular figures): U1, M1, TP3, P2, E1, J1, NW-01. Always Chakra Petch.
- **Column Head** (600, 0.72rem, 0.12em, uppercase, ghost silk): table and meta labels.

### Named Rules
**The Silkscreen Caps Rule.** Chakra Petch is always uppercase and tracked (0.06-0.12em) except the two display sizes, which are tightened (-0.01 to -0.015em). Bai Jamjuree is never uppercase.

**The Tabular Designator Rule.** Anything that reads as a part number, date or measured value uses tabular figures so columns of designators and readings align.

## Layout

The page is a single board, max 1360px wide, centred on the bench with a clamp(8px, 1.6vw, 24px) body inset (6px under 600px). Horizontal padding is the gutter token; vertical section rhythm is the step token. Sections are separated by full-width silkscreen hairlines, not by background changes.

- **First viewport:** a 5fr / 7fr grid (name, role, pitch, status, pads left; the circuit right), min-height min(88vh, 860px).
- **Case study:** a 190px sprint rail beside a body capped at 880px.
- **Bus indent:** sections after the case study indent their content by gutter + 40px so the copper bus can run in the margin, with a gold via aligned to each heading.
- **Definition rows:** a 220px term column beside a flexible description.
- **Meta strip:** four proportional columns (1 / 1.5 / 1.2 / 0.6) between two hairlines.

Responsive behaviour:
- **1080px and below:** the hero collapses to one column; the pitch widens to 36ch.
- **860px and below:** the board edge wraps with nav on its own row; the case study stacks (headline, lede and meta first, then the rail, then the rest); BOM tables become stacked blocks with heads hidden; the meta strip goes to two columns; definition rows go to one column.
- **600px and below:** the board corner radius drops to 10px and drill holes shrink to 12px; side padding becomes 16px; chip sub-labels hide and chip names grow for legibility; test-point rows become a two-column grid; the vertical bus becomes a short horizontal stub with its via beside each heading; contact pads go full width.

## Elevation & Depth

The board is physical and lifted once; everything on it is flat. Depth comes from the board sitting on the bench (a layered ambient shadow plus a 1px inner top highlight and a faint radial sheen), and from material layering on the board: mask, deeper mask, pour, chip packages. Inside the board nothing casts a shadow.

### Shadow Vocabulary
- **Board lift** (`box-shadow: 0 1px 0 rgba(255,255,255,0.06) inset, 0 24px 60px -20px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.5)`): the board only.
- **Drill ring** (`box-shadow: 0 0 0 5px var(--gold), 0 0 0 6px rgba(0,0,0,0.35)`): plated drill holes at the corners.
- **Pad plating** (`box-shadow: inset 0 0 0 3px #b8923f`): test-point pad marks.
- **Current glow** (`filter: drop-shadow(0 0 4px rgba(255,214,150,0.9))`): the moving pulse head only.

### Named Rules
**The One Lift Rule.** Only the board is elevated. Components on the board are printed, plated or etched, so they never get a drop shadow; glow belongs to current in motion, not to resting surfaces.

## Shapes

Corners are nearly square. The board itself is the one generously rounded object (14px, 10px on phones). Pads, connectors and switches use a 2px corner, which reads as a machined edge rather than a rounded button. Circles are reserved for holes and plated points: drill holes, vias, test pads, the status LED and rail nodes. The copper-pour panel is the one clipped silhouette, an octagon with 18px chamfered corners. Outlines are 1px silkscreen strokes; copper strokes are heavier (4-5px) and use square caps with round joins, routed in horizontal and vertical runs joined by 45-degree jogs.

## Components

### Buttons (Pads)
Connector pads: firm, plated, unmistakably clickable.
- **Shape:** machined corner (2px), min-height 48px, padding 0 20px 0 18px, uppercase label.
- **Primary:** gold fill with bench-black text; at most one per group, and it is always the email action.
- **Outline:** transparent with silk text and a 1px silk border at 0.55 alpha.
- **Hover / Focus:** primary moves to polished copper; outline gains a 0.08 silk wash and a full-silk border. Transitions are 0.25s on cubic-bezier(.16,1,.3,1). Focus is a 2px gold outline at 3px offset everywhere.
- **Contact variant:** in J1 the labels are addresses, so they drop uppercase and tighten to 0.02em tracking.

### Edge Connector
The résumé link on the board edge, drawn as a gold finger connector: a silk body with a strip of gold fingers (5px fingers, 4px gaps) on its left. Hover turns the whole body gold.

### SW1 Switches
A labelled row of slide switches that choose the traced flow, with "SW1" as its designator. Each is a 40px-high deep-mask button with a 1px silk border at 0.22 alpha and a drawn toggle (a 12 x 20px outline with a sliding block). Pressed (`aria-pressed="true"`) fills silk with bench-black text and slides the block up over 0.3s.

### Navigation (Board Edge)
The top edge carries the board ID ("NW-01" plus a ghost revision), nav pins in faded silk uppercase labels, and the edge connector. Hover brightens a pin to silk and draws a 1px copper underline. The footer reuses the same edge with the revision and type credit. Under 860px the nav wraps to its own row; under 600px the revision hides and pins shrink to 0.75rem.

### Chips (Circuit)
Each architecture node is a dark package (chip fill, chip-edge 1.5px stroke) with a pin row top and bottom, a pin-1 dot, a 1px silkscreen courtyard around it, a designator above, an uppercase name and a smaller tech sub-label inside. Leads (small light rectangles) mark where traces land. States: **in-flow** gives the package a half-strength polished-copper outline; **lit** gives it a full polished-copper outline, a lifted fill and a warm-white name for 900ms.

### Copper Traces and Vias
Top-layer traces are 5px copper at 0.55 opacity, rising to 0.95 when on a traced path or when a connected chip is hovered. Bottom-layer traces are bottom-layer copper at 0.9, brightening when on. Vias are mask-filled circles with a 2.5px gold ring where a trace changes layer.

### Pulse and Wake (Signature Motion)
Choosing a flow resets the board, outlines every chip on the path, lights the start chip, then sends a pulse down each trace in order: a 34px warm-white dash with a soft glow, its duration scaled to trace length (2.6ms per unit, clamped 320-900ms) on cubic-bezier(.45,0,.25,1), 120ms between hops. A polished-copper wake draws in behind the head, then fades over 700ms as the trace settles to its lit state, and the arriving chip lights. Return trips run the pulse backwards. The chat flow plays once, 450ms after the circuit is half in view, unless the visitor has already chosen one. A polite live caption describes each flow. Under reduced motion the path's traces simply switch on with no pulse.

### Copper Pour Panel
A chamfered octagon (18px corners) of mask-over-pour with a faint 45-degree copper hatch (1px lines every 7px at 0.14 alpha). It holds dense narrative such as a problem statement and an ownership list. Ownership bullets are small copper bars (12 x 8px).

### Test-Point Table
Measured results as a table: each row's designator carries a round gold pad mark; the reading is right-aligned in polished-copper Chakra Petch with an optional ghost-silk note beneath. Rows are deep-linkable. Under 600px rows become a two-column grid.

### BOM Table
Projects as a bill of materials: designator, part (uppercase Chakra Petch name with a ghost date line), value (the stack, in Chakra Petch 500) and notes. A targeted row takes a 0.07 polished-copper wash. Under 860px rows stack.

### Sprint Rail and Section Bus
A 4px copper rail with gold-ringed nodes and tabular date labels. The same 4px copper line continues as a bus in the left margin through every following section, with a gold via beside each heading, ending at J1. Under 600px the bus breaks into a short horizontal stub per section.

### Trace Link
An outbound link drawn as a trace ending: uppercase label, a 3px copper underline, and an inline trace-stub icon (a line ending in a pad).

## Do's and Don'ts

### Do:
- **Do** give every repeatable component a reference designator in Chakra Petch with tabular figures, and make it a deep link when the component has an id.
- **Do** keep warmth to the four metal tokens (copper, copper-hi, copper-low, gold) and reserve gold for connection points and focus.
- **Do** separate content with silkscreen hairlines (rgba(239,236,225,0.14-0.2)) and indent post-case-study sections so the copper bus can run beside them.
- **Do** route new diagram traces in horizontal and vertical runs with 45-degree jogs, 5px wide, square caps, round joins, landing on leads.
- **Do** keep one gold primary pad per group and the 2px machined corner on all interactive controls.
- **Do** provide a static, fully lit fallback for any motion under prefers-reduced-motion.

### Don't:
- **Don't** use a dark hero with a gradient, a "Hi, I'm" greeting, skill pills, or a grid of equal project cards.
- **Don't** introduce a warm hue that is not one of the metal tokens, or use copper-low for text.
- **Don't** add drop shadows to anything on the board; only the board lifts, and only moving current glows.
- **Don't** round interactive controls beyond 2px or use pill shapes; circles are for holes, vias, pads and LEDs.
- **Don't** set Bai Jamjuree in uppercase or Chakra Petch body paragraphs.
