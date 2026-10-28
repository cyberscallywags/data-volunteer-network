"""Real-browser checks of the docs site: the light-first DVN theme, and images that scale from a
phone to a desktop. Requires `task up` (or `task docs_serve`) and `playwright install chromium`."""

import os

import pytest
from playwright.sync_api import Page, expect

from data_volunteer_network.meta import get_meta

pytestmark = pytest.mark.e2e

DOCS = os.getenv("DOCS_URL", "http://localhost:8200")
LIGHT = "rgb(255, 255, 255)"  # light first, like the DVN artwork

PAGES = {
    "portal home": "/",
    "portal about": "/about/",
    "manual home": "/manual/manual.html",
    "manual about": "/manual/about.html",
}


def fits_the_screen(page: Page) -> None:
    """No sideways scrolling, and every image inside the viewport width."""
    page.wait_for_load_state("networkidle")
    width = page.evaluate("window.innerWidth")
    assert page.evaluate("document.documentElement.scrollWidth") <= width
    for box in page.locator("article img, .md-content img").evaluate_all(
        "imgs => imgs.map(i => i.getBoundingClientRect().width)"
    ):
        assert 0 < box <= width


@pytest.mark.parametrize("path", PAGES.values(), ids=PAGES.keys())
@pytest.mark.parametrize("viewport", [(390, 844), (1280, 800)], ids=["phone", "desktop"])
def test_images_scale_with_the_page(page: Page, path: str, viewport):
    page.set_viewport_size({"width": viewport[0], "height": viewport[1]})
    page.goto(f"{DOCS}{path}")
    fits_the_screen(page)


def test_portal_is_light_first_with_the_hero_image(page: Page):
    page.goto(DOCS)
    expect(page.locator("h1#data-volunteer-network")).to_have_text(f"{get_meta().name}¶")
    assert page.evaluate("getComputedStyle(document.body).backgroundColor") == LIGHT
    hero = page.locator(".brand-hero__emblem img")
    expect(hero).to_be_visible()
    # the browser picked a WebP from srcset, not the PNG fallback
    assert hero.evaluate("img => img.currentSrc").endswith(".webp")
    # Cyber Scallywags stays credited as a partner
    expect(page.locator(".brand-hero .brand-credit img")).to_be_visible()


def test_manual_is_light_first_and_links_back_to_the_portal(page: Page):
    page.goto(f"{DOCS}/manual/")
    expect(page).to_have_url(f"{DOCS}/manual/manual.html")
    assert page.evaluate("getComputedStyle(document.body).backgroundColor") == LIGHT
    page.get_by_role("link", name=f"{get_meta().name} docs portal").click()
    expect(page).to_have_url(f"{DOCS}/")
