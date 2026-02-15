import { db } from '@/lib/db'

// Create URL-friendly slug
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function GET() {
  const baseUrl = 'https://flujo3tv.com'
  
  let posts: any[] = []
  
  try {
    posts = await db.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 20
    })
  } catch (error) {
    console.error('Error fetching posts for RSS:', error)
  }

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Flujo TV Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Noticias, guías y consejos sobre Flujo TV - Tu conexión con Latinoamérica. Más de 1200 canales en HD/4K.</description>
    <language>es-es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>Flujo TV</title>
      <link>${baseUrl}</link>
    </image>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${createSlug(post.title)}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${createSlug(post.title)}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <category>${post.category}</category>
      <author>${post.author}</author>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
    </item>
    `).join('')}
  </channel>
</rss>`

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
