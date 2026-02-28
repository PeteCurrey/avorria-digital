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

// Avorria brand palette (from index.css design tokens)
const COLORS = {
  dark: [28, 30, 38] as [number, number, number],           // hsl(220,25%,12%) → #1c1e26
  darkMid: [35, 38, 48] as [number, number, number],         // slightly lighter
  accent: [220, 60, 150] as [number, number, number],        // hsl(320,85%,55%) → pink
  accentSoft: [180, 80, 170] as [number, number, number],    // lighter pink
  text: [28, 30, 38] as [number, number, number],
  textLight: [90, 95, 110] as [number, number, number],
  textMuted: [148, 155, 170] as [number, number, number],
  bg: [245, 246, 250] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  green: [34, 180, 94] as [number, number, number],
  yellow: [220, 170, 30] as [number, number, number],
  orange: [235, 115, 40] as [number, number, number],
  red: [220, 68, 68] as [number, number, number],
  emerald: [16, 140, 100] as [number, number, number],
  purple: [120, 80, 180] as [number, number, number],
  blue: [60, 120, 220] as [number, number, number],
};

function scoreColor(score: number): [number, number, number] {
  if (score >= 80) return COLORS.green;
  if (score >= 60) return COLORS.yellow;
  if (score >= 40) return COLORS.orange;
  return COLORS.red;
}

function scoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Needs Work";
  return "Critical";
}

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function ensureSpace(pdf: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_HEIGHT - 30) {
    pdf.addPage();
    addWatermark(pdf);
    addPageFooter(pdf);
    return MARGIN + 8;
  }
  return y;
}

function addWatermark(pdf: jsPDF): void {
  pdf.setTextColor(200, 200, 210);
  pdf.setFontSize(60);
  pdf.setFont("helvetica", "bold");
  // Rotate text for diagonal watermark
  const cx = PAGE_WIDTH / 2;
  const cy = PAGE_HEIGHT / 2;
  pdf.saveGraphicsState();
  // jsPDF doesn't have native rotation for text easily, so we use a light centered mark
  pdf.setTextColor(230, 230, 240);
  pdf.setFontSize(72);
  pdf.text("AVORRIA", cx, cy, { align: "center", angle: 45 });
  pdf.restoreGraphicsState();
}

function addPageFooter(pdf: jsPDF): void {
  // Thin accent line
  pdf.setDrawColor(...COLORS.accent);
  pdf.setLineWidth(0.5);
  pdf.line(MARGIN, PAGE_HEIGHT - 18, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 18);
  
  pdf.setTextColor(...COLORS.textMuted);
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "normal");
  pdf.text("avorria.com", MARGIN, PAGE_HEIGHT - 12);
  pdf.text("hello@avorria.com", PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 12, { align: "right" });
  
  // Page number
  const pageNum = (pdf as any).internal.getNumberOfPages();
  pdf.text(`Page ${pageNum}`, PAGE_WIDTH / 2, PAGE_HEIGHT - 12, { align: "center" });
}

function drawGaugeChart(pdf: jsPDF, cx: number, cy: number, radius: number, score: number, label: string): void {
  const color = scoreColor(score);
  
  // Background circle
  pdf.setDrawColor(220, 225, 235);
  pdf.setLineWidth(3);
  pdf.circle(cx, cy, radius);
  
  // Score arc - simulate with filled circle and overlay
  pdf.setFillColor(...color);
  // Draw score arc segments
  const segments = Math.round((score / 100) * 36);
  for (let i = 0; i < segments; i++) {
    const angle = (i * 10 - 90) * (Math.PI / 180);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    pdf.setFillColor(...color);
    pdf.circle(x, y, 1.2, "F");
  }
  
  // Center white circle
  pdf.setFillColor(...COLORS.white);
  pdf.circle(cx, cy, radius - 4, "F");
  
  // Score text
  pdf.setTextColor(...color);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text(String(score), cx, cy + 2, { align: "center" });
  
  // Label below
  pdf.setTextColor(...COLORS.textMuted);
  pdf.setFontSize(6.5);
  pdf.setFont("helvetica", "normal");
  pdf.text(label, cx, cy + radius + 6, { align: "center" });
}

function drawProgressBar(pdf: jsPDF, x: number, y: number, width: number, score: number, label: string): number {
  const color = scoreColor(score);
  
  // Label
  pdf.setTextColor(...COLORS.text);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text(label, x, y);
  
  // Score + label on right
  pdf.setTextColor(...color);
  pdf.setFont("helvetica", "bold");
  pdf.text(`${score}/100 — ${scoreLabel(score)}`, x + width, y, { align: "right" });
  
  y += 3;
  
  // Background bar
  pdf.setFillColor(230, 232, 240);
  pdf.roundedRect(x, y, width, 5, 2.5, 2.5, "F");
  
  // Fill bar with gradient simulation (darker to lighter)
  const fillWidth = Math.max((score / 100) * width, 5);
  pdf.setFillColor(...color);
  pdf.roundedRect(x, y, fillWidth, 5, 2.5, 2.5, "F");
  
  // Small highlight
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(x + 1, y + 0.8, fillWidth * 0.6, 1.5, 0.75, 0.75, "F");
  
  return y + 5;
}

function drawSectionDivider(pdf: jsPDF, y: number): number {
  // Gradient accent line
  pdf.setDrawColor(...COLORS.accent);
  pdf.setLineWidth(0.8);
  pdf.line(MARGIN, y, MARGIN + 50, y);
  pdf.setDrawColor(230, 232, 240);
  pdf.setLineWidth(0.3);
  pdf.line(MARGIN + 50, y, PAGE_WIDTH - MARGIN, y);
  return y + 6;
}

export async function generateAuditPDF(data: AuditPDFData): Promise<void> {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  let y = 0;

  // ── Load hero background image ──
  let heroImageData: string | null = null;
  try {
    const { default: heroPenthouse } = await import("@/assets/hero-penthouse.png");
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = heroPenthouse;
    });
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    heroImageData = canvas.toDataURL("image/jpeg", 0.85);
  } catch {
    // Fallback: no image
  }

  // ═══════════════════════════════════════
  // ── COVER PAGE ──
  // ═══════════════════════════════════════
  
  // Background image (full bleed)
  if (heroImageData) {
    pdf.addImage(heroImageData, "JPEG", 0, 0, PAGE_WIDTH, PAGE_HEIGHT);
  }
  
  // Dark overlay for text contrast
  pdf.setFillColor(28, 30, 38);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.78 }));
  pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  
  // Accent gradient bar at top
  pdf.setFillColor(...COLORS.accent);
  pdf.rect(0, 0, PAGE_WIDTH, 3, "F");
  
  // Avorria logo text
  pdf.setTextColor(...COLORS.white);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("AVORRIA", MARGIN, 32);
  
  // Subtitle badge
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(200, 200, 215);
  pdf.text("DIGITAL MARKETING AGENCY", MARGIN, 40);
  
  // Main title
  pdf.setTextColor(...COLORS.white);
  pdf.setFontSize(38);
  pdf.setFont("helvetica", "bold");
  pdf.text("SEO & Website", MARGIN, 100);
  pdf.text("Audit Report", MARGIN, 116);
  
  // Accent underline
  pdf.setFillColor(...COLORS.accent);
  pdf.rect(MARGIN, 120, 60, 2, "F");
  
  // Company & website
  y = 140;
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(...COLORS.white);
  pdf.text(data.companyName, MARGIN, y);
  
  pdf.setFontSize(11);
  pdf.setTextColor(180, 185, 200);
  pdf.text(data.websiteUrl, MARGIN, y + 10);
  
  // Date
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  pdf.setFontSize(9);
  pdf.setTextColor(160, 165, 180);
  pdf.text(`Prepared for ${data.userName}`, MARGIN, y + 22);
  pdf.text(dateStr, MARGIN, y + 29);
  
  // Overall score card (bottom-right)
  const scoreCardX = PAGE_WIDTH - MARGIN - 60;
  const scoreCardY = PAGE_HEIGHT - 95;
  
  // Score card background
  pdf.setFillColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.12 }));
  pdf.roundedRect(scoreCardX, scoreCardY, 60, 60, 4, 4, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  
  // Score circle
  const sc = scoreColor(data.overallScore);
  pdf.setFillColor(...sc);
  pdf.circle(scoreCardX + 30, scoreCardY + 22, 16, "F");
  
  pdf.setTextColor(...COLORS.white);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text(String(data.overallScore), scoreCardX + 30, scoreCardY + 26, { align: "center" });
  
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.text("/ 100", scoreCardX + 30, scoreCardY + 33, { align: "center" });
  
  pdf.setTextColor(200, 200, 215);
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "bold");
  pdf.text("OVERALL SCORE", scoreCardX + 30, scoreCardY + 50, { align: "center" });
  
  // Bottom accent bar
  pdf.setFillColor(...COLORS.accent);
  pdf.rect(0, PAGE_HEIGHT - 3, PAGE_WIDTH, 3, "F");

  // ═══════════════════════════════════════
  // ── PAGE 2: EXECUTIVE SUMMARY + SCORE OVERVIEW ──
  // ═══════════════════════════════════════
  pdf.addPage();
  addWatermark(pdf);
  addPageFooter(pdf);
  y = MARGIN + 5;

  // Section heading
  pdf.setTextColor(...COLORS.dark);
  pdf.setFontSize(20);
  pdf.setFont("helvetica", "bold");
  pdf.text("Executive Summary", MARGIN, y);
  y += 3;
  y = drawSectionDivider(pdf, y);
  y += 4;

  // Summary text
  pdf.setTextColor(...COLORS.textLight);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  const summaryLines = pdf.splitTextToSize(data.executiveSummary, CONTENT_WIDTH);
  for (const line of summaryLines) {
    y = ensureSpace(pdf, y, 6);
    pdf.text(line, MARGIN, y);
    y += 5;
  }

  // ── Score Overview with Gauge Charts ──
  y += 12;
  y = ensureSpace(pdf, y, 70);

  pdf.setTextColor(...COLORS.dark);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text("Score Overview", MARGIN, y);
  y += 3;
  y = drawSectionDivider(pdf, y);
  y += 8;

  // Draw 5 gauge charts in a row
  const sectionOrder: (keyof typeof data.sections)[] = [
    "technical", "seo", "performance", "content", "conversion",
  ];
  const gaugeSpacing = CONTENT_WIDTH / 5;
  const gaugeRadius = 12;
  
  for (let i = 0; i < sectionOrder.length; i++) {
    const section = data.sections[sectionOrder[i]];
    const cx = MARGIN + gaugeSpacing * i + gaugeSpacing / 2;
    drawGaugeChart(pdf, cx, y + gaugeRadius, gaugeRadius, section.score, section.title);
  }
  
  y += gaugeRadius * 2 + 14;

  // Score bars below gauges for clarity
  y += 6;
  for (const key of sectionOrder) {
    const section = data.sections[key];
    y = ensureSpace(pdf, y, 14);
    y = drawProgressBar(pdf, MARGIN, y, CONTENT_WIDTH, section.score, section.title);
    y += 8;
  }

  // ═══════════════════════════════════════
  // ── DETAILED SECTION PAGES ──
  // ═══════════════════════════════════════
  for (const key of sectionOrder) {
    const section = data.sections[key];
    pdf.addPage();
    addWatermark(pdf);
    addPageFooter(pdf);
    y = MARGIN + 5;

    // Dark header band
    pdf.setFillColor(...COLORS.dark);
    pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 22, 3, 3, "F");
    
    // Accent left edge
    pdf.setFillColor(...COLORS.accent);
    pdf.roundedRect(MARGIN, y, 3, 22, 1.5, 0, "F");

    // Section title
    pdf.setTextColor(...COLORS.white);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text(section.title, MARGIN + 10, y + 10);

    // Score badge
    const badgeColor = scoreColor(section.score);
    pdf.setFillColor(...badgeColor);
    pdf.roundedRect(MARGIN + CONTENT_WIDTH - 36, y + 4, 30, 14, 3, 3, "F");
    pdf.setTextColor(...COLORS.white);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text(`${section.score}/100`, MARGIN + CONTENT_WIDTH - 21, y + 13, { align: "center" });

    y += 30;

    // Mini gauge for this section
    drawGaugeChart(pdf, PAGE_WIDTH - MARGIN - 20, y + 8, 10, section.score, scoreLabel(section.score));

    // Findings
    pdf.setTextColor(...COLORS.accent);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("FINDINGS", MARGIN, y);
    y += 6;

    pdf.setTextColor(...COLORS.textLight);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    for (const finding of section.findings) {
      const lines = pdf.splitTextToSize(`• ${finding}`, CONTENT_WIDTH - 50);
      for (const line of lines) {
        y = ensureSpace(pdf, y, 5);
        pdf.text(line, MARGIN + 3, y);
        y += 4.5;
      }
      y += 2;
    }

    y += 8;

    // Recommendations with accent highlight
    y = ensureSpace(pdf, y, 12);
    
    // Light background box for recommendations
    const recStartY = y - 3;
    pdf.setTextColor(...COLORS.accent);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("RECOMMENDATIONS", MARGIN, y);
    y += 6;

    pdf.setTextColor(...COLORS.text);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    for (const rec of section.recommendations) {
      const lines = pdf.splitTextToSize(`→ ${rec}`, CONTENT_WIDTH - 10);
      for (const line of lines) {
        y = ensureSpace(pdf, y, 5);
        pdf.text(line, MARGIN + 5, y);
        y += 4.5;
      }
      y += 2;
    }
    
    // Draw background behind recommendations
    const recHeight = y - recStartY + 2;
    pdf.setFillColor(245, 246, 252);
    pdf.setGState(new (pdf as any).GState({ opacity: 0.5 }));
    pdf.roundedRect(MARGIN - 2, recStartY - 5, CONTENT_WIDTH + 4, recHeight, 3, 3, "F");
    pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  }

  // ═══════════════════════════════════════
  // ── QUICK WINS PAGE ──
  // ═══════════════════════════════════════
  pdf.addPage();
  addWatermark(pdf);
  addPageFooter(pdf);
  y = MARGIN + 5;

  // Header with gradient-style background
  pdf.setFillColor(...COLORS.emerald);
  pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 24, 3, 3, "F");
  
  // Light highlight stripe
  pdf.setFillColor(255, 255, 255);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.15 }));
  pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 8, 3, 0, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  
  pdf.setTextColor(...COLORS.white);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Quick Wins", MARGIN + 10, y + 15);
  
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("High-impact improvements you can make right away", MARGIN + 60, y + 15);
  y += 32;

  for (let i = 0; i < data.quickWins.length; i++) {
    y = ensureSpace(pdf, y, 18);
    
    // Number badge
    pdf.setFillColor(...COLORS.emerald);
    pdf.circle(MARGIN + 5, y - 1, 4, "F");
    pdf.setTextColor(...COLORS.white);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text(String(i + 1), MARGIN + 5, y + 1, { align: "center" });
    
    // Text
    pdf.setTextColor(...COLORS.text);
    pdf.setFontSize(9.5);
    pdf.setFont("helvetica", "normal");
    const lines = pdf.splitTextToSize(data.quickWins[i], CONTENT_WIDTH - 18);
    for (const line of lines) {
      pdf.text(line, MARGIN + 14, y);
      y += 5;
    }
    y += 4;
  }

  // ── 90-Day Roadmap ──
  y += 8;
  y = ensureSpace(pdf, y, 30);

  pdf.setTextColor(...COLORS.dark);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text("90-Day Roadmap", MARGIN, y);
  y += 3;
  y = drawSectionDivider(pdf, y);
  y += 4;

  pdf.setTextColor(...COLORS.textLight);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("Here's what we'd prioritise over the next 90 days:", MARGIN, y);
  y += 8;

  for (let i = 0; i < data.roadmap90Days.length; i++) {
    y = ensureSpace(pdf, y, 18);
    
    // Timeline dot with line
    pdf.setFillColor(...COLORS.accent);
    pdf.circle(MARGIN + 4, y, 2.5, "F");
    if (i < data.roadmap90Days.length - 1) {
      pdf.setDrawColor(220, 225, 235);
      pdf.setLineWidth(0.5);
      pdf.line(MARGIN + 4, y + 3, MARGIN + 4, y + 16);
    }
    
    // Text
    pdf.setTextColor(...COLORS.text);
    pdf.setFontSize(9.5);
    pdf.setFont("helvetica", "normal");
    const lines = pdf.splitTextToSize(data.roadmap90Days[i], CONTENT_WIDTH - 18);
    for (const line of lines) {
      pdf.text(line, MARGIN + 14, y + 1);
      y += 5;
    }
    y += 5;
  }

  // ═══════════════════════════════════════
  // ── CTA PAGE ──
  // ═══════════════════════════════════════
  pdf.addPage();
  
  // Full dark background
  pdf.setFillColor(...COLORS.dark);
  pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F");
  
  // Subtle radial gradient simulation
  pdf.setFillColor(50, 45, 80);
  pdf.setGState(new (pdf as any).GState({ opacity: 0.3 }));
  pdf.circle(PAGE_WIDTH / 2, PAGE_HEIGHT / 3, 80, "F");
  pdf.setGState(new (pdf as any).GState({ opacity: 1 }));
  
  // Watermark on CTA page too
  pdf.setTextColor(50, 52, 65);
  pdf.setFontSize(72);
  pdf.setFont("helvetica", "bold");
  pdf.text("AVORRIA", PAGE_WIDTH / 2, PAGE_HEIGHT / 2 + 50, { align: "center", angle: 45 });
  
  // Top accent bar
  pdf.setFillColor(...COLORS.accent);
  pdf.rect(0, 0, PAGE_WIDTH, 3, "F");

  y = PAGE_HEIGHT / 2 - 50;

  // Avorria brand
  pdf.setTextColor(...COLORS.white);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("AVORRIA", PAGE_WIDTH / 2, y - 20, { align: "center" });

  pdf.setFontSize(28);
  pdf.setFont("helvetica", "bold");
  pdf.text("Ready to implement these", PAGE_WIDTH / 2, y, { align: "center" });
  pdf.text("recommendations?", PAGE_WIDTH / 2, y + 14, { align: "center" });

  y += 32;
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(180, 185, 200);
  pdf.text("Let's discuss how we can improve your", PAGE_WIDTH / 2, y, { align: "center" });
  pdf.text("website's performance together.", PAGE_WIDTH / 2, y + 8, { align: "center" });

  // CTA button
  y += 26;
  pdf.setFillColor(...COLORS.accent);
  pdf.roundedRect(PAGE_WIDTH / 2 - 42, y, 84, 16, 8, 8, "F");
  pdf.setTextColor(...COLORS.white);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text("avorria.com/contact", PAGE_WIDTH / 2, y + 10.5, { align: "center" });

  // Contact details
  y += 40;
  pdf.setTextColor(160, 165, 180);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text("hello@avorria.com", PAGE_WIDTH / 2, y, { align: "center" });
  pdf.text("avorria.com", PAGE_WIDTH / 2, y + 8, { align: "center" });
  
  // Bottom accent bar
  pdf.setFillColor(...COLORS.accent);
  pdf.rect(0, PAGE_HEIGHT - 3, PAGE_WIDTH, 3, "F");

  // Save
  const safeCompany = data.companyName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  pdf.save(`avorria-audit-${safeCompany}.pdf`);
}
