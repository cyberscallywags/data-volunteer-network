"""Sphinx + Furo: the reference manual. Build: uv run task docs   Live: uv run task docs_live_manual

Source pages are docs/content (shared with the Zensical portal, docs/zensical.toml), so
this configuration lives apart from them: sphinx-build -c docs/sphinx docs/content <out>.
"""

import sys
from pathlib import Path

HERE = Path(__file__).parent
# autodoc imports data_volunteer_network without install
sys.path.insert(0, str(HERE.parents[1] / "src"))

# Import FastAPI before autodoc documents any Pydantic model's members: once it has, FastAPI's
# own models (extra="allow") fail to build, and data_volunteer_network.api/ui could not be
# documented.
import fastapi  # noqa: E402, F401

from data_volunteer_network.meta import get_meta  # noqa: E402

meta = get_meta()  # project.toml, plus the version from pyproject.toml
project = meta.name
author = meta.organisation.name
copyright = f"{meta.year}, {meta.organisation.name}"  # noqa: A001 - Sphinx's name for it
release = meta.version

extensions = [
    "myst_parser",
    "sphinx.ext.autodoc",
    "sphinx.ext.viewcode",
    "sphinx_copybutton",
    "sphinx_design",
    "sphinxcontrib.mermaid",
]

root_doc = "manual"
# Portal-only pages (Zensical grid-card home, mkdocstrings Python API).
exclude_patterns = ["index.md", "reference/python-api.md"]
source_suffix = {".md": "markdown"}

# MyST: the shared pages use plain Markdown plus `{.class}` on images and mermaid fences.
myst_enable_extensions = ["attrs_inline", "attrs_block", "colon_fence", "deflist"]
myst_heading_anchors = 3
myst_fence_as_directive = ["mermaid"]

# Links to the portal (`/`, `/manual/...`) are absolute site paths, not Sphinx documents.
suppress_warnings = ["myst.xref_missing"]
nitpicky = False

autodoc_member_order = "bysource"
autodoc_typehints = "description"
autodoc_default_options = {"members": True, "show-inheritance": True}

# sphinxcontrib-mermaid follows Furo's light/dark switch itself; a custom init config breaks
# its re-render, so diagrams are branded in _static/furo.css instead.

# ---------------------------------------------------------------- DVN brand on Furo
html_theme = "furo"
html_title = f"{meta.name} manual"
html_static_path = ["_static", "../content/assets/stylesheets"]
html_css_files = ["brand.css", "furo.css"]
html_js_files = ["light-first.js"]
html_logo = "../content/assets/images/brand-mark-128.png"
html_favicon = "../content/assets/images/brand-favicon-32.png"
templates_path = ["_templates"]
# The manual's home is manual.html (index.md belongs to the portal); /manual/ redirects there.
html_additional_pages = {"index": "redirect-to-manual.html"}
html_copy_source = False
html_show_sourcelink = False

_shared = {
    "font-stack": "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    "font-stack--monospace": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
}
html_theme_options = {
    "sidebar_hide_name": False,
    "navigation_with_keys": True,
    "announcement": " · ".join(
        filter(
            None,
            [
                f'Part of the <a href="/">{meta.name} docs portal</a>',
                meta.organisation.name,
                meta.organisation.motto,
            ],
        )
    ),
    "light_css_variables": {
        **_shared,
        "color-brand-primary": "#012545",
        "color-brand-content": "#007986",
        "color-brand-visited": "#c2410c",
        "color-announcement-background": "#012545",
        "color-announcement-text": "#ffffff",
    },
    "dark_css_variables": {
        **_shared,
        "color-brand-primary": "#4fc3cc",
        "color-brand-content": "#4fc3cc",
        "color-brand-visited": "#ff8a65",
        "color-background-primary": "#0b1a2b",
        "color-background-secondary": "#10243a",
        "color-background-hover": "#15304a",
        "color-background-border": "#24445f",
        "color-background-item": "#15304a",
        "color-foreground-primary": "#e6eef5",
        "color-foreground-secondary": "#c5d3e0",
        "color-foreground-muted": "#9fb3c8",
        "color-foreground-border": "#24445f",
        "color-code-background": "#15304a",
        "color-inline-code-background": "#15304a",
        "color-card-background": "#10243a",
        "color-card-border": "#24445f",
        "color-announcement-background": "#10243a",
        "color-announcement-text": "#e6eef5",
    },
}
pygments_style = "friendly"
pygments_dark_style = "github-dark"
