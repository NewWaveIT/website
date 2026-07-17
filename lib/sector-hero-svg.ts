/* Animated sector/service hero backdrops — geport uit ui_kits/website/sector-hero.js.
   Genereert een SVG-string per thema; de keyframes staan in globals.css.
   Thema's: publiek | mobiliteit | banken | zorg | manufacturing | mendix | ai |
   strategie | sectoren | diensten | klantverhalen | inzichten */

const LINE = "rgba(244,241,234,0.22)";
const LINE_SOFT = "rgba(244,241,234,0.12)";
const FILL = "rgba(244,241,234,0.10)";
const FILL_MED = "rgba(244,241,234,0.16)";
const ORANGE = "#F15822";
const ORANGE_SOFT = "rgba(241,88,34,0.85)";
const INK = "#2E251A";

function svg(inner: string): string {
  return (
    '<svg viewBox="0 0 800 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
    inner +
    "</svg>"
  );
}

function car(roadY: number, dur: number, delay: number, accent: boolean, scale?: number): string {
  const body = accent ? ORANGE : FILL_MED;
  const strokeAttr = accent ? "" : ' stroke="rgba(244,241,234,0.5)" stroke-width="1.5"';
  return (
    '<g style="animation:tnw-drive ' + dur + "s linear " + delay + 's infinite">' +
    '<g transform="translate(0 ' + roadY + ") scale(" + (scale || 1) + ')">' +
    '<rect x="0" y="-38" width="96" height="26" rx="12" fill="' + body + '"' + strokeAttr + "/>" +
    '<rect x="20" y="-54" width="46" height="22" rx="9" fill="' + body + '"' + strokeAttr + "/>" +
    '<circle cx="26" cy="-11" r="10" fill="' + INK + '" stroke="rgba(244,241,234,0.55)" stroke-width="2.5"/>' +
    '<circle cx="72" cy="-11" r="10" fill="' + INK + '" stroke="rgba(244,241,234,0.55)" stroke-width="2.5"/>' +
    '<circle cx="95" cy="-27" r="3.5" fill="' + (accent ? "#fff" : ORANGE_SOFT) + '"/>' +
    "</g></g>"
  );
}

function mobiliteit(): string {
  const roads = [225, 360, 495];
  let s = roads
    .map(
      (y) =>
        '<line x1="-40" y1="' + y + '" x2="840" y2="' + y + '" stroke="' + LINE + '" stroke-width="2"/>' +
        '<line x1="-40" y1="' + (y - 68) + '" x2="840" y2="' + (y - 68) + '" stroke="' + LINE_SOFT + '" stroke-width="2" stroke-dasharray="34 26" style="animation:tnw-dash 1.6s linear infinite"/>',
    )
    .join("");
  s += car(roads[0], 11, -3, false, 0.9);
  s += car(roads[0], 11, -8.5, false, 0.9);
  s += car(roads[1], 8, -1, true, 1);
  s += car(roads[1], 8, -5.2, false, 1);
  s += car(roads[2], 14, -6, false, 1.05);
  s += car(roads[2], 14, -12.5, false, 1.05);
  return svg(s);
}

function publiek(): string {
  const base = 560;
  const builds = [
    { x: 40, w: 118, h: 300 }, { x: 178, w: 96, h: 400 }, { x: 294, w: 140, h: 250 },
    { x: 454, w: 104, h: 452 }, { x: 578, w: 128, h: 336 }, { x: 726, w: 90, h: 270 },
  ];
  let s = "";
  builds.forEach((b, bi) => {
    s += '<rect x="' + b.x + '" y="' + (base - b.h) + '" width="' + b.w + '" height="' + b.h + '" rx="4" fill="' + FILL + '" stroke="' + LINE + '" stroke-width="1.5"/>';
    const cols = Math.floor((b.w - 20) / 26), rows = Math.floor((b.h - 26) / 32);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wx = b.x + 14 + c * 26, wy = base - b.h + 16 + r * 32;
        const k = (bi * 7 + r * 5 + c * 11) % 9;
        if (k < 2) {
          s += '<rect x="' + wx + '" y="' + wy + '" width="12" height="15" rx="2" fill="' + (k === 0 ? ORANGE_SOFT : "rgba(244,241,234,0.7)") + '" style="animation:tnw-twinkle ' + (3 + k) + "s ease-in-out " + (((bi + r + c) * 0.7) % 4) + 's infinite"/>';
        } else {
          s += '<rect x="' + wx + '" y="' + wy + '" width="12" height="15" rx="2" fill="rgba(244,241,234,0.16)"/>';
        }
      }
    }
  });
  s += '<line x1="506" y1="108" x2="506" y2="62" stroke="' + LINE + '" stroke-width="2.5"/>' +
    '<path d="M506 62 h38 l-9 10 9 10 h-38 z" fill="' + ORANGE + '" style="transform-box:view-box;transform-origin:506px 62px;animation:tnw-flag 2.6s ease-in-out infinite"/>';
  s += '<g style="animation:tnw-drift 44s linear -12s infinite"><g transform="translate(0 60)">' +
    '<ellipse cx="0" cy="0" rx="46" ry="16" fill="' + FILL + '"/><ellipse cx="34" cy="-8" rx="30" ry="13" fill="' + FILL + '"/></g></g>';
  return svg(s);
}

function banken(): string {
  let s = '<line x1="50" y1="486" x2="760" y2="486" stroke="' + LINE + '" stroke-width="2"/>';
  const bars = [140, 200, 170, 250, 230, 310, 360];
  bars.forEach((h, i) => {
    const x = 78 + i * 96;
    s += '<rect x="' + x + '" y="' + (486 - h) + '" width="52" height="' + h + '" rx="6" fill="' + (i === bars.length - 1 ? "rgba(241,88,34,0.28)" : FILL) + '" stroke="' + (i === bars.length - 1 ? ORANGE_SOFT : LINE) + '" stroke-width="1.5" style="transform-box:view-box;transform-origin:' + (x + 26) + "px 486px;animation:tnw-bar " + (3 + (i % 3)) + "s ease-in-out " + i * 0.4 + 's infinite alternate"/>';
  });
  const path = "M60 420 L156 372 L252 396 L348 316 L444 342 L540 250 L636 268 L732 150";
  s += '<path d="' + path + '" fill="none" stroke="' + ORANGE + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" style="animation:tnw-draw 7s ease-in-out infinite"/>';
  s += '<circle cx="732" cy="150" r="8" fill="' + ORANGE + '" style="animation:tnw-blink 7s ease-in-out infinite"/>' +
    '<circle cx="732" cy="150" r="8" fill="none" stroke="' + ORANGE_SOFT + '" stroke-width="2" style="transform-box:fill-box;transform-origin:center;animation:tnw-ring 7s ease-out infinite"/>';
  return svg(s);
}

function zorg(): string {
  const ecg = "M-20 330 L200 330 L232 330 L250 272 L276 392 L296 296 L316 330 L470 330 L500 330 L518 282 L542 380 L560 306 L578 330 L840 330";
  let s = '<path d="' + ecg + '" fill="none" stroke="' + LINE + '" stroke-width="2"/>' +
    '<path d="' + ecg + '" fill="none" stroke="' + ORANGE + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" pathLength="1000" stroke-dasharray="90 910" style="animation:tnw-ecg 3.4s linear infinite"/>';
  s += '<g style="transform-box:view-box;transform-origin:620px 150px;animation:tnw-beat 1.7s ease-in-out infinite">' +
    '<circle cx="620" cy="150" r="52" fill="' + FILL + '" stroke="' + LINE + '" stroke-width="2"/>' +
    '<rect x="612" y="122" width="16" height="56" rx="5" fill="' + ORANGE + '"/>' +
    '<rect x="592" y="142" width="56" height="16" rx="5" fill="' + ORANGE + '"/></g>';
  s += '<circle cx="620" cy="150" r="52" fill="none" stroke="' + ORANGE_SOFT + '" stroke-width="2" style="transform-box:fill-box;transform-origin:center;animation:tnw-ring 1.7s ease-out infinite"/>';
  for (let i = 0; i < 5; i++) {
    s += '<circle cx="' + (140 + i * 130) + '" cy="472" r="5" fill="rgba(244,241,234,0.35)" style="transform-box:fill-box;transform-origin:center;animation:tnw-nodepulse ' + (2.4 + i * 0.3) + "s ease-in-out " + i * 0.5 + 's infinite"/>';
  }
  return svg(s);
}

function gear(cx: number, cy: number, r: number, teeth: number, dur: number, rev: boolean, accent: boolean): string {
  let s = '<g style="transform-box:view-box;transform-origin:' + cx + "px " + cy + "px;animation:" + (rev ? "tnw-spin-rev" : "tnw-spin") + " " + dur + 's linear infinite">';
  for (let i = 0; i < teeth; i++) {
    const a = (360 / teeth) * i;
    s += '<rect x="' + (cx - 7) + '" y="' + (cy - r - 13) + '" width="14" height="18" rx="3" fill="' + (accent ? ORANGE : FILL_MED) + '" transform="rotate(' + a + " " + cx + " " + cy + ')"/>';
  }
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (accent ? "rgba(241,88,34,0.22)" : FILL) + '" stroke="' + (accent ? ORANGE : LINE) + '" stroke-width="2.5"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r * 0.35 + '" fill="' + INK + '" stroke="' + (accent ? ORANGE_SOFT : LINE) + '" stroke-width="2.5"/></g>';
  return s;
}

function manufacturing(): string {
  let s = gear(540, 190, 74, 10, 16, false, false) + gear(654, 282, 50, 8, 10.7, true, true) + gear(430, 280, 42, 8, 9, true, false);
  s += '<line x1="-40" y1="482" x2="840" y2="482" stroke="' + LINE + '" stroke-width="2.5"/>' +
    '<line x1="-40" y1="482" x2="840" y2="482" stroke="' + LINE_SOFT + '" stroke-width="8" stroke-dasharray="18 30" style="animation:tnw-dash 1.4s linear infinite"/>';
  [0, -3.4, -6.8].forEach((d, i) => {
    s += '<g style="animation:tnw-belt 10s linear ' + d + 's infinite"><g transform="translate(0 482)">' +
      '<rect x="0" y="-52" width="50" height="46" rx="6" fill="' + (i === 1 ? "rgba(241,88,34,0.3)" : FILL_MED) + '" stroke="' + (i === 1 ? ORANGE_SOFT : LINE) + '" stroke-width="2"/>' +
      '<line x1="10" y1="-30" x2="40" y2="-30" stroke="' + (i === 1 ? ORANGE_SOFT : LINE) + '" stroke-width="2"/></g></g>';
  });
  return svg(s);
}

function mendix(): string {
  let s = '<rect x="150" y="88" width="510" height="392" rx="14" fill="none" stroke="' + LINE + '" stroke-width="2.5"/>' +
    '<line x1="150" y1="140" x2="660" y2="140" stroke="' + LINE + '" stroke-width="2"/>' +
    '<circle cx="180" cy="114" r="5" fill="' + ORANGE_SOFT + '"/><circle cx="202" cy="114" r="5" fill="' + LINE + '"/><circle cx="224" cy="114" r="5" fill="' + LINE + '"/>';
  const blocks: [number, number, number, number, boolean][] = [
    [186, 176, 200, 84, false], [402, 176, 110, 84, true], [528, 176, 96, 84, false],
    [186, 276, 110, 84, true], [312, 276, 200, 84, false], [528, 276, 96, 84, false],
    [186, 376, 148, 68, false], [350, 376, 148, 68, false], [514, 376, 110, 68, true],
  ];
  blocks.forEach((b, i) => {
    s += '<rect x="' + b[0] + '" y="' + b[1] + '" width="' + b[2] + '" height="' + b[3] + '" rx="8" fill="' + (b[4] ? "rgba(241,88,34,0.3)" : FILL) + '" stroke="' + (b[4] ? ORANGE_SOFT : LINE) + '" stroke-width="1.5" style="animation:tnw-block 8s ease ' + i * 0.45 + 's infinite both"/>';
  });
  return svg(s);
}

function ai(): string {
  const cx = 420, cy = 280;
  const nodes: [number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const a = ((Math.PI * 2) / 8) * i - Math.PI / 2;
    nodes.push([cx + Math.cos(a) * 185, cy + Math.sin(a) * 165]);
  }
  const outer: [number, number][] = [[130, 90], [700, 120], [720, 450], [150, 470]];
  let s = "";
  nodes.forEach((n, i) => {
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + n[0] + '" y2="' + n[1] + '" stroke="' + LINE_SOFT + '" stroke-width="1.5"/>' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + n[0] + '" y2="' + n[1] + '" stroke="' + ORANGE_SOFT + '" stroke-width="3" stroke-linecap="round" pathLength="100" stroke-dasharray="12 100" style="animation:tnw-linepulse ' + (3.5 + (i % 3) * 0.6) + "s linear " + i * 0.55 + 's infinite"/>';
  });
  outer.forEach((o, i) => {
    const n = nodes[[7, 1, 3, 5][i]];
    s += '<line x1="' + n[0] + '" y1="' + n[1] + '" x2="' + o[0] + '" y2="' + o[1] + '" stroke="' + LINE_SOFT + '" stroke-width="1.5"/>' +
      '<circle cx="' + o[0] + '" cy="' + o[1] + '" r="6" fill="rgba(244,241,234,0.4)" style="transform-box:fill-box;transform-origin:center;animation:tnw-nodepulse ' + (2.8 + i * 0.4) + "s ease-in-out " + i * 0.7 + 's infinite"/>';
  });
  nodes.forEach((n, i) => {
    s += '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="9" fill="' + FILL_MED + '" stroke="' + LINE + '" stroke-width="2" style="transform-box:fill-box;transform-origin:center;animation:tnw-nodepulse ' + (3 + (i % 4) * 0.4) + "s ease-in-out " + i * 0.4 + 's infinite"/>';
  });
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="22" fill="' + ORANGE + '"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="22" fill="none" stroke="' + ORANGE_SOFT + '" stroke-width="2.5" style="transform-box:fill-box;transform-origin:center;animation:tnw-ring 3s ease-out infinite"/>';
  return svg(s);
}

function strategie(): string {
  const path = "M40 500 C 190 500 170 356 330 348 C 450 342 440 226 570 214 C 650 206 680 140 730 118";
  let s = '<path d="' + path + '" fill="none" stroke="' + LINE + '" stroke-width="2" stroke-dasharray="7 11"/>' +
    '<path d="' + path + '" fill="none" stroke="' + ORANGE + '" stroke-width="4" stroke-linecap="round" pathLength="100" stroke-dasharray="100 100" style="animation:tnw-draw 9s ease-in-out infinite"/>';
  const stops: [number, number, number][] = [[40, 500, 0.2], [330, 348, 1.6], [570, 214, 3.2], [730, 118, 4.6]];
  stops.forEach((p, i) => {
    s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11" fill="' + INK + '" stroke="' + (i === stops.length - 1 ? ORANGE : "rgba(244,241,234,0.6)") + '" stroke-width="3.5" style="transform-box:fill-box;transform-origin:center;animation:tnw-pop 9s ease ' + p[2] + 's infinite"/>';
  });
  s += '<g style="transform-box:view-box;transform-origin:730px 118px;animation:tnw-pop 9s ease 4.6s infinite">' +
    '<line x1="730" y1="106" x2="730" y2="46" stroke="rgba(244,241,234,0.6)" stroke-width="3"/>' +
    '<path d="M730 46 h44 l-10 12 10 12 h-44 z" fill="' + ORANGE + '"/></g>';
  stops.forEach((p, i) => {
    s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="11" fill="none" stroke="' + ORANGE_SOFT + '" stroke-width="2" style="transform-box:fill-box;transform-origin:center;animation:tnw-ring 9s ease-out ' + (0.6 + i * 1.6) + 's infinite"/>';
  });
  return svg(s);
}

function sectoren(): string {
  const cx = 430, cy = 290;
  const nodes: [number, number][] = [[430, 96], [652, 196], [630, 442], [230, 452], [204, 166]];
  let s = "";
  nodes.forEach((n, i) => {
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + n[0] + '" y2="' + n[1] + '" stroke="' + LINE_SOFT + '" stroke-width="1.5"/>' +
      '<line x1="' + cx + '" y1="' + cy + '" x2="' + n[0] + '" y2="' + n[1] + '" stroke="' + ORANGE_SOFT + '" stroke-width="3" stroke-linecap="round" pathLength="100" stroke-dasharray="12 100" style="animation:tnw-linepulse ' + (3.6 + (i % 3) * 0.7) + "s linear " + i * 0.8 + 's infinite"/>';
  });
  const glyphs = [
    '<rect x="-13" y="-6" width="26" height="20" rx="2" fill="none" stroke="' + LINE + '" stroke-width="2"/><rect x="-6" y="-16" width="12" height="10" fill="none" stroke="' + LINE + '" stroke-width="2"/><rect x="-3" y="4" width="6" height="10" fill="' + ORANGE_SOFT + '"/>',
    '<rect x="-15" y="-4" width="30" height="10" rx="4" fill="none" stroke="' + LINE + '" stroke-width="2"/><rect x="-8" y="-11" width="15" height="8" rx="3" fill="none" stroke="' + LINE + '" stroke-width="2"/><circle cx="-7" cy="8" r="3.5" fill="' + ORANGE_SOFT + '"/><circle cx="8" cy="8" r="3.5" fill="' + ORANGE_SOFT + '"/>',
    '<rect x="-14" y="0" width="7" height="14" fill="none" stroke="' + LINE + '" stroke-width="2"/><rect x="-3" y="-7" width="7" height="21" fill="none" stroke="' + LINE + '" stroke-width="2"/><rect x="8" y="-14" width="7" height="28" fill="' + ORANGE_SOFT + '"/>',
    '<rect x="-4" y="-13" width="8" height="26" rx="2" fill="' + ORANGE_SOFT + '"/><rect x="-13" y="-4" width="26" height="8" rx="2" fill="' + ORANGE_SOFT + '"/>',
    '<circle cx="0" cy="0" r="9" fill="none" stroke="' + LINE + '" stroke-width="2"/><circle cx="0" cy="0" r="3" fill="' + ORANGE_SOFT + '"/><g stroke="' + LINE + '" stroke-width="2"><line x1="0" y1="-13" x2="0" y2="-9"/><line x1="0" y1="9" x2="0" y2="13"/><line x1="-13" y1="0" x2="-9" y2="0"/><line x1="9" y1="0" x2="13" y2="0"/><line x1="-9" y1="-9" x2="-6.5" y2="-6.5"/><line x1="6.5" y1="6.5" x2="9" y2="9"/><line x1="-9" y1="9" x2="-6.5" y2="6.5"/><line x1="6.5" y1="-6.5" x2="9" y2="-9"/></g>',
  ];
  nodes.forEach((n, i) => {
    s += '<g style="transform-box:fill-box;transform-origin:center;animation:tnw-nodepulse ' + (3.4 + (i % 3) * 0.5) + "s ease-in-out " + i * 0.6 + 's infinite"><circle cx="' + n[0] + '" cy="' + n[1] + '" r="36" fill="' + FILL + '" stroke="' + LINE + '" stroke-width="2"/></g>' +
      '<g transform="translate(' + n[0] + " " + n[1] + ')">' + glyphs[i] + "</g>" +
      '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="36" fill="none" stroke="' + ORANGE_SOFT + '" stroke-width="2" style="transform-box:fill-box;transform-origin:center;animation:tnw-ring ' + (5 + i) + "s ease-out " + i * 0.9 + 's infinite"/>';
  });
  s += '<circle cx="' + cx + '" cy="' + cy + '" r="20" fill="' + ORANGE + '"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="20" fill="none" stroke="' + ORANGE_SOFT + '" stroke-width="2.5" style="transform-box:fill-box;transform-origin:center;animation:tnw-ring 3s ease-out infinite"/>';
  return svg(s);
}

function diensten(): string {
  const c: [number, number][] = [[430, 200], [320, 372], [545, 372]];
  let s = "";
  c.forEach((a, i) => {
    const b = c[(i + 1) % 3];
    s += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + LINE_SOFT + '" stroke-width="1.5"/>' +
      '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + ORANGE_SOFT + '" stroke-width="3" stroke-linecap="round" pathLength="100" stroke-dasharray="14 100" style="animation:tnw-linepulse ' + (4 + i * 0.6) + "s linear " + i * 1.1 + 's infinite"/>';
  });
  s += '<circle cx="430" cy="200" r="86" fill="' + FILL + '" stroke="' + LINE + '" stroke-width="2"/>' +
    ['<rect x="398" y="168" width="30" height="22" rx="4"', '<rect x="434" y="168" width="30" height="22" rx="4"', '<rect x="398" y="196" width="66" height="22" rx="4"']
      .map((r, i) => r + ' fill="' + (i === 2 ? "rgba(241,88,34,0.35)" : FILL_MED) + '" stroke="' + (i === 2 ? ORANGE_SOFT : LINE) + '" stroke-width="1.5" style="animation:tnw-block 6s ease ' + i * 0.5 + 's infinite both"/>')
      .join("");
  s += '<circle cx="320" cy="372" r="86" fill="' + FILL + '" stroke="' + LINE + '" stroke-width="2"/>';
  ([[320, 332], [284, 396], [356, 396]] as [number, number][]).forEach((n, i) => {
    s += '<line x1="320" y1="372" x2="' + n[0] + '" y2="' + n[1] + '" stroke="' + LINE + '" stroke-width="1.5"/>' +
      '<circle cx="' + n[0] + '" cy="' + n[1] + '" r="7" fill="' + FILL_MED + '" stroke="' + LINE + '" stroke-width="2" style="transform-box:fill-box;transform-origin:center;animation:tnw-nodepulse ' + (2.6 + i * 0.4) + "s ease-in-out " + i * 0.5 + 's infinite"/>';
  });
  s += '<circle cx="320" cy="372" r="9" fill="' + ORANGE + '"/>';
  s += '<circle cx="545" cy="372" r="86" fill="' + FILL + '" stroke="' + LINE + '" stroke-width="2"/>' +
    '<path d="M505 412 C 525 412 520 380 545 376 C 566 373 564 350 578 344" fill="none" stroke="' + LINE + '" stroke-width="2" stroke-dasharray="5 7"/>' +
    '<line x1="578" y1="344" x2="578" y2="316" stroke="rgba(244,241,234,0.6)" stroke-width="2.5"/>' +
    '<path d="M578 316 h26 l-6 7 6 7 h-26 z" fill="' + ORANGE + '" style="transform-box:view-box;transform-origin:578px 316px;animation:tnw-flag 2.6s ease-in-out infinite"/>';
  s += '<circle cx="430" cy="318" r="14" fill="' + ORANGE + '"/>' +
    '<circle cx="430" cy="318" r="14" fill="none" stroke="' + ORANGE_SOFT + '" stroke-width="2.5" style="transform-box:fill-box;transform-origin:center;animation:tnw-ring 3.2s ease-out infinite"/>';
  return svg(s);
}

function klantverhalen(): string {
  let s = '<line x1="60" y1="496" x2="760" y2="496" stroke="' + LINE + '" stroke-width="2"/>';
  const path = "M70 470 L200 430 L330 448 L460 366 L590 388 L730 270";
  s += '<path d="' + path + '" fill="none" stroke="' + ORANGE + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" pathLength="100" stroke-dasharray="100 100" style="animation:tnw-draw 8s ease-in-out infinite"/>' +
    '<circle cx="730" cy="270" r="8" fill="' + ORANGE + '" style="animation:tnw-blink 8s ease-in-out infinite"/>';
  const bubbles: [number, number, number, number][] = [[210, 190, 1, 0.4], [470, 120, 1.15, 2.4], [640, 210, 0.9, 4.4]];
  bubbles.forEach((b) => {
    s += '<g style="transform-box:view-box;transform-origin:' + b[0] + "px " + b[1] + 'px;animation:tnw-pop 8s ease ' + b[3] + 's infinite">' +
      '<g transform="translate(' + b[0] + " " + b[1] + ") scale(" + b[2] + ')">' +
      '<rect x="-70" y="-46" width="140" height="78" rx="14" fill="' + FILL + '" stroke="' + LINE + '" stroke-width="2"/>' +
      '<path d="M-30 32 l-8 22 l26 -22 z" fill="' + FILL + '" stroke="' + LINE + '" stroke-width="2"/>' +
      '<text x="-48" y="6" fill="' + ORANGE + '" font-family="Georgia,serif" font-size="52" font-weight="bold">“</text>' +
      '<line x1="-12" y1="-14" x2="46" y2="-14" stroke="' + LINE + '" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="-12" y1="2" x2="32" y2="2" stroke="' + LINE_SOFT + '" stroke-width="3" stroke-linecap="round"/>' +
      "</g></g>";
  });
  for (let i = 0; i < 5; i++) {
    const x = 300 + i * 44;
    s += '<path transform="translate(' + x + ' 300) scale(1.5)" d="M0,-9 L2.6,-2.8 L9.4,-2.8 L4,1.4 L6,8 L0,4 L-6,8 L-4,1.4 L-9.4,-2.8 L-2.6,-2.8 Z" fill="' + (i < 4 ? ORANGE : "none") + '" stroke="' + ORANGE_SOFT + '" stroke-width="1.5" style="transform-box:fill-box;transform-origin:center;animation:tnw-twinkle ' + (3 + i * 0.4) + "s ease-in-out " + i * 0.35 + 's infinite"/>';
  }
  return svg(s);
}

function inzichten(): string {
  let s = "";
  for (let i = 0; i < 8; i++) {
    const a = ((Math.PI * 2) / 8) * i;
    const x1 = 560 + Math.cos(a) * 92, y1 = 210 + Math.sin(a) * 92;
    const x2 = 560 + Math.cos(a) * 122, y2 = 210 + Math.sin(a) * 122;
    s += '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + ORANGE_SOFT + '" stroke-width="3.5" stroke-linecap="round" style="animation:tnw-twinkle ' + (2.2 + (i % 4) * 0.5) + "s ease-in-out " + i * 0.3 + 's infinite"/>';
  }
  s += '<g style="transform-box:view-box;transform-origin:560px 210px;animation:tnw-beat 3.4s ease-in-out infinite">' +
    '<circle cx="560" cy="210" r="62" fill="' + FILL_MED + '" stroke="' + LINE + '" stroke-width="2.5"/>' +
    '<path d="M545 252 C 545 236 535 230 535 214 M575 252 C 575 236 585 230 585 214" fill="none" stroke="' + ORANGE + '" stroke-width="3.5" stroke-linecap="round"/>' +
    '<rect x="542" y="268" width="36" height="9" rx="4" fill="none" stroke="' + LINE + '" stroke-width="2.5"/>' +
    '<rect x="546" y="282" width="28" height="9" rx="4" fill="none" stroke="' + LINE + '" stroke-width="2.5"/></g>' +
    '<circle cx="560" cy="210" r="62" fill="none" stroke="' + ORANGE_SOFT + '" stroke-width="2" style="transform-box:fill-box;transform-origin:center;animation:tnw-ring 3.4s ease-out infinite"/>';
  const cards: [number, number, number][] = [[180, 130, 0], [255, 330, 1.6], [150, 452, 3.2], [420, 430, 4.8]];
  cards.forEach((c) => {
    s += '<g style="animation:tnw-block 9s ease ' + c[2] + 's infinite both"><g transform="translate(' + c[0] + " " + c[1] + ')">' +
      '<rect x="-62" y="-42" width="124" height="84" rx="10" fill="' + FILL + '" stroke="' + LINE + '" stroke-width="2"/>' +
      '<rect x="-46" y="-26" width="34" height="10" rx="5" fill="' + ORANGE_SOFT + '"/>' +
      '<line x1="-46" y1="0" x2="46" y2="0" stroke="' + LINE + '" stroke-width="3" stroke-linecap="round"/>' +
      '<line x1="-46" y1="16" x2="28" y2="16" stroke="' + LINE_SOFT + '" stroke-width="3" stroke-linecap="round"/>' +
      "</g></g>";
  });
  return svg(s);
}

const THEMES: Record<string, () => string> = {
  publiek, mobiliteit, banken, zorg, manufacturing, mendix, ai, strategie,
  sectoren, diensten, klantverhalen, inzichten,
};

export function buildHeroSvg(theme: string): string {
  const fn = THEMES[theme];
  return fn ? fn() : "";
}
