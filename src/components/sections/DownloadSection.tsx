'use client'

import { motion } from 'framer-motion'
import { Smartphone, Tv, Monitor, Mail, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

const devices = [
  { icon: Smartphone, key: 'android' },
  { icon: Tv, key: 'smarttv' },
  { icon: Monitor, key: 'firestick' },
  { icon: Monitor, key: 'pc' },
]

export default function DownloadSection() {
  const { t, language } = useLanguage()

  const getWhatsAppMessage = () => {
    if (language === 'es') {
      return 'Hola, me gustaría obtener el enlace de descarga de la app de Flujo TV'
    }
    return 'Hi, I would like to get the Flujo TV app download link'
  }

  const getEmailSubject = () => {
    if (language === 'es') {
      return 'Solicitar enlace de descarga - App Flujo TV'
    }
    return 'Request download link - Flujo TV App'
  }

  const getEmailBody = () => {
    if (language === 'es') {
      return 'Hola, me gustaría obtener el enlace de descarga de la aplicación de Flujo TV para mi dispositivo.'
    }
    return 'Hi, I would like to get the Flujo TV app download link for my device.'
  }

  return (
    <section id="download" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="h2 mb-4">
            <span className="text-gradient-gold">{t('download.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('download.subtitle')}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card className="glass border-[#2A2A2A] p-8">
              <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                {t('download.description')}
              </p>

              {/* Compatible Devices */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white text-center mb-6">
                  {t('download.devices')}
                </h3>
                <div className="flex flex-wrap justify-center gap-6">
                  {devices.map((device, index) => (
                    <motion.div
                      key={device.key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#7209B7]/20 to-[#F72585]/20 border border-[#FF6B35]/30 flex items-center justify-center">
                        <device.icon className="w-8 h-8 text-[#FF6B35]" />
                      </div>
                      <span className="text-sm text-gray-400 text-center">
                        {t(`download.device.${device.key}`)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppButton
                  message={getWhatsAppMessage()}
                  size="lg"
                  className="px-8"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('download.request')}
                </WhatsAppButton>
                
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35]/10 px-8"
                >
                  <a 
                    href={`mailto:flujotv@flujootv.com?subject=${encodeURIComponent(getEmailSubject())}&body=${encodeURIComponent(getEmailBody())}`}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    {t('contact.email')}
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
