"""Generate ultra-HD still + scroll-down collage universe video."""
from __future__ import annotations

import math
from pathlib import Path

import cv2
import imageio.v2 as imageio
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw

ROOT = Path(r"C:\AAA\projects\personal-website\public")
SRC = Path(
    r"C:\Users\15228\.cursor\projects\c-AAA-projects-personal-website\assets"
    r"\c__Users_15228_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images________________________________________________-41be756c-4e7e-452d-b626-e6fc2daf8eab.png"
)
OUT_BG = ROOT / "space-scroll-bg.png"
OUT_VIDEO = ROOT / "space-scroll.mp4"
SUBJECT_DIR = ROOT / "space-subjects"
SUBJECT_DIR.mkdir(exist_ok=True)

# Video: portrait-ish cover friendly
VW, VH = 1080, 1920
FPS = 18
DURATION = 16.0  # seconds
FRAMES = int(FPS * DURATION)


def upscale_extreme(bgr: np.ndarray, target_w: int = 3840) -> np.ndarray:
    h, w = bgr.shape[:2]
    # If already large, start from it
    up = bgr
    while up.shape[1] * 2 <= target_w:
        up = cv2.resize(up, None, fx=2, fy=2, interpolation=cv2.INTER_LANCZOS4)
        print("upscale step", up.shape)
    th = int(round(up.shape[0] * (target_w / up.shape[1])))
    up = cv2.resize(up, (target_w, th), interpolation=cv2.INTER_LANCZOS4)
    up = cv2.detailEnhance(up, sigma_s=12, sigma_r=0.15)
    blur = cv2.GaussianBlur(up, (0, 0), 1.4)
    up = cv2.addWeighted(up, 1.55, blur, -0.55, 0)
    lab = cv2.cvtColor(up, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    l = cv2.createCLAHE(2.2, (8, 8)).apply(l)
    up = cv2.cvtColor(cv2.merge([l, a, b]), cv2.COLOR_LAB2BGR)
    # film grain (subtle)
    noise = np.random.normal(0, 3.5, up.shape).astype(np.float32)
    up = np.clip(up.astype(np.float32) + noise, 0, 255).astype(np.uint8)
    return up


def soft_subject(pil: Image.Image, y0, y1, x0, x1, name: str) -> Path:
    w, h = pil.size
    box = (int(x0 * w), int(y0 * h), int(x1 * w), int(y1 * h))
    crop = pil.crop(box).convert("RGBA")
    cw, ch = crop.size
    arr = np.array(crop).astype(np.float32)
    arr[:, :, :3] = np.clip(arr[:, :, :3] * 1.14 + 10, 0, 255)
    crop = Image.fromarray(arr.astype(np.uint8), "RGBA")
    mask = Image.new("L", (cw, ch), 0)
    draw = ImageDraw.Draw(mask)
    pad = int(min(cw, ch) * 0.08)
    draw.ellipse([pad, pad, cw - 1 - pad, ch - 1 - pad], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=max(14, min(cw, ch) // 14)))
    crop.putalpha(mask)
    path = SUBJECT_DIR / f"{name}.png"
    crop.save(path, "PNG")
    print("subject", name, crop.size)
    return path


def overlay_rgba(base_bgr: np.ndarray, rgba: np.ndarray, x: int, y: int) -> np.ndarray:
    """Alpha composite rgba onto BGR base at (x,y)."""
    bh, bw = base_bgr.shape[:2]
    h, w = rgba.shape[:2]
    x0, y0 = max(0, x), max(0, y)
    x1, y1 = min(bw, x + w), min(bh, y + h)
    if x0 >= x1 or y0 >= y1:
        return base_bgr
    sx0, sy0 = x0 - x, y0 - y
    sx1, sy1 = sx0 + (x1 - x0), sy0 + (y1 - y0)
    roi = base_bgr[y0:y1, x0:x1].astype(np.float32)
    patch = rgba[sy0:sy1, sx0:sx1].astype(np.float32)
    alpha = patch[:, :, 3:4] / 255.0
    rgb = patch[:, :, :3][:, :, ::-1]  # RGBA RGB -> BGR
    out = rgb * alpha + roi * (1 - alpha)
    base_bgr[y0:y1, x0:x1] = np.clip(out, 0, 255).astype(np.uint8)
    return base_bgr


def main() -> None:
    # Prefer current HD if larger than original
    cur = cv2.imread(str(OUT_BG), cv2.IMREAD_COLOR)
    src = cv2.imread(str(SRC), cv2.IMREAD_COLOR)
    base_in = cur if cur is not None and cur.shape[1] >= 2000 else src
    assert base_in is not None
    print("input", base_in.shape)

    hd = upscale_extreme(base_in, target_w=3840)
    print("hd", hd.shape)
    cv2.imwrite(str(OUT_BG), hd, [cv2.IMWRITE_PNG_COMPRESSION, 2])
    print("wrote", OUT_BG, OUT_BG.stat().st_size)

    pil = Image.fromarray(cv2.cvtColor(hd, cv2.COLOR_BGR2RGB))
    regions = {
        "planet-top": (0.01, 0.23, 0.12, 0.88),
        "galaxy-left": (0.16, 0.40, 0.0, 0.52),
        "ring-planet": (0.18, 0.38, 0.52, 1.0),
        "comet": (0.34, 0.55, 0.35, 0.95),
        "gas-giant": (0.50, 0.80, 0.0, 0.52),
        "galaxy-face": (0.48, 0.76, 0.48, 1.0),
        "crater-horizon": (0.76, 1.0, 0.30, 1.0),
    }
    subject_paths = {n: soft_subject(pil, *c, n) for n, c in regions.items()}

    # Preload subject RGBA
    subjects = []
    for name, path in subject_paths.items():
        rgba = cv2.imread(str(path), cv2.IMREAD_UNCHANGED)
        if rgba is None:
            continue
        # store relative placement on full canvas
        meta = regions[name]
        subjects.append((name, rgba, meta))

    H, W = hd.shape[:2]
    # Viewport aspect matches video; scale width to W then height accordingly
    view_h = int(W * (VH / VW))
    view_h = min(view_h, H)
    max_y = max(1, H - view_h)

    writer = imageio.get_writer(
        str(OUT_VIDEO),
        fps=FPS,
        codec="libx264",
        quality=8,
        pixelformat="yuv420p",
        macro_block_size=1,
    )

    print(f"rendering {FRAMES} frames @ {FPS}fps -> {OUT_VIDEO}")
    for i in range(FRAMES):
        t = i / max(1, FRAMES - 1)
        # Smooth downward camera (ease in-out)
        ease = 0.5 - 0.5 * math.cos(math.pi * t)
        y0 = int(ease * max_y)
        frame = hd[y0 : y0 + view_h, 0:W].copy()

        # Animate subjects relative to current viewport
        for name, rgba, (ry0, ry1, rx0, rx1) in subjects:
            # Absolute center of subject on full canvas
            cx = int(((rx0 + rx1) / 2) * W)
            cy = int(((ry0 + ry1) / 2) * H)
            # Position in viewport
            local_y = cy - y0
            local_x = cx

            # Only draw if roughly near viewport
            if local_y < -view_h * 0.3 or local_y > view_h * 1.3:
                continue

            # Rotation / light pulse
            angle = (t * 360 * (0.35 if "planet" in name or "gas" in name else 0.12)) + (
                hash(name) % 40
            )
            scale = 0.92 + 0.08 * math.sin(t * math.pi * 2 + hash(name) % 7)
            bright = 1.0 + 0.22 * math.sin(t * math.pi * 2.5 + hash(name) % 5)

            h0, w0 = rgba.shape[:2]
            nh, nw = max(1, int(h0 * scale * (W / 3840) * 1.1)), max(
                1, int(w0 * scale * (W / 3840) * 1.1)
            )
            # Keep subject readable relative to frame
            target_w = int(W * (rx1 - rx0) * scale)
            target_h = int(target_w * (h0 / max(1, w0)))
            resized = cv2.resize(rgba, (max(1, target_w), max(1, target_h)), interpolation=cv2.INTER_LINEAR)

            # brightness on RGB
            rgb = resized[:, :, :3].astype(np.float32) * bright
            a = resized[:, :, 3:4]
            resized = np.concatenate(
                [np.clip(rgb, 0, 255), a], axis=2
            ).astype(np.uint8)

            # rotate around center
            M = cv2.getRotationMatrix2D(
                (resized.shape[1] / 2, resized.shape[0] / 2), angle * 0.15, 1.0
            )
            rotated = cv2.warpAffine(
                resized,
                M,
                (resized.shape[1], resized.shape[0]),
                flags=cv2.INTER_LINEAR,
                borderMode=cv2.BORDER_CONSTANT,
                borderValue=(0, 0, 0, 0),
            )

            # Drift
            drift_x = int(18 * math.sin(t * math.pi * 2 + hash(name) % 3))
            drift_y = int(14 * math.cos(t * math.pi * 2 + hash(name) % 5))
            x = int(local_x - rotated.shape[1] / 2) + drift_x
            y = int(local_y - rotated.shape[0] / 2) + drift_y
            frame = overlay_rgba(frame, rotated, x, y)

        # Soft vignette
        yy, xx = np.mgrid[0:frame.shape[0], 0:frame.shape[1]]
        cy, cx = frame.shape[0] / 2, frame.shape[1] / 2
        r = np.sqrt(((yy - cy) / cy) ** 2 + ((xx - cx) / cx) ** 2)
        vig = np.clip(1.15 - 0.35 * r, 0.7, 1.0)[:, :, None]
        frame = np.clip(frame.astype(np.float32) * vig, 0, 255).astype(np.uint8)

        # Resize to output video size
        out = cv2.resize(frame, (VW, VH), interpolation=cv2.INTER_AREA)
        # imageio expects RGB
        writer.append_data(cv2.cvtColor(out, cv2.COLOR_BGR2RGB))
        if i % 20 == 0:
            print(f"frame {i}/{FRAMES}")

    writer.close()
    print("done video", OUT_VIDEO, OUT_VIDEO.stat().st_size)


if __name__ == "__main__":
    main()
