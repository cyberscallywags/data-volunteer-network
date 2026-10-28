# Data Volunteer Network imagery transition

Checklist for replacing the Sgaffald / Cyber Scallywags imagery with Data Volunteer Network (DVN)
branding. Work top to bottom: the decisions in phase 0 change what later phases produce.

Done on branch `4-refactor-to-reflect-the-data-volunteer-network`, one commit per phase (see
`git log`). Items still open are unticked and marked **Open**.

Source artwork: `cyberscallywags/DataVolunteerNetwork`, `assets/imgs/`, now copied into `brand/`.

## Phase 0: Decisions

- [x] Docs theme direction: **light-first** with the DVN palette; dark mode re-tinted to DVN
      colours and still available through the toggle
- [x] Banner: `Data Volunteer Network Banner.png` (`Banner-1.png` is a byte-identical copy)
- [ ] **Open:** confirm we may use the DataKind UK logo, and how (it is baked into the banner
      and emblem)
- [x] Decide whether the CSW crest stays: **yes, as a partner credit on every surface**
      (docs portal, manual, About, README, web UI, admin, mobile). The DVN emblem and mark lead;
      the crest sits alongside as "in partnership with Cyber Scallywags"
- [x] Decide whether the CSW wolf-head mark stays: **yes, as the small-size partner credit**
      (footers, sidebars, app headers) where the full crest would be too tall to read
- [x] Project identity: **full rename**, including the Python package
      (`sgaffald` → `data_volunteer_network`), slug, repository and mobile `app_id`
- [x] DVN palette, sampled from the emblem: navy `#012545`, teal `#007986`, orange `#fe6136`

## Phase 1: Prepare source artwork

- [ ] **Open:** a text-free DVN mark (figures and bar-chart compass), ideally SVG.
      `brand/mark.png` is a placeholder cropped from the emblem; the spec is in `brand/README.md`
- [ ] **Open:** a transparent-background emblem. Until then `scripts/build_images.py` cuts the
      emblem to its circle
- [x] `brand/` created with `emblem.webp`, `banner.webp` and `mark.png` (WebP masters keep
      them under the 500 KB pre-commit limit)
- [x] Alt text written for the emblem, banner and partner marks

## Phase 2: Generate variants

- [x] Pillow added to the dev group
- [x] `scripts/build_images.py`, run by `uv run task images` (a separate task from `sync`,
      because image encoding is not byte-stable across Pillow versions):
  - [x] `brand-emblem-256.webp`, `brand-emblem-512.webp`, `brand-emblem-512.png`
  - [x] `brand-banner-960.webp`, `brand-banner-1920.webp` (the master is 1983 px wide, so no
        2560)
  - [x] `brand-mark-64.png`, `brand-mark-128.png`
  - [x] `brand-favicon-32.png`, `brand-apple-touch-icon-180.png`, mobile `icon-512.png`
  - [x] `brand-og-1200x630.jpg` (JPEG: the PNG was 724 KB)
  - [x] App copies in `src/data_volunteer_network/static/` and `mobile/src/assets/brand/`
- [x] Keep the existing `csw-crest-*` and `csw-mark-*` files as the partner-credit set
- [ ] Skipped: WebP versions of `csw-mark-64/128` (7 KB and 21 KB PNGs; little to gain)
- [x] `tests/unit/test_images.py`: every output exists, matches its named size, and the
      emblem's corners are transparent

## Phase 3: Swap references

- [x] README hero → `brand-banner-1920.webp`, partner credit line, "Replace images" step
- [x] Docs portal hero: emblem `srcset`, 512×512, alt text, kicker and `h1`
- [x] About page: the page is about Cyber Scallywags, so the crest stays its lead image as the
      partner credit; it now notes the DVN partnership ("Built on Sgaffald" section)
- [x] Manual home: DVN emblem, CSW wolf-head credit below the intro
- [x] Partner-credit block (`.brand-credit`) on the portal hero and manual home
- [x] Zensical logo and favicon; Sphinx logo and favicon
- [x] Docs writing guide example
- [x] Mobile favicon regenerated in place; `apple-touch-icon` link added
- [x] `og:image` / Twitter card / apple-touch-icon on every portal page
      (`docs/overrides/main.html`)
- [ ] **Open:** set `site_url` in `docs/zensical.toml` once the docs have a public address, so
      `og:image` is an absolute URL

## Phase 4: Colours and theme

- [x] DVN colours and tagline in `site.json`, then `uv run task sync`
- [x] `scallywag.css` → `brand.css`; `--csw-*` → `--brand-*`
- [ ] **Open:** generate the `brand.css` colour tokens from `site.json` in
      `scripts/sync_meta.py`, as `_brand.scss` already is. They are hand-set to the same values
      today
- [x] `zensical.css` and `furo.css` rewritten for the new tokens
- [x] `dark-first.js` → `light-first.js`; Zensical lists the light scheme first
- [x] `.csw-hero`/`.csw-crest`/`.csw-kicker` → `.brand-hero`/`.brand-emblem`/`.brand-kicker`
- [x] WCAG AA checked: teal on white 5.2:1, white on teal 5.2:1, orange-ink `#c2410c` 5.2:1,
      bright teal on night 8.4:1. Plain orange (3:1) is used only for rules and accents

## Phase 5: Show the brand in the apps

- [x] Admin (Streamlit): `page_icon`, `st.logo` and a sidebar partner credit
- [x] Web UI (FastUI): `/static` mount, favicon, mark on the welcome page, credit on every page
- [x] Mobile: emblem in the welcome hero; credit on welcome and About
- [x] `collective_url` set, so mobile About shows "Visit Cyber Scallywags"
- [ ] Not applicable yet: Capacitor native icons and splash screens (no `android/` or `ios/`
      projects). When added, run `@capacitor/assets` from `brand/`

## Phase 6: Clean up

- [x] Kept the partner credits `csw-crest-256.webp`, `csw-crest-512.png`, `csw-crest-512.webp`,
      `csw-mark-64.png` and `csw-mark-128.png`
- [x] Deleted `favicon.png`, `sgaffald-hero.svg`, `sgaffald-hero.webp`, `sgaffald-logo.svg`,
      `sgaffald-logo-512.png` and `mobile/src/assets/shapes.svg`
- [x] Grepped for leftovers. The remaining `sgaffald` mentions are the README's
      template-origin instructions and the upstream repository name, both intentional

## Phase 7: Tests and verification

- [x] Integration test checks the emblem, `og:image`, the credit and that the crest is served
- [x] Docs e2e test: light-first background, emblem hero (WebP), credit, new `h1` anchor
- [x] Mobile spec: emblem and partner credit
- [x] Ran: Python lint and unit tests, mobile lint and unit tests, the strict docs build, and
      the docs e2e suite against a local build
- [ ] **Open:** run `uv run task verify` (Docker stack: integration, full browser and load
      tests); not run on this branch yet
- [x] Visual check: docs portal (light, dark, phone), manual, and the mobile welcome page
- [ ] **Open:** visual check of the web UI and admin against a running stack
- [x] Page weight: portal hero emblem 68 KB (WebP 512), README banner 218 KB
- [x] Updated `make-it-yours.md` and `services/docs.md` for `brand/` and `task images`
