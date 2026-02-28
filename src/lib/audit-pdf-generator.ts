import { jsPDF } from "jspdf";

interface AuditSection {
  title: string;
  score: number;
  findings: string[];
  recommendations: string[];
}

export interface AuditPDFData {
  companyName: string;
  websiteUrl: string;
  userName: string;
  overallScore: number;
  executiveSummary: string;
  sections: {
    technical: AuditSection;
    seo: AuditSection;
    performance: AuditSection;
    content: AuditSection;
    conversion: AuditSection;
  };
  quickWins: string[];
  roadmap90Days: string[];
}

// Avorria brand palette
const C = {
  navy:     [28, 30, 38]   as [number, number, number],
  navyMid:  [38, 42, 56]   as [number, number, number],
  navyLight:[52, 56, 74]   as [number, number, number],
  accent:   [220, 60, 150] as [number, number, number],
  accentSoft:[240, 130, 190] as [number, number, number],
  text:     [32, 34, 42]   as [number, number, number],
  textSoft: [100, 105, 120] as [number, number, number],
  textMuted:[160, 165, 178] as [number, number, number],
  bg:       [248, 249, 252] as [number, number, number],
  bgCard:   [255, 255, 255] as [number, number, number],
  white:    [255, 255, 255] as [number, number, number],
  green:    [22, 163, 74]   as [number, number, number],
  yellow:   [202, 138, 4]   as [number, number, number],
  orange:   [234, 88, 12]   as [number, number, number],
  red:      [220, 38, 38]   as [number, number, number],
  emerald:  [5, 150, 105]   as [number, number, number],
  purple:   [124, 58, 237]  as [number, number, number],
  blue:     [59, 130, 246]  as [number, number, number],
  border:   [229, 231, 235] as [number, number, number],
};

const PW = 210;
const PH = 297;
const M = 20;
const CW = PW - M * 2;

function sc(s: number): [number, number, number] {
  if (s >= 80) return C.green;
  if (s >= 60) return C.yellow;
  if (s >= 40) return C.orange;
  return C.red;
}

function sl(s: number): string {
  if (s >= 80) return "Excellent";
  if (s >= 60) return "Good";
  if (s >= 40) return "Needs Work";
  return "Critical";
}

function grade(s: number): string {
  if (s >= 90) return "A+";
  if (s >= 80) return "A";
  if (s >= 70) return "B";
  if (s >= 60) return "C";
  if (s >= 50) return "D";
  return "F";
}

// ── WATERMARK: very light, large, thin ──
function watermark(pdf: jsPDF): void {
  pdf.saveGraphicsState();
  pdf.setTextColor(220, 222, 230);
  pdf.setFontSize(110);
  pdf.setFont("helvetica", "normal"); // light/thin weight
  pdf.setGState(new (pdf as any).GState({ opacity: 0.07 }));
  pdf.text("AVORRIA", PW / 2, PH / 2, { align: "center", angle: 40 });
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  pdf.restoreGraphicsState();
}

function footer(pdf: jsPDF): void {
  pdf.setDrawColor(...C.accent);
  pdf.setLineWidth(0.4);
  pdf.line(M, PH - 16, PW - M, PH - 16);
  pdf.setTextColor(...C.textMuted);
  pdf.setFontSize(6.5);
  pdf.setFont("helvetica", "normal");
  pdf.text("avorria.com", M, PH - 10);
  pdf.text("hello@avorria.com", PW - M, PH - 10, { align: "right" });
  const pn = (pdf as any).internal.getNumberOfPages();
  pdf.text(`${pn}`, PW / 2, PH - 10, { align: "center" });
}

function newPage(pdf: jsPDF): number {
  pdf.addPage();
  watermark(pdf);
  footer(pdf);
  return M + 8;
}

function space(pdf: jsPDF, y: number, need: number): number {
  if (y + need > PH - 24) return newPage(pdf);
  return y;
}

// ── DECORATIVE: corner accent dots ──
function cornerAccents(pdf: jsPDF): void {
  pdf.setFillColor(...C.accent);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.08 }));
  pdf.circle(PW - 8, 8, 30, "F");
  pdf.circle(8, PH - 8, 20, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
}

// ── RADAR CHART (pentagon) ──
function drawRadar(pdf: jsPDF, cx: number, cy: number, r: number, scores: number[], labels: string[]): void {
  const n = scores.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  // Grid rings
  for (let ring = 1; ring <= 4; ring++) {
    const rr = (ring / 4) * r;
    pdf.setDrawColor(215, 218, 228);
    pdf.setLineWidth(0.2);
    for (let i = 0; i < n; i++) {
      const a1 = startAngle + i * angleStep;
      const a2 = startAngle + ((i + 1) % n) * angleStep;
      pdf.line(cx + Math.cos(a1) * rr, cy + Math.sin(a1) * rr, cx + Math.cos(a2) * rr, cy + Math.sin(a2) * rr);
    }
  }

  // Spokes
  for (let i = 0; i < n; i++) {
    const a = startAngle + i * angleStep;
    pdf.setDrawColor(205, 210, 220);
    pdf.setLineWidth(0.15);
    pdf.line(cx, cy, cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }

  // Data polygon fill
  const pts: [number, number][] = scores.map((s, i) => {
    const a = startAngle + i * angleStep;
    const sr = (s / 100) * r;
    return [cx + Math.cos(a) * sr, cy + Math.sin(a) * sr];
  });
  
  pdf.setFillColor(...C.accent);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }));
  // Fill polygon manually via triangle fan
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    pdf.triangle(cx, cy, pts[i][0], pts[i][1], pts[j][0], pts[j][1], "F");
  }
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  // Data polygon outline
  pdf.setDrawColor(...C.accent);
  pdf.setLineWidth(0.8);
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    pdf.line(pts[i][0], pts[i][1], pts[j][0], pts[j][1]);
  }

  // Data points + score labels
  for (let i = 0; i < pts.length; i++) {
    pdf.setFillColor(...C.accent);
    pdf.circle(pts[i][0], pts[i][1], 1.5, "F");
    pdf.setFillColor(...C.white);
    pdf.circle(pts[i][0], pts[i][1], 0.7, "F");
  }

  // Labels at vertices
  for (let i = 0; i < n; i++) {
    const a = startAngle + i * angleStep;
    const lx = cx + Math.cos(a) * (r + 8);
    const ly = cy + Math.sin(a) * (r + 8);
    pdf.setTextColor(...C.text);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "bold");
    pdf.text(labels[i], lx, ly, { align: "center" });
    pdf.setTextColor(...sc(scores[i]));
    pdf.setFontSize(6.5);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${scores[i]}`, lx, ly + 4, { align: "center" });
  }
}

// ── DONUT CHART ──
function drawDonut(pdf: jsPDF, cx: number, cy: number, r: number, score: number): void {
  // Background ring
  const segments = 60;
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * 2 * Math.PI - Math.PI / 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    pdf.setFillColor(230, 232, 240);
    pdf.circle(x, y, 1.8, "F");
  }
  // Score ring
  const filled = Math.round((score / 100) * segments);
  const color = sc(score);
  for (let i = 0; i < filled; i++) {
    const a = (i / segments) * 2 * Math.PI - Math.PI / 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    pdf.setFillColor(...color);
    pdf.circle(x, y, 2, "F");
  }
  // Center circle
  pdf.setFillColor(...C.white);
  pdf.circle(cx, cy, r - 5, "F");
  // Score
  pdf.setTextColor(...color);
  pdf.setFontSize(22);
  pdf.setFont("helvetica", "bold");
  pdf.text(String(score), cx, cy + 2, { align: "center" });
  // Grade
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...C.textMuted);
  pdf.text(grade(score), cx, cy + 9, { align: "center" });
}

// ── PROGRESS BAR (refined) ──
function progressBar(pdf: jsPDF, x: number, y: number, w: number, score: number, label: string): number {
  const color = sc(score);
  pdf.setTextColor(...C.text);
  pdf.setFontSize(8.5);
  pdf.setFont("helvetica", "normal");
  pdf.text(label, x, y);
  pdf.setTextColor(...color);
  pdf.setFont("helvetica", "bold");
  pdf.text(`${score}`, x + w, y, { align: "right" });
  y += 3;
  // Track
  pdf.setFillColor(235, 237, 244);
  pdf.roundedRect(x, y, w, 4, 2, 2, "F");
  // Fill
  const fw = Math.max((score / 100) * w, 4);
  pdf.setFillColor(...color);
  pdf.roundedRect(x, y, fw, 4, 2, 2, "F");
  // Sheen
  pdf.setFillColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.35 }));
  pdf.roundedRect(x + 1, y + 0.5, fw * 0.5, 1.5, 0.75, 0.75, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  return y + 4;
}

// ── SECTION HEADER (light font, accent line) ──
function sectionTitle(pdf: jsPDF, y: number, title: string): number {
  pdf.setTextColor(...C.navy);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "normal"); // light font
  pdf.text(title, M, y);
  y += 2;
  // Accent underline
  pdf.setFillColor(...C.accent);
  pdf.rect(M, y, 40, 1.2, "F");
  pdf.setFillColor(...C.border);
  pdf.rect(M + 40, y + 0.3, CW - 40, 0.4, "F");
  return y + 8;
}

// ── BENCHMARK BAR ──
function benchmarkBar(pdf: jsPDF, x: number, y: number, w: number, score: number, avg: number): number {
  pdf.setFillColor(240, 241, 246);
  pdf.roundedRect(x, y, w, 6, 3, 3, "F");
  // Average marker
  const avgX = x + (avg / 100) * w;
  pdf.setFillColor(...C.textMuted);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.5 }));
  pdf.rect(avgX - 0.5, y - 2, 1, 10, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  // Score fill
  const fw = Math.max((score / 100) * w, 4);
  pdf.setFillColor(...sc(score));
  pdf.roundedRect(x, y, fw, 6, 3, 3, "F");
  // Labels
  pdf.setFontSize(5.5);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...C.textMuted);
  pdf.text(`Industry avg: ${avg}`, avgX, y + 12, { align: "center" });
  pdf.setTextColor(...sc(score));
  pdf.setFont("helvetica", "bold");
  pdf.text(`Your score: ${score}`, x + fw, y - 2, { align: "center" });
  return y + 16;
}

// ── CARD BOX ──
function cardBox(pdf: jsPDF, x: number, y: number, w: number, h: number): void {
  // Shadow
  pdf.setFillColor(0, 0, 0);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.04 }));
  pdf.roundedRect(x + 1, y + 1.5, w, h, 4, 4, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  // Card
  pdf.setFillColor(...C.bgCard);
  pdf.roundedRect(x, y, w, h, 4, 4, "F");
  // Top accent
  pdf.setFillColor(...C.accent);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.6 }));
  pdf.rect(x + 8, y, w - 16, 0.8, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
}

// ═══════════════════════════════════════
// MAIN GENERATOR
// ═══════════════════════════════════════
export async function generateAuditPDF(data: AuditPDFData): Promise<void> {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  let y = 0;

  // ── Load hero image ──
  let heroImg: string | null = null;
  try {
    const { default: src } = await import("@/assets/hero-penthouse.png");
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = rej; img.src = src; });
    // Use cover-fit: crop to A4 aspect ratio (210:297)
    const canvas = document.createElement("canvas");
    const targetAspect = PW / PH;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgAspect > targetAspect) {
      // Image wider: crop sides
      sw = img.naturalHeight * targetAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      // Image taller: crop top/bottom
      sh = img.naturalWidth / targetAspect;
      sy = (img.naturalHeight - sh) / 2;
    }
    canvas.width = 1200;
    canvas.height = Math.round(1200 / targetAspect);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    heroImg = canvas.toDataURL("image/jpeg", 0.92);
  } catch { /* fallback */ }

  // ═══════════════════════════════════════
  // COVER PAGE
  // ═══════════════════════════════════════
  if (heroImg) {
    pdf.addImage(heroImg, "JPEG", 0, 0, PW, PH);
  }

  // Dark gradient overlay (darker at bottom for text)
  pdf.setFillColor(20, 22, 30);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.55 }));
  pdf.rect(0, 0, PW, PH * 0.4, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 0.82 }));
  pdf.rect(0, PH * 0.4, PW, PH * 0.6, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  // Top accent line
  pdf.setFillColor(...C.accent);
  pdf.rect(0, 0, PW, 2.5, "F");

  // Decorative geometric accent (corner triangle)
  pdf.setFillColor(...C.accent);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.12 }));
  pdf.triangle(PW, 0, PW, 100, PW - 80, 0, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  // Brand mark
  pdf.setTextColor(...C.white);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.text("A V O R R I A", M, 28);
  pdf.setFontSize(6.5);
  pdf.setTextColor(180, 185, 200);
  pdf.text("DIGITAL MARKETING", M, 34);

  // Main title — light font weight
  y = 110;
  pdf.setTextColor(...C.white);
  pdf.setFontSize(42);
  pdf.setFont("helvetica", "normal"); // light
  pdf.text("Website &", M, y);
  pdf.text("SEO Audit", M, y + 18);

  // Accent bar
  pdf.setFillColor(...C.accent);
  pdf.rect(M, y + 23, 55, 1.5, "F");

  // Company details
  y += 38;
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...C.white);
  pdf.text(data.companyName, M, y);

  pdf.setFontSize(10);
  pdf.setTextColor(175, 180, 195);
  pdf.text(data.websiteUrl, M, y + 9);

  const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  pdf.setFontSize(8.5);
  pdf.setTextColor(150, 155, 172);
  pdf.text(`Prepared for ${data.userName}  ·  ${dateStr}`, M, y + 19);

  // Score card (bottom-right, frosted glass effect)
  const scX = PW - M - 65;
  const scY = PH - 100;

  // Frosted card bg
  pdf.setFillColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.1 }));
  pdf.roundedRect(scX, scY, 65, 70, 6, 6, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  // Border
  pdf.setDrawColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.2 }));
  pdf.setLineWidth(0.5);
  pdf.roundedRect(scX, scY, 65, 70, 6, 6, "S");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  // Score circle
  const scoreClr = sc(data.overallScore);
  pdf.setFillColor(...scoreClr);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.2 }));
  pdf.circle(scX + 32.5, scY + 28, 22, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  pdf.setFillColor(...scoreClr);
  pdf.circle(scX + 32.5, scY + 28, 18, "F");
  
  pdf.setTextColor(...C.white);
  pdf.setFontSize(28);
  pdf.setFont("helvetica", "bold");
  pdf.text(String(data.overallScore), scX + 32.5, scY + 32, { align: "center" });
  
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(200, 205, 218);
  pdf.text("OUT OF 100", scX + 32.5, scY + 39, { align: "center" });

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(...C.white);
  pdf.text(grade(data.overallScore), scX + 32.5, scY + 56, { align: "center" });
  pdf.setFontSize(6);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(170, 175, 190);
  pdf.text("OVERALL GRADE", scX + 32.5, scY + 62, { align: "center" });

  // Bottom accent
  pdf.setFillColor(...C.accent);
  pdf.rect(0, PH - 2.5, PW, 2.5, "F");

  // ═══════════════════════════════════════
  // TABLE OF CONTENTS
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);

  pdf.setTextColor(...C.navy);
  pdf.setFontSize(22);
  pdf.setFont("helvetica", "normal");
  pdf.text("Contents", M, y);
  y += 4;
  pdf.setFillColor(...C.accent);
  pdf.rect(M, y, 30, 1, "F");
  y += 14;

  const tocItems = [
    "Executive Summary",
    "Score Overview & Radar Analysis",
    "Technical Health",
    "SEO Analysis",
    "Performance Audit",
    "Content Quality",
    "Conversion Optimisation",
    "Quick Wins",
    "90-Day Roadmap",
    "Next Steps",
  ];

  for (let i = 0; i < tocItems.length; i++) {
    pdf.setTextColor(...C.text);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    
    // Number
    pdf.setTextColor(...C.accent);
    pdf.setFont("helvetica", "bold");
    pdf.text(String(i + 1).padStart(2, "0"), M, y);
    
    // Title
    pdf.setTextColor(...C.text);
    pdf.setFont("helvetica", "normal");
    pdf.text(tocItems[i], M + 12, y);
    
    // Dots
    pdf.setTextColor(...C.border);
    pdf.setFontSize(8);
    const dots = ".".repeat(80);
    const dotText = pdf.splitTextToSize(dots, CW - 20);
    pdf.text(dotText[0] || "", M + 12 + pdf.getTextWidth(tocItems[i]) + 2, y);
    
    y += 10;
  }

  // ═══════════════════════════════════════
  // EXECUTIVE SUMMARY
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);
  y = sectionTitle(pdf, y, "Executive Summary");
  y += 2;

  // Summary in a styled card
  cardBox(pdf, M, y, CW, 0); // placeholder height, we'll draw content over it
  const summaryStartY = y;

  pdf.setTextColor(...C.textSoft);
  pdf.setFontSize(9.5);
  pdf.setFont("helvetica", "normal");
  const sumLines = pdf.splitTextToSize(data.executiveSummary, CW - 16);
  y += 8;
  for (const line of sumLines) {
    y = space(pdf, y, 5.5);
    pdf.text(line, M + 8, y);
    y += 5;
  }
  y += 4;
  // Redraw card at correct height
  cardBox(pdf, M, summaryStartY, CW, y - summaryStartY);
  // Re-render text on top
  pdf.setTextColor(...C.textSoft);
  pdf.setFontSize(9.5);
  pdf.setFont("helvetica", "normal");
  let ty = summaryStartY + 8;
  for (const line of sumLines) {
    pdf.text(line, M + 8, ty);
    ty += 5;
  }

  y += 6;

  // Key metrics row
  y = space(pdf, y, 32);
  const metrics = [
    { label: "Overall Score", value: String(data.overallScore), sub: sl(data.overallScore) },
    { label: "Grade", value: grade(data.overallScore), sub: "Performance tier" },
    { label: "Categories", value: "5", sub: "Areas analysed" },
    { label: "Actions", value: String(data.quickWins.length + data.roadmap90Days.length), sub: "Recommendations" },
  ];
  const mw = CW / 4;
  for (let i = 0; i < 4; i++) {
    const mx = M + i * mw;
    cardBox(pdf, mx + 2, y, mw - 4, 26);
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text(metrics[i].value, mx + mw / 2, y + 12, { align: "center" });
    pdf.setTextColor(...C.textMuted);
    pdf.setFontSize(6.5);
    pdf.setFont("helvetica", "normal");
    pdf.text(metrics[i].label, mx + mw / 2, y + 18, { align: "center" });
    pdf.setFontSize(5.5);
    pdf.text(metrics[i].sub, mx + mw / 2, y + 22, { align: "center" });
  }

  // ═══════════════════════════════════════
  // SCORE OVERVIEW + RADAR
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);
  y = sectionTitle(pdf, y, "Score Overview");

  const sectionOrder: (keyof typeof data.sections)[] = ["technical", "seo", "performance", "content", "conversion"];
  const scores = sectionOrder.map(k => data.sections[k].score);
  const labels = sectionOrder.map(k => data.sections[k].title);

  // Radar chart (left side)
  drawRadar(pdf, M + 50, y + 45, 32, scores, labels);

  // Donut chart (right side)
  drawDonut(pdf, PW - M - 35, y + 42, 20, data.overallScore);
  pdf.setTextColor(...C.textMuted);
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "normal");
  pdf.text("Overall Score", PW - M - 35, y + 70, { align: "center" });

  y += 88;

  // Progress bars below
  y = space(pdf, y, 60);
  const industryAvgs = [52, 48, 55, 45, 40]; // benchmark averages
  for (let i = 0; i < sectionOrder.length; i++) {
    const sec = data.sections[sectionOrder[i]];
    y = space(pdf, y, 22);
    y = progressBar(pdf, M, y, CW * 0.6, sec.score, sec.title);
    // Mini benchmark
    benchmarkBar(pdf, M, y + 2, CW * 0.6, sec.score, industryAvgs[i]);
    y += 20;
  }

  // ═══════════════════════════════════════
  // DETAILED SECTION PAGES
  // ═══════════════════════════════════════
  for (let si = 0; si < sectionOrder.length; si++) {
    const sec = data.sections[sectionOrder[si]];
    y = newPage(pdf);
    cornerAccents(pdf);

    // Section number badge
    pdf.setFillColor(...C.accent);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.1 }));
    pdf.circle(PW - M - 12, M + 4, 14, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text(String(si + 1).padStart(2, "0"), PW - M - 12, M + 8, { align: "center" });

    // Title (light weight)
    pdf.setTextColor(...C.navy);
    pdf.setFontSize(22);
    pdf.setFont("helvetica", "normal");
    pdf.text(sec.title, M, y);
    y += 3;
    
    // Score badge inline
    const badgeClr = sc(sec.score);
    pdf.setFillColor(...badgeClr);
    pdf.roundedRect(M, y, 42, 10, 5, 5, "F");
    pdf.setTextColor(...C.white);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text(`${sec.score}/100  ·  ${sl(sec.score)}`, M + 21, y + 6.5, { align: "center" });
    y += 16;

    // Mini donut
    drawDonut(pdf, PW - M - 22, y + 5, 14, sec.score);
    
    // Findings card
    y = space(pdf, y, 14);
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "bold");
    pdf.text("KEY FINDINGS", M, y);
    y += 5;

    pdf.setTextColor(...C.textSoft);
    pdf.setFontSize(8.5);
    pdf.setFont("helvetica", "normal");
    for (const f of sec.findings) {
      const lines = pdf.splitTextToSize(`•  ${f}`, CW - 55);
      for (const line of lines) {
        y = space(pdf, y, 5);
        pdf.text(line, M + 4, y);
        y += 4.5;
      }
      y += 1.5;
    }

    y += 6;

    // Recommendations in accent card
    y = space(pdf, y, 16);
    const recY = y;
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "bold");
    pdf.text("RECOMMENDATIONS", M + 8, y);
    y += 6;

    pdf.setTextColor(...C.text);
    pdf.setFontSize(8.5);
    pdf.setFont("helvetica", "normal");
    for (let ri = 0; ri < sec.recommendations.length; ri++) {
      const lines = pdf.splitTextToSize(sec.recommendations[ri], CW - 24);
      // Number
      pdf.setTextColor(...C.accent);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${ri + 1}.`, M + 8, y);
      pdf.setTextColor(...C.text);
      pdf.setFont("helvetica", "normal");
      for (const line of lines) {
        y = space(pdf, y, 5);
        pdf.text(line, M + 16, y);
        y += 4.5;
      }
      y += 2;
    }

    // Background card behind recommendations
    const recH = y - recY + 6;
    pdf.setFillColor(...C.bg);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.7 }));
    pdf.roundedRect(M + 2, recY - 6, CW - 4, recH, 4, 4, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
    // Left accent bar
    pdf.setFillColor(...C.accent);
    pdf.rect(M + 2, recY - 6, 2, recH, "F");

    // Re-render recommendations text over the background
    let ry = recY;
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "bold");
    pdf.text("RECOMMENDATIONS", M + 8, ry);
    ry += 6;
    for (let ri = 0; ri < sec.recommendations.length; ri++) {
      const lines = pdf.splitTextToSize(sec.recommendations[ri], CW - 24);
      pdf.setTextColor(...C.accent);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8.5);
      pdf.text(`${ri + 1}.`, M + 8, ry);
      pdf.setTextColor(...C.text);
      pdf.setFont("helvetica", "normal");
      for (const line of lines) {
        pdf.text(line, M + 16, ry);
        ry += 4.5;
      }
      ry += 2;
    }
  }

  // ═══════════════════════════════════════
  // QUICK WINS
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);

  // Emerald header band
  pdf.setFillColor(...C.emerald);
  pdf.roundedRect(M, y - 2, CW, 22, 4, 4, "F");
  // Glass highlight
  pdf.setFillColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.12 }));
  pdf.roundedRect(M, y - 2, CW, 7, 4, 0, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  pdf.setTextColor(...C.white);
  pdf.setFontSize(15);
  pdf.setFont("helvetica", "normal");
  pdf.text("Quick Wins", M + 10, y + 10);
  pdf.setFontSize(8);
  pdf.text("High-impact changes you can make this week", M + 55, y + 10);
  y += 28;

  for (let i = 0; i < data.quickWins.length; i++) {
    y = space(pdf, y, 16);

    // Number circle
    pdf.setFillColor(...C.emerald);
    pdf.circle(M + 6, y, 4.5, "F");
    pdf.setTextColor(...C.white);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text(String(i + 1), M + 6, y + 1.5, { align: "center" });

    // Text
    pdf.setTextColor(...C.text);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    const lines = pdf.splitTextToSize(data.quickWins[i], CW - 22);
    for (const line of lines) {
      pdf.text(line, M + 16, y);
      y += 5;
    }
    // Divider
    if (i < data.quickWins.length - 1) {
      pdf.setDrawColor(...C.border);
      pdf.setLineWidth(0.2);
      pdf.line(M + 16, y, PW - M, y);
    }
    y += 4;
  }

  // ── 90-Day Roadmap ──
  y += 6;
  y = space(pdf, y, 30);
  y = sectionTitle(pdf, y, "90-Day Roadmap");

  pdf.setTextColor(...C.textSoft);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("Prioritised actions over the next quarter:", M, y);
  y += 8;

  const phases = ["Weeks 1–2", "Weeks 3–6", "Weeks 7–10", "Weeks 11–13"];

  for (let i = 0; i < data.roadmap90Days.length; i++) {
    y = space(pdf, y, 18);

    // Timeline
    pdf.setFillColor(...C.accent);
    pdf.circle(M + 5, y, 3, "F");
    pdf.setFillColor(...C.white);
    pdf.circle(M + 5, y, 1.2, "F");
    if (i < data.roadmap90Days.length - 1) {
      pdf.setDrawColor(...C.border);
      pdf.setLineWidth(0.4);
      pdf.line(M + 5, y + 4, M + 5, y + 18);
    }

    // Phase label
    if (i < phases.length) {
      pdf.setTextColor(...C.accent);
      pdf.setFontSize(6);
      pdf.setFont("helvetica", "bold");
      pdf.text(phases[i], M + 14, y - 3);
    }

    pdf.setTextColor(...C.text);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    const lines = pdf.splitTextToSize(data.roadmap90Days[i], CW - 22);
    for (const line of lines) {
      pdf.text(line, M + 14, y + 1);
      y += 5;
    }
    y += 5;
  }

  // ═══════════════════════════════════════
  // CTA / NEXT STEPS PAGE
  // ═══════════════════════════════════════
  pdf.addPage();

  // Full dark bg
  pdf.setFillColor(...C.navy);
  pdf.rect(0, 0, PW, PH, "F");

  // Subtle radial glow
  pdf.setFillColor(60, 50, 100);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.25 }));
  pdf.circle(PW / 2, PH * 0.35, 70, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  // Large watermark for this page
  pdf.setTextColor(50, 52, 68);
  pdf.setFontSize(120);
  pdf.setFont("helvetica", "normal");
  pdf.setGState(new (pdf as any).GState({ opacity: 0.06 }));
  pdf.text("AVORRIA", PW / 2, PH / 2 + 60, { align: "center", angle: 40 });
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  // Top + bottom accent
  pdf.setFillColor(...C.accent);
  pdf.rect(0, 0, PW, 2, "F");
  pdf.rect(0, PH - 2, PW, 2, "F");

  // Decorative triangle
  pdf.setFillColor(...C.accent);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.08 }));
  pdf.triangle(0, PH, 0, PH - 120, 100, PH, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  y = PH / 2 - 55;

  // Brand
  pdf.setTextColor(180, 185, 200);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("A V O R R I A", PW / 2, y - 20, { align: "center" });

  // CTA headline (light weight)
  pdf.setTextColor(...C.white);
  pdf.setFontSize(30);
  pdf.setFont("helvetica", "normal");
  pdf.text("Ready to act on", PW / 2, y, { align: "center" });
  pdf.text("these insights?", PW / 2, y + 14, { align: "center" });

  y += 30;
  pdf.setFontSize(11);
  pdf.setTextColor(170, 175, 195);
  pdf.text("Book a free strategy call to discuss", PW / 2, y, { align: "center" });
  pdf.text("your audit results with our team.", PW / 2, y + 7, { align: "center" });

  // CTA button
  y += 22;
  pdf.setFillColor(...C.accent);
  pdf.roundedRect(PW / 2 - 40, y, 80, 14, 7, 7, "F");
  // Button highlight
  pdf.setFillColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }));
  pdf.roundedRect(PW / 2 - 38, y + 1, 76, 5, 4, 0, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  
  pdf.setTextColor(...C.white);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("avorria.com/contact", PW / 2, y + 9.5, { align: "center" });

  // Contact
  y += 35;
  pdf.setTextColor(140, 145, 165);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("hello@avorria.com  ·  avorria.com", PW / 2, y, { align: "center" });

  // ── SAVE ──
  const safe = data.companyName.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  pdf.save(`avorria-audit-${safe}.pdf`);
}
