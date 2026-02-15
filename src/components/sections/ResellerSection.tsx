'use client'

import { motion } from 'framer-motion'
import { CreditCard, Mail, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

const resellerPlans = [
  { credits: 30, price: 135 },
  { credits: 50, price: 200 },
  { credits: 100, price: 350 },
  { credits: 300, price: 900 },
  { credits: 500, price: 1250 },
  { credits: 1000, price: 2300 },
]

export default function ResellerSection() {
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
    <section id="reseller" className="py-20 bg-[#0D0D0D] relative overflow-hidden">
      <div className="absolute inset-0 gradient-sunset-subtle" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="h2 mb-4">
            <span className="text-gradient-gold">{t('reseller.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('reseller.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resellerPlans.map((plan, index) => (
            <motion.div
              key={plan.credits}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-[#141414] border-[#2A2A2A] p-6 h-full card-hover">
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
                    className="w-full border-[#D4A418] text-[#D4A418] hover:bg-[#D4A418]/10"
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
      </div>
    </section>
  )
}
