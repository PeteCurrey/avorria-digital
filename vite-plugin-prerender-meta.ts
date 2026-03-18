/**
 * Vite plugin that generates per-route HTML files at build time.
 * Each file has unique meta tags and lightweight semantic content
 * so crawlers see correct metadata without executing JavaScript.
 */
import { Plugin } from "vite";
import * as fs from "fs";
import * as path from "path";

interface RouteMetadata {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  h1: string;
  introText: string;
  schemaType?: string;
}

const SITE_URL = "https://avorria.com";
const DEFAULT_OG_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/7MJD8mgRihYZLAUga3hIuKQHE2u2/social-images/social-1765645939140-20250710_1857_image (1).png";
const TWITTER_HANDLE = "@avorria";

function buildHeadTags(meta: RouteMetadata): string {
  const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;
  return `
    <title>${escapeHtml(meta.title)}</title>
    <meta name="title" content="${escapeAttr(meta.title)}" />
    <meta name="description" content="${escapeAttr(meta.description)}" />
    <link rel="canonical" href="${escapeAttr(meta.canonical)}" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeAttr(meta.canonical)}" />
    <meta property="og:title" content="${escapeAttr(meta.title)}" />
    <meta property="og:description" content="${escapeAttr(meta.description)}" />
    <meta property="og:image" content="${escapeAttr(ogImage)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeAttr(meta.h1)} | Avorria" />
    <meta property="og:site_name" content="Avorria" />
    <meta property="og:locale" content="en_GB" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="${TWITTER_HANDLE}" />
    <meta name="twitter:creator" content="${TWITTER_HANDLE}" />
    <meta name="twitter:title" content="${escapeAttr(meta.title)}" />
    <meta name="twitter:description" content="${escapeAttr(meta.description)}" />
    <meta name="twitter:image" content="${escapeAttr(ogImage)}" />
  `;
}

function buildNoscriptContent(meta: RouteMetadata): string {
  return `<noscript><h1>${escapeHtml(meta.h1)}</h1><p>${escapeHtml(meta.introText)}</p><p><a href="${SITE_URL}/contact">Contact Avorria</a> | <a href="${SITE_URL}/services">Our Services</a></p></noscript>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(str: string): string {
  return str.replace(/"/g, "&quot;").replace(/&/g, "&amp;");
}

export function prerenderMetaPlugin(): Plugin {
  let outDir = "dist";

  return {
    name: "prerender-meta",
    apply: "build",

    configResolved(config) {
      outDir = config.build.outDir || "dist";
    },

    async closeBundle() {
      // Dynamically import the route metadata (compiled by Vite)
      // Since this runs after build, we need to load the data directly
      const metadataModule = await importRouteMetadata();
      if (!metadataModule) {
        console.warn("[prerender-meta] Could not load route metadata, skipping.");
        return;
      }

      const routes = metadataModule;
      const templatePath = path.resolve(outDir, "index.html");

      if (!fs.existsSync(templatePath)) {
        console.warn("[prerender-meta] No dist/index.html found, skipping.");
        return;
      }

      const template = fs.readFileSync(templatePath, "utf-8");
      let generated = 0;

      for (const [routePath, meta] of Object.entries(routes)) {
        if (routePath === "/") continue; // Homepage uses root index.html

        const html = injectMeta(template, meta);
        const filePath = path.resolve(outDir, routePath.replace(/^\//, ""), "index.html");
        const dir = path.dirname(filePath);

        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(filePath, html, "utf-8");
        generated++;
      }

      // Also update the root index.html with homepage metadata
      const homeMeta = routes["/"];
      if (homeMeta) {
        const homeHtml = injectMeta(template, homeMeta);
        fs.writeFileSync(templatePath, homeHtml, "utf-8");
      }

      console.log(`[prerender-meta] Generated ${generated} route HTML files.`);
    },
  };
}

function injectMeta(template: string, meta: RouteMetadata): string {
  let html = template;

  // Replace <title> tag
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Remove existing meta tags we'll replace
  const removeTags = [
    /<meta\s+name="title"[^>]*>/gi,
    /<meta\s+name="description"[^>]*>/gi,
    /<link\s+rel="canonical"[^>]*>/gi,
    /<meta\s+property="og:type"[^>]*>/gi,
    /<meta\s+property="og:url"[^>]*>/gi,
    /<meta\s+property="og:title"[^>]*>/gi,
    /<meta\s+property="og:description"[^>]*>/gi,
    /<meta\s+property="og:image"[^>]*>/gi,
    /<meta\s+property="og:image:width"[^>]*>/gi,
    /<meta\s+property="og:image:height"[^>]*>/gi,
    /<meta\s+property="og:image:alt"[^>]*>/gi,
    /<meta\s+name="twitter:card"[^>]*>/gi,
    /<meta\s+name="twitter:site"[^>]*>/gi,
    /<meta\s+name="twitter:creator"[^>]*>/gi,
    /<meta\s+name="twitter:url"[^>]*>/gi,
    /<meta\s+name="twitter:title"[^>]*>/gi,
    /<meta\s+name="twitter:description"[^>]*>/gi,
    /<meta\s+name="twitter:image"[^>]*>/gi,
    /<meta\s+name="twitter:image:alt"[^>]*>/gi,
  ];

  for (const regex of removeTags) {
    html = html.replace(regex, "");
  }

  // Inject new meta tags before </head>
  const headTags = buildHeadTags(meta);
  html = html.replace("</head>", `${headTags}\n  </head>`);

  // Inject noscript content inside <div id="root">
  const noscript = buildNoscriptContent(meta);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${noscript}</div>`
  );

  // Clean up any double blank lines
  html = html.replace(/\n{3,}/g, "\n\n");

  return html;
}

/**
 * Load route metadata at build time.
 * We use a simple approach: execute the TS file via a bundled copy.
 */
async function importRouteMetadata(): Promise<Record<string, RouteMetadata> | null> {
  try {
    // Use tsx/ts-node or just parse the data inline since it's self-contained
    const { execSync } = await import("child_process");
    
    // Create a temporary script that extracts the route data
    const tmpScript = path.resolve("_tmp_extract_routes.mjs");
    const scriptContent = `
      import { createRequire } from 'module';
      import { register } from 'module';
      
      // Simple approach: use tsx to run the TS file
      const tsFile = './src/data/routeMetadata.ts';
      
      // Since we can't easily import TS at build time, 
      // let's use a simpler approach and inline the data extraction
      import { pathToFileURL } from 'url';
      
      // We'll use Vite's own transform
      process.exit(0);
    `;

    // Simpler approach: just use the compiled output
    // The routeMetadata.ts is self-contained (no @/ imports), so we can
    // transpile it with esbuild which Vite already has
    const esbuild = await import("esbuild");
    
    const result = await esbuild.build({
      entryPoints: ["src/data/routeMetadata.ts"],
      bundle: true,
      write: false,
      format: "esm",
      platform: "node",
      target: "node18",
    });

    const code = result.outputFiles?.[0]?.text;
    if (!code) return null;

    // Write to temp file and import
    const tmpFile = path.resolve("_tmp_routes.mjs");
    fs.writeFileSync(tmpFile, code, "utf-8");

    const mod = await import(tmpFile);
    
    // Clean up
    try { fs.unlinkSync(tmpFile); } catch {}
    try { fs.unlinkSync(tmpScript); } catch {}

    return mod.routeMetadata || mod.getAllRouteMetadata?.() || null;
  } catch (err) {
    console.error("[prerender-meta] Error loading route metadata:", err);
    return null;
  }
}

export default prerenderMetaPlugin;
