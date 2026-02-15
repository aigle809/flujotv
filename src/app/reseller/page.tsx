'use client'

import { motion } from 'framer-motion'
import { CreditCard, Mail, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import WhatsAppButton from '@/components/shared/WhatsAppButton'
import Link from 'next/link'
import Image from 'next/image'

const resellerPlans = [
  { credits: 30, price: 135 },
  { credits: 50, price: 200 },
  { credits: 100, price: 350 },
  { credits: 300, price: 900 },
  { credits: 500, price: 1250 },
  { credits: 1000, price: 2300 },
]

export default function ResellerPage() {
  const { t, language } = useLanguage()

  const getWhatsAppMessage = (plan: typeof resellerPlans[0]) => {
    if (language === 'es') {
      return `Hola, me interesa el Panel de ${plan.credits} Créditos por $${plan.price} como revendedor de Flujo TV`
    }
    return `Hi, I'm interested in the ${plan.credits} Credits Panel for $${plan.price} as a Flujo TV reseller`
  }

  const getEmailSubject = (plan: typeof resellerPlans[0]) => {
    if (language === 'es') {
      return `Información Panel ${plan.credits} Créditos - Flujo TV`
    }
    return `${plan.credits} Credits Panel Information - Flujo TV`
  }

  return (
    <div className="min-h-screen">
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
                {language === 'es' ? 'Inicio' : 'Home'}
              </Link>
              <Link href="/blog" className="text-gray-300 hover:text-[#FF6B35] transition-colors text-sm">
                {language === 'es' ? 'Blog' : 'Blog'}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="h1 mb-4">
              <span className="text-gradient-gold">{t('reseller.title')}</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">{t('reseller.subtitle')}</p>
          </motion.div>

          {/* Features Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-r from-[#7209B7]/10 via-[#F72585]/10 to-[#7209B7]/10 border-[#7209B7]/30 p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-2xl font-bold text-gradient-sunset mb-2">24/7</h3>
                  <p className="text-gray-400 text-sm">{language === 'es' ? 'Soporte continuo' : 'Continuous support'}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gradient-sunset mb-2">100%</h3>
                  <p className="text-gray-400 text-sm">{language === 'es' ? 'Créditos garantizados' : 'Guaranteed credits'}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gradient-sunset mb-2">VIP</h3>
                  <p className="text-gray-400 text-sm">{language === 'es' ? 'Panel exclusivo' : 'Exclusive panel'}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {resellerPlans.map((plan, index) => (
              <motion.div
                key={plan.credits}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass border-[#2A2A2A] p-6 h-full card-hover">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7209B7] to-[#F72585] flex items-center justify-center">
                      <CreditCard className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{t('reseller.panel')}</p>
                      <h3 className="text-xl font-bold text-white">
                        {plan.credits} {t('reseller.credits')}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-bold text-gradient-sunset">${plan.price}</span>
                    <span className="text-gray-500">USD</span>
                  </div>

                  <div className="space-y-3">
                    <WhatsAppButton
                      message={getWhatsAppMessage(plan)}
                      className="w-full"
                      variant="default"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t('reseller.whatsapp')}
                    </WhatsAppButton>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10"
                    >
                      <a 
                        href={`mailto:flujotv@flujootv.com?subject=${encodeURIComponent(getEmailSubject(plan))}`}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        {t('reseller.email')}
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <Card className="glass border-[#2A2A2A] p-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                {language === 'es' ? '¿Cómo funciona?' : 'How does it work?'}
              </h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  {language === 'es' 
                    ? '1. Elige el panel de créditos que mejor se adapte a tu negocio.'
                    : '1. Choose the credit panel that best suits your business.'}
                </p>
                <p>
                  {language === 'es' 
                    ? '2. Contáctanos por WhatsApp o email para procesar tu compra.'
                    : '2. Contact us via WhatsApp or email to process your purchase.'}
                </p>
                <p>
                  {language === 'es' 
                    ? '3. Recibe acceso a tu panel de revendedor exclusivo.'
                    : '3. Receive access to your exclusive reseller panel.'}
                </p>
                <p>
                  {language === 'es' 
                    ? '4. Gestiona tus créditos y crea cuentas para tus clientes.'
                    : '4. Manage your credits and create accounts for your clients.'}
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-4">
              {language === 'es' 
                ? '¿Tienes preguntas? Contáctanos directamente.'
                : 'Have questions? Contact us directly.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WhatsAppButton
                message={language === 'es' ? 'Hola, quiero información sobre los paneles de revendedor' : 'Hi, I want information about reseller panels'}
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('reseller.whatsapp')}
              </WhatsAppButton>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10"
              >
                <a href="mailto:flujotv@flujootv.com">
                  <Mail className="w-5 h-5 mr-2" />
                  {t('reseller.email')}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-[#2A2A2A] py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Flujo TV. {t('footer.rights')}
          </p>
        </div>
      </footer>
    </div>
  )
}
