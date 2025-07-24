const { LOCALIDADES_VALIDAS } = require("../scripts/local-seo-cities.js");
const { writeFileSync } = require("fs");

const baseUrl = "https://lazarortega.com";
const lastmod = "2025-07-24";

const staticUrls = [
  { loc: baseUrl, priority: "1.0" },
  { loc: `${baseUrl}/galeria-fotos`, priority: "0.8" },
  { loc: `${baseUrl}/sobre-mi`, priority: "0.8" },
];

function urlEntry(loc, priority) {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const localidadUrls = LOCALIDADES_VALIDAS.map((localidad) =>
  urlEntry(`${baseUrl}/${localidad}`, "0.7")
);

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map(({ loc, priority }) => urlEntry(loc, priority)).join("")}
${localidadUrls.join("")}
</urlset>
`;

writeFileSync("public/sitemap.xml", sitemapContent.trim());
console.log("✅ Sitemap generado con localidades!");
