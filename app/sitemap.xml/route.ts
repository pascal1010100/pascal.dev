import { blogPosts } from '@/data/blog';
import { BASE_URL } from '@/lib/constants';

export async function GET() {
  const now = new Date().toISOString();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Blog index -->
  <url>
    <loc>${BASE_URL}/blog</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog archive -->
  <url>
    <loc>${BASE_URL}/blog/archivo</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Blog posts -->
  ${blogPosts
    .map(
      (post) => `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  `
    )
    .join('')}
  
  <!-- Categories -->
  ${Array.from(new Set(blogPosts.map((post) => post.category)))
    .map(
      (category) => `
  <url>
    <loc>${BASE_URL}/blog/categoria/${encodeURIComponent(
    category.toLowerCase()
  )}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  `
    )
    .join('')}
    
  <!-- Tags -->
  ${Array.from(
    new Set(blogPosts.flatMap((post) => post.tags || []))
  )
    .map(
      (tag) => `
  <url>
    <loc>${BASE_URL}/blog/tag/${encodeURIComponent(
    tag.toLowerCase()
  )}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
  `
    )
    .join('')}
    
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
