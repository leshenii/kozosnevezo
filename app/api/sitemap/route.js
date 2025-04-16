// File: pages/api/sitemap.js
export default async function handler(req, res) {
    const baseUrl = 'https://kozosnevezoegyesulet.hu'; // Replace with your website's base URL

    // Define static routes
    const staticRoutes = [
        '/',
        '/news',
        '/projects',
        '/privacy-policy',
        '/profile',
        '/sign-in',
        '/sign-up',
    ];

    // Fetch dynamic routes (e.g., projects with IDs)
    const dynamicRoutes = await fetch(`${baseUrl}/api/projectsapi`)
        .then((response) => response.json())
        .then((projects) => projects.map((project) => `/projects/${project.id}`))
        .catch(() => []);

    // Combine static and dynamic routes
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9/">
    ${allRoutes
        .map((route) => {
            return `
        <url>
            <loc>${baseUrl}${route}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
        </url>`;
        })
        .join('')}
</urlset>`;

    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
}