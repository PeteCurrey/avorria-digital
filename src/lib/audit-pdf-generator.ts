'use client';
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

// ── WATERMARK: faint, full diagonal, "AVORRIA." with pink dot ──
function watermark(pdf: jsPDF): void {
  pdf.saveGraphicsState();
  // Main text in very light grey
  pdf.setFontSize(150);
  pdf.setFont("helvetica", "normal");
  pdf.setGState(new (pdf as any).GState({ opacity: 0.04 }));
  pdf.setTextColor(200, 202, 215);
  pdf.text("AVORRIA", PW / 2 - 8, PH / 2 + 10, { align: "center", angle: 40 });
  // Pink full stop
  pdf.setTextColor(...C.accent);
  // Estimate position for the dot after "AVORRIA" rotated at 40deg
  const dotOffX = 52; // approx offset along the rotated baseline
  const dotOffY = -44;
  pdf.text(".", PW / 2 - 8 + dotOffX, PH / 2 + 10 + dotOffY, { align: "center", angle: 40 });
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  pdf.restoreGraphicsState();
}

function footer(pdf: jsPDF): void {
  pdf.setDrawColor(...C.accent);
  pdf.setLineWidth(0.15);
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

  for (let i = 0; i < n; i++) {
    const a = startAngle + i * angleStep;
    pdf.setDrawColor(205, 210, 220);
    pdf.setLineWidth(0.15);
    pdf.line(cx, cy, cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }

  const pts: [number, number][] = scores.map((s, i) => {
    const a = startAngle + i * angleStep;
    const sr = (s / 100) * r;
    return [cx + Math.cos(a) * sr, cy + Math.sin(a) * sr];
  });
  
  pdf.setFillColor(...C.accent);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }));
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    pdf.triangle(cx, cy, pts[i][0], pts[i][1], pts[j][0], pts[j][1], "F");
  }
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  pdf.setDrawColor(...C.accent);
  pdf.setLineWidth(0.8);
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    pdf.line(pts[i][0], pts[i][1], pts[j][0], pts[j][1]);
  }

  for (let i = 0; i < pts.length; i++) {
    pdf.setFillColor(...C.accent);
    pdf.circle(pts[i][0], pts[i][1], 1.5, "F");
    pdf.setFillColor(...C.white);
    pdf.circle(pts[i][0], pts[i][1], 0.7, "F");
  }

  for (let i = 0; i < n; i++) {
    const a = startAngle + i * angleStep;
    const lx = cx + Math.cos(a) * (r + 8);
    const ly = cy + Math.sin(a) * (r + 8);
    pdf.setTextColor(...C.text);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
    pdf.text(labels[i], lx, ly, { align: "center" });
    pdf.setTextColor(...sc(scores[i]));
    pdf.setFontSize(6.5);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${scores[i]}`, lx, ly + 4, { align: "center" });
  }
}

// ── DONUT CHART ──
function drawDonut(pdf: jsPDF, cx: number, cy: number, r: number, score: number): void {
  const segments = 60;
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * 2 * Math.PI - Math.PI / 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    pdf.setFillColor(230, 232, 240);
    pdf.circle(x, y, 1.8, "F");
  }
  const filled = Math.round((score / 100) * segments);
  const color = sc(score);
  for (let i = 0; i < filled; i++) {
    const a = (i / segments) * 2 * Math.PI - Math.PI / 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    pdf.setFillColor(...color);
    pdf.circle(x, y, 2, "F");
  }
  pdf.setFillColor(...C.white);
  pdf.circle(cx, cy, r - 5, "F");
  pdf.setTextColor(...color);
  pdf.setFontSize(22);
  pdf.setFont("helvetica", "normal");
  pdf.text(String(score), cx, cy + 2, { align: "center" });
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...C.textMuted);
  pdf.text(grade(score), cx, cy + 9, { align: "center" });
}

// ── PROGRESS BAR ──
function progressBar(pdf: jsPDF, x: number, y: number, w: number, score: number, label: string): number {
  const color = sc(score);
  pdf.setTextColor(...C.text);
  pdf.setFontSize(8.5);
  pdf.setFont("helvetica", "normal");
  pdf.text(label, x, y);
  pdf.setTextColor(...color);
  pdf.setFont("helvetica", "normal");
  pdf.text(`${score}`, x + w, y, { align: "right" });
  y += 3;
  pdf.setFillColor(235, 237, 244);
  pdf.roundedRect(x, y, w, 4, 2, 2, "F");
  const fw = Math.max((score / 100) * w, 4);
  pdf.setFillColor(...color);
  pdf.roundedRect(x, y, fw, 4, 2, 2, "F");
  pdf.setFillColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.35 }));
  pdf.roundedRect(x + 1, y + 0.5, fw * 0.5, 1.5, 0.75, 0.75, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  return y + 4;
}

// ── SECTION HEADER (light font, thinner accent line) ──
function sectionTitle(pdf: jsPDF, y: number, title: string): number {
  pdf.setTextColor(...C.navy);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "normal");
  pdf.text(title, M, y);
  y += 2;
  pdf.setFillColor(...C.accent);
  pdf.rect(M, y, 40, 0.6, "F");
  pdf.setFillColor(...C.border);
  pdf.rect(M + 40, y + 0.15, CW - 40, 0.2, "F");
  return y + 8;
}

// ── BENCHMARK BAR ──
function benchmarkBar(pdf: jsPDF, x: number, y: number, w: number, score: number, avg: number): number {
  pdf.setFillColor(240, 241, 246);
  pdf.roundedRect(x, y, w, 6, 3, 3, "F");
  const avgX = x + (avg / 100) * w;
  pdf.setFillColor(...C.textMuted);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.5 }));
  pdf.rect(avgX - 0.5, y - 2, 1, 10, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  const fw = Math.max((score / 100) * w, 4);
  pdf.setFillColor(...sc(score));
  pdf.roundedRect(x, y, fw, 6, 3, 3, "F");
  pdf.setFontSize(5.5);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...C.textMuted);
  pdf.text(`Industry avg: ${avg}`, avgX, y + 12, { align: "center" });
  pdf.setTextColor(...sc(score));
  pdf.setFont("helvetica", "normal");
  pdf.text(`Your score: ${score}`, x + fw, y - 2, { align: "center" });
  return y + 16;
}

// ── CARD BOX (thinner top accent) ──
function cardBox(pdf: jsPDF, x: number, y: number, w: number, h: number): void {
  pdf.setFillColor(0, 0, 0);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.04 }));
  pdf.roundedRect(x + 1, y + 1.5, w, h, 4, 4, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  pdf.setFillColor(...C.bgCard);
  pdf.roundedRect(x, y, w, h, 4, 4, "F");
  pdf.setFillColor(...C.accent);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.5 }));
  pdf.rect(x + 8, y, w - 16, 0.3, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
}

// ── BROWSER MOCKUP ──
function drawBrowserMockup(pdf: jsPDF, x: number, y: number, w: number, h: number, url: string): void {
  // Window frame
  pdf.setFillColor(240, 241, 246);
  pdf.roundedRect(x, y, w, h, 5, 5, "F");
  // Title bar
  pdf.setFillColor(230, 232, 238);
  pdf.roundedRect(x, y, w, 18, 5, 0, "F");
  pdf.roundedRect(x, y, w, 5, 5, 5, "F"); // top corners
  pdf.setFillColor(230, 232, 238);
  pdf.rect(x, y + 5, w, 13, "F");
  // Traffic lights
  pdf.setFillColor(255, 95, 87);
  pdf.circle(x + 10, y + 9, 2.5, "F");
  pdf.setFillColor(255, 189, 46);
  pdf.circle(x + 18, y + 9, 2.5, "F");
  pdf.setFillColor(39, 201, 63);
  pdf.circle(x + 26, y + 9, 2.5, "F");
  // Address bar
  pdf.setFillColor(...C.white);
  pdf.roundedRect(x + 36, y + 4, w - 48, 10, 3, 3, "F");
  pdf.setTextColor(...C.textSoft);
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "normal");
  pdf.text(url, x + 40, y + 10.5);
  // Content area placeholder
  pdf.setFillColor(...C.white);
  pdf.rect(x + 2, y + 18, w - 4, h - 22, "F");
  // Placeholder content blocks
  const cx = x + 12;
  let cy = y + 30;
  // Hero block
  pdf.setFillColor(235, 237, 244);
  pdf.roundedRect(cx, cy, w - 24, 40, 3, 3, "F");
  pdf.setFillColor(...C.accent);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }));
  pdf.roundedRect(cx, cy, w - 24, 40, 3, 3, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  pdf.setTextColor(...C.textMuted);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text("Homepage", cx + (w - 24) / 2, cy + 22, { align: "center" });
  cy += 48;
  // Content blocks
  for (let i = 0; i < 3; i++) {
    pdf.setFillColor(242, 243, 248);
    pdf.roundedRect(cx, cy, (w - 28) * 0.3, 18, 2, 2, "F");
    pdf.roundedRect(cx + (w - 28) * 0.33, cy, (w - 28) * 0.3, 18, 2, 2, "F");
    pdf.roundedRect(cx + (w - 28) * 0.66, cy, (w - 28) * 0.3, 18, 2, 2, "F");
    cy += 22;
  }
  // Separator line
  pdf.setDrawColor(...C.border);
  pdf.setLineWidth(0.15);
  pdf.line(x + 2, y + 18, x + w - 2, y + 18);
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
    const canvas = document.createElement("canvas");
    const targetAspect = PW / PH;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgAspect > targetAspect) {
      sw = img.naturalHeight * targetAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
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
  // PAGE 1: COVER
  // ═══════════════════════════════════════
  if (heroImg) {
    pdf.addImage(heroImg, "JPEG", 0, 0, PW, PH);
  }

  pdf.setFillColor(20, 22, 30);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.55 }));
  pdf.rect(0, 0, PW, PH * 0.4, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 0.82 }));
  pdf.rect(0, PH * 0.4, PW, PH * 0.6, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  // Top accent line (thinner)
  pdf.setFillColor(...C.accent);
  pdf.rect(0, 0, PW, 1.5, "F");

  // Decorative corner triangle
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

  // Main title — light font
  y = 110;
  pdf.setTextColor(...C.white);
  pdf.setFontSize(42);
  pdf.setFont("helvetica", "normal");
  pdf.text("Website &", M, y);
  pdf.text("SEO Audit", M, y + 18);

  // Accent bar (thinner)
  pdf.setFillColor(...C.accent);
  pdf.rect(M, y + 23, 55, 0.8, "F");

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

  // Score card (frosted glass)
  const scX = PW - M - 65;
  const scY = PH - 100;
  pdf.setFillColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.1 }));
  pdf.roundedRect(scX, scY, 65, 70, 6, 6, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  pdf.setDrawColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.2 }));
  pdf.setLineWidth(0.5);
  pdf.roundedRect(scX, scY, 65, 70, 6, 6, "S");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  const scoreClr = sc(data.overallScore);
  pdf.setFillColor(...scoreClr);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.2 }));
  pdf.circle(scX + 32.5, scY + 28, 22, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  pdf.setFillColor(...scoreClr);
  pdf.circle(scX + 32.5, scY + 28, 18, "F");
  
  pdf.setTextColor(...C.white);
  pdf.setFontSize(28);
  pdf.setFont("helvetica", "normal");
  pdf.text(String(data.overallScore), scX + 32.5, scY + 32, { align: "center" });
  
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(200, 205, 218);
  pdf.text("OUT OF 100", scX + 32.5, scY + 39, { align: "center" });

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...C.white);
  pdf.text(grade(data.overallScore), scX + 32.5, scY + 56, { align: "center" });
  pdf.setFontSize(6);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(170, 175, 190);
  pdf.text("OVERALL GRADE", scX + 32.5, scY + 62, { align: "center" });

  // Bottom accent (thinner)
  pdf.setFillColor(...C.accent);
  pdf.rect(0, PH - 1.5, PW, 1.5, "F");

  // ═══════════════════════════════════════
  // PAGE 2: WEBSITE SCREENSHOT / BROWSER MOCKUP
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);

  pdf.setTextColor(...C.navy);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "normal");
  pdf.text("Website Under Review", M, y);
  y += 2;
  pdf.setFillColor(...C.accent);
  pdf.rect(M, y, 40, 0.6, "F");
  y += 12;

  pdf.setTextColor(...C.textSoft);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Homepage at time of audit  ·  ${dateStr}`, M, y);
  y += 10;

  drawBrowserMockup(pdf, M, y, CW, 160, data.websiteUrl);
  y += 170;

  // URL + note
  pdf.setTextColor(...C.textMuted);
  pdf.setFontSize(7.5);
  pdf.setFont("helvetica", "normal");
  pdf.text("The analysis that follows is based on a comprehensive review of this website's", M, y);
  pdf.text("structure, content, technical configuration, and conversion pathways.", M, y + 5);

  // ═══════════════════════════════════════
  // PAGE 3: TABLE OF CONTENTS
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);

  pdf.setTextColor(...C.navy);
  pdf.setFontSize(22);
  pdf.setFont("helvetica", "normal");
  pdf.text("Contents", M, y);
  y += 4;
  pdf.setFillColor(...C.accent);
  pdf.rect(M, y, 30, 0.6, "F");
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
    "About Avorria",
    "Our Services",
    "Recommended Package & Pricing",
    "Investment & Timeline",
    "Next Steps",
  ];

  for (let i = 0; i < tocItems.length; i++) {
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(String(i + 1).padStart(2, "0"), M, y);
    
    pdf.setTextColor(...C.text);
    pdf.setFont("helvetica", "normal");
    pdf.text(tocItems[i], M + 12, y);
    
    pdf.setTextColor(...C.border);
    pdf.setFontSize(8);
    const dots = ".".repeat(80);
    const dotText = pdf.splitTextToSize(dots, CW - 20);
    pdf.text(dotText[0] || "", M + 12 + pdf.getTextWidth(tocItems[i]) + 2, y);
    
    y += 10;
  }

  // ═══════════════════════════════════════
  // PAGE 4: EXECUTIVE SUMMARY
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);
  y = sectionTitle(pdf, y, "Executive Summary");
  y += 2;

  // Measure text height first, then draw card, then draw text once
  pdf.setFontSize(9.5);
  pdf.setFont("helvetica", "normal");
  const sumLines = pdf.splitTextToSize(data.executiveSummary, CW - 16);
  const sumHeight = sumLines.length * 5 + 12;

  cardBox(pdf, M, y, CW, sumHeight);
  pdf.setTextColor(...C.textSoft);
  pdf.setFontSize(9.5);
  pdf.setFont("helvetica", "normal");
  let ty = y + 8;
  for (const line of sumLines) {
    pdf.text(line, M + 8, ty);
    ty += 5;
  }
  y += sumHeight + 6;

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
    pdf.setFont("helvetica", "normal");
    pdf.text(metrics[i].value, mx + mw / 2, y + 12, { align: "center" });
    pdf.setTextColor(...C.textMuted);
    pdf.setFontSize(6.5);
    pdf.setFont("helvetica", "normal");
    pdf.text(metrics[i].label, mx + mw / 2, y + 18, { align: "center" });
    pdf.setFontSize(5.5);
    pdf.text(metrics[i].sub, mx + mw / 2, y + 22, { align: "center" });
  }

  // ═══════════════════════════════════════
  // PAGE 5: SCORE OVERVIEW + RADAR
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);
  y = sectionTitle(pdf, y, "Score Overview");

  const sectionOrder: (keyof typeof data.sections)[] = ["technical", "seo", "performance", "content", "conversion"];
  const scores = sectionOrder.map(k => data.sections[k].score);
  const labels = sectionOrder.map(k => data.sections[k].title);

  drawRadar(pdf, M + 50, y + 45, 32, scores, labels);
  drawDonut(pdf, PW - M - 35, y + 42, 20, data.overallScore);
  pdf.setTextColor(...C.textMuted);
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "normal");
  pdf.text("Overall Score", PW - M - 35, y + 70, { align: "center" });

  y += 88;

  y = space(pdf, y, 60);
  const industryAvgs = [52, 48, 55, 45, 40];
  for (let i = 0; i < sectionOrder.length; i++) {
    const sec = data.sections[sectionOrder[i]];
    y = space(pdf, y, 22);
    y = progressBar(pdf, M, y, CW * 0.6, sec.score, sec.title);
    benchmarkBar(pdf, M, y + 2, CW * 0.6, sec.score, industryAvgs[i]);
    y += 20;
  }

  // ═══════════════════════════════════════
  // PAGES 6-10: DETAILED SECTION PAGES (FIX: card first, text once)
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
    pdf.setFont("helvetica", "normal");
    pdf.text(String(si + 1).padStart(2, "0"), PW - M - 12, M + 8, { align: "center" });

    // Title (light weight)
    pdf.setTextColor(...C.navy);
    pdf.setFontSize(22);
    pdf.setFont("helvetica", "normal");
    pdf.text(sec.title, M, y);
    y += 3;
    
    // Score badge
    const badgeClr = sc(sec.score);
    pdf.setFillColor(...badgeClr);
    pdf.roundedRect(M, y, 42, 10, 5, 5, "F");
    pdf.setTextColor(...C.white);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text(`${sec.score}/100  ·  ${sl(sec.score)}`, M + 21, y + 6.5, { align: "center" });
    y += 16;

    // Mini donut
    drawDonut(pdf, PW - M - 22, y + 5, 14, sec.score);
    
    // Findings
    y = space(pdf, y, 14);
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
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

    // Recommendations — FIXED: draw bg card FIRST, then text ONCE
    y = space(pdf, y, 16);
    const recY = y;

    // Measure rec height
    let recMeasureH = 6;
    for (let ri = 0; ri < sec.recommendations.length; ri++) {
      const lines = pdf.splitTextToSize(sec.recommendations[ri], CW - 24);
      recMeasureH += lines.length * 4.5 + 2;
    }
    recMeasureH += 6;

    // Draw background card first
    pdf.setFillColor(...C.bg);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.7 }));
    pdf.roundedRect(M + 2, recY - 6, CW - 4, recMeasureH, 4, 4, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
    // Left accent bar (thinner)
    pdf.setFillColor(...C.accent);
    pdf.rect(M + 2, recY - 6, 1.5, recMeasureH, "F");

    // Now render text ONCE on top
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
    pdf.text("RECOMMENDATIONS", M + 8, y);
    y += 6;

    for (let ri = 0; ri < sec.recommendations.length; ri++) {
      const lines = pdf.splitTextToSize(sec.recommendations[ri], CW - 24);
      pdf.setTextColor(...C.accent);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
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
  }

  // ═══════════════════════════════════════
  // PAGE 11: QUICK WINS
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);

  // Emerald header band
  pdf.setFillColor(...C.emerald);
  pdf.roundedRect(M, y - 2, CW, 22, 4, 4, "F");
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
    pdf.setFillColor(...C.emerald);
    pdf.circle(M + 6, y, 4.5, "F");
    pdf.setTextColor(...C.white);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text(String(i + 1), M + 6, y + 1.5, { align: "center" });

    pdf.setTextColor(...C.text);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    const lines = pdf.splitTextToSize(data.quickWins[i], CW - 22);
    for (const line of lines) {
      pdf.text(line, M + 16, y);
      y += 5;
    }
    if (i < data.quickWins.length - 1) {
      pdf.setDrawColor(...C.border);
      pdf.setLineWidth(0.15);
      pdf.line(M + 16, y, PW - M, y);
    }
    y += 4;
  }

  // ═══════════════════════════════════════
  // PAGE 12: 90-DAY ROADMAP
  // ═══════════════════════════════════════
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
    pdf.setFillColor(...C.accent);
    pdf.circle(M + 5, y, 3, "F");
    pdf.setFillColor(...C.white);
    pdf.circle(M + 5, y, 1.2, "F");
    if (i < data.roadmap90Days.length - 1) {
      pdf.setDrawColor(...C.border);
      pdf.setLineWidth(0.3);
      pdf.line(M + 5, y + 4, M + 5, y + 18);
    }

    if (i < phases.length) {
      pdf.setTextColor(...C.accent);
      pdf.setFontSize(6);
      pdf.setFont("helvetica", "normal");
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
  // PAGE 13: ABOUT AVORRIA
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);

  // Dark band header
  pdf.setFillColor(...C.navy);
  pdf.roundedRect(M, y - 4, CW, 28, 4, 4, "F");
  pdf.setTextColor(...C.white);
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "normal");
  pdf.text("About Avorria", M + 12, y + 10);
  pdf.setFontSize(8);
  pdf.setTextColor(180, 185, 200);
  pdf.text("Digital Marketing That Moves the Needle", M + 12, y + 18);
  y += 34;

  pdf.setTextColor(...C.text);
  pdf.setFontSize(9.5);
  pdf.setFont("helvetica", "normal");
  const aboutText = "Avorria is a performance-focused digital marketing agency built for ambitious businesses that want growth — not vanity metrics. We combine deep technical expertise with creative strategy to deliver measurable results across SEO, paid media, web design, and content marketing.\n\nOur team is made up exclusively of senior specialists — no juniors learning on your account. Every engagement is led by people who have spent years in the trenches, building and optimising campaigns that generate real pipeline and revenue.\n\nWe don't believe in long lock-in contracts or opaque reporting. You'll always know exactly what we're doing, why we're doing it, and what impact it's having on your bottom line.";
  const aboutLines = pdf.splitTextToSize(aboutText, CW - 8);
  for (const line of aboutLines) {
    y = space(pdf, y, 5);
    pdf.text(line, M + 4, y);
    y += 5;
  }
  y += 10;

  // Why Avorria — differentiators
  y = space(pdf, y, 80);
  y = sectionTitle(pdf, y, "Why Avorria");

  const differentiators = [
    { title: "Data-Led Strategy", desc: "Every decision backed by real data, not gut feel. We track what matters and optimise relentlessly." },
    { title: "Senior-Only Teams", desc: "No juniors, no account managers as middlemen. You work directly with the specialists doing the work." },
    { title: "Transparent Reporting", desc: "Real-time dashboards, monthly deep-dives, and honest conversations about what's working and what isn't." },
    { title: "No Lock-In Contracts", desc: "We earn your business every month. Flexible engagements built on results, not obligation." },
  ];

  const diffW = (CW - 6) / 2;
  for (let row = 0; row < 2; row++) {
    y = space(pdf, y, 38);
    for (let col = 0; col < 2; col++) {
      const idx = row * 2 + col;
      const dx = M + col * (diffW + 6);
      cardBox(pdf, dx, y, diffW, 32);
      // Pink number
      pdf.setTextColor(...C.accent);
      pdf.setFontSize(18);
      pdf.setFont("helvetica", "normal");
      pdf.text(String(idx + 1).padStart(2, "0"), dx + 6, y + 12);
      // Title
      pdf.setTextColor(...C.navy);
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "normal");
      pdf.text(differentiators[idx].title, dx + 20, y + 11);
      // Desc
      pdf.setTextColor(...C.textSoft);
      pdf.setFontSize(7.5);
      pdf.setFont("helvetica", "normal");
      const dLines = pdf.splitTextToSize(differentiators[idx].desc, diffW - 14);
      let dy = y + 18;
      for (const dl of dLines) {
        pdf.text(dl, dx + 6, dy);
        dy += 4;
      }
    }
    y += 38;
  }

  // ═══════════════════════════════════════
  // PAGE 14: OUR SERVICES
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);
  y = sectionTitle(pdf, y, "Our Services");

  pdf.setTextColor(...C.textSoft);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("We offer a full suite of digital marketing services, each engineered for measurable growth.", M, y);
  y += 12;

  const services = [
    {
      name: "SEO & Organic Growth",
      desc: "Technical SEO, content strategy, and link building engineered for revenue growth — not just rankings and reports. We focus on the keywords and pages that actually drive pipeline.",
      icon: "🔍",
    },
    {
      name: "Web Design & Development",
      desc: "Modern, fast, conversion-optimised websites that blend premium design with technical excellence. Built to convert visitors into leads and customers.",
      icon: "🎨",
    },
    {
      name: "Paid Media & PPC",
      desc: "Performance campaigns across Google Ads, Meta, and LinkedIn. We optimise for pipeline, not vanity metrics — every pound of spend is tracked to revenue.",
      icon: "📈",
    },
    {
      name: "Content & Email Marketing",
      desc: "Long-form SEO content and automated email sequences that nurture leads through your funnel. Strategy tied directly to your sales process.",
      icon: "✉️",
    },
  ];

  for (let i = 0; i < services.length; i++) {
    y = space(pdf, y, 42);
    cardBox(pdf, M, y, CW, 36);
    
    // Icon circle
    pdf.setFillColor(...C.accent);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.1 }));
    pdf.circle(M + 14, y + 14, 8, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
    pdf.setFontSize(14);
    pdf.text(services[i].icon, M + 14, y + 17, { align: "center" });

    // Service name
    pdf.setTextColor(...C.navy);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(services[i].name, M + 28, y + 12);

    // Description
    pdf.setTextColor(...C.textSoft);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    const sLines = pdf.splitTextToSize(services[i].desc, CW - 36);
    let sy = y + 19;
    for (const sl2 of sLines) {
      pdf.text(sl2, M + 28, sy);
      sy += 4;
    }
    y += 42;
  }

  // ═══════════════════════════════════════
  // PAGE 15: RECOMMENDED PACKAGE & PRICING
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);

  // Header band
  pdf.setFillColor(...C.navy);
  pdf.roundedRect(M, y - 4, CW, 24, 4, 4, "F");
  pdf.setTextColor(...C.white);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "normal");
  pdf.text("Recommended Package", M + 12, y + 8);
  pdf.setFontSize(8);
  pdf.setTextColor(180, 185, 200);
  pdf.text("Based on your audit results", M + 12, y + 15);
  y += 30;

  // Score-based recommendations
  const recServices: { name: string; reason: string; priority: string }[] = [];
  if (data.sections.technical.score < 60 || data.sections.performance.score < 60) {
    recServices.push({ name: "Web Design & Development", reason: `Technical score: ${data.sections.technical.score}/100, Performance: ${data.sections.performance.score}/100`, priority: "High" });
  }
  if (data.sections.seo.score < 60) {
    recServices.push({ name: "SEO & Organic Growth", reason: `SEO score: ${data.sections.seo.score}/100`, priority: "High" });
  }
  if (data.sections.conversion.score < 60) {
    recServices.push({ name: "Paid Media & PPC", reason: `Conversion score: ${data.sections.conversion.score}/100`, priority: "Medium" });
  }
  if (data.sections.content.score < 60) {
    recServices.push({ name: "Content & Email Marketing", reason: `Content score: ${data.sections.content.score}/100`, priority: "Medium" });
  }
  // Always recommend at least one
  if (recServices.length === 0) {
    recServices.push({ name: "Strategy & Advisory", reason: "Maintain your strong scores with ongoing optimisation", priority: "Medium" });
  }

  pdf.setTextColor(...C.textSoft);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("Based on the findings of your audit, we recommend the following services:", M, y);
  y += 10;

  // Recommended services table
  for (const rs of recServices) {
    y = space(pdf, y, 22);
    cardBox(pdf, M, y, CW, 18);
    
    // Priority badge
    const prioClr = rs.priority === "High" ? C.red : C.yellow;
    pdf.setFillColor(...prioClr);
    pdf.roundedRect(M + 4, y + 4, 16, 6, 3, 3, "F");
    pdf.setTextColor(...C.white);
    pdf.setFontSize(5.5);
    pdf.setFont("helvetica", "normal");
    pdf.text(rs.priority, M + 12, y + 8, { align: "center" });

    // Service name
    pdf.setTextColor(...C.navy);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(rs.name, M + 24, y + 9);

    // Reason
    pdf.setTextColor(...C.textMuted);
    pdf.setFontSize(7);
    pdf.text(rs.reason, M + 24, y + 14);

    y += 22;
  }

  y += 10;

  // Pricing table
  y = space(pdf, y, 90);
  y = sectionTitle(pdf, y, "Engagement Models");

  const pricingModels = [
    { model: "Ongoing Growth Retainer", range: "£4,000 – £12,000+ /month", desc: "Full-stack SEO, Paid Media, Web, Analytics. Ideal for businesses ready to scale with a dedicated growth partner.", best: "Sustained growth" },
    { model: "Fixed-Scope Project", range: "£8,000 – £40,000", desc: "Website rebuilds, migrations, tracking overhauls, and one-off strategic projects with clear deliverables.", best: "Defined outcomes" },
    { model: "Strategy & Advisory", range: "£1,500 – £4,000 /month", desc: "Expert guidance for internal teams. We provide the strategy and roadmap, your team executes.", best: "Internal teams" },
  ];

  for (let i = 0; i < pricingModels.length; i++) {
    y = space(pdf, y, 36);
    const pm = pricingModels[i];
    
    // Card with left accent
    pdf.setFillColor(...C.bg);
    pdf.roundedRect(M, y, CW, 30, 4, 4, "F");
    pdf.setFillColor(...C.accent);
    pdf.rect(M, y + 4, 1.5, 22, "F");

    // Model name
    pdf.setTextColor(...C.navy);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(pm.model, M + 8, y + 9);

    // Price range
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(pm.range, PW - M - 4, y + 9, { align: "right" });

    // Description
    pdf.setTextColor(...C.textSoft);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    const pLines = pdf.splitTextToSize(pm.desc, CW - 16);
    let py = y + 16;
    for (const pl of pLines) {
      pdf.text(pl, M + 8, py);
      py += 4;
    }

    // Best for badge
    pdf.setFillColor(...C.accent);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.1 }));
    pdf.roundedRect(PW - M - 34, y + 20, 30, 6, 3, 3, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(5.5);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Best for: ${pm.best}`, PW - M - 19, y + 24, { align: "center" });

    y += 34;
  }

  // ═══════════════════════════════════════
  // PAGE 16: INVESTMENT & TIMELINE
  // ═══════════════════════════════════════
  y = newPage(pdf);
  cornerAccents(pdf);
  y = sectionTitle(pdf, y, "Suggested Timeline");

  pdf.setTextColor(...C.textSoft);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("A phased approach to implementing your audit recommendations over 6 months:", M, y);
  y += 12;

  const timeline = [
    { phase: "Month 1", title: "Foundation & Quick Wins", items: ["Implement all quick-win recommendations", "Technical SEO fixes and site health improvements", "Analytics & tracking audit and setup"] },
    { phase: "Month 2", title: "Strategy & Content", items: ["Develop comprehensive keyword strategy", "Begin content calendar and production", "Set up conversion tracking and goals"] },
    { phase: "Month 3–4", title: "Growth Acceleration", items: ["Launch paid media campaigns (if applicable)", "Scale content production and outreach", "On-page optimisation across key landing pages"] },
    { phase: "Month 5–6", title: "Optimise & Scale", items: ["Analyse results and refine strategies", "Expand to new keyword clusters and markets", "Quarterly business review and roadmap refresh"] },
  ];

  for (let i = 0; i < timeline.length; i++) {
    y = space(pdf, y, 40);
    const t = timeline[i];

    // Timeline dot + line
    pdf.setFillColor(...C.accent);
    pdf.circle(M + 5, y + 2, 4, "F");
    pdf.setTextColor(...C.white);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text(String(i + 1), M + 5, y + 4, { align: "center" });
    if (i < timeline.length - 1) {
      pdf.setDrawColor(...C.accent);
      pdf.setGState(new (pdf as any).GState({ opacity: 0.3 }));
      pdf.setLineWidth(0.3);
      pdf.line(M + 5, y + 7, M + 5, y + 40);
      pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
    }

    // Phase label
    pdf.setTextColor(...C.accent);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
    pdf.text(t.phase, M + 14, y);

    // Title
    pdf.setTextColor(...C.navy);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(t.title, M + 14, y + 7);

    // Items
    pdf.setTextColor(...C.textSoft);
    pdf.setFontSize(8);
    let iy = y + 14;
    for (const item of t.items) {
      pdf.text(`•  ${item}`, M + 16, iy);
      iy += 5;
    }
    y = iy + 6;
  }

  // Investment summary
  y = space(pdf, y, 40);
  y = sectionTitle(pdf, y, "Investment Summary");

  pdf.setTextColor(...C.textSoft);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  const investText = "Your investment will depend on the scope and scale of the services you choose. We tailor every engagement to your specific needs, goals, and budget — there are no off-the-shelf packages here. The pricing models on the previous page give you a transparent guide to what to expect.";
  const investLines = pdf.splitTextToSize(investText, CW - 8);
  for (const il of investLines) {
    y = space(pdf, y, 5);
    pdf.text(il, M + 4, y);
    y += 5;
  }
  y += 6;

  // Expected outcomes card
  y = space(pdf, y, 40);
  cardBox(pdf, M, y, CW, 34);
  pdf.setTextColor(...C.accent);
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "normal");
  pdf.text("EXPECTED OUTCOMES", M + 8, y + 8);
  pdf.setTextColor(...C.text);
  pdf.setFontSize(8.5);
  pdf.setFont("helvetica", "normal");
  const outcomes = [
    "Improved organic visibility and traffic within 90 days",
    "Higher conversion rates through optimised user journeys",
    "Measurable ROI tracked through transparent reporting dashboards",
    "A stronger competitive position in your target market",
  ];
  let oy = y + 14;
  for (const oc of outcomes) {
    pdf.text(`✓  ${oc}`, M + 8, oy);
    oy += 5;
  }

  // ═══════════════════════════════════════
  // PAGE 17: CTA / NEXT STEPS
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

  // Large faint watermark for final page
  pdf.setFontSize(150);
  pdf.setFont("helvetica", "normal");
  pdf.setGState(new (pdf as any).GState({ opacity: 0.04 }));
  pdf.setTextColor(50, 52, 68);
  pdf.text("AVORRIA", PW / 2 - 8, PH / 2 + 60, { align: "center", angle: 40 });
  pdf.setTextColor(...C.accent);
  pdf.text(".", PW / 2 - 8 + 52, PH / 2 + 60 - 44, { align: "center", angle: 40 });
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));

  // Top + bottom accent (thin)
  pdf.setFillColor(...C.accent);
  pdf.rect(0, 0, PW, 1.5, "F");
  pdf.rect(0, PH - 1.5, PW, 1.5, "F");

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

  // CTA headline (light)
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
  pdf.setFillColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }));
  pdf.roundedRect(PW / 2 - 38, y + 1, 76, 5, 4, 0, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  
  pdf.setTextColor(...C.white);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
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

