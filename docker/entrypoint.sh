#!/bin/sh
set -e
case "$SERVICE" in
  api)   exec uvicorn sgaffald.api.main:app --host 0.0.0.0 --port 8000 ;;
  ui)    exec uvicorn sgaffald.ui.main:app --host 0.0.0.0 --port 8080 ;;
  admin)
    APP_DIR=$(python -c "import os, sgaffald.admin as a; print(os.path.dirname(a.__file__))")
    exec streamlit run "$APP_DIR/app.py" --server.address 0.0.0.0 --server.port 8501 \
      --server.headless true --browser.gatherUsageStats false ;;
  *) echo "Unknown SERVICE '$SERVICE' (expected api|ui|admin)" >&2; exit 1 ;;
esac
