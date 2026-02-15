'use client'

import { motion } from 'framer-motion'
import { Play, MessageCircle, Tv } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import Image from 'next/image'

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { t } = useLanguage()

  const handleViewPlans = () => {
    onNavigate('pricing')
    const element = document.getElementById('pricing')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Logo - Responsive sizing */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#FF6B35] via-[#9B2335] to-[#7209B7] p-1 mb-4 sm:mb-6 animate-pulse-gold">
              <div className="w-full h-full rounded-full bg-[#0D0D0D] flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Flujo TV Logo"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h1 mb-6"
          >
            <span className="text-gradient-sunset">Flujo TV</span>
            <br />
            <span className="text-white">{t('hero.title')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Features Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <Play className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm text-gray-300">{t('features.channels')}</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <Tv className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm text-gray-300">{t('features.screens')}</span>
            </div>
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <Play className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm text-gray-300">{t('features.library')}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={handleViewPlans}
              className="bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-black font-semibold px-8 py-6 text-lg btn-glow hover:shadow-[0_0_40px_rgba(255,107,53,0.5)]"
            >
              {t('hero.cta')}
            </Button>
            <WhatsAppButton
              size="lg"
              className="px-8 py-6 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t('hero.secondary')}
            </WhatsAppButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
