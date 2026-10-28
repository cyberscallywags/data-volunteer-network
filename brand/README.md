# Brand masters

The source artwork every generated image is made from. Edit or replace a file here, then run
`uv run task images` to regenerate the sizes in `docs/content/assets/images/` and
`mobile/src/assets/icon/`. Never edit the generated files by hand.

| File | What it is | Used for |
|---|---|---|
| `emblem.webp` | Data Volunteer Network community emblem, 1254×1254 | Docs portal hero, About, manual home |
| `banner.webp` | Data Volunteer Network banner, 1983×793 | README hero, social preview card |
| `mark.png` | **Placeholder** small mark, 512×512 | Favicons, docs header and sidebar logos, app icons |

Originals: `cyberscallywags/DataVolunteerNetwork`, `assets/imgs/` (`Data Volunteer Network
Community Emblem.png` and `Data Volunteer Network Banner.png`), stored here as WebP (quality 90)
to stay under the 500 KB pre-commit limit.

Partner credits are not generated: the Cyber Scallywags crest (`csw-crest-*`) and wolf-head mark
(`csw-mark-*`) in `docs/content/assets/images/` are kept as they are.

## TODO: designer artwork

The current mark and emblem are stand-ins cut from the emblem raster. Replace them with:

- [ ] **`mark.svg`: a text-free DVN mark.** The three figures (teal, navy, orange) around the
      bar chart, from the top of the emblem, without the mountains, pit-head, compass points or
      lettering. Square viewBox, transparent background, flat fills in the brand colours
      (navy `#012545`, teal `#007986`, orange `#fe6136`), no gradients or fine lines, so it stays
      legible at 16×16. Provide a one-colour variant (navy, and white for dark backgrounds).
- [ ] **`emblem.png` (or `.svg`): the emblem on a transparent background**, at least 1024×1024,
      without the white square behind the circle. Ideally a version without the partner logos
      (Cyber Scallywags, DataKind UK), so partners can be credited separately and the emblem
      reads at small sizes.
- [ ] **Banner without baked-in partner logos**, if DataKind UK's logo use is not confirmed.
- [ ] Once `mark.svg` exists: rasterise it in `scripts/build_images.py` (or export a 1024×1024
      PNG to `mark.png`) and drop the circular badge treatment.
