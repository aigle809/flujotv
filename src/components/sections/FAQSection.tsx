'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = {
  es: [
    {
      question: '¿Cómo me suscribo a Flujo TV?',
      answer: 'Puedes suscribirte contactándonos por WhatsApp o email. Nuestro equipo te guiará paso a paso en el proceso de suscripción y activación de tu cuenta. Aceptamos múltiples formas de pago para tu conveniencia.'
    },
    {
      question: '¿En qué dispositivos puedo ver Flujo TV?',
      answer: 'Flujo TV es compatible con una amplia variedad de dispositivos: Smart TVs (Samsung, LG, Sony), Android TV, Amazon Fire Stick, Android móvil y tableta, y computadoras Windows y Mac.'
    },
    {
      question: '¿Cuántas pantallas puedo usar simultáneamente?',
      answer: 'Con tu suscripción a Flujo TV, puedes disfrutar de contenido en hasta 3 pantallas simultáneas. Esto significa que tú y tu familia pueden ver diferentes contenidos al mismo tiempo en diferentes dispositivos.'
    },
    {
      question: '¿Qué canales incluye Flujo TV?',
      answer: 'Flujo TV ofrece más de 1200+ canales de toda Latinoamérica y Estados Unidos, incluyendo canales de México, Colombia, Argentina, Perú, Chile, y muchos más. También ofrecemos canales de deportes, películas, series, noticias y entretenimiento.'
    },
    {
      question: '¿Cómo puedo convertirme en revendedor?',
      answer: 'Ofrecemos planes especiales para revendedores con paneles de créditos desde 30 hasta 1000 créditos. Contacta a nuestro equipo por WhatsApp o email para obtener información detallada sobre nuestro programa de revendedores.'
    },
    {
      question: '¿Qué calidad de video ofrece Flujo TV?',
      answer: 'Flujo TV ofrece contenido en alta calidad, incluyendo HD y 4K donde esté disponible. La calidad se ajusta automáticamente según tu conexión a internet para garantizar una experiencia de visualización óptima.'
    },
    {
      question: '¿Hay contratos o compromisos de permanencia?',
      answer: 'No, no hay contratos ni compromisos de permanencia. Puedes elegir el plan que mejor se adapte a tus necesidades, desde suscripciones mensuales hasta anuales, sin obligaciones a largo plazo.'
    },
    {
      question: '¿Cómo obtengo soporte técnico?',
      answer: 'Nuestro equipo de soporte está disponible 24/7 a través de WhatsApp. También puedes contactarnos por email a flujotv@flujootv.com. Responderemos tus consultas lo más rápido posible.'
    }
  ],
  en: [
    {
      question: 'How do I subscribe to Flujo TV?',
      answer: 'You can subscribe by contacting us via WhatsApp or email. Our team will guide you step by step through the subscription and account activation process. We accept multiple payment methods for your convenience.'
    },
    {
      question: 'On which devices can I watch Flujo TV?',
      answer: 'Flujo TV is compatible with a wide variety of devices: Smart TVs (Samsung, LG, Sony), Android TV, Amazon Fire Stick, Android mobile and tablet, and Windows and Mac computers.'
    },
    {
      question: 'How many screens can I use simultaneously?',
      answer: 'With your Flujo TV subscription, you can enjoy content on up to 3 simultaneous screens. This means you and your family can watch different content at the same time on different devices.'
    },
    {
      question: 'What channels does Flujo TV include?',
      answer: 'Flujo TV offers more than 1200+ channels from all of Latin America and the United States, including channels from Mexico, Colombia, Argentina, Peru, Chile, and many more. We also offer sports, movies, series, news, and entertainment channels.'
    },
    {
      question: 'How can I become a reseller?',
      answer: 'We offer special plans for resellers with credit panels from 30 to 1000 credits. Contact our team via WhatsApp or email for detailed information about our reseller program.'
    },
    {
      question: 'What video quality does Flujo TV offer?',
      answer: 'Flujo TV offers high-quality content, including HD and 4K where available. Quality automatically adjusts based on your internet connection to ensure an optimal viewing experience.'
    },
    {
      question: 'Are there contracts or long-term commitments?',
      answer: 'No, there are no contracts or long-term commitments. You can choose the plan that best suits your needs, from monthly to annual subscriptions, without long-term obligations.'
    },
    {
      question: 'How do I get technical support?',
      answer: 'Our support team is available 24/7 via WhatsApp. You can also contact us by email at flujotv@flujootv.com. We will respond to your inquiries as quickly as possible.'
    }
  ]
}

export default function FAQSection() {
  const { t, language } = useLanguage()
  const faqList = language === 'es' ? faqs.es : faqs.en

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="h2 mb-4">
            <span className="text-gradient-sunset">{t('faq.title')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('faq.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqList.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass border border-[#2A2A2A] rounded-lg px-6"
              >
                <AccordionTrigger className="text-left text-white hover:text-[#D4A418] py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
