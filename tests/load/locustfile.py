"""Locust load profile for the API. `task load` runs a 20s headless smoke;
`task load_ui` opens the Locust web UI on http://localhost:8089."""

from uuid import uuid4

from locust import HttpUser, between, task


class ApiUser(HttpUser):
    wait_time = between(0.1, 0.5)

    @task(5)
    def list_items(self) -> None:
        self.client.get("/items?limit=20")

    @task(2)
    def create_item(self) -> None:
        self.client.post("/items", json={"name": f"load-{uuid4().hex[:8]}"})

    @task(1)
    def health(self) -> None:
        self.client.get("/health")
