import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BlueprintData {
  projectCode: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  purpose: string;
  palette: string;
  density: string;
  energy: string;
  structureSize: string;
  features: string[];
  straightTalking: number;
  analytical: number;
  understated: number;
  budget: string;
  timeline: string;
  notes?: string;
}

const purposeLabels: Record<string, string> = {
  lead_gen: "Lead Generation",
  authority: "Authority Hub",
  saas: "Product Marketing",
  platform: "Service Platform",
};

const budgetLabels: Record<string, string> = {
  "<10k": "Under £10,000",
  "10k-25k": "£10,000 - £25,000",
  "25k-50k": "£25,000 - £50,000",
  "50k+": "£50,000+",
};

const timelineLabels: Record<string, string> = {
  asap: "As soon as possible",
  "0-3": "0-3 months",
  "3-6": "3-6 months",
  "6+": "6+ months",
};

function generatePDFHTML(data: BlueprintData): string {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const personalityTraits = [
    { label: data.straightTalking > 50 ? "Direct Communication" : "Polished Communication", value: data.straightTalking },
    { label: data.analytical > 50 ? "Data-Driven" : "Story-Led", value: data.analytical },
    { label: data.understated > 50 ? "Understated Elegance" : "Bold Showpiece", value: data.understated },
  ];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Website Blueprint - ${data.projectCode}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1e293b;
      line-height: 1.6;
      background: #ffffff;
    }
    
    .page {
      max-width: 800px;
      margin: 0 auto;
      padding: 60px 50px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0ea5e9;
      padding-bottom: 30px;
      margin-bottom: 40px;
    }
    
    .logo {
      font-size: 28px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    
    .logo span {
      color: #0ea5e9;
    }
    
    .project-badge {
      text-align: right;
    }
    
    .project-code {
      font-family: 'Courier New', monospace;
      font-size: 18px;
      font-weight: 600;
      color: #0ea5e9;
      letter-spacing: 1px;
    }
    
    .project-date {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
    }
    
    .title {
      font-size: 32px;
      font-weight: 300;
      color: #0f172a;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    
    .subtitle {
      font-size: 14px;
      color: #64748b;
      margin-bottom: 40px;
    }
    
    .section {
      margin-bottom: 35px;
    }
    
    .section-title {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #94a3b8;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    
    .grid-3 {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .card {
      background: #f8fafc;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #e2e8f0;
    }
    
    .card-label {
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      margin-bottom: 6px;
    }
    
    .card-value {
      font-size: 16px;
      font-weight: 500;
      color: #0f172a;
    }
    
    .card-value.large {
      font-size: 20px;
      font-weight: 600;
    }
    
    .features-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    .feature-tag {
      background: #ede9fe;
      color: #7c3aed;
      font-size: 12px;
      font-weight: 500;
      padding: 8px 14px;
      border-radius: 20px;
    }
    
    .personality-bar {
      margin-bottom: 16px;
    }
    
    .personality-label {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #64748b;
      margin-bottom: 6px;
    }
    
    .bar-container {
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .bar-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, #0ea5e9, #6366f1);
    }
    
    .contact-info {
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: white;
      border-radius: 16px;
      padding: 30px;
      margin-top: 40px;
    }
    
    .contact-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    
    .contact-item {
      font-size: 13px;
    }
    
    .contact-item-label {
      color: #94a3b8;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 4px;
    }
    
    .contact-item-value {
      color: white;
      font-weight: 500;
    }
    
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      font-size: 11px;
      color: #94a3b8;
    }
    
    .notes-section {
      background: #fffbeb;
      border: 1px solid #fcd34d;
      border-radius: 12px;
      padding: 20px;
      margin-top: 20px;
    }
    
    .notes-title {
      font-size: 12px;
      font-weight: 600;
      color: #b45309;
      margin-bottom: 8px;
    }
    
    .notes-content {
      font-size: 14px;
      color: #78350f;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="logo">Avorria<span>.</span></div>
      <div class="project-badge">
        <div class="project-code">${data.projectCode}</div>
        <div class="project-date">${date}</div>
      </div>
    </div>
    
    <h1 class="title">Website Blueprint</h1>
    <p class="subtitle">Custom specification document for ${data.company}</p>
    
    <div class="section">
      <h2 class="section-title">Project Overview</h2>
      <div class="grid">
        <div class="card">
          <div class="card-label">Website Purpose</div>
          <div class="card-value large">${purposeLabels[data.purpose] || data.purpose}</div>
        </div>
        <div class="card">
          <div class="card-label">Site Structure</div>
          <div class="card-value large">${data.structureSize === "lean" ? "Lean (3-5 pages)" : data.structureSize === "standard" ? "Standard (6-10 pages)" : "Expanded (10+ pages)"}</div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">Design Direction</h2>
      <div class="grid grid-3">
        <div class="card">
          <div class="card-label">Aesthetic</div>
          <div class="card-value">${data.energy === "bold" ? "Bold & Dynamic" : "Refined & Elegant"}</div>
        </div>
        <div class="card">
          <div class="card-label">Color Palette</div>
          <div class="card-value" style="text-transform: capitalize">${data.palette === "mono" ? "Monochrome" : data.palette}</div>
        </div>
        <div class="card">
          <div class="card-label">Density</div>
          <div class="card-value" style="text-transform: capitalize">${data.density}</div>
        </div>
      </div>
    </div>
    
    ${data.features.length > 0 ? `
    <div class="section">
      <h2 class="section-title">Selected Features</h2>
      <div class="features-grid">
        ${data.features.map(f => `<span class="feature-tag">${f}</span>`).join("")}
      </div>
    </div>
    ` : ""}
    
    <div class="section">
      <h2 class="section-title">Brand Personality</h2>
      ${personalityTraits.map(trait => `
        <div class="personality-bar">
          <div class="personality-label">
            <span>${trait.label}</span>
            <span>${trait.value}%</span>
          </div>
          <div class="bar-container">
            <div class="bar-fill" style="width: ${trait.value}%"></div>
          </div>
        </div>
      `).join("")}
    </div>
    
    <div class="section">
      <h2 class="section-title">Project Parameters</h2>
      <div class="grid">
        <div class="card">
          <div class="card-label">Investment Range</div>
          <div class="card-value">${budgetLabels[data.budget] || data.budget}</div>
        </div>
        <div class="card">
          <div class="card-label">Timeline</div>
          <div class="card-value">${timelineLabels[data.timeline] || data.timeline}</div>
        </div>
      </div>
    </div>
    
    ${data.notes ? `
    <div class="notes-section">
      <div class="notes-title">Additional Notes</div>
      <div class="notes-content">${data.notes}</div>
    </div>
    ` : ""}
    
    <div class="contact-info">
      <div class="contact-title">Client Details</div>
      <div class="contact-grid">
        <div class="contact-item">
          <div class="contact-item-label">Name</div>
          <div class="contact-item-value">${data.name}</div>
        </div>
        <div class="contact-item">
          <div class="contact-item-label">Company</div>
          <div class="contact-item-value">${data.company}</div>
        </div>
        <div class="contact-item">
          <div class="contact-item-label">Email</div>
          <div class="contact-item-value">${data.email}</div>
        </div>
        ${data.phone ? `
        <div class="contact-item">
          <div class="contact-item-label">Phone</div>
          <div class="contact-item-value">${data.phone}</div>
        </div>
        ` : ""}
      </div>
    </div>
    
    <div class="footer">
      <p>This blueprint was generated via the Avorria Web Design Studio</p>
      <p style="margin-top: 4px;">© ${new Date().getFullYear()} Avorria Digital. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: BlueprintData = await req.json();

    if (!data.projectCode || !data.name || !data.company) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = generatePDFHTML(data);

    // Return HTML that can be converted to PDF client-side using html2pdf or similar
    return new Response(
      JSON.stringify({ html, success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("PDF generation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to generate PDF";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
