"""
convert_temple_images.py
Run this on YOUR computer (not in Claude's sandbox) — it downloads each
temple photo and saves a small, local WebP copy into an images/ folder
next to filtered-temples.html.

Setup (one time):
    pip install pillow requests

Run:
    python convert_temple_images.py

Output:
    images/aba-nigeria.webp
    images/manti-utah.webp
    ... etc, each resized to 400px wide and compressed.
"""
import os
from io import BytesIO

import requests
from PIL import Image

# slug -> source URL. Add/replace the "st-george-utah", "freiberg-germany",
# and "rome-italy" rows with real photo URLs once you have them — they
# currently point at picsum.photos placeholders.
TEMPLES = [
    ("aba-nigeria", "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"),
    ("manti-utah", "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"),
    ("payson-utah", "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"),
    ("yigo-guam", "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"),
    ("washington-dc", "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"),
    ("lima-peru", "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"),
    ("mexico-city-mexico", "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"),
    ("st-george-utah", "https://picsum.photos/seed/stgeorge-temple/400/250"),
    ("freiberg-germany", "https://picsum.photos/seed/freiberg-temple/400/250"),
    ("rome-italy", "https://picsum.photos/seed/rome-temple/400/250"),
]

OUT_DIR = "images"
TARGET_WIDTH = 400
QUALITY = 72  # 60-80 is a good balance of size vs. sharpness for a 400px-wide card image

os.makedirs(OUT_DIR, exist_ok=True)

for slug, url in TEMPLES:
    print(f"Fetching {slug} ...")
    try:
        resp = requests.get(url, timeout=20, headers={"User-Agent": "Mozilla/5.0"})
        resp.raise_for_status()
        img = Image.open(BytesIO(resp.content)).convert("RGB")

        ratio = TARGET_WIDTH / img.width
        new_size = (TARGET_WIDTH, round(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)

        out_path = os.path.join(OUT_DIR, f"{slug}.webp")
        img.save(out_path, "WEBP", quality=QUALITY, method=6)

        size_kb = os.path.getsize(out_path) / 1024
        print(f"  saved {out_path} ({size_kb:.1f} KB)")
    except Exception as e:
        print(f"  FAILED: {e}")

print("\nDone. Commit the images/ folder along with your HTML/CSS/JS.")
