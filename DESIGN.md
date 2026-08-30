# DESIGN.md

This is the visual reference for Super Easy QR Code Generator. Styling decisions follow it, and when `styles.css` disagrees with it, the CSS is what gets fixed. To change a value, change it here first.

Where the values come from: the OTOworks landing site (otoworks.ai), specifically the tokens that are actually implemented in its `tailwind.config.ts` and `app/globals.css`. Rendered values were used, not the prose in its design docs, because the two differ in places.

What is borrowed: color, type, and shape tokens, plus the favicon and logo files. The site remains Nuung's personal open-source tool; brand name, copyright, and contact details do not change.

How it is implemented: there is no build step, so everything below maps to CSS custom properties in `styles.css :root`. The variable names are the contract.

---

## 1. Principles

1. Two colors carry the brand: Emerald for actions and emphasis, Slate for ink and neutrals. A third hue appears only in semantic warning and error states.
2. Backgrounds are flat. No gradients, textures, or images; just `#FFFFFF`, `#F8FAFC`, and `#F1F5F9`.
3. Large radii, soft shadows: 24px on cards, 12px on inputs and buttons, shadows in slate at 8% alpha spread wide.
4. Hierarchy comes from weight. Inter at 400, 600, 700, 800; letter-spacing 0; sizes from the scale in §3.
5. No dark mode. The footer is the only dark surface.
6. No emoji anywhere in the interface; icons are inline SVG.
7. Contrast first. Body and button text sit at 4.5:1 or better. `#26C07C` is decorative only; on white it measures 2.36:1.

---

## 2. Color

### 2.1 Emerald (primary)

| Step | HEX | Use |
|---|---|---|
| 50 | `#EEFCF6` | dropzone hover, chip background |
| 100 | `#D9F7EA` | active tab, selected state |
| 200 | `#B2F0D5` | progress indicators, label borders |
| 300 | `#7FE6B8` | reserved |
| 400 | `#48DB9A` | reserved |
| 500 | `#26C07C` | borders, icons, decoration, glow. Not text. |
| 600 | `#1B8757` | button background; link and emphasis text (4.52:1 on white) |
| 700 | `#156A45` | hover and active text (6.60:1 on white) |
| 800 | `#105336` | pressed state |
| 900 | `#0C3E28` | reserved |

### 2.2 Slate (neutral)

| Step | HEX | Use |
|---|---|---|
| 50 | `#F8FAFC` | secondary page background, hero |
| 100 | `#F1F5F9` | tertiary background, code and URL preview, table header |
| 200 | `#E2E8F0` | default border, slider track, dividers |
| 300 | `#CBD5E1` | stronger border, dropzone dashes, footer text |
| 400 | `#94A3B8` | placeholders and disabled controls only (2.56:1; not for readable text) |
| 500 | `#64748B` | secondary and help text on white or slate-50 only (4.76:1 on white, 4.34:1 on slate-100, which fails AA) |
| 700 | `#334155` | body text (10.35:1 on white) |
| 900 | `#0F172A` | headings, footer and toast background |

### 2.3 Semantic

| Name | HEX | Use |
|---|---|---|
| success | `#1B8757` | success text and icons |
| warning | `#B45309` | warning text |
| error | `#DC2626` | error text and borders |
| white | `#FFFFFF` | card and input background, button text |

### 2.4 The `:root` contract

```css
:root {
  /* brand */
  --primary-color: #1B8757;      /* emerald-600: button background, links, emphasis text */
  --primary-dark: #156A45;       /* emerald-700: hover, active */
  --primary-pressed: #105336;    /* emerald-800: pressed */
  --secondary-color: #26C07C;    /* emerald-500: borders, icons, decoration; not text */
  --accent-color: #26C07C;
  --emerald-50: #EEFCF6;
  --emerald-100: #D9F7EA;
  --emerald-200: #B2F0D5;
  /* semantic */
  --success-color: #1B8757;
  --warning-color: #B45309;
  --error-color: #DC2626;
  /* text */
  --text-dark: #0F172A;          /* slate-900 */
  --text-medium: #334155;        /* slate-700 */
  --text-light: #64748B;         /* slate-500: on white or slate-50 only */
  --text-muted: #94A3B8;         /* slate-400: placeholders only */
  --text-on-dark: #CBD5E1;       /* slate-300: body text and links on --bg-dark (12.02:1) */
  --divider-on-dark: rgba(255, 255, 255, 0.1); /* hairline on --bg-dark */
  /* surfaces */
  --bg-white: #FFFFFF;
  --bg-light: #F8FAFC;           /* slate-50 */
  --bg-tertiary: #F1F5F9;        /* slate-100 */
  --bg-dark: #0F172A;            /* footer, toast */
  --border-light: #E2E8F0;       /* slate-200 */
  --border-medium: #CBD5E1;      /* slate-300 */
  /* elevation */
  --shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
  --shadow-lg: 0 20px 50px rgba(15, 23, 42, 0.08);
  --shadow-emerald: 0 20px 50px rgba(38, 192, 124, 0.14);
  --focus-ring: 0 0 0 3px rgba(38, 192, 124, 0.35);
  /* shape */
  --radius-sm: 8px;
  --radius: 12px;                /* inputs, buttons, tab container */
  --radius-lg: 24px;             /* cards, panels */
  --radius-xl: 32px;
  --radius-full: 9999px;
  /* motion */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
  --easing: cubic-bezier(0.4, 0, 0.6, 1);
  --transition: all var(--duration-normal) var(--easing);
  /* type */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
  --text-label: 13px;
  --text-body-sm: 15px;
  --text-body: 17px;
  --text-body-lg: 19px;
  --text-title-sm: clamp(22px, 2.5vw, 24px);
  --text-title: clamp(24px, 3vw, 32px);
  --text-title-lg: clamp(28px, 4vw, 40px);
  --text-display: clamp(36px, 5vw, 60px);
}
```

Not allowed anywhere: `#667eea`, `#5a67d8`, `#764ba2` (the previous indigo/purple palette); `#6366f1` and `rgba(99,102,241,…)` (indigo leftovers that still sit in the OTOworks reference code and should not be copied); multi-color gradients; `backdrop-filter`; hex literals outside `:root`.

---

## 3. Type

Inter, self-hosted from `fonts/inter-{400,600,700,800}.woff2` through `@font-face` with `font-display: swap`; the 400 (body) and 800 (h1) weights are preloaded. No font CDN. The monospace stack is system fallback with no font file loaded. Letter-spacing is 0. Line heights: display 1.14, title 1.35, body 1.65, label 1.5.

| Role | Variable | Weight | Color |
|---|---|---|---|
| page title (h1) | `--text-display` | 800 | `--text-dark` |
| hero subtitle | `--text-body-lg` | 400 | `--text-medium` |
| section title (h2, content sections) | `--text-title` | 700 | `--text-dark` |
| panel heading (h2 inside a panel) | `--text-title-sm` | 700 | `--text-dark` |
| panel subheading (h3 inside a panel) | `--text-body-lg` | 600 | `--text-dark` |
| subheading (h3) | `--text-title-sm` | 600 | `--text-dark` |
| body | `--text-body` | 400 | `--text-medium` |
| form label | `--text-body-sm` | 600 | `--text-dark` |
| help text, caption | `--text-label` | 400 | `--text-light` (on white or slate-50) |
| URL preview, code | `--text-body-sm`, `--font-mono` | 400 | `--text-dark` |

---

## 4. Spacing and layout

Spacing steps are 4, 8, 12, 16, 24, 32, 48, 64, 96px. Inner padding is never larger than the space around the component. The container is 1200px wide at most, with 24px side padding (16px on mobile). Breakpoints: 1024, 768, 480 (max-width media queries); the tool area drops to one column at 1024 and below, and panel padding tightens at 768 and 480.

The site is three static pages that share one navbar (§5.16), one `<head>` recipe, and one footer:

| Page | File | Contents | Structured data |
|---|---|---|---|
| Generator | `index.html` | navbar, hero, the tool (`<main>`), a four-step "How it works" strip, footer | `WebApplication` + `Person` |
| Guide | `guide.html` | navbar, page header (h1 + one-line intro), How it works in full with logo tips, UTM parameters table, Error correction table, footer | `HowTo` |
| FAQ | `faq.html` | navbar, page header, About paragraph, FAQ list, footer | `FAQPage` |

Every page has its own `<title>`, description, canonical, and OG tags; the OG image is shared. The skip link, `<main id="main">`, footer, and CSP meta are identical on all pages.

Tool layout (`.main-container`): at 1024px and up, two columns — the form column (`1fr`) on the left and the preview column (`400px`) on the right, gap 32px, `align-items: start`. The preview panel is sticky (`top: 80px` to clear the 56px navbar, `max-height: calc(100vh - 104px)`, `overflow-y: auto`). Below 1024px the grid collapses to one column and the **preview comes first** (`order: -1`) and is no longer sticky, so the result and the download buttons are visible before the form.

The form column is not tabbed. It holds stacked section cards (§5.15), each fully expanded: 1) Link & tracking — URL, UTM fields, presets; 2) Logo — upload area and remove button; 3) Design — error correction, version, cell size, margin, colors, logo size. Download controls live in the preview panel (§5.10), not in the form.

Field grid inside a card: short fields sit in a two-column grid (`grid-template-columns: 1fr 1fr`, column gap 16px, row gap 24px); a long field such as the URL spans both columns (`grid-column: 1 / -1`). Below 640px every field is full width. Label to input gap 6px. Helper text is shown only where it prevents a mistake, never longer than one line; examples go into placeholders instead. Cards are separated by 24px.

Explanatory content on the Guide and FAQ pages: paragraphs, lists and FAQ items keep a reading measure of 720px (`max-width: 720px`); tables may use the full 1200px container. Vertical rhythm: 64px between sections on desktop, 48px below 768px; 16px between a table and the paragraph that follows it. Sections alternate flat backgrounds (white, then `--bg-light`) to give the page a rhythm without decoration.

The "How it works" strip on the Generator page is a `--bg-light` band with four equal cards in a row (one column below 768px): a 32px numbered circle (`--emerald-100` background, `--primary-dark` number at 600), a one-line title at `--text-body` 600, and one short sentence at `--text-body-sm` `--text-light`. It ends with a text link to the Guide page.

Page header (Guide, FAQ): h1 at `--text-title-lg` 800 `--text-dark`, one intro line at `--text-body-lg` `--text-medium`, 48px top and 32px bottom padding on `--bg-light` with a 1px `--border-light` bottom edge — the same surface as the hero, without the logo.

---

## 5. Components

### 5.1 Cards and panels (`.form-panel`, `.qr-panel`, `.format-card`)
White background, 1px `--border-light`, `--radius-lg`, `--shadow-lg`, 32px padding (20px on mobile). Only `.format-card` reacts to hover: `--shadow-emerald` and a `--secondary-color` border.

### 5.2 Buttons
Primary: `--primary-color` background, white text at 600, `--radius`, 48px tall, 24px side padding. Hover `--primary-dark`, pressed `--primary-pressed`, focus `--focus-ring`.
Secondary: white background, 1px `--border-medium`, `--text-dark` at 600. Hover: `--secondary-color` border and `--emerald-50` background.
Outline (Generate QR Code): white background, 1px `--primary-color` border, `--primary-color` text at 600; hover `--emerald-50` background with `--primary-dark`.
Danger (remove logo): secondary shape with `--error-color` text.
Compact preset buttons: secondary style, min-height 44px (touch target), padding 0 12px, `--text-label` at 600.
Disabled: opacity .5, `cursor: not-allowed`. Icons are 20px with an 8px gap.

### 5.3 Text inputs and selects (`.form-input`, `select`)
44px tall, 14px side padding, 1px `--border-medium`, `--radius`, white background, `--text-dark`. Focus: `--secondary-color` border plus `--focus-ring`; `outline: none` is fine only alongside the ring. Error: `--error-color` border and help text. Placeholder `--text-muted`.

### 5.4 Tabs
Not used. The tool shows every option group at once (see §5.15); tabs and accordions hide fields that most users must fill in.
### 5.5 Slider (`.range-input`)
Track 6px tall, `--radius-full`, `--border-light`; the filled part is `--primary-color` where it can be drawn without JS, otherwise a plain track is acceptable. Thumb: 18px circle, white, 2px `--primary-color` border, `--shadow`; hover darkens the border to `--primary-dark`. Focus ring on the thumb. Value readout: `--text-body-sm` at 600 in `--primary-dark`.

### 5.6 Color picker (`input[type=color]` wrapper)
44×44px wrapper, `--radius`, 1px `--border-medium`, 4px padding, white; inner swatch `--radius-sm`. Hover border `--secondary-color`. The hex value sits beside it in `--font-mono` at `--text-body-sm`.

### 5.7 Dropzone (`.upload-area`)
2px dashed `--border-medium`, `--radius-lg`, `--bg-light`, 32px padding, centered 24px icon (`fill: currentColor`) in `--text-light`, instruction in `--text-medium`, secondary line at `--text-label`. Hover and dragover: `--secondary-color` border, `--emerald-50` background, icon turns `--primary-color`. Keyboard focus shows `--focus-ring`. The uploaded preview gets `--radius` and a `--border-light` border.

### 5.8 Toast (`.success-message`)
Fixed bottom-right with 24px offsets, at least 280px wide, `--bg-dark`, white text at `--text-body-sm` 600, 4px left border in `--secondary-color`, `--radius`, `--shadow-lg`, 14px 18px padding. Enters with translateY(8px) to 0 and a fade over `--duration-normal`; gone after 3s. While hidden it also sets `visibility: hidden` so assistive tech and contrast checks ignore it. Under reduced motion it simply appears and disappears.

### 5.9 URL preview (`.url-preview`, `#currentUrl`)
`--bg-tertiary`, 1px `--border-light`, `--radius`, 12px 14px padding, `--font-mono`, text in `--text-dark`, `word-break: break-all`. The right padding is 40px to leave room for the glyph. Hover signals click-to-copy: `--secondary-color` border, pointer cursor, and a copy glyph (`⧉`, rendered by CSS so the JS-updated text is untouched) on the right in `--text-medium`.

### 5.10 Preview panel (`.qr-panel`, `#qrcode`, `.logo-overlay`, download controls)
Card per §5.1 with 24px padding. Contents, top to bottom: panel heading; the QR preview centered in a white box (`--radius`, 1px `--border-light`, 16px padding, canvas scaled to at most 280px wide so the download buttons stay above the fold); the URL preview (§5.9); a resolution `<select>` (§5.3) with a label; a full-width primary button "Download PNG" and a full-width secondary button "Download SVG" stacked with 8px gap; a tertiary text-style "Regenerate" control (transparent background, `--primary-color` text, 44px tall). Before anything is generated the preview box uses `--bg-tertiary`.
### 5.11 Tables (UTM parameters, error correction)
Full-width `<table>`. Header row: `--bg-tertiary` background, `--text-label` at 700, uppercase with 0.02em tracking, color `--text-medium` (slate-500 fails AA on slate-100). Rows divided by 1px `--border-light`; cells padded 12px 14px. The table keeps a minimum width of 560px so narrow viewports scroll it horizontally inside its container instead of crushing the columns; `<code>` cells do not wrap.

### 5.12 FAQ
Native `<details>`/`<summary>`. Summary: `--text-body` at 600 in `--text-dark`, chevron on the right that rotates when open. Body in `--text-medium`. Items separated by 1px `--border-light`.

### 5.13 Hero
Flat `--bg-light` with a 1px `--border-light` bottom edge, since the body background is white and the hero would otherwise have no visible boundary. A 64px logo mark (`.hero-logo`, `--radius`, no border, `width`/`height` attributes set) placed inside the h1 before its text, then the subtitle. Explanatory sections below the tool are full-width prose (`.content-section`, no card chrome). The logo is decorative: `alt=""` and `aria-hidden="true"`.

### 5.15 Tool section cards (`.tool-section`)
Each option group is a card per §5.1 (white, 1px `--border-light`, `--radius-lg`, `--shadow-lg`, 24px padding; 20px below 768px). Header: a 20px icon in `--primary-color` (`aria-hidden`), an h2 at `--text-title-sm` 700 `--text-dark`, and an optional one-line description at `--text-body-sm` `--text-light`; 16px between header and fields. No underline rule under the header. Cards stack with 24px gaps. Preset chips are a wrapped row (8px gaps) with the "Clear all" action as a text button pushed to the right (`margin-left: auto`, `--error-color` text, no border).

### 5.16 Navbar (`.site-nav`)
A slim, sticky top bar on every page: 56px tall, `--bg-white`, 1px `--border-light` bottom edge, `position: sticky; top: 0; z-index: 50`. Inside a 1200px container with 24px side padding (16px on mobile): left, the 28px logo mark (`logo.webp`, decorative) followed by the wordmark "QR Generator" at `--text-body` 700 `--text-dark`, linking to `index.html` (the link carries `aria-label="QR Generator home"` because the wordmark is hidden on small screens); center/right, three links — Generator, Guide, FAQ — at `--text-body-sm` 600 `--text-medium`, 44px tall, 12px side padding; the current page's link is `--primary-dark` with a 2px `--primary-color` underline (`border-bottom`), and also carries `aria-current="page"`; far right, a "GitHub" link with a 16px icon, same style as the others. Hover: `--text-dark`. Focus: `--focus-ring`. Below 480px the wordmark text is hidden (the mark stays) so the three links and GitHub fit on one line; there is no hamburger menu. The sticky preview panel on the Generator page uses `top: 80px` (56px nav + 24px) so it never slides under the bar.

### 5.14 Footer
`--bg-dark` background; headings white at 700; body text and links `--text-on-dark` (12.02:1); link hover `--secondary-color` (`--primary-color` on the dark surface is 3.95:1 and fails AA; `--secondary-color` measures 7.58:1). Three columns, one on mobile, 64px top padding, copyright row above a 1px `--divider-on-dark` line.

---

## 6. Motion

Animate `transform`, `opacity`, `background-color`, `border-color`, and `box-shadow` only. The default is `--transition` at 250ms; hover feedback uses `--duration-fast`, toast and section entrances use `--duration-normal`. Under `prefers-reduced-motion: reduce` all transitions and animations are removed. No JavaScript animation library.

---

## 7. Assets

| File (repo root) | Spec | Source |
|---|---|---|
| `favicon.ico` | 16 and 32px | OTOworks landing `public/favicon.ico` |
| `favicon-16x16.png`, `favicon-32x32.png` | 16², 32² | same filenames |
| `apple-touch-icon.png` | 180² | same filename |
| `android-chrome-192x192.png`, `android-chrome-512x512.png` | 192², 512² | same filenames |
| `logo.webp` | 128² or smaller, transparent | the square "O" mark from `public/android-chrome-512x512.png`, white background removed and resized; the hero slot is 64px. The wordmark (`public/images/otoworks_logo_transparent.webp`) is not used: it is unreadable at 64px |
| `fonts/inter-400.woff2` … `inter-800.woff2` | latin subset, OFL license file alongside | official Inter release |
| `og-image.png` | 1200×630 PNG, 200KB or less | made with these tokens: title, one-line description, a QR mark |
| `pre-view.png` | any | README screenshot; not the OG image |

Favicon and manifest `<link>` tags use relative paths (`favicon-32x32.png`, `site.webmanifest`), which resolve under `/qrcode-gen/`. `site.webmanifest` sets `theme_color` to `#1B8757`; the reference's `#6366f1` is not carried over. The logo appears once, in the hero; beyond the favicon and footer there is no other brand exposure.

---

## 8. Contrast and accessibility

Measured pairings (WCAG 2.1, AA needs 4.5:1 for text):

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `--text-dark` #0F172A | `--bg-light` #F8FAFC | 17.06 | ok |
| `--text-medium` #334155 | white | 10.35 | ok |
| `--text-light` #64748B | white | 4.76 | ok |
| `--text-light` #64748B | `--bg-tertiary` #F1F5F9 | 4.34 | fails; use `--text-medium` there |
| `--primary-color` #1B8757 | white | 4.52 | ok, button text and links |
| `--primary-color` #1B8757 | `--bg-light` #F8FAFC | 4.31 | fails; all in-content text links use `--primary-dark` (6.3 on slate-50, 6.6 on white) |
| `--primary-dark` #156A45 | `--emerald-100` #D9F7EA | 5.80 | ok, active tab |
| `--text-on-dark` #CBD5E1 | `--bg-dark` #0F172A | 12.02 | ok, footer |
| `--secondary-color` #26C07C | `--bg-dark` #0F172A | 7.58 | ok, footer link hover |
| `--primary-color` #1B8757 | `--bg-dark` #0F172A | 3.95 | fails AA for text; footer links use `--secondary-color` (7.58) on hover, not this |
| `--text-muted` #94A3B8 | white | 2.56 | placeholders and disabled only |
| `--secondary-color` #26C07C | white | 2.36 | decoration only |

Other rules: touch targets are at least 44×44px; icon-only buttons carry `aria-label`; focus rings stay visible; state is never shown by color alone (an active tab changes background and weight, an error changes border and text); decorative images use `alt=""` and inline SVG icons use `aria-hidden="true"`.

---

## 9. Changing something

1. Edit this document.
2. Make `styles.css :root` match §2.4.
3. Update the affected components per §5.
4. Check 375, 768, and 1280px, and confirm `grep -ciE "667eea|5a67d8|764ba2|6366f1" styles.css index.html` prints 0.
