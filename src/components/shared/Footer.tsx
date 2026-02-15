'use client'

import { Mail, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface FooterProps {
  onNavigate: (section: string) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage()

  const navItems = [
    { id: 'hero', label: t('nav.home'), isLink: true, href: '/' },
    { id: 'pricing', label: t('nav.pricing'), isLink: false },
    { id: 'reseller', label: t('nav.reseller'), isLink: true, href: '/reseller' },
    { id: 'blog', label: t('nav.blog'), isLink: true, href: '/blog' },
    { id: 'faq', label: t('nav.faq'), isLink: false },
    { id: 'download', label: t('nav.download'), isLink: false },
  ]

  const handleNavClick = (id: string) => {
    onNavigate(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="glass border-t border-[#2A2A2A]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="Flujo TV Logo"
                width={45}
                height={45}
                className="h-11 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.links')}</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  {item.isLink ? (
                    <Link
                      href={item.href!}
                      className="text-gray-400 hover:text-[#FF6B35] transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="text-gray-400 hover:text-[#FF6B35] transition-colors text-sm"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <a
                href="mailto:flujotv@flujootv.com"
                className="flex items-center gap-2 text-gray-400 hover:text-[#FF6B35] transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                flujotv@flujootv.com
              </a>
              <a
                href="https://wa.me/212651372731"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#25D366] transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                +212 651 372 731
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.follow')}</h4>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10"
                aria-label="Instagram"
                asChild
              >
                <a 
                  href="https://instagram.com/flujotv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10"
                aria-label="Facebook"
                asChild
              >
                <a 
                  href="https://facebook.com/flujotv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/10"
                aria-label="Twitter"
                asChild
              >
                <a 
                  href="https://twitter.com/flujotv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-[#2A2A2A] text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Flujo TV. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
