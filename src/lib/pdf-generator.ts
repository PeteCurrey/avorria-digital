/**
 * Secure PDF generation utility using jspdf and html2canvas directly
 * Replaces vulnerable html2pdf.js dependency
 */

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface PDFOptions {
  filename: string;
  margin?: number;
  imageQuality?: number;
  scale?: number;
  format?: "a4" | "letter";
  orientation?: "portrait" | "landscape";
}

const defaultOptions: Required<PDFOptions> = {
  filename: "document.pdf",
  margin: 0,
  imageQuality: 0.98,
  scale: 2,
  format: "a4",
  orientation: "portrait",
};

/**
 * Convert HTML content to PDF and trigger download
 * 
 * @param htmlContent - The HTML string to convert to PDF
 * @param options - PDF generation options
 * @returns Promise that resolves when PDF is downloaded
 */
export async function generatePDFFromHTML(
  htmlContent: string,
  options: PDFOptions
): Promise<void> {
  const opts = { ...defaultOptions, ...options };
  
  // Create temporary container
  const container = document.createElement("div");
  container.innerHTML = htmlContent;
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "210mm"; // A4 width
  document.body.appendChild(container);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: opts.scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    // Get dimensions
    const imgWidth = opts.format === "a4" ? 210 : 216; // mm
    const pageHeight = opts.format === "a4" ? 297 : 279; // mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: opts.orientation,
      unit: "mm",
      format: opts.format,
    });

    let heightLeft = imgHeight;
    let position = opts.margin;

    // Add first page
    const imgData = canvas.toDataURL("image/jpeg", opts.imageQuality);
    pdf.addImage(imgData, "JPEG", opts.margin, position, imgWidth - (opts.margin * 2), imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", opts.margin, position, imgWidth - (opts.margin * 2), imgHeight);
      heightLeft -= pageHeight;
    }

    // Sanitize filename
    const safeFilename = opts.filename
      .replace(/[^a-z0-9.-]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "document";
    
    const finalFilename = safeFilename.endsWith(".pdf") ? safeFilename : `${safeFilename}.pdf`;

    // Download PDF
    pdf.save(finalFilename);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
}

/**
 * Convert an existing DOM element to PDF
 * 
 * @param element - The DOM element to convert
 * @param options - PDF generation options
 * @returns Promise that resolves when PDF is downloaded
 */
export async function generatePDFFromElement(
  element: HTMLElement,
  options: PDFOptions
): Promise<void> {
  const opts = { ...defaultOptions, ...options };

  try {
    // Convert element to canvas
    const canvas = await html2canvas(element, {
      scale: opts.scale,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    // Get dimensions
    const imgWidth = opts.format === "a4" ? 210 : 216; // mm
    const pageHeight = opts.format === "a4" ? 297 : 279; // mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF({
      orientation: opts.orientation,
      unit: "mm",
      format: opts.format,
    });

    let heightLeft = imgHeight;
    let position = opts.margin;

    // Add first page
    const imgData = canvas.toDataURL("image/jpeg", opts.imageQuality);
    pdf.addImage(imgData, "JPEG", opts.margin, position, imgWidth - (opts.margin * 2), imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", opts.margin, position, imgWidth - (opts.margin * 2), imgHeight);
      heightLeft -= pageHeight;
    }

    // Sanitize filename
    const safeFilename = opts.filename
      .replace(/[^a-z0-9.-]/gi, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "document";
    
    const finalFilename = safeFilename.endsWith(".pdf") ? safeFilename : `${safeFilename}.pdf`;

    // Download PDF
    pdf.save(finalFilename);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  }
}
