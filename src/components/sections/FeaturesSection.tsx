'use client'

import { motion } from 'framer-motion'
import { Tv, MonitorPlay, Film, Sparkles } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card } from '@/components/ui/card'

const features = [
  {
    icon: Tv,
    titleKey: 'features.channels',
    descKey: 'features.channelsDesc',
    color: 'from-[#9B2335] to-[#D4A418]'
  },
  {
    icon: MonitorPlay,
    titleKey: 'features.screens',
    descKey: 'features.screensDesc',
    color: 'from-[#7209B7] to-[#F72585]'
  },
  {
    icon: Film,
    titleKey: 'features.library',
    descKey: 'features.libraryDesc',
    color: 'from-[#0A6B4C] to-[#D4A418]'
  },
  {
    icon: Sparkles,
    titleKey: 'features.quality',
    descKey: 'features.qualityDesc',
    color: 'from-[#E85D04] to-[#DC2626]'
  }
]

export default function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="h2 mb-4">
            <span className="text-gradient-gold">{t('features.title')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass border-[#2A2A2A] p-6 h-full card-hover">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t(feature.titleKey)}</h3>
                <p className="text-gray-400 text-sm">{t(feature.descKey)}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
