// Canvas layout for one floating window. The outer margin leaves room for the drop shadow.
export const TEX_W = 1100;
export const TEX_H = 744;
const M = 40; // shadow margin
const WIN_W = TEX_W - M * 2;
const WIN_H = TEX_H - M * 2;
const BAR = 54;
const R = 26;

const DISPLAY = '"Bricolage Grotesque", system-ui, sans-serif';
const BODY = '"IBM Plex Sans", system-ui, sans-serif';

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawChrome(ctx, title, accent) {
  // shadow + window body
  ctx.save();
  ctx.shadowColor = "rgba(16, 22, 48, 0.32)";
  ctx.shadowBlur = 36;
  ctx.shadowOffsetY = 14;
  rr(ctx, M, M, WIN_W, WIN_H, R);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.restore();

  // title bar
  ctx.save();
  rr(ctx, M, M, WIN_W, WIN_H, R);
  ctx.clip();
  ctx.fillStyle = "#F2F4F7";
  ctx.fillRect(M, M, WIN_W, BAR);
  ctx.fillStyle = "#E1E5EB";
  ctx.fillRect(M, M + BAR - 2, WIN_W, 2);
  ctx.restore();

  // Windows-style caption buttons on the right, app badge on the left
  ctx.fillStyle = accent;
  rr(ctx, M + 22, M + 17, 20, 20, 6);
  ctx.fill();
  ctx.fillStyle = "#1B2130";
  ctx.font = `600 22px ${BODY}`;
  ctx.textBaseline = "middle";
  ctx.fillText(title, M + 54, M + BAR / 2 + 1);

  ctx.strokeStyle = "#69728A";
  ctx.lineWidth = 2;
  const cx = M + WIN_W - 36;
  const cy = M + BAR / 2;
  ctx.beginPath(); // close
  ctx.moveTo(cx - 7, cy - 7); ctx.lineTo(cx + 7, cy + 7);
  ctx.moveTo(cx + 7, cy - 7); ctx.lineTo(cx - 7, cy + 7);
  ctx.stroke();
  ctx.strokeRect(cx - 62, cy - 7, 14, 14); // maximise
  ctx.beginPath(); // minimise
  ctx.moveTo(cx - 118, cy); ctx.lineTo(cx - 104, cy);
  ctx.stroke();
}

/** Runs `fn` with the content area clipped and its rect passed in. */
function withContent(ctx, fn) {
  const x = M, y = M + BAR, w = WIN_W, h = WIN_H - BAR;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, [0, 0, R, R]);
  ctx.clip();
  fn(x, y, w, h);
  ctx.restore();
}

function bar(ctx, x, y, w, h, color, r = h / 2) {
  ctx.fillStyle = color;
  rr(ctx, x, y, w, h, r);
  ctx.fill();
}

const mocks = {
  // A screenshot sitting on a padded gradient backdrop: what Lumishot produces.
  lumishot(ctx, x, y, w, h, accent) {
    const g = ctx.createLinearGradient(x, y, x + w, y + h);
    g.addColorStop(0, accent);
    g.addColorStop(1, "#FF7AB6");
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);

    const cx = x + 110, cy = y + 70, cw = w - 220, ch = h - 190;
    ctx.save();
    ctx.shadowColor = "rgba(30, 10, 60, 0.35)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 18;
    rr(ctx, cx, cy, cw, ch, 18);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.restore();
    bar(ctx, cx + 36, cy + 40, cw * 0.42, 22, "#1B2130", 6);
    for (let i = 0; i < 4; i++) bar(ctx, cx + 36, cy + 92 + i * 34, cw * (0.8 - i * 0.12), 12, "#D7DCE5");
    bar(ctx, cx + 36, cy + ch - 70, 150, 40, accent, 10);

    // floating capture toolbar
    const tw = 420, tx = x + (w - tw) / 2, ty = y + h - 92;
    rr(ctx, tx, ty, tw, 60, 30);
    ctx.fillStyle = "rgba(20, 22, 34, 0.86)";
    ctx.fill();
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i === 0 ? "#FFFFFF" : "rgba(255,255,255,0.45)";
      rr(ctx, tx + 34 + i * 62, ty + 18, 24, 24, 6);
      ctx.fill();
    }
  },

  // Format wheel that opens at the cursor.
  tangerine(ctx, x, y, w, h, accent) {
    ctx.fillStyle = "#FBF7F2";
    ctx.fillRect(x, y, w, h);
    const formats = ["PNG", "JPG", "WEBP", "AVIF", "MP4", "GIF", "MP3", "WAV"];
    const cx = x + w / 2, cy = y + h / 2, ro = 250, ri = 96;
    formats.forEach((f, i) => {
      const a0 = (i / formats.length) * Math.PI * 2 - Math.PI / 2;
      const a1 = ((i + 1) / formats.length) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, ro, a0 + 0.02, a1 - 0.02);
      ctx.arc(cx, cy, ri + 10, a1 - 0.04, a0 + 0.04, true);
      ctx.closePath();
      ctx.fillStyle = i === 2 ? accent : "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "#EADFD2";
      ctx.lineWidth = 2;
      ctx.stroke();
      const am = (a0 + a1) / 2, rm = (ro + ri) / 2 + 6;
      ctx.fillStyle = i === 2 ? "#FFFFFF" : "#5A4A3A";
      ctx.font = `600 26px ${BODY}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(f, cx + Math.cos(am) * rm, cy + Math.sin(am) * rm);
    });
    ctx.beginPath();
    ctx.arc(cx, cy, ri, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `700 30px ${DISPLAY}`;
    ctx.fillText("photo.heic", cx, cy);
    ctx.textAlign = "left";
  },

  // Notes app: sections on the left, a note filed automatically on the right.
  notes(ctx, x, y, w, h, accent) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#F5F6F9";
    ctx.fillRect(x, y, 250, h);
    const sections = ["Frontend", "Backend", "DevOps", "DSA", "Study"];
    ctx.font = `500 24px ${BODY}`;
    ctx.textBaseline = "middle";
    sections.forEach((s, i) => {
      if (i === 0) bar(ctx, x + 16, y + 30 + i * 58, 218, 46, "#FFE3EA", 10);
      ctx.fillStyle = i === 0 ? accent : "#4A5266";
      ctx.fillText(s, x + 36, y + 53 + i * 58);
    });
    const px = x + 300;
    ctx.fillStyle = "#1B2130";
    ctx.font = `700 40px ${DISPLAY}`;
    ctx.fillText("useEffect cleanup", px, y + 64);
    bar(ctx, px, y + 104, 196, 36, accent, 18);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `600 19px ${BODY}`;
    ctx.fillText("Filed in Frontend", px + 18, y + 123);
    for (let i = 0; i < 7; i++) bar(ctx, px, y + 180 + i * 38, (w - 360) * (i % 3 === 2 ? 0.6 : 0.95), 13, "#DDE1E8");
    // chat answer bubble
    const bw = 430, bx = x + w - bw - 40, by = y + h - 140;
    rr(ctx, bx, by, bw, 96, 20);
    ctx.fillStyle = "#1B2130";
    ctx.fill();
    bar(ctx, bx + 26, by + 28, bw * 0.7, 12, "rgba(255,255,255,0.7)");
    bar(ctx, bx + 26, by + 56, bw * 0.45, 12, "rgba(255,255,255,0.4)");
  },
};

// Canvas text only uses a web font once it is loaded, so request the faces explicitly.
const fontsReady = document.fonts
  ? Promise.all([
      document.fonts.load(`700 40px ${DISPLAY}`),
      document.fonts.load(`600 22px ${BODY}`),
      document.fonts.load(`500 22px ${BODY}`),
    ]).catch(() => {})
  : Promise.resolve();

/**
 * Paints one project window onto `canvas`. Screenshots load async;
 * `onUpdate` runs after every repaint.
 */
export function paintPane(canvas, { name, pane }, onUpdate = () => {}) {
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext("2d");

  const paint = (img) => {
    ctx.clearRect(0, 0, TEX_W, TEX_H);
    drawChrome(ctx, name, pane.accent);
    withContent(ctx, (x, y, w, h) => {
      if (img) {
        // cover-fit, anchored to the top so the app header shows
        const s = Math.max(w / img.width, h / img.height);
        ctx.drawImage(img, x + (w - img.width * s) / 2, y, img.width * s, img.height * s);
      } else if (mocks[pane.mock]) {
        mocks[pane.mock](ctx, x, y, w, h, pane.accent);
      } else {
        ctx.fillStyle = "#EEF0F4";
        ctx.fillRect(x, y, w, h);
      }
    });
    onUpdate();
  };

  fontsReady.then(() => {
    paint(null);
    if (pane.image) loadImage(pane.image).then(paint).catch(() => {});
  });
}
