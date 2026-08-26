"""Capture screenshots from live TechLearn site."""
import os
from pathlib import Path

OUT_DIR = Path("/home/krizrome_desktop/web-performance-lab/docs/screenshots-live")
BASE = "https://krizrome.github.io/web-performance-lab"

def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    from playwright.sync_api import sync_playwright

    pages = [
        ("01-home",        "/"),
        ("02-mobile",      "/"),
    ]

    with sync_playwright() as p:
        browser = p.chromium.launch()

        # Desktop
        ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        page = ctx.new_page()
        page.goto(BASE, wait_until="networkidle", timeout=30000)
        page.wait_for_timeout(800)
        page.screenshot(path=str(OUT_DIR / "01-home.png"), full_page=True)
        print(f"  ✓ 01-home.png (desktop)")

        # Mobile
        ctx2 = browser.new_context(viewport={"width": 375, "height": 667})
        page2 = ctx2.new_page()
        page2.goto(BASE, wait_until="networkidle", timeout=30000)
        page2.wait_for_timeout(800)
        page2.screenshot(path=str(OUT_DIR / "02-mobile.png"), full_page=True)
        print(f"  ✓ 02-mobile.png (mobile)")

        browser.close()
    print(f"\n✓ Captured to {OUT_DIR}")

if __name__ == "__main__":
    main()