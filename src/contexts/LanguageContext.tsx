'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.pricing': 'Precios',
    'nav.reseller': 'Revendedor',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.download': 'Descargar App',
    
    // Hero
    'hero.title': 'Tu Conexión con Latinoamérica',
    'hero.subtitle': 'Más de 1200+ canales de Latinoamérica y Estados Unidos, películas y series en un solo lugar. Lleva tu cultura contigo, donde quiera que estés.',
    'hero.cta': 'Ver Planes',
    'hero.secondary': 'Contactar por WhatsApp',
    
    // Features
    'features.title': '¿Por qué elegir Flujo TV?',
    'features.channels': '1200+ Canales',
    'features.channelsDesc': 'Canales de toda Latinoamérica y Estados Unidos, desde México hasta Argentina.',
    'features.screens': '3 Pantallas Simultáneas',
    'features.screensDesc': 'Comparte tu cuenta con familiares en diferentes dispositivos.',
    'features.library': 'Biblioteca Extensa',
    'features.libraryDesc': 'Miles de películas y series, actualizadas semanalmente.',
    'features.quality': 'Calidad HD y 4K',
    'features.qualityDesc': 'Disfruta de contenido en la mejor calidad disponible.',
    
    // Pricing
    'pricing.title': 'Planes de Suscripción',
    'pricing.subtitle': 'Elige el plan que mejor se adapte a ti',
    'pricing.month': 'mes',
    'pricing.months': 'meses',
    'pricing.year': 'año',
    'pricing.subscribe': 'Suscribirse',
    'pricing.contact': 'Contactar',
    
    // Subscription features
    'pricing.feature.screens': '3 pantallas simultáneas',
    'pricing.feature.channels': '1200+ canales Latinoamérica y USA',
    'pricing.feature.movies': 'Películas y series ilimitadas',
    'pricing.feature.support': 'Soporte 24/7 por WhatsApp',
    'pricing.feature.hd': 'Calidad HD y 4K',
    'pricing.feature.noads': 'Sin anuncios',
    
    // Reseller
    'reseller.title': 'Planes para Revendedores',
    'reseller.subtitle': 'Panel de créditos para revender suscripciones',
    'reseller.credits': 'Créditos',
    'reseller.panel': 'Panel',
    'reseller.contact': 'Contactar',
    'reseller.email': 'Email',
    'reseller.whatsapp': 'WhatsApp',
    
    // Blog
    'blog.title': 'Blog y Noticias',
    'blog.subtitle': 'Contenido latino, entretenimiento y noticias de la comunidad',
    'blog.readMore': 'Leer Más',
    'blog.backToList': 'Volver al Blog',
    'blog.comments': 'Comentarios',
    'blog.noComments': 'No hay comentarios aún. ¡Sé el primero!',
    'blog.leaveComment': 'Deja un comentario',
    'blog.name': 'Nombre',
    'blog.email': 'Correo electrónico',
    'blog.comment': 'Comentario',
    'blog.submit': 'Publicar comentario',
    'blog.loading': 'Cargando...',
    'blog.by': 'Por',
    'blog.on': 'el',
    
    // Comment form validation
    'validation.nameRequired': 'El nombre es requerido',
    'validation.emailRequired': 'El email es requerido',
    'validation.emailInvalid': 'Email inválido',
    'validation.commentRequired': 'El comentario es requerido',
    'validation.commentMin': 'El comentario debe tener al menos 10 caracteres',
    'validation.success': '¡Comentario publicado exitosamente!',
    'validation.error': 'Error al publicar el comentario',
    
    // FAQ
    'faq.title': 'Preguntas Frecuentes',
    'faq.subtitle': 'Todo lo que necesitas saber sobre Flujo TV',
    
    // App Download
    'download.title': 'Descargar App',
    'download.subtitle': 'Solicita el enlace de descarga o código de instalación',
    'download.description': 'Nuestra app está disponible para múltiples dispositivos. Solicita el enlace de descarga a través de WhatsApp o email.',
    'download.request': 'Solicitar Enlace',
    'download.devices': 'Dispositivos compatibles',
    'download.device.android': 'Android TV / Móviles',
    'download.device.smarttv': 'Smart TVs',
    'download.device.firestick': 'Amazon Fire Stick',
    'download.device.ios': 'iOS / Apple TV',
    'download.device.pc': 'Windows / Mac',
    
    // Contact
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'Email',
    'contact.sendMessage': 'Enviar Mensaje',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.description': 'Tu conexión con Latinoamérica. Lleva tu cultura contigo, donde quiera que estés.',
    'footer.links': 'Enlaces',
    'footer.contact': 'Contacto',
    'footer.follow': 'Síguenos',
    
    // Category
    'category.entertainment': 'Entretenimiento',
    'category.culture': 'Cultura',
    'category.sports': 'Deportes',
    'category.news': 'Noticias',
    'category.music': 'Música',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.pricing': 'Pricing',
    'nav.reseller': 'Reseller',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.download': 'Download App',
    
    // Hero
    'hero.title': 'Your Connection to Latin America',
    'hero.subtitle': 'Over 1200+ channels from Latin America and the United States, movies and series in one place. Take your culture with you, wherever you are.',
    'hero.cta': 'View Plans',
    'hero.secondary': 'Contact via WhatsApp',
    
    // Features
    'features.title': 'Why choose Flujo TV?',
    'features.channels': '1200+ Channels',
    'features.channelsDesc': 'Channels from all of Latin America and the United States, from Mexico to Argentina.',
    'features.screens': '3 Simultaneous Screens',
    'features.screensDesc': 'Share your account with family on different devices.',
    'features.library': 'Extensive Library',
    'features.libraryDesc': 'Thousands of movies and series, updated weekly.',
    'features.quality': 'HD and 4K Quality',
    'features.qualityDesc': 'Enjoy content in the best quality available.',
    
    // Pricing
    'pricing.title': 'Subscription Plans',
    'pricing.subtitle': 'Choose the plan that best suits you',
    'pricing.month': 'month',
    'pricing.months': 'months',
    'pricing.year': 'year',
    'pricing.subscribe': 'Subscribe',
    'pricing.contact': 'Contact',
    
    // Subscription features
    'pricing.feature.screens': '3 simultaneous screens',
    'pricing.feature.channels': '1200+ Latin America & USA channels',
    'pricing.feature.movies': 'Unlimited movies and series',
    'pricing.feature.support': '24/7 WhatsApp support',
    'pricing.feature.hd': 'HD and 4K quality',
    'pricing.feature.noads': 'No ads',
    
    // Reseller
    'reseller.title': 'Reseller Plans',
    'reseller.subtitle': 'Credit panel for reselling subscriptions',
    'reseller.credits': 'Credits',
    'reseller.panel': 'Panel',
    'reseller.contact': 'Contact',
    'reseller.email': 'Email',
    'reseller.whatsapp': 'WhatsApp',
    
    // Blog
    'blog.title': 'Blog & News',
    'blog.subtitle': 'Latin content, entertainment, and community news',
    'blog.readMore': 'Read More',
    'blog.backToList': 'Back to Blog',
    'blog.noComments': 'No comments yet. Be the first!',
    'blog.leaveComment': 'Leave a comment',
    'blog.name': 'Name',
    'blog.email': 'Email',
    'blog.comment': 'Comment',
    'blog.submit': 'Post comment',
    'blog.loading': 'Loading...',
    'blog.by': 'By',
    'blog.on': 'on',
    
    // Comment form validation
    'validation.nameRequired': 'Name is required',
    'validation.emailRequired': 'Email is required',
    'validation.emailInvalid': 'Invalid email',
    'validation.commentRequired': 'Comment is required',
    'validation.commentMin': 'Comment must be at least 10 characters',
    'validation.success': 'Comment posted successfully!',
    'validation.error': 'Error posting comment',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about Flujo TV',
    
    // App Download
    'download.title': 'Download App',
    'download.subtitle': 'Request download link or installation code',
    'download.description': 'Our app is available for multiple devices. Request the download link via WhatsApp or email.',
    'download.request': 'Request Link',
    'download.devices': 'Compatible devices',
    'download.device.android': 'Android TV / Mobile',
    'download.device.smarttv': 'Smart TVs',
    'download.device.firestick': 'Amazon Fire Stick',
    'download.device.ios': 'iOS / Apple TV',
    'download.device.pc': 'Windows / Mac',
    
    // Contact
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'Email',
    'contact.sendMessage': 'Send Message',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.description': 'Your connection to Latin America. Take your culture with you, wherever you are.',
    'footer.links': 'Links',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow us',
    
    // Category
    'category.entertainment': 'Entertainment',
    'category.culture': 'Culture',
    'category.sports': 'Sports',
    'category.news': 'News',
    'category.music': 'Music',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    const savedLang = localStorage.getItem('flujo-language') as Language
    if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
      queueMicrotask(() => {
        setLanguage(savedLang)
      })
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('flujo-language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
