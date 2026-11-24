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

  // Vertical reel preview with a lyric caption and waveform.
  lyricreel(ctx, x, y, w, h, accent) {
    ctx.fillStyle = "#14101F";
    ctx.fillRect(x, y, w, h);
    const pw = h * 0.5, px = x + 90, py = y + 40, ph = h - 80;
    const g = ctx.createLinearGradient(px, py, px + pw, py + ph);
    g.addColorStop(0, accent);
    g.addColorStop(1, "#7C5CFF");
    rr(ctx, px, py, pw, ph, 26);
    ctx.fillStyle = g;
    ctx.fill();
    bar(ctx, px + 30, py + ph - 150, pw - 60, 30, "rgba(255,255,255,0.92)", 10);
    bar(ctx, px + 60, py + ph - 100, pw - 120, 22, "rgba(255,255,255,0.6)", 8);
    const wx = px + pw + 60, ww = x + w - wx - 60;
    for (let i = 0; i < 26; i++) {
      const bh = 30 + ((i * 53) % 90);
      bar(ctx, wx + (i * ww) / 26, y + h / 2 - bh / 2, Math.max(ww / 26 - 8, 6), bh, i < 11 ? accent : "rgba(255,255,255,0.3)", 4);
    }
    for (let i = 0; i < 3; i++) bar(ctx, wx, y + h - 120 + i * 30, ww * (0.9 - i * 0.2), 12, "rgba(255,255,255,0.25)", 6);
  },

  // Celebration page: balloons over a pastel backdrop with a candle cake.
  wishsite(ctx, x, y, w, h, accent) {
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, "#FFF1F5");
    g.addColorStop(1, "#FFD9E6");
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
    const cols = [accent, "#9BE3C5", "#FFD66B", "#B9A7FF"];
    for (let i = 0; i < 6; i++) {
      const bx = x + 90 + i * ((w - 180) / 5), by = y + 120 + ((i * 47) % 70);
      ctx.fillStyle = cols[i % cols.length];
      ctx.beginPath();
      ctx.ellipse(bx, by, 36, 46, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(60,40,60,0.35)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(bx, by + 46);
      ctx.lineTo(bx - 6, by + 120);
      ctx.stroke();
    }
    const cw = 300, cx = x + (w - cw) / 2, cy = y + h - 190;
    rr(ctx, cx, cy, cw, 120, 20);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    bar(ctx, cx, cy + 30, cw, 22, accent, 10);
    for (let i = 0; i < 3; i++) {
      bar(ctx, cx + 70 + i * 80, cy - 46, 14, 46, "#FFFFFF", 4);
      ctx.fillStyle = "#FFB020";
      ctx.beginPath();
      ctx.ellipse(cx + 77 + i * 80, cy - 58, 9, 14, 0, 0, Math.PI * 2);
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

  // Vulnerability dashboard: severity tiles, a trend chart and a findings list.
  vmaas(ctx, x, y, w, h, accent) {
    ctx.fillStyle = "#0F1524";
    ctx.fillRect(x, y, w, h);
    const sev = [
      ["Critical", "#E5484D", "12"],
      ["High", "#F76B15", "48"],
      ["Medium", "#F2C94C", "131"],
      ["Low", "#3E9BFF", "306"],
    ];
    const tw = (w - 60 - 3 * 18) / 4;
    ctx.textBaseline = "alphabetic";
    sev.forEach(([label, color, n], i) => {
      const tx = x + 30 + i * (tw + 18);
      bar(ctx, tx, y + 28, tw, 120, "#182036", 14);
      bar(ctx, tx, y + 28, 6, 120, color, 3);
      ctx.fillStyle = "#9AA5BF";
      ctx.font = `500 21px ${BODY}`;
      ctx.fillText(label, tx + 24, y + 66);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = `700 46px ${DISPLAY}`;
      ctx.fillText(n, tx + 24, y + 124);
    });
    // stacked risk bars
    const cy = y + 180, ch = h - 210, cw = w * 0.56;
    bar(ctx, x + 30, cy, cw, ch, "#182036", 14);
    for (let i = 0; i < 12; i++) {
      const bx = x + 60 + i * ((cw - 60) / 12);
      const total = 60 + ((i * 37) % 130) + i * 6;
      let top = cy + ch - 30;
      [["#3E9BFF", 0.45], ["#F2C94C", 0.3], ["#F76B15", 0.17], [accent, 0.08]].forEach(([c, f]) => {
        const hh = total * f;
        ctx.fillStyle = c;
        ctx.fillRect(bx, top - hh, 22, hh);
        top -= hh;
      });
    }
    // findings list
    const lx = x + 50 + cw, lw = w - cw - 80;
    for (let i = 0; i < 6; i++) {
      const ly = cy + i * ((ch - 6) / 6);
      bar(ctx, lx, ly, lw, ch / 6 - 12, "#182036", 10);
      bar(ctx, lx + 16, ly + 18, 12, 12, sev[i % 4][1], 6);
      bar(ctx, lx + 42, ly + 19, lw * (0.65 - (i % 3) * 0.12), 10, "#3A4560");
    }
  },

  // Log stream with a fired alert.
  shieldguard(ctx, x, y, w, h, accent) {
    ctx.fillStyle = "#0C1210";
    ctx.fillRect(x, y, w, h);
    ctx.font = `500 20px ${BODY}`;
    ctx.textBaseline = "middle";
    const levels = [["INFO", "#5C7A6E"], ["INFO", "#5C7A6E"], ["WARN", "#F2C94C"], ["INFO", "#5C7A6E"], ["ERROR", "#E5484D"], ["INFO", "#5C7A6E"], ["INFO", "#5C7A6E"], ["WARN", "#F2C94C"], ["INFO", "#5C7A6E"], ["ERROR", "#E5484D"], ["INFO", "#5C7A6E"]];
    levels.forEach(([lv, c], i) => {
      const ly = y + 40 + i * 50;
      ctx.fillStyle = "#3D5249";
      ctx.fillText(`10:42:${String(10 + i * 3).padStart(2, "0")}`, x + 30, ly);
      ctx.fillStyle = c;
      ctx.fillText(lv, x + 150, ly);
      bar(ctx, x + 240, ly - 5, (w - 300) * (0.35 + ((i * 29) % 50) / 100), 10, "#1E2B26");
    });
    // alert card
    const aw = 420, ax = x + w - aw - 34, ay = y + 40;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 30;
    rr(ctx, ax, ay, aw, 170, 16);
    ctx.fillStyle = "#15201B";
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    rr(ctx, ax, ay, aw, 170, 16);
    ctx.stroke();
    bar(ctx, ax + 24, ay + 26, 120, 34, accent, 17);
    ctx.fillStyle = "#06120C";
    ctx.font = `700 19px ${BODY}`;
    ctx.fillText("Alert fired", ax + 38, ay + 44);
    ctx.fillStyle = "#E6F2EC";
    ctx.font = `700 28px ${DISPLAY}`;
    ctx.fillText("5 failed logins in 1 min", ax + 24, ay + 98);
    bar(ctx, ax + 24, ay + 132, aw * 0.55, 10, "#2D3F37");
  },

  // Workshop job board: columns of job cards.
  autorox(ctx, x, y, w, h, accent) {
    ctx.fillStyle = "#F6F4EF";
    ctx.fillRect(x, y, w, h);
    const cols = ["Checked in", "In service", "Ready"];
    const cw = (w - 80) / 3;
    ctx.textBaseline = "middle";
    cols.forEach((c, i) => {
      const cx = x + 20 + i * (cw + 20);
      ctx.fillStyle = "#3D3A33";
      ctx.font = `600 24px ${BODY}`;
      ctx.fillText(c, cx + 6, y + 40);
      const n = [3, 4, 2][i];
      for (let j = 0; j < n; j++) {
        const cy = y + 72 + j * 120;
        bar(ctx, cx, cy, cw, 104, "#FFFFFF", 12);
        bar(ctx, cx, cy, 6, 104, i === 1 ? accent : i === 2 ? "#2BB673" : "#B9B3A6", 3);
        ctx.fillStyle = "#1B2130";
        ctx.font = `700 22px ${DISPLAY}`;
        ctx.fillText(`MP 09 ${["AB", "CK", "DT", "ZX"][(i + j) % 4]} ${1200 + i * 311 + j * 87}`, cx + 22, cy + 32);
        bar(ctx, cx + 22, cy + 58, cw * 0.6, 10, "#DDD8CC");
        bar(ctx, cx + 22, cy + 78, cw * 0.4, 10, "#ECE8DF");
      }
    });
  },

  // Product grid with filters.
  shop(ctx, x, y, w, h, accent) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#F4F2F8";
    ctx.fillRect(x, y, 220, h);
    for (let i = 0; i < 8; i++) {
      bar(ctx, x + 24, y + 34 + i * 44, 18, 18, i < 2 ? accent : "#D6D1E3", 4);
      bar(ctx, x + 54, y + 38 + i * 44, 110 - (i % 3) * 20, 10, "#C9C3D9");
    }
    const gx = x + 250, gw = w - 280;
    bar(ctx, gx, y + 24, gw, 44, "#F4F2F8", 22);
    const cw = (gw - 2 * 20) / 3;
    const palette = ["#E9E1F9", "#FCE7D6", "#DDF1EA", "#E3ECFB", "#FBE1E8", "#EFEAD8"];
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 3; c++) {
        const px = gx + c * (cw + 20), py = y + 92 + r * 260;
        bar(ctx, px, py, cw, 170, palette[r * 3 + c], 14);
        bar(ctx, px, py + 186, cw * 0.75, 12, "#CFCAD9");
        ctx.fillStyle = "#1B2130";
        ctx.font = `700 24px ${DISPLAY}`;
        ctx.textBaseline = "middle";
        ctx.fillText(`₹${(1499 + r * 1200 + c * 350).toLocaleString("en-IN")}`, px, py + 226);
      }
    }
    bar(ctx, gx + gw - 150, y + 26, 140, 40, accent, 20);
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
