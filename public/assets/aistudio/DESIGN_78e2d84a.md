---
name: Isoquant
description: Dark, monochrome, engineering-instrument design system for an inference API company. Near-black green-tinted canvas, one cinematic landscape image, hairline-bordered square-cornered panels, mono labels, white as the only accent.
source: https://isoquant.ai/ (landing page, captured 2026-11-09) plus the saved HTML file
color-scheme: dark only
tokens:
  color:
    canvas: "#101211"
    text: "#e7ece8"
    text-strong: "#f0f3ef"
    text-hero-body: "#b8c3bb"
    text-secondary: "#c0cbc2"
    text-link-footer: "#c5cfc5"
    text-muted: "#a7a9a8"
    text-label: "#969a99"
    text-footer-label: "#87968b"
    text-footer-fine: "#95a196"
    white: "#ffffff"
    status-operational: "#43ce95"
    button-fill: "#e6ebe5"
    button-border: "#f2f6ef"
    button-text: "#182019"
    button-hover: "#ffffff"
    button-active: "#d7ded6"
    panel-neutral-1: "#131313"
    panel-neutral-2: "#141414"
    panel-neutral-3: "#151515"
    panel-neutral-4: "#161616"
    panel-neutral-5: "#171717"
    panel-raised: "#1c1c1c"
    border-hairline: "#ffffff24"
    border-solid: "#3c3c3c"
    border-solid-alt: "#343434"
    track: "#292929"
    bar-baseline: "#777777"
    bar-optimized: "#ffffff"
  font:
    sans: "Arial, Helvetica, sans-serif"
    mono: "SFMono-Regular, Consolas, 'Liberation Mono', monospace"
  radius:
    default: 0
    chart-card: 4px
    cookie-banner: 8px
  layout:
    max-width-page: 1280px
    max-width-content: 1184px
    gutter-desktop: 48px
    header-height: 84px
---

# Isoquant design system

## 1. Visual theme and atmosphere

Isoquant sells speed and precision to engineers, and the site looks like an instrument panel set inside a quiet landscape. The whole page is dark. There is no light theme (`color-scheme: dark`, `theme-color: #101211`).

Three ideas hold it together:

1. **A near-black canvas with a faint green cast.** The base `#101211` is not neutral gray. Text is `#e7ece8`, a slightly green off-white. This tint is what keeps the page from looking like a generic gray dark mode.
2. **One cinematic image, then data.** The hero and closing sections use a single moody, desaturated photograph: a misty fjord at dusk with a mirrored triangular monolith on a rock island. Below the hero the page is entirely typographic and diagrammatic: charts, numbers, SVG schematics and code. Nothing else is decorative.
3. **White is the only accent.** There is no brand hue. Emphasis comes from brightness (white against gray), weight and size. The one exception is a small green status dot (`#43ce95`) for "All systems operational".

The logo echoes the hero image. It is a 28 x 28 square outline (1.5px stroke) with a solid triangle filling its lower-left half, next to the lowercase wordmark "isoquant". The triangle is the monolith, and it is also an "iso" (equal) diagonal. Square corners, diagonals and hairlines recur everywhere on the page.

Personality: confident, technical, understated. Copy is short declarative sentences ending in periods. Numbers do the persuading.

## 2. Color palette and roles

Use only these values. There are no gradients on UI elements except the image scrims, the "ours" bar fill and the header fade.

### Surfaces
| Role | Value | Notes |
|---|---|---|
| Page canvas | `#101211` | `html`, `body`, every section background |
| Header fade | `linear-gradient(#0c0f0ded, #0c0f0d55 70%, transparent)` | Fixed header, transparent at the bottom edge |
| Neutral panels (cards, charts, diagrams) | `#131313`, `#141414`, `#151515`, `#161616`, `#171717` | Slightly lighter than the canvas and neutral gray. Pick one per component, do not mix inside one card |
| Raised panel (data side of the feature card) | `#1c1c1c` | One step above its parent card |
| Control surface (snippet picker) | `#262626`, hover `#333333` | Small controls inside the code panel |
| Cookie banner | `#1012118c` with 12px backdrop blur | The only translucent, blurred surface |

### Text
| Role | Value |
|---|---|
| Headline on hero | `#f0f3ef` |
| Default text | `#e7ece8` |
| Card text / numbers | `#e8e8e8`, `#ededed` |
| Hero paragraph | `#b8c3bb` |
| "Backed by" line, footer identity | `#c0cbc2` |
| Footer links | `#c5cfc5`, hover `#ffffff` |
| Section paragraph | `#a7b0a9` (integration), `#aaaaaa` (case studies, technology) |
| Chart captions and metadata | `#a3a3a3` to `#a6a6a6` |
| Mono labels and axis text | `#999999`, `#929292`, `#868686` |
| Code line numbers | `#737373` |
| Footer column labels | `#87968b` |
| Footer fine print | `#95a196` |
| Desktop nav links | `#d7dcd7`, hover `#ffffff` |

Rule: text on the canvas carries a faint green tint (`#xxYYxx` where the middle channel is highest). Text inside neutral gray panels is true gray. Do not mix the two families within one component.

### Lines
| Role | Value |
|---|---|
| Hairline on panels | `rgba(255,255,255,0.14)` (`#ffffff24`); also `#ffffff26`, `#ffffff18` for internal dividers |
| Solid border on case-study cards | `#3c3c3c` |
| Solid border on diagram frame / domain cards | `#373737`, `#343434` |
| Chart wire / schematic strokes | `#686868`, `#555`, `rgba(255,255,255,0.06 to 0.57)` |
| Focus ring | `2px solid #dce8de` (landing), `#fff` (global) with 4 to 5px offset |

### Data visualization
| Role | Value |
|---|---|
| Track | `#292929` (10px) or hatched `#ffffff0c` grid (13px) |
| Baseline / competitor bar | `#777777` solid, or diagonal hatch `repeating-linear-gradient(135deg, #ffffff09 0 3px, #fff2 3px 4px)` with a `#ffffff40` border |
| Isoquant ("ours") bar | `#ffffff`, or gradient `#b7b7b7 to #eeeeee` with a `#eee` border |
| Status dot | `#43ce95` operational, `#95a196` default |

In every comparison the product's own row is the brightest and heaviest element, and competitors are dimmer and hatched.

## 3. Typography

No web fonts are loaded. The site relies on system stacks.

- **Sans:** `Arial, Helvetica, sans-serif`. Used for all headings, body and numbers.
- **Mono:** `SFMono-Regular, Consolas, "Liberation Mono", monospace`. Used for navigation, buttons, section labels, chart axes, pricing units, code.

Headings use `font-weight: 450`. Arial has no 450 face, so it renders as regular 400. Do not substitute bold. If a variable font is ever introduced, keep 450 to preserve the light, airy headline feel. Headlines are tight: letter-spacing around `-0.045em`, line-height 1.08 to 1.2, `text-wrap: balance`.

| Role | Size | Weight | Letter-spacing | Line-height | Notes |
|---|---|---|---|---|---|
| Hero H1 | `clamp(39px, 4.2vw, 62px)` | 450 | `-0.045em` | 1.08 | 49px at 1100px and below; 36px at 420px and below |
| Closing H2 | `clamp(38px, 4.4vw, 60px)` | 450 | `-0.045em` | 1.1 | 40px at 780px; 36px at 420px |
| Section H2 (models, integration, companies) | 38px | 450 | `-0.045em` | 1.16 | 30px at 620px and below |
| Section H2 (performance, technology, case studies) | `clamp(32px, 3.2vw to 3.4vw, 44px to 46px)` | 400 | `-0.047em` / `-1.7px` | 1.14 to 1.18 | |
| Feature headline | `clamp(26px, 2.5vw, 34px)` | 400 | `-1.2px` | 1.25 | |
| Card title (H3) | 20 to 25px | 400 | `-0.025em` to `-0.035em` | 1.2 to 1.3 | |
| Brand wordmark | 25px (23px mobile) | 600 | `-1.4px` | | The only semi-bold text |
| Big stat (feature card) | 94px (84px, 74px smaller) | 400 | `-6px` | 1 | Unit sits at 48px beside it |
| Story stat | 55px | 400 | `-3px` | 1 | |
| Metric / scorecard number | `clamp(42px, 4.5vw, 64px)` and `clamp(44px, 4vw, 54px)` | 400 | `-0.06em` | 1 to 1.05 | `font-variant-numeric: tabular-nums` |
| Lead paragraph | 17 to 18px | 400 | | 1.6 to 1.75 | Hero 17px, case studies 18px |
| Body | 15 to 16px | 400 | | 1.65 to 1.75 | |
| Small text | 12 to 14px | 400 | | 1.5 to 1.6 | Footer links 13px, captions 12px |
| Nav link | 11px mono | 400 | `0.025em` | 1 | Uppercase |
| Button label | 12px mono | 400 | 0 | 16px | Uppercase |
| Section label | 11 to 12px mono | 400 | `0.065em` to `0.07em` | 1.5 to 1.6 | Uppercase; formats like `01 / Model` |
| Axis and chart meta | 9 to 12px mono | 400 | `0.04em` to `0.055em` | 1.4 to 1.8 | |
| Code | 14px mono, line-height 26px | 400 | | | 12px / 24px under 620px |

Mono is a labeling voice, not a body voice. It marks anything that is a unit, a step number, a control or a measurement. Use it in small sizes and uppercase.

## 4. Layout and spacing

- **Grid width:** page content max 1280px (`min(100% - 96px, 1280px)` in the header and hero frame); narrower sections use 1184px. Side padding is 48px on desktop, 22px to 24px on mobile.
- **Section rhythm:** 72 to 112px top padding and 72 to 136px bottom on desktop, 54 to 64px top and 65 to 88px bottom under 620px. Sections are separated by space only, not rules.
- **Headings are centered** above content in every section after the hero, with a centered lead paragraph (max-width about 615 to 730px). The hero itself is left-aligned and bottom-anchored.
- **Hero:** full-bleed image, `height: min(880px, 92svh)`, `min-height: 730px`. The copy block sits at the bottom left with 100px bottom padding (130px at 1600px and up), max-width 720px, with the CTA row below.
- **Panels are tiled with 1px gaps.** The scorecard is a 3-column grid with `gap: 1px` over a `#ffffff20` background, so the cards look separated by hairlines. Case-study story cards are separated by 1px right borders.
- **Spacing scale used in practice:** 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 40, 46, 52, 56, 64, 72, 88, 112. Component padding is typically 22 to 30px on mobile and 26 to 46px on desktop.
- **Scroll offsets:** `scroll-padding-top: 88px`; individual sections set `scroll-margin-top` between 68px and 112px so anchors clear the fixed header.

## 5. Shape, depth and elevation

- **Corners are square.** Buttons, cards, panels, the code block, the diagram frame and track bars all use `border-radius: 0`. Exceptions: chart cards 4px, cookie banner 8px, status dot and pulse (round).
- **Depth comes from lightness steps and hairlines, not shadows.** The only box-shadow on the page is the cookie banner (`0 4px 16px #0000001f`). To make something feel raised, lighten its fill by one neutral step (for example `#171717` to `#1c1c1c`) and add a 1px border.
- **Dotted blueprint texture** on the optimization diagram frame: `#131313` with `radial-gradient(#ffffff0d 0.7px, transparent 0.7px)` on a 20px x 20px grid, plus a `#373737` border.
- **Image scrims.** The hero image is darkened with three stacked gradients: left and right edge vignettes, a top-to-bottom fade into `#101211` at the bottom, and a heavier left-to-center darkening behind the text. The closing image runs at 65% opacity (48% on mobile) with fades to `#101211` at the top, bottom and left.

## 6. Components

### Header
- Fixed, `z-index: 50`, height 84px (72px at 1000px and below). A three-column grid (`1fr auto 1fr`): brand left, nav centered, actions right.
- Brand: logo mark (28px, 25px on mobile) plus wordmark, gap 10px.
- Nav: six anchors in 11px uppercase mono, gap 28px (22px at 1100px and below). Hidden under 1000px.
- On scroll a secondary "Talk to us" button fades in beside the primary "Start building" button (opacity and an 8px slide, 0.16s). The nav slides right using `cubic-bezier(0.22, 1, 0.36, 1)` over 0.48s.
- Hidden "Skip to content" link appears at top-left on focus (`#e7ece8` fill, `#101211` text).

### Buttons
| Variant | Fill | Border | Text | Hover | Active |
|---|---|---|---|---|---|
| Primary | `#e6ebe5` | `1px #f2f6ef` | `#182019` | fill `#ffffff` | fill and border `#d7ded6` |
| Secondary | `#ffffff1f` | `1px #ffffff33` | `#d9ded9` | fill `#ffffff2b`, border `#ffffff4d`, text `#fff` | fill `#ffffff17` |

Shared: 12px / 16px uppercase mono, padding 7px 12px, min-height 32px (44px on touch devices), radius 0, gap 8px. Primary buttons carry a 14px arrow icon (`M4 10h11M10 5l5 5-5 5`, 1.4px stroke) that shifts 2px right on hover (fine pointer only). In the hero the two buttons sit in a row with a 12px gap: "Get API key" (primary) and "Talk to us" (secondary). Text links such as "Read the case study" use 14px sans, a 17px arrow icon that moves 4px right on hover, and an underline with 5px offset on hover.

### Model and pricing cards
Each model has a heading with a white-inverted monochrome icon (`filter: brightness(0) invert()`), a one-line description, a large tabular price and a small gray unit ("USD / 1M tokens"). Input, cached input and output prices are shown as a row of three price pairs, each with its H3 label. Under 850px the card collapses to a two-column grid with the title left and prices right-aligned. Benefits sit centered below as a flex row of checkmark items ("No top-up fees.", "Automatic prompt caching.") in 14px `#a3a3a3` with `#ededed` check marks.

### Metric tiles and scorecard
Three headline metrics (452 ms, 2.3 sec, 158.9 tok/s) sit in a 3-column grid with 16px gaps. Each tile has `#171717` fill, a `#ffffff24` border, 26px padding, a very large value (`-0.06em` tracking, tabular numerals) with a small mono unit beside it, and an 11px mono caption. Stack to one column under 620px.

### Benchmark bar charts
Two side-by-side cards (`#151515`, `#ffffff24` border, 4px radius), each with a header row (21px title, 12px "Lower/Higher is better" note) and one row per provider. Each row shows a provider mark and name at left, a mono value at right, and a 13px track with a faint 25% vertical grid. Competitors use the hatched bar; Isoquant uses the bright gradient bar plus a 9px mono "OUR API" tag. An axis line and a mono unit caption ("MILLISECONDS · P50") sit below. Always sort best to worst so the product's bar leads.

### Engineering schematics
SVG diagrams drawn with 1px non-scaling strokes, square line caps and white at varying opacity (6 to 57%). Grid cells pulse between about 22% and 75% fill on 8s loops, a dashed trace travels along wires on a 9 to 10s loop, and a scan line sweeps ±40px on 7s. The diagram sits in the dotted frame; labels beneath are 12px mono with `·` separators. Four numbered discipline cards (`01 / Model` through `04 / Serving`) use `#141414` fill, a `#343434` border and a 25px title, in a 2-column grid with an 18px gap.

### Code panel
`#171717` fill, `#ffffff24` border, radius 0, max-width 880px, centered. A toolbar holds a model picker, a language picker (cURL) and a protocol picker (Chat Completions) as `#262626` square buttons with a chevron. The code area shows line numbers in `#737373` and a monochrome syntax theme: keywords `#f2f2f2` weight 600, titles and attributes `#dedede` 500, strings `#a8a8a8`, numbers and literals `#e0e0e0` 600, variables `#c7c7c7`, punctuation `#939393`. A 36px square copy button sits bottom right (`#999`, hover `#fff` on `#292929`). Syntax highlighting uses brightness and weight only, never hue.

### Case studies
A feature card (`#161616`, `#3c3c3c` border) is split into two columns. The copy column has 46px padding and holds a mono label, a 34px headline, a gray paragraph and a link pinned to the bottom. The data column (`#1c1c1c`, left border) shows a bar comparison where the optimized bar is white and the baseline is `#777`, a 94px hero stat, and a two-up row of smaller stats separated by a hairline. Below it, a three-column story grid shares the same border and holds a 55px stat, a gray paragraph and a footer link per card.

### Closing band and footer
A full-width image band (min-height 470px) with an H2 and a primary button. The footer is a five-column grid (`minmax(180px, 1.4fr)` plus four columns) with the brand, "Backed by Combinator" line and live status badge at left, then Explore, Work with us, Trust and Connect. Column labels are 10px uppercase mono in `#87968b`; links are 13px `#c5cfc5`. Fine print (11px `#95a196`): "SOC 2 in progress", copyright and a copy-to-clipboard email button that swaps to a "Copied" state in place. A very large white "isoquant" wordmark spans the footer; hovering it reveals a spotlight layer (opacity 0 to 1 over 0.3s).

### Status badge
6px dot plus 13px text. When status is not "none" the dot has a 2s pulse ring (scale 1 to 2.5, opacity 0.5 to 0). Operational uses `#43ce95`.

### Cookie banner
Compact corner card, bottom-right 24px (8px on mobile), max 260px wide, `#1012118c` with blur, 8px radius, 12px text in `#b9c2bb`, and three equal 28px-tall buttons (`#2d2f2e59` fill, 11px text, 5px radius).

## 7. Imagery and iconography

- **Hero / closing image:** a single desaturated, low-key landscape (dark conifers and cliffs, mist, a still lake, a mirrored triangular monolith). Keep any replacement monochrome-leaning, with a bright focal point on the right and heavy darkness on the left where text sits. Crop with `object-fit: cover` at `58% 53%` (desktop hero), `72% top` (mobile hero) and `63% 49%` (closing).
- **Icons:** thin 1.4 to 1.5px strokes, `currentColor`, square caps. Arrows, copy, check and chevron icons are line icons; model and provider marks are flat white silhouettes.
- **Photography of people, gradients, illustrations and stock imagery are not used.**

## 8. Motion

- Color, background and border transitions are 0.2s (0.14 to 0.16s on small controls).
- Hover affordances are small translations of arrow icons (2px or 4px).
- The header actions and nav use the long ease-out curve `cubic-bezier(0.22, 1, 0.36, 1)` at 0.48s.
- Ambient motion lives only in the schematics, the status pulse, a hero water-ripple canvas and the footer spotlight.
- `prefers-reduced-motion: reduce` turns off all transitions and animations, hides the hero water canvas, the footer spotlight and the trace and seal animations, and shows schematic cells at a fixed mid opacity.

## 9. Responsive behavior

Major breakpoints used by the site: 1600, 1100, 1050, 1000, 850, 800, 780, 720, 640, 620, 600, 540, 480, 420, 400, 380, 360px.

- **1000px and below:** nav collapses and the header becomes a two-item flex row (72px high); footer goes to 4 columns with the identity block spanning all.
- **850px and below:** scorecard and pricing cards go to one column, with the pricing card switching to a title-left, price-right grid.
- **800px and below:** the three-column engineering diagram is replaced by a stacked list (40px gap).
- **780px and below:** hero becomes auto-height with the image pinned to the top (max 580px tall) and a bottom-up fade; footer becomes two columns with 44px minimum link height.
- **720px and below:** case-study feature and story grids go to a single column.
- **620px and below:** section padding drops to 64px 22px, H2 to 30px, chart and metric grids to one column.
- **Touch targets:** coarse-pointer devices get 44px minimum height on buttons and footer links, with extra invisible hit area (`inset: -8px -6px`) on the small header CTA.
- Content is always `min-width: 320px`; horizontal overflow is hidden on `body`.

## 10. Accessibility

- Measured contrast: default text `#e7ece8` on `#101211` is about 15.7:1; the dimmest paragraph color `#a7a9a8` is about 8:1; small mono labels `#868686` to `#929292` on their panels are about 5 to 5.9:1, so keep them from going darker. Code line numbers (`#737373` on `#171717`, about 3.8:1) are the one low-contrast element and are non-essential, so do not reuse that value for meaningful text.
- Visible focus on every control (2px outline, 4 to 5px offset), a skip link, `aria-label` on the brand link, `aria-hidden` on decorative imagery, and visually hidden helper text (`srOnly`) for icon-only buttons.
- Chart meaning never depends on color alone: the product row is also labeled "OUR API", bolder, and positioned first.
- All motion respects `prefers-reduced-motion`.

## 11. Do and don't

**Do**
- Keep the canvas `#101211` and let white and hairlines carry all emphasis.
- Use square corners, 1px borders and one-step lightness changes to create hierarchy.
- Lead every claim with a large tabular number, then a small mono unit and a gray one-line explanation.
- Put the product's own result in white and the alternatives in gray or hatched.
- Use mono, uppercase, small text for labels, units, steps and controls, and Arial for everything you actually read.
- End headlines with a period and keep them to one or two lines.
- Show the real request (cURL) rather than a decorative mockup.

**Don't**
- Don't introduce a brand color, gradients on components, glows, or colored syntax highlighting.
- Don't round corners above 4px (the cookie banner is the sole 8px exception).
- Don't use drop shadows to lift cards.
- Don't set headings in bold. Reserve 600 for the brand wordmark.
- Don't use bright pure `#000` backgrounds; the green-tinted `#101211` is the identity.
- Don't mix the green-tinted text family with neutral-gray text inside the same component.
- Don't use stock photography or people; imagery is limited to the single landscape and technical diagrams.

## 12. Agent prompt guide

To generate new Isoquant-style UI, start from this brief:

> Dark single-theme page on `#101211` with text `#e7ece8`. Arial for headings and body (weight 400 to 450, tight tracking `-0.045em`), SFMono-Regular uppercase 11 to 12px for nav, buttons, labels and units. Content width 1280px with 48px gutters. Square corners everywhere. Panels are neutral-gray `#151515` to `#171717` with a 1px `#ffffff24` border; raised areas lighten by one step. Primary button is `#e6ebe5` with `#182019` mono uppercase text and a 14px arrow; secondary is `#ffffff1f` with a `#ffffff33` border. Emphasis is white against gray; the only color is a `#43ce95` status dot. Lead with big tabular numbers (`-0.06em` tracking), small mono units, and one-line gray explanations. Compare the product against alternatives with bars: white for ours, hatched `#777` for others. Honor `prefers-reduced-motion`.

Quick reference for common requests:
- *New section:* centered H2 (38px / 450 / `-0.045em`), lead paragraph in `#a7b0a9` (max 615 to 730px), mono label above, 72 to 112px vertical padding.
- *New stat card:* `#171717` panel, `#ffffff24` border, 26px padding, value `clamp(42px, 4.5vw, 64px)` at `-0.06em`, 11px mono caption.
- *New CTA:* primary button, uppercase mono label, arrow icon, 32px tall.
- *Code sample:* panel `#171717`, 14px / 26px mono, monochrome highlight, copy button bottom-right.

## Provenance and gaps

- Values above are read from the site's own CSS in the saved HTML (the `landing-module`, `site-footer`, `case-studies`, `classic-bars`, `agentx-scorecard`, `glm-pricing-section`, `engineering-*`, `code-panel`, `snippet-picker`, `highlighted-code` and `optimization-engine` style blocks) and cross-checked against the live page. Copy and structure match the live site as of 2026-11-09.
- The saved file also contains styles injected by browser extensions and a cookie-consent vendor (an Ant Design bundle, a Tailwind bundle, chrome-extension fonts such as DM Sans and Noto Sans, a purple `#7450ff` accent). These are not part of the Isoquant design and were ignored, except for the cookie banner overrides that the site itself defines.
- Not observed in the capture: any light theme, a dedicated tablet layout beyond the breakpoints above, the pricing number size at desktop width, or the separate pages (`/docs`, `/benchmark`, `/companies`, console). Treat those as undefined rather than inferring them from this document.
- The reading of the logo triangle as the hero monolith, and of 450-weight headings falling back to 400 in Arial, are interpretations of the observed markup and CSS.
