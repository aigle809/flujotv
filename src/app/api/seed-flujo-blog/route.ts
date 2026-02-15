import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  try {
    const post = await db.post.create({
      data: {
        title: 'Flujo TV: El Mejor Servicio de Streaming para Latinos en 2026',
        titleEn: 'Flujo TV: The Best Streaming Service for Latinos in 2026',
        excerpt: 'Descubre Flujo TV, el servicio de streaming preferido por los latinos. Más de 1200 canales de Latinoamérica y USA en HD y 4K. Precios desde $9/mes.',
        excerptEn: 'Discover Flujo TV, the preferred streaming service for Latinos. Over 1200 channels from Latin America and USA in HD and 4K. Prices from $9/month.',
        category: 'Flujo TV',
        categoryEn: 'Flujo TV',
        author: 'Flujo TV Team',
        image: null,
        content: `# Flujo TV: El Mejor Servicio de Streaming para Latinos en 2026

**Flujo TV** es el servicio de streaming que está revolucionando la forma en que los latinos ven televisión. Con más de **1200 canales de Latinoamérica y Estados Unidos**, películas, series y deportes en vivo.

## ¿Qué es Flujo TV?

**Flujo TV** es un servicio de streaming (IPTV) diseñado para la comunidad latina. Ofrece acceso a canales de:

- México: Televisa, TV Azteca, Canal de las Estrellas
- Colombia: Caracol, RCN
- Argentina: Telefe, El Trece
- Chile: TVN, Mega
- Estados Unidos: Canales en español e inglés

## ¿Por Qué Elegir Flujo TV?

### 1. Más de 1200 Canales en Vivo
- Deportes: Liga MX, Fútbol Sudamericano, Box, UFC
- Noticias 24/7 de tu país
- Series, novelas, películas
- Contenido infantil en español

### 2. Calidad HD y 4K
Todos los canales disponibles en alta calidad.

### 3. Precios Accesibles

| Plan | Precio | Pantallas |
|------|--------|-----------|
| 1 Mes | $9 USD | 3 |
| 3 Meses | $25 USD | 3 |
| 6 Meses | $49 USD | 3 |
| 12 Meses | $87 USD | 3 |

### 4. 3 Pantallas Simultáneas
Una cuenta, tres dispositivos al mismo tiempo.

### 5. Compatible con Todos los Dispositivos
- Android, iOS
- Smart TV (Samsung, LG, Sony)
- Fire Stick, Roku, Chromecast
- Windows y Mac

## Cómo Empezar con Flujo TV

1. Visita **flujo3tv.com**
2. Elige tu plan
3. Recibe tus credenciales
4. Descarga la app compatible
5. ¡Disfruta 1200+ canales!

## Preguntas Frecuentes

### ¿Es legal Flujo TV?
Sí, es un servicio de streaming legítimo.

### ¿Cuántos dispositivos puedo usar?
Hasta 3 dispositivos simultáneos.

### ¿Qué velocidad de internet necesito?
Mínimo 10 Mbps para HD.

---

**Flujo TV** - Tu conexión con Latinoamérica. Visita [flujo3tv.com](https://flujo3tv.com)`,
        contentEn: `# Flujo TV: The Best Streaming Service for Latinos in 2026

**Flujo TV** is the streaming service revolutionizing how Latinos watch television. With over **1200 channels from Latin America and the United States**, movies, series, and live sports.

## What is Flujo TV?

**Flujo TV** is a streaming service (IPTV) designed for the Latino community. Access channels from:

- Mexico: Televisa, TV Azteca
- Colombia: Caracol, RCN
- Argentina: Telefe, El Trece
- Chile: TVN, Mega
- United States: Spanish and English channels

## Why Choose Flujo TV?

### 1. Over 1200 Live Channels
- Sports: Liga MX, Soccer, Boxing, UFC
- 24/7 News from your country
- Series, novelas, movies
- Kids content in Spanish

### 2. HD and 4K Quality
All channels available in high quality.

### 3. Affordable Prices

| Plan | Price | Screens |
|------|-------|---------|
| 1 Month | $9 USD | 3 |
| 3 Months | $25 USD | 3 |
| 6 Months | $49 USD | 3 |
| 12 Months | $87 USD | 3 |

### 4. 3 Simultaneous Screens
One account, three devices at the same time.

### 5. Compatible with All Devices
- Android, iOS
- Smart TV (Samsung, LG, Sony)
- Fire Stick, Roku, Chromecast
- Windows and Mac

## How to Start with Flujo TV

1. Visit **flujo3tv.com**
2. Choose your plan
3. Receive your credentials
4. Download compatible app
5. Enjoy 1200+ channels!

## Frequently Asked Questions

### Is Flujo TV legal?
Yes, it's a legitimate streaming service.

### How many devices can I use?
Up to 3 simultaneous devices.

### What internet speed do I need?
Minimum 10 Mbps for HD.

---

**Flujo TV** - Your connection to Latin America. Visit [flujo3tv.com](https://flujo3tv.com)`,
        published: true
      }
    })

    return NextResponse.json({ success: true, post })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
