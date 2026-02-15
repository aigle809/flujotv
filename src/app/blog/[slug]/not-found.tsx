import Link from 'next/link'
import Image from 'next/image'
import { Home, ArrowLeft, Search } from 'lucide-react'

export const metadata = {
  title: 'Página no encontrada',
  description: 'Lo sentimos, la página que buscas no existe.'
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="text-center">
        <Link href="/" className="inline-block mb-8">
          <Image
            src="/logo.png"
            alt="Flujo TV Logo"
            width={60}
            height={60}
            className="mx-auto"
          />
        </Link>
        
        <h1 className="text-6xl font-bold text-[#FF6B35] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Lo sentimos, el artículo o página que buscas no existe o ha sido movido.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-black font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Ir al Inicio
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 glass border border-[#2A2A2A] text-white font-semibold px-6 py-3 rounded-lg hover:border-[#FF6B35]/50 transition-colors"
          >
            <Search className="w-4 h-4" />
            Ver Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
