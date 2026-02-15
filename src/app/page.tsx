'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import PricingSection from '@/components/sections/PricingSection'
import FAQSection from '@/components/sections/FAQSection'
import DownloadSection from '@/components/sections/DownloadSection'

function FlujoTVContent() {
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'features', 'pricing', 'faq', 'download']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = (section: string) => {
    setCurrentSection(section)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentSection={currentSection} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        <HeroSection onNavigate={handleNavigate} />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <DownloadSection />
      </main>
      
      <footer className="mt-auto">
        <Footer onNavigate={handleNavigate} />
      </footer>
    </div>
  )
}

export default function Home() {
  return <FlujoTVContent />
}
