"""Fast scroll-down collage video from existing ultra-HD still."""
from __future__ import annotations

import math
import sys
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(r"C:\AAA\projects\personal-website\public")
BG = ROOT / "space-scroll-bg.png"
OUT = ROOT / "space-scroll.mp4"
SUBJECT_DIR = ROOT / "space-subjects"

VW, VH = 1080, 1920
FPS = 20
FRAMES = 200  # 10 seconds


def log(msg: str) -> None:
    print(msg, flush=True)


def overlay_rgba(base: np.ndarray, rgba: np.ndarray, x: int, y: int) -> None:
    bh, bw = base.shape[:2]
    h, w = rgba.shape[:2]
    x0, y0 = max(0, x), max(0, y)
    x1, y1 = min(bw, x + w), min(bh, y + h)
    if x0 >= x1 or y0 >= y1:
        return
    sx0, sy0 = x0 - x, y0 - y
    patch = rgba[sy0 : sy0 + (y1 - y0), sx0 : sx0 + (x1 - x0)]
    roi = base[y0:y1, x0:x1]
    a = patch[:, :, 3:4].astype(np.float32) / 255.0
    rgb = patch[:, :, :3][:, :, ::-1].astype(np.float32)
    out = rgb * a + roi.astype(np.float32) * (1 - a)
    base[y0:y1, x0:x1] = np.clip(out, 0, 255).astype(np.uint8)


def main() -> None:
    log(f"loading {BG}")
    hd = cv2.imread(str(BG), cv2.IMREAD_COLOR)
    if hd is None:
        raise SystemExit("missing bg")
    H, W = hd.shape[:2]
    log(f"bg {W}x{H}")

    # Preload subjects (may be older resolution — ok)
    subjects = []
    specs = [
        ("planet-top", 0.12, 0.88, 0.01, 0.23, 0.35),
        ("galaxy-left", 0.0, 0.52, 0.16, 0.40, 0.12),
        ("ring-planet", 0.52, 1.0, 0.18, 0.38, 0.4),
        ("gas-giant", 0.0, 0.52, 0.50, 0.80, 0.25),
        ("galaxy-face", 0.48, 1.0, 0.48, 0.76, 0.15),
        ("crater-horizon", 0.30, 1.0, 0.76, 1.0, 0.08),
    ]
    for name, x0, x1, y0, y1, spin in specs:
        path = SUBJECT_DIR / f"{name}.png"
        rgba = cv2.imread(str(path), cv2.IMREAD_UNCHANGED)
        if rgba is None:
            log(f"skip missing {name}")
            continue
        subjects.append(
            {
                "name": name,
                "rgba": rgba,
                "cx": (x0 + x1) / 2,
                "cy": (y0 + y1) / 2,
                "wfrac": (x1 - x0),
                "spin": spin,
            }
        )
        log(f"loaded {name} {rgba.shape}")

    view_h = min(H, int(W * (VH / VW)))
    max_y = max(1, H - view_h)

    # Try OpenCV writer first
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(str(OUT), fourcc, FPS, (VW, VH))
    if not writer.isOpened():
        raise SystemExit("VideoWriter failed")

    log(f"rendering {FRAMES} frames")
    for i in range(FRAMES):
        t = i / max(1, FRAMES - 1)
        ease = 0.5 - 0.5 * math.cos(math.pi * t)
        y0 = int(ease * max_y)
        frame = hd[y0 : y0 + view_h, :].copy()

        for s in subjects:
            cx = int(s["cx"] * W)
            cy = int(s["cy"] * H)
            local_y = cy - y0
            if local_y < -view_h * 0.4 or local_y > view_h * 1.4:
                continue

            rgba = s["rgba"]
            tw = max(32, int(W * s["wfrac"] * (0.95 + 0.08 * math.sin(t * 6 + hash(s["name"]) % 5))))
            th = max(32, int(tw * (rgba.shape[0] / max(1, rgba.shape[1]))))
            resized = cv2.resize(rgba, (tw, th), interpolation=cv2.INTER_AREA)

            bright = 1.0 + 0.25 * math.sin(t * math.pi * 2.2 + hash(s["name"]) % 7)
            rgb = np.clip(resized[:, :, :3].astype(np.float32) * bright, 0, 255)
            resized = np.concatenate([rgb, resized[:, :, 3:4]], axis=2).astype(np.uint8)

            angle = t * 360 * s["spin"]
            M = cv2.getRotationMatrix2D((tw / 2, th / 2), angle, 1.0)
            rot = cv2.warpAffine(
                resized,
                M,
                (tw, th),
                flags=cv2.INTER_LINEAR,
                borderMode=cv2.BORDER_CONSTANT,
                borderValue=(0, 0, 0, 0),
            )

            drift_x = int(22 * math.sin(t * math.pi * 2 + hash(s["name"]) % 3))
            drift_y = int(16 * math.cos(t * math.pi * 2 + hash(s["name"]) % 4))
            x = int(cx - tw / 2) + drift_x
            y = int(local_y - th / 2) + drift_y
            overlay_rgba(frame, rot, x, y)

        out = cv2.resize(frame, (VW, VH), interpolation=cv2.INTER_AREA)
        writer.write(out)
        if i % 25 == 0:
            log(f"frame {i}/{FRAMES}")

    writer.release()
    log(f"done {OUT} size={OUT.stat().st_size}")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        log(f"ERROR {e}")
        raise
