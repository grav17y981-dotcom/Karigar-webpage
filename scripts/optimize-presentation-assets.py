"""Rebuild small presentation assets from the original PNGs (requires Pillow)."""

from pathlib import Path

from PIL import Image


ASSETS = Path(__file__).resolve().parents[1] / "public" / "assets"
VARIANTS = (
    ("karigar-workbench-hero.png", "karigar-workbench-hero.webp", 1600, 84),
    ("karigar-workbench-hero.png", "karigar-workbench-hero-medium.webp", 1024, 82),
    ("karigar-workbench-hero.png", "karigar-workbench-hero-mobile.webp", 768, 80),
    ("karigar-garage-editorial.png", "karigar-garage-editorial.webp", 1280, 80),
    ("karigar-logo.png", "karigar-logo.webp", 600, 92),
)


for source, target, width, quality in VARIANTS:
    with Image.open(ASSETS / source) as original:
        resized = original.resize(
            (width, round(original.height * width / original.width)),
            Image.Resampling.LANCZOS,
        )
        resized.save(ASSETS / target, "WEBP", quality=quality, method=6)
    print(f"{target}: {(ASSETS / target).stat().st_size:,} bytes")
