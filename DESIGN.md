---
name: Trayang
description: Strategy, creativity and execution printed as three ink passes that register into one brand.
colors:
  brown: "#3B2112"
  gold: "#D89B52"
  gold-light: "#F0C27A"
  cream: "#E8DDC5"
  near-black: "#0B1012"
  gold-ink: "#9A6526"
  label-umber: "#7A4D1A"
  error: "#9B2C12"
typography:
  display:
    fontFamily: "Big Shoulders Stencil, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 7.6vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Big Shoulders Stencil, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  title:
    fontFamily: "Big Shoulders Stencil, Arial Narrow, sans-serif"
    fontSize: "clamp(1.85rem, 3.2vw, 2.85rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "0.005em"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)"
    fontWeight: 600
    lineHeight: 1.3
    fontVariation: "'wdth' 92"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.16em"
    fontVariation: "'wdth' 80"
  button:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.14em"
    fontVariation: "'wdth' 88"
rounded:
  plate: "2px"
  sm: "3px"
  full: "50%"
spacing:
  gutter: "clamp(1.25rem, 4vw, 3.125rem)"
  max: "80rem"
  nav-h: "4rem"
  nav-h-lg: "4.5rem"
  section: "clamp(4rem, 9vw, 7rem)"
  row: "clamp(1.75rem, 3.5vw, 2.5rem)"
components:
  button-solid:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.4rem"
    height: "3.25rem"
  button-solid-on-brown:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.brown}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.4rem"
    height: "3.25rem"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.brown}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.4rem"
    height: "3.25rem"
  button-outline:
    textColor: "{colors.brown}"
    typography: "{typography.button}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1.4rem"
    height: "3.25rem"
  chip:
    textColor: "{colors.brown}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.9rem"
  chip-selected:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
    rounded: "{rounded.sm}"
    padding: "0.55rem 0.9rem"
  input:
    textColor: "{colors.brown}"
    typography: "{typography.body}"
    rounded: "0"
    padding: "0.7rem 0"
  nav-bar:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
    height: "{spacing.nav-h}"
  capability-card:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.brown}"
    rounded: "{rounded.sm}"
    padding: "2.5rem 2.25rem"
  cta-band:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.brown}"
    padding: "{spacing.section}"
---

# Design System: Trayang

## Overview

**Creative North Star: "The Registered Overprint"**

Trayang is printed, not rendered. Every surface is a sheet of stock, either cream mulberry paper or brown kraft board (with gold as a third, flood stock), and everything on it is ink: brown, gold and light gold laid down in translucent passes. Where passes overlap they mix (multiply on cream, screen on brown), and where they line up the brand appears. That is the whole idea: strategy, creativity and execution as three passes that register into one purpose.

The density is poster-like. Stencil caps carry the voice at large sizes; Archivo carries the reading at calm, generous measure. Structure comes from printer's furniture rather than UI chrome: registration crosses at sheet corners, a double hairline rule with a diamond ornament, ruled rows instead of card grids, and photographs printed as brown and gold duotone plates with a light-gold pass laid slightly off register. Motion has one signature only: ghost passes sliding into register.

The system rejects the dark-luxury agency template: no centred hero over a dark void, no gold gradient text, no equal grid of identical cards.

**Key Characteristics:**
- Three stocks (cream, brown, gold), three inks (brown, gold, light gold), blended by the stock's own mix mode.
- Big Shoulders Stencil uppercase for display; Archivo with its width axis for text, leads and labels.
- Headings printed as a key pass over misregistered translucent ghost passes.
- Ruled rows and hairline dividers in place of cards; registration marks and diamond rules as ornament.
- Procedural paper fibre on every stock and ink grit masked into display type.
- One motion signature: passes sliding into register, on a strong ease-out.

## Colors

A fixed, client-pinned earth palette: dark kraft brown, warm gold and pale gold on cream paper, with two deepened golds that exist only so gold can be read as text on cream.

### Primary
- **Kraft Brown** (brown): The dark stock (navbar, footer, brown sections, statement band) and the key ink on cream: body text, solid buttons, selected chips, the progress bar. The browser theme colour.

### Secondary
- **Press Gold** (gold): The flood stock (CTA bands, the services chapter of the story), the gold button, the middle ink pass, and the accent and focus colour on brown. Selection highlight everywhere.
- **Pale Gold Pass** (gold-light): The third, lightest ink. Used for ghost passes, the offset pass behind every ink button, the plate ghost on photographs, and hover colour for links on brown. Never a text colour on cream.

### Tertiary
- **Gold Ink** (gold-ink): Gold deepened for legibility on cream (about 3.7:1). Display sizes only: gold heading lines, clause numbers, purpose closings, and the gold accent on cream for icons, underlines, focus outlines and hover text on large links.
- **Label Umber** (label-umber): The small-text gold on cream: labels, row headers, card leads, pillar names. Anything below display size that should read as gold uses this, not gold-ink.

### Neutral
- **Mulberry Cream** (cream): The light stock and the text colour on brown. Muted text is cream at 76% on brown and brown at 80% on cream; hairline rules are the opposite ink at about 24%.
- **Near-Black** (near-black): Not a surface. Appears only as the darkest swatch in the brand tile and as the tint of the few lift shadows (rgba of near-black).

### Semantic
- **Oxide Red** (error): Error state only: invalid field underline and the field error message.

### Named Rules
**The Stock Decides Rule.** Colours are assigned by the stock, never per element. Each stock (cream, brown, gold) sets ink-a, ink-b, ink-c, the blend mode, accent text, small text, muted and line values; components read those roles, so the same component prints correctly on any stock.

**The Gold-on-Cream Rule.** On cream, gold text is gold-ink at display sizes and label-umber below them. Raw gold and pale gold are never text on cream.

**The Fixed Palette Rule.** The five client colours are the palette. New hues are not added; new needs are met by opacity of an existing ink or by changing stock.

## Typography

**Display Font:** Big Shoulders Stencil (with Arial Narrow, sans-serif)
**Body Font:** Archivo, variable with the wdth axis (with system-ui, sans-serif)
**Label Font:** Archivo at narrow width (wdth 80 to 88), tracked uppercase

**Character:** Cut-stencil poster caps, the kind pulled through a screen, set tight and loud; against them a sturdy grotesque that reads plainly and narrows itself for labels and buttons. The pairing is the print shop: the poster and its job ticket.

### Hierarchy
- **Display** (800, clamp(3rem, 7.6vw, 6rem), 0.92): Page titles and the home hero (hero is capped by viewport height so it fits the first screen). Uppercase, balanced wrap, ink-grit mask, max about 15ch.
- **Headline** (800, clamp(2.25rem, 4.6vw, 4.25rem), 0.92): Section titles, CTA band headings, statement bands, story-stage headings.
- **Title** (800, clamp(1.85rem, 3.2vw, 2.85rem), 0.92): Row titles in ruled lists, capability card titles, contact note titles, legal clause headings.
- **Lead** (600 to 700, clamp(1.05rem, 1.6vw, 1.35rem), 1.3, wdth 92): Question lines, card leads, purpose lines, FAQ questions, story statements.
- **Body** (400, 1.1rem, 1.6): Long-form copy in rows, FAQ answers and clauses, held to 54 to 66ch, in the stock's muted colour.
- **Body Small** (400, 1rem, 1.5): Default body, footer and notes.
- **Label** (700, 0.75rem, 0.16em tracking, uppercase, wdth 80): Form field labels, footer column heads, left-column row headers, the sign-off.

### Named Rules
**The Print the Voice Rule.** Display type is always the stencil, always uppercase, always 800, always carrying the grit mask. Archivo never plays display; the stencil never sets running text.

**The No Kicker Rule.** No label, eyebrow or kicker is stacked above a heading. Labels live as field labels, footer column heads, or as row headers in a left column beside the content, and those row headers show only above 640px; below it they are removed, not restacked on top.

**The Numbers Must Mean Something Rule.** No decorative section numbers. A number appears only when it carries information, such as the citable clause numbers on legal pages.

## Layout

Content sits in a centred sheet of max 80rem with a fluid gutter (clamp(1.25rem, 4vw, 3.125rem)). Full-bleed bands (CTA band, capabilities, pillar band) align their content to the same sheet edge by padding with max(gutter, (100% − max) / 2 + gutter), so text lines up with the sheet even when the colour runs edge to edge.

Composition is asymmetric two-column: hero copy and plate at about 1.5 : 1, CTA bands and footer CTA at 1.25 to 1.3 : 1, principle and FAQ rows with a fixed left header column (9rem, 12rem; legal 6rem) beside the content. Below 900px the two-column sections stack; below 640px the left header columns drop out. Lists are ruled rows separated by full-width hairlines, with row padding around clamp(1.75rem, 3.5vw, 2.5rem); sections breathe at clamp(4rem, 9vw, 7rem).

The navbar is 4rem tall (4.5rem from 1024px), with desktop links from 1024px and a full-height brown sheet menu with stencil links below it.

The home page is a scroll-jacked story: chapters are full-viewport sheets of stock stacked in a pinned stage, and each new sheet slides up over the last (which sinks back under a dark shade), one screen of scroll per step, timed by lib/scrollStory.ts. The chapter components are a purpose reel (lines rolling past a registration mark beside an odometer counter), three ink discs moving into register, a services index whose highlight is a second copy of the list clipped to the active row beside one cream sheet whose entry reprints, and a touchpoint line that draws through four nodes before the statement takes the ink word by word. Sheet layouts fit within 100dvh and drop secondary copy on short mobile viewports rather than overflow. The questions and footer follow as ordinary scrolling sheets; a chapter rail sits at the right edge from 1400px.

### Named Rules
**The Sheet Edge Rule.** Every band, however wide its colour, aligns its content to the 80rem sheet and gutter.

## Elevation & Depth

Depth is printed, not lifted. Layers are expressed by overlapping translucent ink (multiply on cream, screen on brown, normal on gold) and by stock changes, not by shadows. Surfaces are flat. A few objects that physically sit above the sheet carry a soft, low-contrast drop:

### Shadow Vocabulary
- **Sheet lift** (`box-shadow: 0 36px 70px -48px rgba(59, 33, 18, 0.8)`): The enquiry sheet lying on the page.
- **Sheet edge** (`box-shadow: 0 -28px 60px -20px rgba(11, 16, 18, 0.6)`): The top edge of a story sheet sliding over the one below.
- **Float** (`box-shadow: 0 0 0 1px rgba(216, 155, 82, 0.32), 0 14px 32px -16px rgba(11, 16, 18, 0.7)`): The fixed chapter rail.

### Named Rules
**The Overprint Not Shadow Rule.** An offset copy of a shape in pale gold (behind ink buttons and the services sheet, past the edge of photo plates) is an ink pass, not a shadow. It uses the stock's blend mode, sits a few pixels off register, and is the only offset device allowed. Hard dark offset shadows are not part of this world.

**The Paper Is Always There Rule.** Every stock carries its procedural fibre texture (fine speckle over a soft mottle, tuned to stay within about ±3 of the stock colour). Display type carries an ink-grit mask. Flat untextured fills are reserved for small swatches and pass dots.

## Shapes

Hard-cornered and print-cut. Radii are near zero: 3px on buttons, chips, cards and the enquiry sheet; 2px on photo plates; 0 on inputs (underline only). The only round forms are the pass dots, the approach discs and the touchpoint rings (50%). Recurring geometry is printer's furniture: a 45-degree diamond with a centre dot as the ornament and button mark, registration crosses (circle plus crosshair) at sheet corners, and a hairline rule with short end ticks broken by a diamond. Lines are 1px hairlines; emphasis strokes are 1.5px.

## Components

### Buttons
Printed ink blocks, flanked by diamond marks, with a pale-gold pass waiting just out of register.
- **Shape:** Square-cut (3px radius), min height 3.25rem, nav variant 2.75rem.
- **Solid:** The stock's key ink with its reverse text: brown with cream text on cream and gold stocks, cream with brown text on brown. Narrow tracked uppercase Archivo (button type), diamond either side.
- **Gold:** Gold block with brown text, for a primary action on brown.
- **Outline:** Transparent, 1.5px inset stroke plus an inner 1px keyline 5px in, a double-ruled frame; no offset pass. Hover fills with 10% of the key ink.
- **Offset pass:** A pale-gold copy of the block sits behind at translate(4px, 4px), at 70% in the stock's blend mode; on hover it slides to 0,0 (240ms ease-out), registering.
- **Press:** scale(0.97) on :active, 160ms ease-out.
- **Focus:** 2px outline in the stock's accent text colour, 3px offset.

### Chips
- **Style:** Selectable support-type chips in the enquiry form: 1px brown line at 38%, 3px radius, Archivo 600 at 0.9rem.
- **State:** Selected fills brown with cream text; hover darkens the border to full brown; press scale(0.97); focus outline gold-ink. Service-page jump links use the same chip form.

### Cards / Containers
- **Corner Style:** 3px.
- **Background:** The capability card is a cream sheet on the gold flood; the enquiry sheet is a slightly lighter cream panel with fibre and registration corners.
- **Shadow Strategy:** Card lift and sheet lift only (see Elevation & Depth).
- **Border:** Enquiry sheet carries a 1px line; cards none.
- **Internal Padding:** 1.5rem 1.25rem on small screens up to 2.5rem 2.25rem at desktop; enquiry sheet clamp(2rem, 5vw, 3.5rem).
- Elsewhere content is not carded: it sits in ruled rows.

### Inputs / Fields
- **Style:** Underline only: transparent fill, 1.5px brown bottom rule at 45%, 0 radius, Archivo at 1.05rem, label above in label type. Selects use a drawn chevron.
- **Focus:** Underline turns gold-ink and thickens with a 1.5px under-shadow; no outline box.
- **Error:** Underline and message in oxide red, message at 0.875rem 600.

### Navigation
- **Style:** A brown kraft band with fibre and a pale gold hairline at its foot; wordmark left, links and a compact ink button right.
- **Links:** Archivo 600 at 0.95rem; current page in gold with a gold underline; hover (fine pointer only) turns pale gold with underline.
- **Mobile:** Below 1024px a two-bar toggle opens a full brown sheet with stencil links at clamp(2.75rem, 13vw, 4rem), staggered in at 45ms each, plus the CTA and sign-off.

### Pass Heading (signature)
A heading printed three times: the key pass on top, ghost pass one in gold (or the stock's ink-b) at 60% in the stock's blend, and on the full print ghost pass two in pale gold at 75%. Ghosts start well off register and slide in over 1s on ease-out cubic-bezier(0.23, 1, 0.32, 1), the second 0.11s after the first; below the fold they wait until revealed.

### Print Plate
A photograph printed as a duotone: greyscale key multiplied over gold, screened with brown, with a pale-gold pass masked by the photo's own highlights laid 14px right and 10px up, past the plate edge. It registers in from further out on load.

### Ruled Row
The default list: full-width hairline above each row and below the last, a fixed left column for a row header (desktop only), title and muted body on the right.

### CTA Band
Every page closes on a gold flood band with registration corners: a pass heading left, one sentence and one solid ink button right.

## Do's and Don'ts

### Do:
- **Do** pick a stock (cream, brown or gold) for every section and let it set the inks, blend mode, accent, muted and line colours.
- **Do** set display type in Big Shoulders Stencil 800 uppercase at 0.92 line height with the grit mask.
- **Do** use gold-ink for gold display text on cream and label-umber for gold small text on cream.
- **Do** print headings as passes: the full two-ghost print only on the home hero h1 and the closing footer heading; one near-registered ghost on every other pass heading.
- **Do** press every button and chip at scale(0.97).
- **Do** gate every hover effect behind (hover: hover) and (pointer: fine).
- **Do** keep motion to one signature (passes sliding into register) on a strong ease-out, animating only transform, opacity and clip, with a reduced-motion fallback that removes it.
- **Do** separate content with ruled rows and hairlines; ornament with the diamond rule and registration corners.
- **Do** close every page on one clear CTA band.

### Don't:
- **Don't** stack labels, eyebrows or kickers above headings. Row headers live in a left column and only above 640px.
- **Don't** number sections unless the number carries information (legal clauses do).
- **Don't** use the full two-ghost pass anywhere but the hero h1 and the closing footer heading.
- **Don't** set raw gold or pale gold as text on cream.
- **Don't** add hues outside the five client colours and their two contrast shades.
- **Don't** use gradient text, a centred hero over a dark void, or an equal grid of identical cards.
- **Don't** use hard dark offset shadows; offsets are pale-gold ink passes in the stock's blend mode.
- **Don't** round corners beyond 3px except for dots, discs and touchpoint rings.
- **Don't** introduce a second motion signature (bounces, parallax tilts, scroll-linked effects beyond the story engine).

### Known gap
The paper texture is procedural (fine speckle over soft mottle). A real mulberry and kraft paper scan has not been sourced; replacing the procedural fibre with a scan is open work, not a decision.
