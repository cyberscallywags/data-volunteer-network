"""Generate every brand image size from the masters in brand/ (see brand/README.md).

    uv run task images                              # rewrite every output
    uv run python scripts/build_images.py --list    # print what would be written

Outputs are named for their role (brand-emblem-512.webp), never for the brand, so a rebrand
replaces the masters and re-runs this without touching a reference. Partner credits (the
csw-crest-* and csw-mark-* files) are not generated here.
"""

import argparse
import sys
from collections.abc import Callable
from pathlib import Path

from PIL import Image, ImageDraw

BRAND = Path("brand")
DOCS = Path("docs/content/assets/images")
MOBILE = Path("mobile/src/assets/icon")
NAVY = (1, 37, 69)  # the emblem's title navy; letterbox for the social card


# ---------------------------------------------------------------- shapes


def emblem(root: Path) -> Image.Image:
    """The emblem cut to its circle: the master has a white square behind it."""
    im = Image.open(root / BRAND / "emblem.webp").convert("RGBA")
    inset = round(im.width * 0.013)  # just inside the outer ring's edge
    mask = Image.new("L", im.size, 0)
    ImageDraw.Draw(mask).ellipse((inset, inset, im.width - inset, im.height - inset), fill=255)
    im.putalpha(mask)
    return im


def mark(root: Path) -> Image.Image:
    return Image.open(root / BRAND / "mark.png").convert("RGBA")


def banner(root: Path) -> Image.Image:
    return Image.open(root / BRAND / "banner.webp").convert("RGB")


def social_card(root: Path) -> Image.Image:
    """1200×630 for og:image: the banner at full width, letterboxed in navy."""
    art = fit(banner(root), 1200)
    card = Image.new("RGB", (1200, 630), NAVY)
    card.paste(art, (0, (630 - art.height) // 2))
    return card


def fit(im: Image.Image, width: int) -> Image.Image:
    """Scale to `width`, keeping the aspect ratio. Never upscales."""
    width = min(width, im.width)
    return im.resize((width, round(im.height * width / im.width)), Image.Resampling.LANCZOS)


def square(im: Image.Image, size: int) -> Image.Image:
    return im.resize((size, size), Image.Resampling.LANCZOS)


# ---------------------------------------------------------------- outputs
# Each takes the repository root and returns the image to write; the suffix picks the format.

OUTPUTS: dict[Path, Callable[[Path], Image.Image]] = {
    DOCS / "brand-emblem-256.webp": lambda r: square(emblem(r), 256),
    DOCS / "brand-emblem-512.webp": lambda r: square(emblem(r), 512),
    DOCS / "brand-emblem-512.png": lambda r: square(emblem(r), 512),
    DOCS / "brand-banner-960.webp": lambda r: fit(banner(r), 960),
    DOCS / "brand-banner-1920.webp": lambda r: fit(banner(r), 1920),
    DOCS / "brand-mark-64.png": lambda r: square(mark(r), 64),
    DOCS / "brand-mark-128.png": lambda r: square(mark(r), 128),
    DOCS / "brand-favicon-32.png": lambda r: square(mark(r), 32),
    DOCS / "brand-apple-touch-icon-180.png": lambda r: square(mark(r), 180),
    DOCS / "brand-og-1200x630.jpg": social_card,
    MOBILE / "favicon.png": lambda r: square(mark(r), 64),
    MOBILE / "apple-touch-icon.png": lambda r: square(mark(r), 180),
    MOBILE / "icon-512.png": lambda r: square(mark(r), 512),
}


def save(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.suffix == ".webp":
        im.save(path, "WEBP", quality=85, method=6)
    elif path.suffix == ".jpg":
        im.save(path, "JPEG", quality=85, optimize=True, progressive=True)
    else:
        im.save(path, "PNG", optimize=True)


# ---------------------------------------------------------------- entry point


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--list", action="store_true", help="print the outputs, write nothing")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args(argv)
    for rel, render in OUTPUTS.items():
        if args.list:
            print(rel)
            continue
        save(render(args.root), args.root / rel)
        print(f"wrote {rel}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
