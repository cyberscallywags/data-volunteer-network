# Sgaffald

<!-- Replace OWNER/REPO with the GitHub owner and repository name after renaming the template. -->
[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)
[![Release](https://github.com/OWNER/REPO/actions/workflows/release.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/release.yml)
[![Coverage](https://codecov.io/gh/OWNER/REPO/graph/badge.svg)](https://codecov.io/gh/OWNER/REPO)
[![Python](https://img.shields.io/badge/python-3.14-3776AB?logo=python&logoColor=white)](.python-version)
[![Top language](https://img.shields.io/github/languages/top/OWNER/REPO)](https://github.com/OWNER/REPO)
[![Languages](https://img.shields.io/github/languages/count/OWNER/REPO)](https://github.com/OWNER/REPO)
[![Open issues](https://img.shields.io/github/issues/OWNER/REPO)](https://github.com/OWNER/REPO/issues)
[![Open PRs](https://img.shields.io/github/issues-pr/OWNER/REPO)](https://github.com/OWNER/REPO/pulls)
[![Stars](https://img.shields.io/github/stars/OWNER/REPO?style=flat)](https://github.com/OWNER/REPO/stargazers)
[![Forks](https://img.shields.io/github/forks/OWNER/REPO?style=flat)](https://github.com/OWNER/REPO/network/members)
[![Last commit](https://img.shields.io/github/last-commit/OWNER/REPO)](https://github.com/OWNER/REPO/commits)
[![uv](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/uv/main/assets/badge/v0.json)](https://github.com/astral-sh/uv)
[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json)](https://github.com/astral-sh/ruff)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit)](.pre-commit-config.yaml)

CyberScallywags base template. The smallest stack that connects every part and is ready to
be renamed and grown into a real project.

| Service | Tech | Local URL |
|---|---|---|
| `api` | FastAPI + Pydantic AI | http://localhost:8000/docs |
| `ui` | FastUI (Pydantic-declared React UI) | http://localhost:8080 |
| `admin` | Streamlit | http://localhost:8501 |
| `mobile` | Ionic + Angular (served by nginx, proxies `/api`) | http://localhost:8100 |
| `docs` | Zensical portal + Sphinx/Furo manual | http://localhost:8200 |
| `neo4j` | Neo4j Enterprise, evaluation licence | http://localhost:7474 |

## Quick start

```bash
uv sync                    # Python 3.14 + all dev and docs tools
uv run pre-commit install
uv run task --list         # every task
uv run playwright install chromium   # browser for the e2e tests
uv run task verify         # lint → unit → build+start stack → integration → browser → Locust → teardown
```

## Documentation

Everything else (architecture, the site manifest, each service, testing, environments, CI/CD,
repository setup, and the generated HTTP API, data model, configuration and task references)
lives in the docs, built from [`docs/content`](docs/content):

```bash
uv run task docs_serve     # build both sites, serve on http://localhost:8200
```

- **Portal** (Zensical) at `/`: start here.
- **Reference manual** (Sphinx + Furo) at `/manual/`: the same pages plus the Python API from docstrings.

With the stack running (`uv run task up`) the `docs` container serves both on
http://localhost:8200, and the web UI and mobile app link to it. Reference pages are generated
from the code by `python -m sgaffald.docgen`, so they cannot drift; see
[The docs site](docs/content/services/docs.md).
