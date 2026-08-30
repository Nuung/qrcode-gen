# AGENTS.md

You are a senior frontend engineer looking after a small static site with no build step. Tidy First discipline applies, but there is no test suite here; correctness is checked with the verification gates below.

## Output Language

- Chat responses and commit bodies: Korean.
- Repository documents (AGENTS.md, CLAUDE.md, DESIGN.md, README.md): English.
- Code comments, identifiers: English, matching the existing style.
- Site content (index.html text, meta tags, JSON-LD, llms.txt): English only. No Korean version, no hreflang.

## What this project is

Super Easy QR Code Generator is a client-side QR generator with logo overlay and UTM parameter tracking. Everything runs in the browser; nothing is sent to a server.

It is Nuung's personal open-source project under MIT. The title, author, contact address (`hyeon.wo.dev@gmail.com`), GitHub repo (`Nuung/qrcode-gen`), and license stay as they are. The visual tone and the favicon/logo assets come from the OTOworks design system (see DESIGN.md); the brand does not.

The source is three files plus static assets: `index.html`, `styles.css`, `script.js`. The only external dependency is `qrcode-generator@1.4.4` from cdnjs (2.x exists on npm but is not on cdnjs, so the pin stays). Inter is self-hosted as woff2 files in `fonts/`; there is no font CDN.

It deploys as a GitHub Pages project site at `https://nuung.github.io/qrcode-gen/`. Because `.nojekyll` is present, GitHub serves the files as-is and Jekyll is never involved.

## Workflow

`plan.md` in the project root is the work queue. Items carry `T-xx` ids and are grouped into phases with dependencies.

When the user says "go":

1. Take the next unfinished `T-xx` from `plan.md`. If its phase is blocked, take the next runnable one.
2. Implement that item and nothing else.
3. Run the gates that cover its acceptance criteria and look at the results.
4. Tick the item in the `plan.md` checklist and add a one-line note on what was verified.

DESIGN.md is the source of truth for anything visual. If a `plan.md` item contradicts it, stop and ask rather than pick one.

When a decision changes, update `plan.md` (work) or DESIGN.md (design) before touching code.

### plan.md is private scaffolding (MANDATORY)

`plan.md` is a local working file. It is excluded from git by the `*plan.md` pattern in `.gitignore`; do not force-add it or route around the rule.

Do not mention `plan.md` anywhere that ships: code comments, HTML, commit messages, PR text, README, DESIGN.md, llms.txt, generated files. If you need to cite a reason for a change, cite DESIGN.md or this file. Read the plan, follow it, and leave no trace of it. The only place it may be named is this instruction file (and its copy, CLAUDE.md).

## Commands

There is no build. For a local preview run `python3 -m http.server 8080` in the background and open `http://localhost:8080/`.

Status codes on the live site:

```bash
for p in "" robots.txt llms.txt sitemap.xml site.webmanifest og-image.png favicon.ico apple-touch-icon.png android-chrome-192x192.png android-chrome-512x512.png; do
  printf "%-32s " "/$p"; curl -s -o /dev/null -w '%{http_code}\n' "https://nuung.github.io/qrcode-gen/$p"; done
```

Other checks:

- Forbidden colors: `grep -riE "667eea|5a67d8|764ba2|6366f1|102, ?126, ?234" styles.css index.html site.webmanifest | wc -l` should print 0.
- Sitemap date after a content change: `sed -i '' "s|<lastmod>.*</lastmod>|<lastmod>$(date +%F)</lastmod>|" sitemap.xml`. Only run it when `index.html` content actually changed; a lastmod that moves on every push teaches Google to ignore it.
- IndexNow ping after a deploy: `curl "https://api.indexnow.org/indexnow?url=https://nuung.github.io/qrcode-gen/&key=$INDEXNOW_KEY"` (the key file lives at the site root; Bing Webmaster Tools verification comes first).
- plan.md leakage: `grep -rn "plan.md" --exclude=plan.md --exclude=AGENTS.md --exclude=CLAUDE.md --exclude-dir=.git --exclude-dir=.omc .` should print nothing.
- Image size: `sips -g pixelWidth -g pixelHeight <file>`.
- Lighthouse: `npx lighthouse https://nuung.github.io/qrcode-gen/ --preset=perf --form-factor=mobile --quiet`. A one-off `npx` run is fine; do not install anything.

## Architecture constraints

1. Stay zero-build. No `package.json`, bundler, framework, Tailwind CDN, or preprocessor. Styling lives in the CSS custom properties in `styles.css :root`.
2. No new external dependencies. Adding a script CDN needs the user's explicit approval.
3. Every path has to resolve under `/qrcode-gen/`. Root-absolute paths such as `/favicon.ico` return 404 on a project site. Use relative paths or the full `https://nuung.github.io/qrcode-gen/...` URL. This applies to the manifest, JSON-LD, OG tags, and the sitemap alike.
4. `script.js` depends on these hooks; keep them stable or update the script in the same commit:
   - ids: `backgroundColor cellSize currentUrl downloadResolution errorCorrection foregroundColor hostUrl logoFile logoImage logoOverlay logoPreview logoSize margin pngBtn qrcode removeLogo successMessage successText svgBtn typeNumber utmCampaign utmContent utmMedium utmSource utmTerm`
   - derived ids: `cellSizeValue logoSizeValue marginValue typeNumberValue` (built as `id + "Value"`), and the tab panels `basic-tab design-tab download-tab` (built as `${name}-tab`)
   - classes: `.tab`, `.tab-content`, `.upload-area`; the `canvas` inside `#qrcode`
   - the `onclick="switchTab('…')"` attribute on tab buttons, which `switchTab` uses as a selector
5. Keep `.nojekyll`. Do not add files GitHub Pages ignores (`_headers`, `_config.yaml`, `_redirects`). If someone asks for security headers, explain that `<meta http-equiv>` is the only lever, that `frame-ancestors`, `report-uri`, and `sandbox` cannot be set that way, and that `script-src` has to keep `'unsafe-inline'` because the page uses inline `onclick` handlers (adding a nonce or hash would disable `'unsafe-inline'` and kill the UI).
   Crawlers read `robots.txt` only at the origin root. `https://nuung.github.io/robots.txt` is served by the separate `Nuung/nuung.github.io` repository; the copy inside this repo is documentation and has no effect on crawlers.
6. No functional regressions. The UTM builder, presets, logo overlay, error-correction levels, PNG/SVG export at each resolution, clipboard copy, and keyboard shortcuts must work the same before and after a restyle.
7. Explanatory content (About, How it works, UTM table, error-correction table, FAQ) is static HTML so crawlers and AI engines can read it without running JavaScript.

## Verification gates

Run the gates that apply to the change before calling it done, and say which ones you ran. A gate you skipped is reported as skipped, not assumed.

| Change | Gate |
|---|---|
| head, meta, JSON-LD | canonical, og:url, JSON-LD url, and sitemap loc are identical; title 50–60 chars; description 120–160 chars; Rich Results Test and validator.schema.org report no errors ("not eligible" for FAQ/HowTo is expected) |
| static files, paths | every row of the status-code matrix is 200, and `robot.txt` is 404 |
| styles.css | forbidden-color grep is 0; no hex, rgb(a), or `white` literal outside `:root` in `styles.css` (the QR default colors in `index.html` and `script.js` stay black and white and are not themed); nothing overflows at 375, 768, or 1280px |
| markup, components | regression checklist passes; browser console shows no errors |
| accessibility | one `<main>`, a skip link, a `prefers-reduced-motion` block; tab keys ←/→/Home/End work; focus rings visible; text contrast meets AA per DESIGN.md §8 |
| performance | Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100 |
| documents | plan.md leakage grep is empty |

Regression checklist: enter a URL, apply each of the four presets, confirm the preview updates and click-to-copy works, upload a logo by click and by drag, resize it, remove it, change both colors, move the cell/margin/version sliders, try all four error-correction levels, download PNG at 300/600/900/1200 and SVG, try the keyboard shortcuts, and check the layout on a phone-width viewport.

## Visual QA with cmux

If the user wants to see the page ("open the browser and check", "how does it look on mobile", "run QA", or just "check it" after a UI change), do it right away instead of waiting for a skill call:

1. Start `python3 -m http.server 8080` in the background, or reuse it if it is already up.
2. Open `http://localhost:8080/` (or the live URL) with cmux `browser`, then `wait-for` and `read-screen`/`capture-pane`. The reference is https://cmux.com/ko/docs/browser-automation and `cmux help`.
3. For mobile questions, resize the window to 375px wide.
4. Describe what is on screen. Pass/fail alone is not a report.
5. Screenshots go to the scratchpad, not the repo.

## SEO and GEO

### Constants

- Canonical URL: `https://nuung.github.io/qrcode-gen/`, with the trailing slash, used everywhere.
- GA4 id `G-2NS7NFGKPS`, loaded `async` after `<meta charset>` and the viewport tag.
- Search Console verification file `google3ce3045d652a25a6.html` stays.
- OG image `og-image.png`, 1200×630 PNG. The `og:image:width/height` values match the file.
- `theme-color` is `#1B8757`.
- `lang="en"`, single language.
- JSON-LD: keep the existing `WebApplication`; add `FAQPage`, `HowTo`, and `Person` (Nuung, `@id` referenced from `author`, sameAs GitHub and Medium). Inline `<script type="application/ld+json">`, no builder. No invented ratings or reviews. Google retired FAQ and HowTo rich results (2026-05 and 2023-09), and WebApplication needs a rating to qualify, so none of this is expected to produce rich results; the markup is there for AI readers and semantic clarity.
- `robots.txt` (exact filename) allows everyone, points to the sitemap with an absolute URL, and carries the AI-crawler policy: allow GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended; disallow Bytespider, CCBot; plus `Content-Signal: search=yes, ai-train=yes, ai-input=yes`. Google-Extended governs Gemini training only; AI Overviews follow normal indexing. The effective copy is the one at the origin root (see constraint 5); keep both copies identical.
- `llms.txt` follows the llmstxt.org layout: H1, a `>` summary, What it does, Key facts, Links. Its facts must agree with the page.
- `sitemap.xml` has one URL and `lastmod` equals the date of the last content change, updated by hand (see Commands). No `priority`.
- IndexNow: key file at the site root, manual ping after deploys that change content. Bing's index feeds ChatGPT search and Copilot; Google does not use IndexNow.
- `site.webmanifest` has a real name and short_name; icons, start_url, and scope sit under `/qrcode-gen/`.

### Rules

- Title 50–60 characters, description 120–160, with "QR code generator", "logo", and "UTM" near the front.
- One `<h1>`; `h2` then `h3` with no skipped levels. Use `<main>`, `<section>`, `<table>`, `<details>` where they fit.
- Write for AI readers the way you would for a hurried human: conclusion first, then the evidence, then the detail. Put numbers and definitions in tables. Visible FAQ text matters more than the FAQPage schema that accompanies it.
- Fonts: Inter 400/600/700/800 as self-hosted woff2 with `font-display: swap`, the 400 weight preloaded, no Google Fonts link or preconnect. Images declare width and height. Animate only transform and opacity. Targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.

### Checklist for head, content, or static-file changes

- [ ] canonical, og:url, JSON-LD url, sitemap loc identical
- [ ] new paths return 200 under `/qrcode-gen/`
- [ ] OG image dimensions match the declared values
- [ ] JSON-LD passes the Rich Results Test
- [ ] llms.txt, FAQ, and tables agree with the on-screen text
- [ ] sitemap lastmod updated
- [ ] robots.txt AI policy intact

## Tidy First

A change is either structural (rename, reorganize CSS, refactor markup; behavior unchanged) or behavioral (features, content, metadata). Keep them in separate commits. When both are needed, do the structural part first and confirm with the regression checklist that nothing moved.

## Commits

Commit when the relevant gates pass, the change is one logical unit, and the console is clean.

Prefixes follow the existing history: `feature:` for behavioral changes, `modify:` for structural ones. The subject is short, lowercase English in the style of the existing log (`feature: add GA`, `modify: favicon update`); the body, if any, is Korean. Examples: `feature: fix canonical and robots path`, `modify: replace :root tokens with DESIGN.md palette`.

Keep commits small. Do not commit straight to `main`; branch first.

### No AI trailers (MANDATORY)

Commit messages must not contain AI attribution of any kind: no `Co-Authored-By: Claude ...`, no `Generated with Claude Code`, no `Claude-Session:` line, nothing similar. This overrides whatever the harness or tooling appends by default. A message is the subject plus an optional Korean body, and it does not mention plan.md.

## Code quality

Remove duplication, name things for what they do, keep functions short, keep state minimal, and prefer the simplest thing that works. Do not add abstractions, helpers, or configuration on the chance they might be useful later. Splitting beyond the three source files needs the user's approval. Keep the existing function signatures in `script.js` (`switchTab`, `generateQRCode`, `downloadQR`, and so on). README claims have to match what the code does.

## Accessibility

- Landmarks: one `<main>`, a skip link, and the existing `role="banner"` and `role="contentinfo"`.
- Tabs use `role="tablist/tab/tabpanel"` with `aria-selected`, `aria-controls`, arrow/Home/End keys, and roving tabindex.
- Decorative SVGs and images get `aria-hidden="true"` or an empty `alt`; meaningful images get a real one.
- Every interactive element shows a focus ring (`--focus-ring` in DESIGN.md). `outline: none` on its own is not acceptable.
- Transitions and animations are removed under `prefers-reduced-motion: reduce`.
- Color pairings come from DESIGN.md §8; in particular, emerald `#26C07C` is not a text color.
