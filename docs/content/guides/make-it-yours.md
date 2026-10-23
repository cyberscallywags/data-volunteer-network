# Make it yours

Sgaffald is a template. To turn it into a real project:

1. **Rename the package**: `src/sgaffald` → `src/<name>`, then search and replace
   `sgaffald`. Replace `OWNER/REPO` in the README badges with the new repository.
2. **Model your domain**: replace `Item` in `models.py` and `ItemRepo` in `db.py`. The tests
   show the pattern for each layer, and the [data models](../reference/models.md) page
   regenerates itself.
3. **Shape the content**: edit `src/sgaffald/content/site.json` (brand, theme, pages). See
   [Site manifest](../site-manifest.md).
4. **Pick a real model**: set `LLM_MODEL` for production and add the provider extra, e.g.
   `pydantic-ai-slim[anthropic]`.
5. **Connect sign-on**: replace the mobile `SessionService` placeholder with your identity
   provider and protect the write endpoints.
6. **Write the docs**: add pages under `docs/content`; see [The docs site](../services/docs.md).
7. **Refresh the tooling**: `uv run pre-commit autoupdate`, and pin `NEO4J_IMAGE` to the
   release you want.
