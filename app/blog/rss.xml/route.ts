import { blogPosts } from '@/data/blog';
import { BASE_URL } from '@/lib/constants';

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog de Pascal Dev</title>
    <link>${BASE_URL}/blog</link>
    <description>Artículos sobre desarrollo web, programación y tecnología.</description>
    <language>es-ES</language>
    <copyright>${new Date().getFullYear()} Pascal Dev. Todos los derechos reservados.</copyright>
    <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    
    ${blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(
        (post) => `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${BASE_URL}/blog/${post.slug}</link>
        <description>${escapeXml(post.description)}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <guid>${BASE_URL}/blog/${post.slug}</guid>
        <category>${escapeXml(post.category)}</category>
        ${(post.tags || [])
          .map((tag) => `<category>${escapeXml(tag)}</category>`)
          .join('\n          ')}
      </item>
    `
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
