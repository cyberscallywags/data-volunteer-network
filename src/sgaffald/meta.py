"""Project identity from project.toml: name, organisation, repository, app id. The version comes
from the installed package (pyproject.toml). Content (brand, theme, pages) is site.json's job;
see sgaffald.content."""

import tomllib
from functools import lru_cache
from importlib.metadata import version
from pathlib import Path

from pydantic import BaseModel, Field

# Wheels carry a copy (pyproject.toml force-include); a source checkout reads the root file.
_PACKAGED = Path(__file__).with_name("project.toml")
PROJECT_FILE = _PACKAGED if _PACKAGED.exists() else Path(__file__).parents[2] / "project.toml"


class Organisation(BaseModel):
    """The collective behind the project."""

    name: str
    url: str | None = None
    motto: str | None = None


class Repository(BaseModel):
    """Where the code lives on GitHub."""

    owner: str
    name: str

    @property
    def url(self) -> str:
        return f"https://github.com/{self.owner}/{self.name}"

    @property
    def image_prefix(self) -> str:
        """Release images, as published by .github/workflows/release.yml."""
        return f"ghcr.io/{self.owner}/{self.name}".lower()


class Mobile(BaseModel):
    """Native app identity."""

    app_id: str


class Meta(BaseModel):
    """Everything in project.toml, plus the package version."""

    name: str
    slug: str = Field(pattern=r"^[a-z][a-z0-9-]*$")
    description: str
    year: int
    version: str
    organisation: Organisation
    repository: Repository
    mobile: Mobile


def load_meta(path: Path) -> Meta:
    raw = tomllib.loads(path.read_text())
    return Meta(**raw.pop("project"), **raw, version=version(__package__))


@lru_cache
def get_meta() -> Meta:
    """project.toml, read once per process."""
    return load_meta(PROJECT_FILE)
