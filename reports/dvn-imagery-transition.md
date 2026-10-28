# Data Volunteer Network imagery transition

Checklist for replacing the Sgaffald / Cyber Scallywags imagery with Data Volunteer Network (DVN)
branding. Work top to bottom: the decisions in phase 0 change what later phases produce.

Source artwork today: `../DataVolunteerNetwork/assets/imgs/` (separate repo).

## Phase 0: Decisions

- [ ] Choose the docs theme direction: keep dark-first ("Scallywag Neon") with DVN accents, or
      move to a light theme that matches the DVN artwork
- [ ] Pick one banner: `Data Volunteer Network Banner.png` (identical to `Banner-1.png`) or
      `Data Volunteer Network_ Connecting Communities-2.png`
- [ ] Confirm we may use the DataKind UK logo, and how (it is baked into the banner and emblem)
- [x] Decide whether the CSW crest stays: **yes, as a partner credit on every surface**
      (docs portal, manual, About, README, web UI, admin, mobile). The DVN emblem and mark lead;
      the crest sits alongside as "in partnership with Cyber Scallywags"
- [x] Decide whether the CSW wolf-head mark stays: **yes, as the small-size partner credit**
      (footers, sidebars, app headers) where the full crest would be too tall to read
- [ ] Decide whether the project identity is renamed as part of this work (`project.toml` name,
      slug, description, repository, mobile `app_id`) or tracked separately
- [ ] Agree the DVN palette hex values (navy, teal, orange), sampled from the artwork

## Phase 1: Prepare source artwork

- [ ] Request or create a text-free DVN mark (figures and bar-chart compass), ideally SVG,
      for favicons and nav logos
- [ ] Request a transparent-background version of the emblem (current PNGs have no alpha)
- [ ] Create `brand/` in this repo with kebab-case masters: `emblem.png`, `banner.png`,
      `mark.svg`
- [ ] Write alt text for each master (the artwork has baked-in text, so screen readers rely on it)

## Phase 2: Generate variants

- [ ] Add Pillow as a dev dependency
- [ ] Add `scripts/build_images.py`, run by `uv run task sync`, that writes role-named files to
      `docs/content/assets/images/` and `mobile/src/assets/icon/`:
  - [ ] `brand-emblem-256.webp`, `brand-emblem-512.webp`, `brand-emblem-512.png`
  - [ ] `brand-banner-1280.webp`, `brand-banner-2560.webp`
  - [ ] `brand-mark-64.png`, `brand-mark-128.png`
  - [ ] `favicon-32.png`, `apple-touch-icon-180.png`, `icon-512.png`
  - [ ] `og-image-1200x630.png` (social preview)
- [ ] Keep the existing `csw-crest-*` and `csw-mark-*` files as the partner-credit set: crest
      for large placements, wolf-head mark for small ones; add WebP versions of
      `csw-mark-64/128`
- [ ] Add a unit test in `tests/unit/test_sync.py` that the script produces every expected file

## Phase 3: Swap references

- [ ] README hero: [README.md:3](../README.md) → `brand-banner-*.webp`; update the
      images note at [README.md:153-155](../README.md)
- [ ] Docs portal hero: [docs/content/index.md:24-29](../docs/content/index.md): `srcset`, `src`,
      `width`/`height` (emblem is square, the crest was 512×738) and alt text
- [ ] Docs portal kicker: [docs/content/index.md:12](../docs/content/index.md)
      ("Cyber Scallywags · Docs portal")
- [ ] About page: [docs/content/about.md:3](../docs/content/about.md): DVN emblem as the lead
      image; keep the CSW crest as the partner credit and reword its alt text accordingly
- [ ] Manual home: [docs/content/manual.md:3-5](../docs/content/manual.md): DVN emblem; move the
      CSW crest to a partner-credit position
- [ ] Partner-credit block (CSW crest + "in partnership with Cyber Scallywags", linked to
      cyberscallywags.com): add to the docs portal hero or footer and the Sphinx manual footer,
      as one shared snippet/style in `scallywag.css`
- [ ] README: add the partner-credit line with the CSW crest under the DVN banner
- [ ] Zensical logo and favicon: [docs/zensical.toml:59-60](../docs/zensical.toml)
- [ ] Sphinx logo and favicon: [docs/sphinx/conf.py:61-62](../docs/sphinx/conf.py)
- [ ] Docs writing guide example: [docs/content/services/docs.md:51](../docs/content/services/docs.md)
- [ ] Mobile favicon: [mobile/src/index.html:15](../mobile/src/index.html); add an
      `apple-touch-icon` link
- [ ] Add Open Graph / Twitter card `og:image` meta to the docs portal

## Phase 4: Colours and theme

- [ ] Set DVN colours in [src/sgaffald/content/site.json:6-10](../src/sgaffald/content/site.json),
      then run `uv run task sync` (regenerates `mobile/src/theme/_brand.scss`)
- [ ] Rework [scallywag.css:1-23](../docs/content/assets/stylesheets/scallywag.css) tokens per the
      phase 0 theme decision; rename `--csw-*` to `--brand-*`
- [ ] Generate those tokens from `site.json` in `scripts/sync_meta.py`, as `_brand.scss` already is
- [ ] Update [zensical.css](../docs/content/assets/stylesheets/zensical.css) and
      [furo.css](../docs/sphinx/_static/furo.css) for the renamed tokens and new palette
- [ ] Revisit [dark-first.js](../docs/sphinx/_static/dark-first.js) if moving to light-first
- [ ] Rename `.csw-hero`, `.csw-crest`, `.csw-kicker` classes to `brand-*` across CSS and Markdown
- [ ] Check WCAG AA contrast for text on the new colours in both light and dark schemes

## Phase 5: Show the brand in the apps

- [ ] Admin (Streamlit): set `page_icon` and `st.logo` from the DVN mark in
      [src/sgaffald/admin/app.py](../src/sgaffald/admin/app.py)
- [ ] Web UI (FastUI): add the mark to the page header/navbar in
      [src/sgaffald/ui/main.py](../src/sgaffald/ui/main.py)
- [ ] Mobile welcome hero: add the emblem to
      [content.page.html](../mobile/src/app/pages/content/content.page.html)
- [ ] Add the CSW partner credit to the admin sidebar, the web UI footer and the mobile
      welcome page (or menu footer): wolf-head mark at small sizes, crest where there is room
- [ ] If native builds are planned: generate icons and splash screens with `@capacitor/assets`
      from `brand/`

## Phase 6: Clean up

- [ ] Keep `csw-crest-256.webp`, `csw-crest-512.png`, `csw-crest-512.webp`, `csw-mark-64.png`,
      `csw-mark-128.png` (partner credit)
- [ ] Delete the CSW favicon `favicon.png` once the DVN favicon replaces it
- [ ] Delete unused files: `sgaffald-hero.svg`, `sgaffald-hero.webp`, `sgaffald-logo.svg`,
      `sgaffald-logo-512.png`, `mobile/src/assets/shapes.svg`
- [ ] Grep for leftovers: `sgaffald-`, `Scallywag Neon`; check every remaining `crest` and
      `csw-mark` reference is a partner credit, not the primary logo (in particular the
      `zensical.toml` and `conf.py` logo settings must point at the DVN mark)

## Phase 7: Tests and verification

- [ ] Update [tests/integration/test_stack.py:95,99](../tests/integration/test_stack.py) to assert
      the DVN emblem loads, and keep a check that the CSW crest partner credit is served
- [ ] Update [tests/e2e/test_docs_site.py:43-50](../tests/e2e/test_docs_site.py): the hero now
      shows the DVN emblem; add a check that the CSW partner credit is visible; adjust the theme
      expectation
- [ ] Update [mobile content.page.spec.ts](../mobile/src/app/pages/content/content.page.spec.ts)
      if the hero gains an image
- [ ] Run unit, integration, e2e and mobile tests
- [ ] Visual check of docs portal, manual, web UI, admin and mobile at phone and desktop widths,
      light and dark
- [ ] Check page weight: hero image under ~200 KB
- [ ] Update [docs/content/guides/make-it-yours.md](../docs/content/guides/make-it-yours.md) to
      describe the `brand/` folder and generation step
