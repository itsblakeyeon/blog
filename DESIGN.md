# DESIGN.md — Blake's Blog

> **Visual thesis:** _Concrete paper with spray signatures._
> Editorial reading experience underneath a street-language brand layer.

Source of truth for every visual decision. When in doubt, re-read this file.

---

## 1. Brand Position

**Product:** Blake's personal blog at `blog.itsblakeyeon.xyz`
**Audience:** Founders, product people, designers, AI/brand folks
**Topics:** Work, product, business, brand, AI (mixed tone — essays + jottings)
**Brand in one line:** Streetwise thinking about products.

**Why graffiti × editorial?**
Most graffiti-styled sites forget the wall and just spray everywhere — unreadable novelty. Real street art works by **contrast**: a neutral concrete wall holds a loud tag. Our blog is the same:
- **Wall** = content body, quiet, serif, editorial discipline
- **Tag** = brand, titles, accents — loud, spray, stenciled
- Content is serious; the brand comes from the street

This mirrors Supreme's formula: iconic wordmark, understated product underneath.

---

## 2. Typography

| Role | Font | Why |
|---|---|---|
| **Display** (H1, brand mark) | **Rubik Mono One** (Google Fonts) | Stencil-block bold, geometric, free, reads as "tag" |
| **Heading** (H2-H4) | **Space Grotesk** (Google Fonts) | Industrial sans with monospace DNA, "maker" feel |
| **Body** | **Fraunces** (Google Fonts, italic variant pairs well) | Warm editorial serif, serious reading |
| **Mono** (code, meta) | **JetBrains Mono** (Google Fonts) | Code, dates, tags, `[BRACKETED]` meta |

**Sizing scale (rem, mobile-first):**
- Display: `clamp(3rem, 8vw, 6rem)` — H1/hero
- H2: `2.25rem` / `2.75rem` desktop
- H3: `1.5rem` / `1.75rem` desktop
- Body: `1.0625rem` / `1.125rem` desktop (17-18px)
- Meta/mono: `0.8125rem` (13px) uppercase tracked

**Line-height:**
- Body: `1.7`
- Headings: `1.1`

**Tracking:**
- Display: `-0.02em` (tight)
- Meta/uppercase mono: `0.1em` (open)

**Body column width:** `680px` max. Wall is the viewport; body is a narrow ribbon.

---

## 3. Color System

### Light mode — "Concrete Paper"

```css
--wall:       #F4F1EB;  /* ivory paper */
--wall-deep:  #E8E2D4;  /* kraft / muted */
--ink:        #171614;  /* primary text */
--ink-muted:  #6B6560;  /* secondary / meta */
--spray:      #FF3D2E;  /* supreme-red accent */
--tag:        #2D4BFF;  /* urban blue */
--marker:     #D4FF00;  /* neon highlighter */
```

### Dark mode — "Subway at Night"

```css
--wall:       #0E0D0B;  /* burnt black */
--wall-deep:  #1A1815;  /* tunnel */
--ink:        #F4F1EB;  /* paper white */
--ink-muted:  #8A847C;
--spray:      #FF5445;
--tag:        #5E78FF;
--marker:     #E3FF1F;
```

### Usage rules

- **One accent per view.** Spray red is for H1, inline links, primary CTA only.
- **Marker yellow** is a highlighter — reserved for hover states and inline emphasis (like a marked-up printout).
- **Tag blue** is for secondary link states, selected tag chips.
- **Never combine spray + tag** in the same component. They compete.
- Body text is always `--ink` on `--wall`.

---

## 4. Layout & Composition

### Page structure

```
┌──────────────────────────────────────────────┐
│  [wall: full-viewport, subtle paper noise]   │
│                                              │
│    ┌──────────────────────────┐              │
│    │  header (nav, tight)     │              │
│    └──────────────────────────┘              │
│                                              │
│       ┌─────────────────────┐                │
│       │   body column 680   │                │
│       │   (serif, narrow)   │                │
│       └─────────────────────┘                │
│                                              │
│  [spray line divider, SVG, single stroke]    │
│                                              │
│       footer, mono stenciled                 │
└──────────────────────────────────────────────┘
```

### H1 treatment — "the tag"

- Rubik Mono One, `clamp(3rem, 8vw, 6rem)`
- Rotated `-2deg` to `-3deg` (small, not gimmicky)
- SVG spray-stroke background behind it (single marker swipe, `--spray` at 70% opacity)
- All caps, `letter-spacing: -0.02em`

### Post meta as stencil

```
[ 2026-04-05 ] [ PRODUCT ] [ 8 MIN READ ]
```
- JetBrains Mono, uppercase, `--ink-muted`, bracket-framed.

### Section dividers

- NEVER use plain `<hr>`
- Use SVG spray-stroke line, single stroke, `--ink-muted` at 40% opacity
- Stored in `components/SprayDivider.tsx`

### First screen = poster

Home page = gallery wall. Post titles scattered as tags on a strict grid (regimented grid, loose content). Think: "these posts are stickers on a wall, but the wall is a disciplined 12-column."

---

## 5. Components

### Tag chips (stickers)

- Not pill-shaped. They're **stickers** with paper texture.
- `rotate: calc(var(--i, 0) * 1deg)` — each staggered slightly (-2 to 2 degrees)
- `box-shadow: 2px 2px 0 var(--ink)` — hard shadow like a lifted sticker
- `background: var(--wall-deep)`, thin `--ink` border
- Hover: lift + straighten

### Link styles

- Body links: `--spray` underline, `text-decoration-thickness: 2px`, `text-underline-offset: 3px`
- Hover: marker-yellow highlight passes behind (200ms animation, translateX from -100% to 0)
- Visited: `--ink-muted`, no underline change

### Code blocks (Shiki)

- Custom theme: dark wall (`#0E0D0B`) + paper-white text even in light mode (inversion = "graffiti on wall")
- Rounded `4px`, no outer border, tight 1rem padding
- `JetBrains Mono`, `0.9375rem`
- Line numbers: `--ink-muted` at 40% opacity

### Header / nav

- Tight horizontal bar, top-left brand mark (stencil)
- Nav links: mono, uppercase, tracked
- No bg color, sits directly on wall
- Sticky on scroll, compresses

### Footer

- Two columns: social links (mono stenciled) | RSS + colophon
- Wall-deep background strip at bottom

---

## 6. Texture & Motion

### Texture

- **Paper grain**: SVG noise filter, 1% opacity, overlaid on `--wall` via `::before` on `<body>`
- **Spray strokes**: Custom SVG components for H1 backdrops and dividers (`/components/SprayStroke.tsx`)

### Motion rules

- **No bouncy animations.** No easing overshoots.
- **No page transitions.** Brutal, fast, hard cuts.
- **Link hover**: marker highlight slide (200ms, `ease-out`)
- **Tag hover**: `transform: translateY(-2px) rotate(0deg)` (150ms)
- **Dark mode toggle**: instant swap, no fade (brutal)
- **Scroll**: no parallax. Ever.

Animations are **punctuation**, not decoration.

---

## 7. Anti-slop Guardrails

Banned visual moves:
- ❌ Purple gradients
- ❌ 3-column icon grids
- ❌ Centered-everything layouts
- ❌ Decorative blobs / glowy circles
- ❌ Parallax scroll
- ❌ Fade-in on scroll (distracting)
- ❌ Card-heavy layouts with shadows
- ❌ Hero with "large rounded CTA button" cliche
- ❌ Emoji as decoration (ever)
- ❌ Generic "abstract SVG waves"
- ❌ Glassmorphism / frosted glass
- ❌ Bento grids (unless genuinely communicating structured data)

Permitted visual moves:
- ✅ Digital photocopy / Xerox texture
- ✅ Single bold accent color per view
- ✅ Oversized display type (tag energy)
- ✅ Hard shadows (no blur)
- ✅ Rotation on single elements (never all)
- ✅ Monospace meta

---

## 8. Accessibility Commitments

- Body contrast: `--ink` on `--wall` = 16.8:1 (AAA)
- Spray red on wall: 4.5:1 minimum (AA) — use on ≥16px text only
- Focus states visible: 2px `--tag` outline, 2px offset
- All interactive elements keyboard-navigable
- `prefers-reduced-motion`: disable marker highlight animation, tag rotation stays (static)
- Fonts load with `font-display: swap` + monospace fallback to avoid layout shift

---

## 9. OG Image Template

Every post auto-generates an OG image at `/api/og?title=...&tag=...`:
- 1200×630
- Wall background + paper noise
- Title in Rubik Mono One, rotated -2deg, spray backdrop
- Meta strip bottom: `[ blake ] [ 2026-04-05 ] [ product ]`
- Always includes `blog.itsblakeyeon.xyz` mono footer

---

## 10. The One-Line Test

> When you look at this blog, do you think **"a product person who hangs out in the streets"**?

If yes, we're on brand.
If it feels like "designer trying to be cool" or "tech bro using a graffiti font" — we've failed.

The content carries the credibility; the visual carries the personality.
