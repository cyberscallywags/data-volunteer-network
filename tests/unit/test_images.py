"""scripts/build_images.py: every brand image is generated from brand/, at the size it claims."""

import importlib.util
import re
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).parents[2]
_spec = importlib.util.spec_from_file_location("build_images", ROOT / "scripts/build_images.py")
build_images = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(build_images)


def expected_size(rel: Path) -> tuple[int, int] | None:
    """The size a role name promises: -WxH, or -N for a square or N-wide image."""
    if m := re.search(r"-(\d+)x(\d+)\.\w+$", rel.name):
        return int(m[1]), int(m[2])
    if m := re.search(r"-(\d+)\.\w+$", rel.name):
        return int(m[1]), 0  # height checked against the aspect ratio below
    return None


def test_every_output_is_committed():
    missing = [str(rel) for rel in build_images.OUTPUTS if not (ROOT / rel).exists()]
    assert not missing, f"run `uv run task images`: {missing}"


def test_outputs_are_generated_at_their_named_size(tmp_path):
    shutil.copytree(ROOT / "brand", tmp_path / "brand")
    assert build_images.main(["--root", str(tmp_path)]) == 0
    for rel in build_images.OUTPUTS:
        with Image.open(tmp_path / rel) as im:
            if (size := expected_size(rel)) is None:
                continue
            width, height = size
            assert im.width == width, rel
            if height:
                assert im.height == height, rel
            elif "banner" not in rel.name:
                assert im.height == width, rel  # marks, icons and the emblem are square


def test_the_emblem_is_cut_to_its_circle(tmp_path):
    shutil.copytree(ROOT / "brand", tmp_path / "brand")
    im = build_images.emblem(tmp_path)
    assert im.getpixel((0, 0))[3] == 0  # the master's white corner is transparent
    assert im.getpixel((im.width // 2, im.height // 2))[3] == 255
