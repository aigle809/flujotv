import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import { db } from '@/lib/db'
import CommentSection from './CommentSection'

interface Post {
  id: string
  title: string
  titleEn: string | null
  excerpt: string
  excerptEn: string | null
  content: string
  contentEn: string | null
  category: string
  categoryEn: string | null
  author: string
  createdAt: Date
  comments: Comment[]
}

interface Comment {
  id: string
  name: string
  email: string
  content: string
  createdAt: Date
}

// Generate static params for all posts
export async function generateStaticParams() {
  try {
    const posts = await db.post.findMany({
      select: { id: true, title: true }
    })
    
    return posts.map(post => ({
      slug: createSlug(post.title)
    }))
  } catch {
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const posts = await db.post.findMany()
    const post = posts.find(p => createSlug(p.title) === slug)
    
    if (!post) {
      return {
        title: 'Artículo no encontrado'
      }
    }
    
    const title = post.title
    const description = post.excerpt
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.createdAt.toISOString(),
        authors: [post.author],
        images: [
          {
            url: '/logo.png',
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['/logo.png'],
      },
      alternates: {
        canonical: `https://flujo3tv.com/blog/${slug}`,
      },
    }
  } catch {
    return {
      title: 'Artículo | Flujo TV'
    }
  }
}

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

// Format date
function formatDate(date: Date, locale: string = 'es'): string {
  return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// JSON-LD Structured Data for Article
function ArticleSchema({ post }: { post: Post }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "image": "https://flujo3tv.com/logo.png",
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Flujo TV",
            "logo": {
              "@type": "ImageObject",
              "url": "https://flujo3tv.com/logo.png"
            }
          },
          "datePublished": post.createdAt.toISOString(),
          "dateModified": post.createdAt.toISOString(),
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://flujo3tv.com/blog/${createSlug(post.title)}`
          },
          "articleSection": post.category,
          "inLanguage": ["es", "en"]
        })
      }}
    />
  )
}

// Breadcrumb Schema
function BreadcrumbSchema({ post }: { post: Post }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Inicio",
              "item": "https://flujo3tv.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://flujo3tv.com/blog"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": post.title,
              "item": `https://flujo3tv.com/blog/${createSlug(post.title)}`
            }
          ]
        })
      }}
    />
  )
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  let post: Post | undefined
  
  try {
    const posts = await db.post.findMany({
      include: {
        comments: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })
    post = posts.find(p => createSlug(p.title) === slug)
  } catch {
    // If database fails, return not found
  }
  
  if (!post) {
    notFound()
  }
  
  // Get related posts (same category, excluding current)
  let relatedPosts: Post[] = []
  try {
    const allPosts = await db.post.findMany()
    relatedPosts = allPosts
      .filter(p => p.category === post!.category && p.id !== post!.id)
      .slice(0, 3)
  } catch {
    // Continue without related posts
  }
  
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Structured Data */}
      <ArticleSchema post={post} />
      <BreadcrumbSchema post={post} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Flujo TV Logo"
                width={45}
                height={45}
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-300 hover:text-[#FF6B35] transition-colors text-sm">
                Inicio
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-[#FF6B35] transition-colors text-sm">
                Blog
              </Link>
              <Link href="/reseller" className="text-gray-300 hover:text-[#FF6B35] transition-colors text-sm">
                Revendedor
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="pt-20 pb-4 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-[#FF6B35] transition-colors">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-[#FF6B35] transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-300 truncate max-w-[200px]">{post.title}</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-medium bg-[#FF6B35]/20 text-[#FF6B35] rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#FF6B35]" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FF6B35]" />
                <time dateTime={post.createdAt.toISOString()}>
                  {formatDate(post.createdAt)}
                </time>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="bg-[#111111] rounded-2xl border border-[#2A2A2A] p-6 md:p-8">
            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-[#FF6B35]
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-white
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-[#FF6B35] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:marker:text-[#FF6B35]
                prose-table:border-collapse prose-th:bg-[#1A1A1A] prose-th:text-white prose-th:p-3 prose-th:border prose-th:border-[#2A2A2A]
                prose-td:p-3 prose-td:border prose-td:border-[#2A2A2A] prose-td:text-gray-300
                prose-img:rounded-lg prose-img:max-w-full
                prose-blockquote:border-l-[#FF6B35] prose-blockquote:bg-[#1A1A1A] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                prose-code:bg-[#1A1A1A] prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-[#FF6B35]"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Back to Blog */}
          <div className="mt-8">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-[#FF6B35] hover:text-[#FF8555] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al Blog
            </Link>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">Artículos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedPosts.map(relatedPost => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${createSlug(relatedPost.title)}`}
                    className="bg-[#111111] rounded-xl border border-[#2A2A2A] p-4 hover:border-[#FF6B35]/50 transition-colors"
                  >
                    <span className="text-xs text-[#FF6B35] mb-2 block">{relatedPost.category}</span>
                    <h3 className="text-white font-medium line-clamp-2">{relatedPost.title}</h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Comments Section */}
        <div className="container mx-auto px-4 max-w-4xl mt-12">
          <CommentSection postId={post.id} comments={post.comments} />
        </div>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-[#2A2A2A] py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Flujo TV. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
