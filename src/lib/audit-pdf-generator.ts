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

const COLORS = {
  brandDark: [30, 27, 75] as [number, number, number],      // #1e1b4b
  brandMid: [49, 46, 129] as [number, number, number],       // #312e81
  accent: [236, 72, 153] as [number, number, number],        // #ec4899
  text: [30, 41, 59] as [number, number, number],            // #1e293b
  textLight: [71, 85, 105] as [number, number, number],      // #475569
  textMuted: [148, 163, 184] as [number, number, number],    // #94a3b8
  bg: [241, 245, 249] as [number, number, number],           // #f1f5f9
  white: [255, 255, 255] as [number, number, number],
  green: [34, 197, 94] as [number, number, number],
  yellow: [234, 179, 8] as [number, number, number],
  orange: [249, 115, 22] as [number, number, number],
  red: [239, 68, 68] as [number, number, number],
  emerald: [5, 150, 105] as [number, number, number],
};

function scoreColor(score: number): [number, number, number] {
  if (score >= 80) return COLORS.green;
  if (score >= 60) return COLORS.yellow;
  if (score >= 40) return COLORS.orange;
  return COLORS.red;
}

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 20;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

function ensureSpace(pdf: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_HEIGHT - MARGIN) {
    pdf.addPage();
    return MARGIN;
  }
  return y;
}

export function generateAuditPDF(data: AuditPDFData): void {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  let y = 0;

  // ── Cover Page ──
  // Full background gradient (simulated with two rects)
  pdf.setFillColor(...COLORS.brandDark);
  pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT / 2, "F");
  pdf.setFillColor(...COLORS.brandMid);
  pdf.rect(0, PAGE_HEIGHT / 2, PAGE_WIDTH, PAGE_HEIGHT / 2, "F");

  // Brand name
  pdf.setTextColor(...COLORS.white);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text("AVORRIA", PAGE_WIDTH / 2, 80, { align: "center" });

  // Title
  pdf.setFontSize(36);
  pdf.setFont("helvetica", "bold");
  pdf.text("SEO & Website", PAGE_WIDTH / 2, 110, { align: "center" });
  pdf.text("Audit Report", PAGE_WIDTH / 2, 125, { align: "center" });

  // Company name
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "normal");
  pdf.text(data.companyName, PAGE_WIDTH / 2, 150, { align: "center" });

  // Website
  pdf.setFontSize(11);
  pdf.setTextColor(200, 200, 220);
  pdf.text(data.websiteUrl, PAGE_WIDTH / 2, 162, { align: "center" });

  // Date
  const dateStr = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  pdf.setFontSize(10);
  pdf.text(`Prepared for ${data.userName} • ${dateStr}`, PAGE_WIDTH / 2, 180, { align: "center" });

  // Score on cover
  const sc = scoreColor(data.overallScore);
  pdf.setFillColor(...sc);
  pdf.roundedRect(PAGE_WIDTH / 2 - 25, 200, 50, 50, 6, 6, "F");
  pdf.setTextColor(...COLORS.white);
  pdf.setFontSize(32);
  pdf.setFont("helvetica", "bold");
  pdf.text(String(data.overallScore), PAGE_WIDTH / 2, 228, { align: "center" });
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text("/100", PAGE_WIDTH / 2, 238, { align: "center" });
  pdf.setFontSize(9);
  pdf.text("OVERALL SCORE", PAGE_WIDTH / 2, 260, { align: "center" });

  // ── Page 2: Executive Summary ──
  pdf.addPage();
  y = MARGIN;

  y = drawSectionHeading(pdf, y, "Executive Summary");
  y += 4;

  pdf.setTextColor(...COLORS.textLight);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  const summaryLines = pdf.splitTextToSize(data.executiveSummary, CONTENT_WIDTH);
  for (const line of summaryLines) {
    y = ensureSpace(pdf, y, 6);
    pdf.text(line, MARGIN, y);
    y += 5;
  }

  // ── Score Overview Bar ──
  y += 10;
  y = ensureSpace(pdf, y, 50);
  y = drawSectionHeading(pdf, y, "Score Overview");
  y += 6;

  const sectionOrder: (keyof typeof data.sections)[] = [
    "technical", "seo", "performance", "content", "conversion",
  ];
  for (const key of sectionOrder) {
    const section = data.sections[key];
    y = ensureSpace(pdf, y, 14);
    y = drawScoreBar(pdf, y, section.title, section.score);
    y += 8;
  }

  // ── Detailed Sections ──
  for (const key of sectionOrder) {
    const section = data.sections[key];
    pdf.addPage();
    y = MARGIN;

    // Section header with score badge
    pdf.setFillColor(...COLORS.bg);
    pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 16, 3, 3, "F");

    pdf.setTextColor(...COLORS.text);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text(section.title, MARGIN + 6, y + 10);

    const badgeColor = scoreColor(section.score);
    pdf.setFillColor(...badgeColor);
    pdf.roundedRect(MARGIN + CONTENT_WIDTH - 30, y + 3, 24, 10, 3, 3, "F");
    pdf.setTextColor(...COLORS.white);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.text(`${section.score}/100`, MARGIN + CONTENT_WIDTH - 18, y + 10, { align: "center" });

    y += 24;

    // Findings
    y = ensureSpace(pdf, y, 12);
    pdf.setTextColor(...COLORS.textMuted);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("FINDINGS", MARGIN, y);
    y += 6;

    pdf.setTextColor(...COLORS.textLight);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    for (const finding of section.findings) {
      const lines = pdf.splitTextToSize(`• ${finding}`, CONTENT_WIDTH - 6);
      for (const line of lines) {
        y = ensureSpace(pdf, y, 5);
        pdf.text(line, MARGIN + 3, y);
        y += 4.5;
      }
      y += 1.5;
    }

    y += 6;

    // Recommendations
    y = ensureSpace(pdf, y, 12);
    pdf.setTextColor(...COLORS.textMuted);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "bold");
    pdf.text("RECOMMENDATIONS", MARGIN, y);
    y += 6;

    pdf.setTextColor(...COLORS.textLight);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    for (const rec of section.recommendations) {
      const lines = pdf.splitTextToSize(`→ ${rec}`, CONTENT_WIDTH - 6);
      for (const line of lines) {
        y = ensureSpace(pdf, y, 5);
        pdf.text(line, MARGIN + 3, y);
        y += 4.5;
      }
      y += 1.5;
    }
  }

  // ── Quick Wins Page ──
  pdf.addPage();
  y = MARGIN;

  // Green header band
  pdf.setFillColor(...COLORS.emerald);
  pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 20, 3, 3, "F");
  pdf.setTextColor(...COLORS.white);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("⚡ Quick Wins", MARGIN + 8, y + 13);
  y += 28;

  pdf.setTextColor(...COLORS.textLight);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("High-impact, low-effort improvements you can make right away:", MARGIN, y);
  y += 8;

  for (let i = 0; i < data.quickWins.length; i++) {
    const lines = pdf.splitTextToSize(`${i + 1}. ${data.quickWins[i]}`, CONTENT_WIDTH - 6);
    for (const line of lines) {
      y = ensureSpace(pdf, y, 6);
      pdf.text(line, MARGIN + 3, y);
      y += 5;
    }
    y += 3;
  }

  // ── 90-Day Roadmap ──
  y += 10;
  y = ensureSpace(pdf, y, 30);
  y = drawSectionHeading(pdf, y, "📅 90-Day Roadmap");
  y += 6;

  pdf.setTextColor(...COLORS.textLight);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("Here's what we'd prioritise over the next 90 days:", MARGIN, y);
  y += 8;

  for (let i = 0; i < data.roadmap90Days.length; i++) {
    const lines = pdf.splitTextToSize(`${i + 1}. ${data.roadmap90Days[i]}`, CONTENT_WIDTH - 6);
    for (const line of lines) {
      y = ensureSpace(pdf, y, 6);
      pdf.text(line, MARGIN + 3, y);
      y += 5;
    }
    y += 3;
  }

  // ── CTA Page ──
  pdf.addPage();
  y = PAGE_HEIGHT / 2 - 40;

  pdf.setFillColor(...COLORS.brandDark);
  pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F");

  pdf.setTextColor(...COLORS.white);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("Ready to implement these", PAGE_WIDTH / 2, y, { align: "center" });
  pdf.text("recommendations?", PAGE_WIDTH / 2, y + 12, { align: "center" });

  y += 30;
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "normal");
  pdf.text("Let's discuss how we can improve your", PAGE_WIDTH / 2, y, { align: "center" });
  pdf.text("website's performance together.", PAGE_WIDTH / 2, y + 8, { align: "center" });

  // CTA button
  y += 24;
  pdf.setFillColor(...COLORS.accent);
  pdf.roundedRect(PAGE_WIDTH / 2 - 40, y, 80, 14, 4, 4, "F");
  pdf.setTextColor(...COLORS.white);
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text("avorria.com/contact", PAGE_WIDTH / 2, y + 9, { align: "center" });

  // Footer
  pdf.setTextColor(200, 200, 220);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("hello@avorria.com", PAGE_WIDTH / 2, PAGE_HEIGHT - 30, { align: "center" });
  pdf.text("avorria.com", PAGE_WIDTH / 2, PAGE_HEIGHT - 24, { align: "center" });

  // Save
  const safeCompany = data.companyName.toLowerCase().replace(/[^a-z0-9]/g, "-");
  pdf.save(`avorria-audit-${safeCompany}.pdf`);
}

function drawSectionHeading(pdf: jsPDF, y: number, title: string): number {
  pdf.setTextColor(...COLORS.text);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text(title, MARGIN, y);
  y += 2;

  // Accent underline
  pdf.setDrawColor(...COLORS.accent);
  pdf.setLineWidth(0.8);
  pdf.line(MARGIN, y, MARGIN + 40, y);

  return y + 4;
}

function drawScoreBar(pdf: jsPDF, y: number, label: string, score: number): number {
  // Label
  pdf.setTextColor(...COLORS.text);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(label, MARGIN, y);

  // Score value
  const color = scoreColor(score);
  pdf.setTextColor(...color);
  pdf.setFont("helvetica", "bold");
  pdf.text(`${score}`, MARGIN + CONTENT_WIDTH, y, { align: "right" });

  y += 3;

  // Background bar
  pdf.setFillColor(...COLORS.bg);
  pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, 4, 2, 2, "F");

  // Score fill bar
  const fillWidth = (score / 100) * CONTENT_WIDTH;
  pdf.setFillColor(...color);
  pdf.roundedRect(MARGIN, y, fillWidth, 4, 2, 2, "F");

  return y + 4;
}
