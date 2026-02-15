'use client'

import { motion } from 'framer-motion'
import { Check, Crown, Gift } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card } from '@/components/ui/card'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

const plans = [
  { duration: '1', period: 'month', price: 9, popular: false, freeMonths: 0 },
  { duration: '3', period: 'months', price: 25, popular: false, freeMonths: 0 },
  { duration: '6', period: 'months', price: 49, popular: false, freeMonths: 1 },
  { duration: '1', period: 'year', price: 87, popular: true, freeMonths: 2 },
]

const features = [
  'pricing.feature.screens',
  'pricing.feature.channels',
  'pricing.feature.movies',
  'pricing.feature.support',
  'pricing.feature.hd',
]

export default function PricingSection() {
  const { t, language } = useLanguage()

  const getPeriodText = (period: string, duration: string, freeMonths: number) => {
    if (period === 'month') return `1 ${t('pricing.month')}`
    if (period === 'year') {
      if (freeMonths > 0) {
        return language === 'es' 
          ? `1 Año + ${freeMonths} Meses GRATIS` 
          : `1 Year + ${freeMonths} Months FREE`
      }
      return `1 ${t('pricing.year')}`
    }
    if (freeMonths > 0) {
      return language === 'es'
        ? `${duration} ${t('pricing.months')} + ${freeMonths} Mes GRATIS`
        : `${duration} ${t('pricing.months')} + ${freeMonths} Month FREE`
    }
    return `${duration} ${t('pricing.months')}`
  }

  const getTotalMonths = (plan: typeof plans[0]) => {
    if (plan.period === 'year') return 12 + plan.freeMonths
    return parseInt(plan.duration) + plan.freeMonths
  }

  const getWhatsAppMessage = (plan: typeof plans[0]) => {
    const periodText = getPeriodText(plan.period, plan.duration, plan.freeMonths)
    if (language === 'es') {
      return `Hola, me interesa el plan de ${periodText} por $${plan.price} en Flujo TV`
    }
    return `Hi, I'm interested in the ${periodText} plan for $${plan.price} on Flujo TV`
  }

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="h2">
            <span className="text-gradient-sunset">{t('pricing.title')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.duration + plan.period}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`relative glass border-2 p-6 h-full flex flex-col card-hover ${
                  plan.popular ? 'border-[#FF6B35]' : 'border-[#2A2A2A]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-black text-[10px] sm:text-xs font-bold px-2 sm:px-4 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
                      <Crown className="w-3 h-3 flex-shrink-0" />
                      <span className="hidden sm:inline">{language === 'es' ? 'MÁS POPULAR' : 'MOST POPULAR'}</span>
                      <span className="sm:hidden">{language === 'es' ? 'TOP' : 'TOP'}</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {getPeriodText(plan.period, plan.duration, plan.freeMonths)}
                  </h3>
                  {plan.freeMonths > 0 && (
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Gift className="w-4 h-4 text-[#25D366]" />
                      <span className="text-xs text-[#25D366] font-semibold">
                        {language === 'es' ? `¡${plan.freeMonths} mes${plan.freeMonths > 1 ? 'es' : ''} GRATIS!` : `${plan.freeMonths} month${plan.freeMonths > 1 ? 's' : ''} FREE!`}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gradient-logo">${plan.price}</span>
                    <span className="text-gray-500">USD</span>
                  </div>
                  {plan.freeMonths > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      {language === 'es' 
                        ? `${getTotalMonths(plan)} meses de servicio` 
                        : `${getTotalMonths(plan)} months of service`}
                    </p>
                  )}
                </div>

                <div className="flex-grow">
                  <ul className="space-y-3 mb-6">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-[#0A6B4C] flex-shrink-0" />
                        {t(feature)}
                      </li>
                    ))}
                  </ul>
                </div>

                <WhatsAppButton
                  message={getWhatsAppMessage(plan)}
                  className="w-full"
                >
                  {t('pricing.subscribe')}
                </WhatsAppButton>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
