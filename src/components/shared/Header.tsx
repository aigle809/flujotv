'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageToggle from './LanguageToggle'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface HeaderProps {
  currentSection: string
  onNavigate: (section: string) => void
}

export default function Header({ currentSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    setIsMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300 py-3',
        isScrolled ? 'bg-[#0D0D0D]/90 backdrop-blur-lg' : 'bg-transparent'
      )}
      style={{ willChange: 'background-color' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="Flujo TV Logo"
              width={45}
              height={45}
              className="h-11 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              item.isLink ? (
                <Link
                  key={item.id}
                  href={item.href!}
                  className={cn(
                    'px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    currentSection === item.id
                      ? 'text-[#FF6B35] bg-[#FF6B35]/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    'px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    currentSection === item.id
                      ? 'text-[#FF6B35] bg-[#FF6B35]/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation with Animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden overflow-hidden"
            >
              <div className="mt-4 pb-4 border-t border-white/10 pt-4">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      {item.isLink ? (
                        <Link
                          href={item.href!}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            'block px-4 py-3 rounded-lg font-medium transition-all duration-200',
                            currentSection === item.id
                              ? 'text-[#FF6B35] bg-[#FF6B35]/10'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          )}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleNavClick(item.id)}
                          className={cn(
                            'w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200',
                            currentSection === item.id
                              ? 'text-[#FF6B35] bg-[#FF6B35]/10'
                              : 'text-gray-300 hover:text-white hover:bg-white/5'
                          )}
                        >
                          {item.label}
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
