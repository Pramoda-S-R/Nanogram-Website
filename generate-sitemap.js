const { createWriteStream } = require('fs');
const { SitemapStream } = require('sitemap');

const sitemap = new SitemapStream({ hostname: 'https://nanogram.studio' });
const writeStream = createWriteStream('./public/sitemap.xml');

sitemap.pipe(writeStream);

// Add your routes
sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
sitemap.write({ url: '/about', changefreq: 'weekly', priority: 0.8 });
sitemap.write({ url: '/projects', changefreq: 'weekly', priority: 0.8 });
sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.6 });

sitemap.end();
