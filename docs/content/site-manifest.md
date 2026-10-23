# Site manifest

One JSON document, `src/sgaffald/content/site.json`, holds the brand, theme colours and
pages. The API validates it against the [Site](reference/models.md#site) model and serves it
at `GET /site`. The web UI and the mobile app both render from it, so they share one look
and the same pages without either being redeployed.

| Key | What it drives |
|---|---|
| `brand` | Name, tagline and collective, shown in headers, heroes and footers |
| `theme` | `primary`, `secondary`, `tertiary`: Ionic colour variables on mobile, Bootstrap overrides on web |
| `welcome` | The landing page, for planning the application |
| `pages` | Project pages, listed in order in the mobile side menu and the web navbar (`/p/<slug>`) |
| `about` | The Cyber Scallywags page, always linked from the menu footer and the navbar |

`docs_url` is added by the API from the `DOCS_URL` setting, not stored in the file, because
it differs per deployment.

## Pages and sections

Each page is a list of sections. Four kinds cover most needs:

| Kind | Renders as |
|---|---|
| `text` | A heading and a paragraph |
| `list` | A list of items, each with a title, optional body, icon and link |
| `steps` | A numbered list |
| `cards` | A responsive grid of cards |

```json
{
  "slug": "roadmap",
  "title": "Roadmap",
  "icon": "map-outline",
  "sections": [
    { "kind": "steps", "items": [{ "title": "Foundations", "body": "Rename the template." }] }
  ]
}
```

## Rules the API enforces

- Theme colours are six-digit hex, for example `#1b4965`.
- Page slugs are lower-case words joined by hyphens, and unique.
- `welcome`, `about`, `items` and `sign-in` are reserved for the apps' own routes.
- Mobile icons must be registered in `mobile/src/app/core/icons.ts`; unknown names show a
  document icon instead of nothing.

## Swapping the content

Point `SITE_FILE` at another JSON file to change the content without rebuilding anything.
The full bundled file is in [Sample site manifest](reference/site-sample.md).
