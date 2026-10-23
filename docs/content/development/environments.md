# Environments

Docker compose reads one env file per environment. Every variable is listed, with the test
and production values, in [Configuration](../reference/configuration.md).

## Test

`.env.test` is committed on purpose with throwaway values only:

- Neo4j Enterprise with `NEO4J_LICENSE=eval` (evaluation licence).
- `LLM_MODEL=test`, the offline model, so no API keys.
- Images built locally (`IMAGE_PREFIX=sgaffald`, `IMAGE_TAG=local`).
- All ports bound to `127.0.0.1`.

```bash
uv run task up      # build + start, wait for healthchecks
uv run task logs    # follow the logs
uv run task down    # stop and drop volumes
```

## Production

Copy `.env.production.example` to `.env.production` (git-ignored) and fill it in.
`docker-compose.prod.yml` then:

- switches every service to the released GHCR images (`IMAGE_PREFIX`, `IMAGE_TAG`), with no
  local builds;
- requires `NEO4J_LICENSE=yes`, a commercial Neo4j Enterprise licence;
- hides the database and API ports;
- adds restart policies.

```bash
uv run task prod_check   # validate compose + .env.production
uv run task prod_up      # start with released images
uv run task prod_down    # stop, keeping data
```

Put a reverse proxy with TLS in front of the UI, the mobile web app and the docs, and set
`DOCS_URL` to the docs' public address so the apps link to it.
