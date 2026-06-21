# LabThread — Redesign Plan
**Owner:** anonically22 (Anirbaan) · **Stack:** React + Vite + Tailwind (+ Framer Motion for motion)
**Status:** Spec for agent-driven build, phased

---

## 0. Hard constraints (do not violate)

1. **Hero copy stays verbatim.** "A thread connecting biotech students to guidance, **science**, and community." plus the subhead paragraph and the three credential bullets (BTech + MTech Biotechnology / GATE BT & XL Qualified '25 / Currently at BITS Pilani) are not rewritten, trimmed, or rearranged in meaning. Restyle freely, do not rewrite.
2. **The doodle illustration stays.** Same asset (girl at desk, laptop, plant, coffee mug, notebook). It can be recolored to fit the new ink-line treatment if the line art supports it, repositioned, or resized — it cannot be swapped for a different illustration or removed.
3. **Background is white → off-white only.** No cream/beige field as the dominant surface (that's the current design and also the single most common AI-default palette right now — moving off it is part of the point). Beige becomes an accent, not a base.
4. **New logo required.** Current state is a plain wordmark with no mark — see Section 3.
5. Section inventory stays "somewhat similar" — Hero, About the Authors, Latest from the Blog, Quick Email Tips, Ask CTA band, Footer all remain as concepts. Everything *inside* them is fair game.

---

## 1. Design rationale

The current build leans into the most common AI-generated look right now: warm cream background, high-contrast serif display, earthy green accent. It's not bad, but it isn't anonically22's — it's a template anyone would land on for "friendly student blog."

The brief gives two real anchors to design from: the name **LabThread** (a thread connecting students to guidance) and your own identity as anonically22 — product-first minimalism, systems thinking, Navy/Blue/Steel/Beige. So the redesign leans into the literal idea of a *thread*: a single connecting line that runs through the page and ties every section together, rendered in your palette instead of the current teal.

**Signature element — "The Thread Line":** a thin hand-drawn-style line (not a rigid CSS border — slightly irregular, like it was pulled taut by hand) that originates at the doodle in the hero, runs down the page, and touches every major section with a small stitch-node marker. It animates in as the user scrolls — the thread "draws itself" as you move through the site. This is the one bold risk; everything else stays quiet and disciplined around it.

---

## 2. Design tokens

### Color (5 named values — keep it to these, no extra accent colors)

| Token | Hex | Usage |
|---|---|---|
| `paper` | `#FAF8F4` | Page background. Barely off-white — not cream. |
| `ink` | `#14182B` | Primary text, logo, headline type. |
| `thread` | `#233E63` | Primary accent — links, CTA fills, the thread line itself, the highlighted word in the hero ("science"). Replaces the current teal. |
| `steel` | `#7E8AA1` | Secondary text, icon strokes, borders, muted UI, nav links. |
| `beige` | `#EFE7D8` | Accent fills only — tag chips, card backgrounds, the CTA band's *opposite* (inverted: ink bg + beige text), hover states. Never the page base. |

CSS variables:
```css
:root {
  --color-paper: #FAF8F4;
  --color-ink: #14182B;
  --color-thread: #233E63;
  --color-steel: #7E8AA1;
  --color-beige: #EFE7D8;
}
```

### Type (3 roles, deliberately not the current serif+sans-default pairing)

- **Display** — `Fraunces` (variable, optical size set to large, weight 480–600). Hero H1, section H2s. This is where the page's personality lives — set it big, let the optical sizing give it slightly idiosyncratic character rather than a neutral editorial serif.
- **Body** — `Inter` (400/500/600). Paragraphs, nav, buttons, card body text.
- **Utility/mono** — `IBM Plex Mono` (400/500), all-caps, tracked +0.05em. Eyebrow labels, tags (`career`, `lab life`), dates, footer build tag, the credential bullets under the hero. This is what gives the page its systems/builder feel — small structural text reads like lab notation rather than blog decoration.

Type scale (desktop / mobile):
- H1 (hero): 64px / 38px, Fraunces 520, line-height 1.05
- H2 (section): 36px / 28px, Fraunces 500
- Body: 17px / 16px, Inter 400, line-height 1.65
- Mono/eyebrow: 12.5px, Plex Mono 500, uppercase, tracked

### Layout & motion

- Radius: 8px on cards/illustration frame, 4px on buttons/tags (sharper — the systems layer should feel more precise than the editorial layer).
- Max content width: 1120px, generous side padding (96px desktop / 24px mobile).
- Motion: page-load stagger on hero (headline → subhead → bullets → doodle, 80ms offset each); thread line draws via `stroke-dashoffset` scroll-trigger; card hover = 2px lift + border color shift to `thread`, 150ms ease. Respect `prefers-reduced-motion` — fall back to a static thread line and no stagger.

---

## 3. New logo

**Wordmark:** "LabThread" set in Fraunces 560, `ink` color. No change in weight between the two words — it's one word, one idea, not "Lab" + "Thread" as separate brand beats.

**Mark:** a single-stroke (1.5px, rounded caps, slightly irregular like the doodle's hand-drawn line) icon — a simple flask outline with a thread looping once around its neck and trailing off, rather than a generic lab-flask glyph. This is the detail that ties the new logo back to the preserved illustration: same stroke weight, same "drawn by hand" imperfection, so the logo and the hero doodle read as one visual voice instead of two unrelated assets.

**Underline detail:** beneath "Thread" only, a running-stitch dash (3–4 short dashes with small circular stitch-points), in `thread` blue. This is the wordmark's only color besides ink — small, specific, not loud.

**Deliverables to produce:** SVG wordmark+mark (nav-bar size, ~28px tall), standalone mark only for favicon/avatar (32×32 and 16×16), and a one-color (`ink`-only) version for places that need it (footer, print/share previews).

---

## 4. Section-by-section spec

**Nav** — Logo (mark + wordmark) left, links right in Plex Mono uppercase small caps (Home / Blog / Tips / Ask), `steel` color default, `ink` on hover/active. No background — sits directly on `paper`, thin 1px `steel`-at-10%-opacity rule at the bottom.

**Hero** — Two-column as today (copy left, doodle right) preserved at the structural level. Headline in Fraunces, "science" highlighted in `thread` with the running-stitch underline (same device as the logo, so the page teaches its own visual language in the first five seconds). Credential bullets restyled in Plex Mono with small stitch-node dots instead of the current dots. The thread line's first stitch-node anchors right at the edge of the doodle frame — visually, the thread "starts" at the illustration.

**About the authors** — Cards drop the current colored-left-border treatment for a quieter rule: thin `steel` top border, eyebrow role in Plex Mono, name in Fraunces. "Notable experiences" mini-cards become a tighter 3-up grid with `beige` fill (this is where beige earns its keep — dense factual content benefits from a slight surface lift off white).

**Latest from the blog** — Card art swaps from the current pastel icon-square to a single-line icon in `ink`, no background fill, sitting on a thin `steel` rule rather than a colored box. Tags become Plex Mono chips with `beige` fill, `4px` radius. Date in mono, muted `steel`.

**Quick email tips** — Keep the expandable-card pattern. Default state: thin `steel` border, mono eyebrow ("PRINCIPLE"), Inter body. Expanded/hover: border shifts to `thread`.

**Ask CTA band** — Invert the palette here on purpose: `ink` background, `paper` headline text, `beige` for the subhead, button is `paper` fill / `ink` text. This is the one place the page goes dark — it should feel like the most "considered" moment, the one section drawn in the opposite register, since it's the highest-intent action on the page.

**Footer** — `paper` background, `steel` text, Plex Mono for the build tag and copyright line (already partly mono in the current build — keep that instinct, extend it). Logo mark only (no wordmark) in the corner, `ink`.

---

## 5. File / component structure (React + Vite + Tailwind)

```
src/
  components/
    Nav.jsx
    Hero.jsx              ← copy + doodle untouched, only className/markup changes
    ThreadLine.jsx         ← signature element, scroll-triggered SVG path
    AuthorCard.jsx
    BlogCard.jsx
    TipCard.jsx
    CtaBand.jsx
    Footer.jsx
    Logo.jsx               ← exports both <LogoMark /> and <LogoWordmark />
  data/
    blogPosts.json          ← unchanged data, only card rendering changes
    tips.json
  styles/
    tokens.css              ← the :root variables from Section 2
  assets/
    doodle-hero.svg          ← existing asset, recolored if needed
    logo-mark.svg
```

Tailwind config additions:
```js
theme: {
  extend: {
    colors: {
      paper: '#FAF8F4',
      ink: '#14182B',
      thread: '#233E63',
      steel: '#7E8AA1',
      beige: '#EFE7D8',
    },
    fontFamily: {
      display: ['Fraunces', 'serif'],
      body: ['Inter', 'sans-serif'],
      mono: ['"IBM Plex Mono"', 'monospace'],
    },
  },
}
```

---

## 6. Phased build — agent-ready prompts

Run these in order. Each phase assumes the previous one is merged before starting the next.

### Phase 1 — Tokens, fonts, shell
```
Set up the new LabThread design system in this Vite + React + Tailwind project.

1. Add the color tokens and font families to tailwind.config.js exactly as specified
   (paper #FAF8F4, ink #14182B, thread #233E63, steel #7E8AA1, beige #EFE7D8;
   fonts Fraunces / Inter / IBM Plex Mono, loaded via Google Fonts in index.html).
2. Replace the page background with `bg-paper text-ink` globally.
3. Build the ThreadLine.jsx component: an SVG path running the full height of
   the page content, stroke in `thread` blue, slightly irregular/hand-drawn
   path (not a straight line), animated via stroke-dashoffset on scroll using
   IntersectionObserver or a scroll-progress hook. Add small circular
   "stitch-node" markers at fixed points we'll wire to each section in later
   phases. Respect prefers-reduced-motion (render static, fully drawn, no
   animation).
4. Build Logo.jsx with two exports: LogoMark (icon only) and LogoWordmark
   (icon + "LabThread" text), per the spec: single-stroke flask-with-thread
   icon at 1.5px stroke, Fraunces wordmark, running-stitch dash under
   "Thread" only.
5. Rebuild Nav with the new logo and Plex Mono uppercase nav links.

Do not touch Hero content or the doodle illustration in this phase.
```

### Phase 2 — Hero
```
Restyle the Hero section using the new tokens. Hard rule: do not change any
hero copy (headline, subhead paragraph, or the three credential bullets) and
do not replace the doodle illustration asset.

- Set the headline in Fraunces, 64px desktop / 38px mobile, ink color.
- Style "science" with the thread-blue color and the running-stitch
  underline device used in the logo (reuse the same SVG dash pattern).
- Restyle the credential bullets in IBM Plex Mono, uppercase, with small
  stitch-node dots instead of the current bullet dots.
- Add a page-load stagger: headline, subhead, bullets, doodle fade/slide in
  with ~80ms offsets. Respect prefers-reduced-motion.
- Anchor the first ThreadLine stitch-node at the edge of the doodle frame.
```

### Phase 3 — About the authors
```
Restyle the About the Authors section. Keep the existing content (both
author bios, photos, "notable experiences" cards) — only restyle.

- Replace the colored left-border card treatment with a thin steel top
  border.
- Role/title in Plex Mono uppercase, name in Fraunces.
- "Notable experiences" mini-cards: 3-up grid, beige fill, 8px radius.
- Add a ThreadLine stitch-node anchored at this section's heading.
```

### Phase 4 — Blog + Tips
```
Restyle "Latest from the blog" and "Quick email tips" sections, content
unchanged (pull from the existing JSON data files, do not alter the data
shape).

- Blog cards: drop the pastel icon-square, replace with a single-line ink
  icon with no fill, sitting above a thin steel rule. Tags become Plex Mono
  chips, beige fill, 4px radius. Dates in muted steel mono.
- Tip cards: thin steel border default, mono "PRINCIPLE" eyebrow, border
  shifts to thread blue on hover/expand.
- Add ThreadLine stitch-nodes at both section headings.
```

### Phase 5 — CTA, footer, polish pass
```
Finish the redesign.

- CTA band: invert the palette here only — ink background, paper headline,
  beige subhead text, button is paper-fill/ink-text. This should read as
  the one deliberately dark moment on the page.
- Footer: paper background, steel text, Plex Mono for build tag/copyright,
  LogoMark only (no wordmark) in the corner.
- Complete the ThreadLine so it runs continuously from the hero through the
  footer, terminating at a final stitch-node near the copyright line.
- Full responsive pass: 375px, 768px, 1440px. Verify hero copy and doodle
  are unchanged from the original. Verify keyboard focus states are visible
  on nav links, tag chips, and the CTA button. Verify reduced-motion users
  get a fully-drawn static thread line and no stagger animation.
```

---

## 7. QA checklist before calling it done

- Hero headline, subhead, and three credential bullets are byte-identical to the current copy.
- Doodle illustration is the same asset, not regenerated or swapped.
- Page background is `paper` (#FAF8F4) everywhere except the inverted CTA band — no cream field anywhere.
- Logo renders correctly at nav size, favicon size, and as a standalone mark.
- Thread line is visible and animates correctly on scroll, degrades gracefully under reduced-motion.
- Mobile (375px) layout checked for all six sections.
- Keyboard focus visible on every interactive element.