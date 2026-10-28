"""Start one service: python -m data_volunteer_network.serve [api|ui|admin].
The container entrypoint; also runs as-is on Windows, macOS and Linux. The service comes
from the first argument, else the SERVICE env var."""

import os
import sys
from pathlib import Path


def main() -> None:
    service = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("SERVICE", "")
    # All interfaces, so the published container ports reach the server.
    host = os.environ.get("HOST", "0.0.0.0")  # noqa: S104
    if service in ("api", "ui"):
        import uvicorn

        port = 8000 if service == "api" else 8080
        uvicorn.run(f"data_volunteer_network.{service}.main:app", host=host, port=port)
    elif service == "admin":
        from streamlit.web import cli

        import data_volunteer_network.admin as admin

        app = Path(admin.__file__).parent / "app.py"
        sys.argv = [
            "streamlit", "run", str(app),
            "--server.address", host, "--server.port", "8501",
            "--server.headless", "true", "--browser.gatherUsageStats", "false",
        ]  # fmt: skip
        sys.exit(cli.main())
    else:
        sys.exit(f"Unknown SERVICE '{service}' (expected api|ui|admin)")


if __name__ == "__main__":
    main()
