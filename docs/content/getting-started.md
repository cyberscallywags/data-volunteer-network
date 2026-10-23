# Getting started

Sgaffald is the Cyber Scallywags base template: the smallest stack that connects every
part and is ready to be renamed and grown into a real project.

## What you need

| Tool | Why |
|---|---|
| [uv](https://docs.astral.sh/uv/) | Installs Python 3.14 and every Python tool |
| Docker with compose | Runs the full stack, the mobile build and the docs build |
| Node 24 (optional) | Only for live-reloading the mobile app outside Docker |

## Quick start

```bash
uv sync                               # Python 3.14 + all dev and docs tools
uv run pre-commit install
uv run task --list                    # every task (see Reference → Tasks)
uv run playwright install chromium    # browser for the e2e tests
uv run task verify                    # lint → unit → stack → integration → browser → Locust → teardown
```

`task verify` is the same gate CI runs. To just start everything and look around:

```bash
uv run task up        # build + start the test stack, wait until healthy
uv run task down      # stop it and drop the volumes
```

## Where everything lives

| Service | Tech | Local URL |
|---|---|---|
| `api` | FastAPI + Pydantic AI | <http://localhost:8000/docs> |
| `ui` | FastUI (Pydantic-declared React UI) | <http://localhost:8080> |
| `admin` | Streamlit | <http://localhost:8501> |
| `mobile` | Ionic + Angular, served by nginx, proxies `/api` | <http://localhost:8100> |
| `docs` | Zensical portal + Sphinx manual | <http://localhost:8200> |
| `neo4j` | Neo4j Enterprise, evaluation licence | <http://localhost:7474> |

The agent behind `POST /ask` uses Pydantic AI's offline `TestModel` when `LLM_MODEL=test`,
so tests and CI need no API keys.

## Writing the docs

```bash
uv run task docs          # generate the reference pages, build both sites into docs/_build
uv run task docs_serve    # build, then serve both sites together on http://localhost:8200
uv run task docs_live     # live-reload the Zensical portal while you write
uv run task docs_live_manual   # live-reload the Sphinx manual
```

See [The docs site](services/docs.md) for how the two engines share one set of pages.
