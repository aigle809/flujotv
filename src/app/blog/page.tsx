import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, MessageCircle } from 'lucide-react'
import { db } from '@/lib/db'

interface Post {
  id: string
  title: string
  titleEn: string | null
  excerpt: string
  excerptEn: string | null
  category: string
  categoryEn: string | null
  author: string
  createdAt: Date
  comments: { id: string }[]
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

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Generate metadata for SEO
export const metadata = {
  title: 'Blog - Noticias, Guías y Consejos de Streaming',
  description: 'Descubre las últimas noticias, guías de instalación, consejos de streaming y más sobre Flujo TV. Aprende a instalar en Firestick, Smart TV, Roku y más.',
  openGraph: {
    title: 'Blog de Flujo TV - Guías y Noticias de Streaming',
    description: 'Descubre las últimas noticias, guías de instalación, consejos de streaming y más sobre Flujo TV.',
    type: 'website',
  },
}

export const dynamic = 'force-dynamic'
export const revalidate = 60

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await db.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: {
        comments: {
          select: { id: true }
        }
      }
    })
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
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
              <Link href="/reseller" className="text-gray-300 hover:text-[#FF6B35] transition-colors text-sm">
                Revendedor
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-gold">Blog de Flujo TV</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Guías, consejos y noticias sobre streaming latino. Aprende a instalar Flujo TV, 
              soluciona problemas y descubre todo lo que puedes hacer.
            </p>
          </div>

          {/* Blog Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">No hay artículos disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${createSlug(post.title)}`}
                  className="group"
                >
                  <article className="glass border border-[#2A2A2A] rounded-2xl overflow-hidden h-full flex flex-col card-hover">
                    <div className="p-6 flex flex-col flex-grow">
                      {/* Category Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 text-xs font-medium bg-[#FF6B35]/20 text-[#FF6B35] rounded-full">
                          {post.category}
                        </span>
                        <span className="text-gray-500 text-xs flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {post.comments.length}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-[#FF6B35] transition-colors">
                        {post.title}
                      </h2>
                      
                      {/* Excerpt */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-[#2A2A2A]">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.createdAt)}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="glass border border-[#2A2A2A] rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">
                ¿Listo para empezar con Flujo TV?
              </h2>
              <p className="text-gray-400 mb-6">
                Más de 1200 canales de Latinoamérica y USA en HD/4K. 
                ¡Planes desde $9/mes con meses GRATIS!
              </p>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Ver Planes y Precios
              </Link>
            </div>
          </div>
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
