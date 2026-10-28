# Make it yours

This project grew from Sgaffald, the Cyber Scallywags template. To turn it, or a fresh copy of
Sgaffald, into another project:

1. **Set the identity**: edit `project.toml` (name, slug, description, organisation,
   GitHub owner and repository, mobile app id), then run `uv run task sync`. That rewrites
   every copy the code cannot read directly: the Zensical config, the README title and
   badges, the compose variables, and the mobile app's metadata, title and first-paint
   theme. `uv run task test` fails if one is missed. Set the version in `pyproject.toml`.
2. **Rename the Python package** (optional): `src/data_volunteer_network` → `src/<name>`,
   then replace the `data_volunteer_network` imports and the package name in `pyproject.toml`,
   `serve.py` and the docs. Identity no longer depends on the package name, so a
   fork can keep it.
3. **Model your domain**: replace `Item` in `models.py` and `ItemRepo` in `db.py`. The tests
   show the pattern for each layer, and the [data models](../reference/models.md) page
   regenerates itself.
4. **Shape the content**: edit `src/data_volunteer_network/content/site.json` (tagline, theme,
   pages), then run `uv run task sync` again so the mobile app's first paint uses the new
   colours. See [Site manifest](../site-manifest.md).
5. **Replace the imagery**: swap the masters in `brand/` (emblem, banner, mark; see
   `brand/README.md`), then run `uv run task images`. Every size for the docs, README, web
   UI, admin and mobile app is regenerated under a role name (`brand-emblem-512.webp`), so no
   reference needs editing. Set the docs colours in
   `docs/content/assets/stylesheets/brand.css` to match `site.json`.
6. **Pick a real model**: set `LLM_MODEL` for production and add the provider extra, e.g.
   `pydantic-ai-slim[anthropic]`.
7. **Connect sign-on**: replace the mobile `SessionService` placeholder with your identity
   provider and protect the write endpoints.
8. **Write the docs**: add pages under `docs/content`; see [The docs site](../services/docs.md).
9. **Refresh the tooling**: `uv run pre-commit autoupdate`, and pin `NEO4J_IMAGE` to the
   release you want.
