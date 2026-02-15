import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const samplePosts = [
  {
    title: 'Flujo TV: El Mejor Servicio de Streaming para Latinos en 2026',
    titleEn: 'Flujo TV: The Best Streaming Service for Latinos in 2026',
    excerpt: 'Descubre Flujo TV, el servicio de streaming preferido por los latinos. Más de 1200 canales de Latinoamérica y USA en HD y 4K. Precios desde $9/mes.',
    excerptEn: 'Discover Flujo TV, the preferred streaming service for Latinos. Over 1200 channels from Latin America and USA in HD and 4K. Prices from $9/month.',
    content: `
      <p><strong>Flujo TV</strong> es el servicio de streaming que está revolucionando la forma en que los latinos ven televisión. Con más de <strong>1200 canales de Latinoamérica y Estados Unidos</strong>, películas, series y deportes en vivo.</p>
      
      <h2>¿Qué es Flujo TV?</h2>
      <p><strong>Flujo TV</strong> es un servicio de streaming (IPTV) diseñado para la comunidad latina. Ofrece acceso a canales de México, Colombia, Argentina, Chile y Estados Unidos en español e inglés.</p>
      
      <h2>¿Por Qué Elegir Flujo TV?</h2>
      <ul>
        <li><strong>Más de 1200 canales en vivo</strong> - Deportes, noticias, series, películas</li>
        <li><strong>Calidad HD y 4K</strong> - La mejor calidad de imagen</li>
        <li><strong>Precios desde $9/mes</strong> - El mejor precio del mercado</li>
        <li><strong>3 pantallas simultáneas</strong> - Una cuenta, tres dispositivos</li>
        <li><strong>Compatible con todos los dispositivos</strong> - Android, iOS, Smart TV, Fire Stick, Roku</li>
      </ul>
      
      <h2>Planes Disponibles</h2>
      <table>
        <tr><td>1 Mes</td><td>$9 USD</td></tr>
        <tr><td>3 Meses</td><td>$25 USD</td></tr>
        <tr><td>6 Meses</td><td>$49 USD</td></tr>
        <tr><td>12 Meses</td><td>$87 USD</td></tr>
      </table>
      
      <h2>Cómo Empezar</h2>
      <p>Visita <strong>flujo3tv.com</strong>, elige tu plan, recibe tus credenciales y disfruta de más de 1200 canales latinos.</p>
      
      <p><strong>Flujo TV</strong> - Tu conexión con Latinoamérica.</p>
    `,
    contentEn: `
      <p><strong>Flujo TV</strong> is the streaming service revolutionizing how Latinos watch television. With over <strong>1200 channels from Latin America and the United States</strong>, movies, series, and live sports.</p>
      
      <h2>What is Flujo TV?</h2>
      <p><strong>Flujo TV</strong> is a streaming service (IPTV) designed for the Latino community. It offers access to channels from Mexico, Colombia, Argentina, Chile, and the United States in Spanish and English.</p>
      
      <h2>Why Choose Flujo TV?</h2>
      <ul>
        <li><strong>Over 1200 live channels</strong> - Sports, news, series, movies</li>
        <li><strong>HD and 4K quality</strong> - The best picture quality</li>
        <li><strong>Prices from $9/month</strong> - Best price on the market</li>
        <li><strong>3 simultaneous screens</strong> - One account, three devices</li>
        <li><strong>Compatible with all devices</strong> - Android, iOS, Smart TV, Fire Stick, Roku</li>
      </ul>
      
      <h2>Available Plans</h2>
      <table>
        <tr><td>1 Month</td><td>$9 USD</td></tr>
        <tr><td>3 Months</td><td>$25 USD</td></tr>
        <tr><td>6 Months</td><td>$49 USD</td></tr>
        <tr><td>12 Months</td><td>$87 USD</td></tr>
      </table>
      
      <h2>How to Start</h2>
      <p>Visit <strong>flujo3tv.com</strong>, choose your plan, receive your credentials, and enjoy over 1200 Latino channels.</p>
      
      <p><strong>Flujo TV</strong> - Your connection to Latin America.</p>
    `,
    category: 'Flujo TV',
    categoryEn: 'Flujo TV',
    author: 'Flujo TV Team'
  },
  {
    title: 'Los Mejores Estrenos de Cine Latinoamericano en 2026',
    titleEn: 'Best Latin American Cinema Releases in 2026',
    excerpt: 'Descubre las películas más esperadas del año que capturan la esencia y diversidad de nuestra cultura.',
    excerptEn: 'Discover the most anticipated films of the year that capture the essence and diversity of our culture.',
    content: `
      <p>El 2026 promete ser un año extraordinario para el cine latinoamericano. Desde México hasta Argentina, directores y productores están preparando obras que prometen revolucionar la industria del entretenimiento.</p>
      
      <h2>Destacados del Año</h2>
      <p>Entre los estrenos más esperados encontramos producciones que exploran temas profundos de nuestra identidad cultural, desde historias de migración hasta relatos de celebración y tradición.</p>
      
      <p>Las plataformas de streaming han abierto nuevas puertas para creadores latinoamericanos, permitiendo que historias auténticas lleguen a audiencias globales como nunca antes.</p>
      
      <h2>El Impacto Cultural</h2>
      <p>El cine latinoamericano continúa ganando reconocimiento internacional, con películas que compiten en los festivales más prestigiosos del mundo. Esta visibilidad representa un orgullo para nuestras comunidades y una oportunidad para compartir nuestras historias con el mundo.</p>
      
      <p>En Flujo TV, nos emociona ser parte de este movimiento, llevando lo mejor del entretenimiento latino directamente a tu hogar, sin importar dónde te encuentres.</p>
    `,
    contentEn: `
      <p>2026 promises to be an extraordinary year for Latin American cinema. From Mexico to Argentina, directors and producers are preparing works that promise to revolutionize the entertainment industry.</p>
      
      <h2>Year Highlights</h2>
      <p>Among the most anticipated releases, we find productions that explore deep themes of our cultural identity, from migration stories to tales of celebration and tradition.</p>
      
      <p>Streaming platforms have opened new doors for Latin American creators, allowing authentic stories to reach global audiences like never before.</p>
      
      <h2>Cultural Impact</h2>
      <p>Latin American cinema continues to gain international recognition, with films competing in the world's most prestigious festivals. This visibility represents pride for our communities and an opportunity to share our stories with the world.</p>
      
      <p>At Flujo TV, we're excited to be part of this movement, bringing the best of Latin entertainment directly to your home, no matter where you are.</p>
    `,
    category: 'Entretenimiento',
    categoryEn: 'Entertainment',
    author: 'María García'
  },
  {
    title: 'La Música Latina que Domina las Listas Globales',
    titleEn: 'Latin Music Dominating Global Charts',
    excerpt: 'El reggaetón, la salsa y el pop latino siguen conquistando corazones en todo el mundo. Conoce los artistas del momento.',
    excerptEn: 'Reggaeton, salsa, and Latin pop continue winning hearts worldwide. Meet the artists of the moment.',
    content: `
      <p>La música latina ha trascendido fronteras y se ha convertido en un fenómeno global. Artistas como Bad Bunny, Karol G y J Balvin han demostrado que el ritmo latino tiene un lugar privilegiado en la industria musical mundial.</p>
      
      <h2>El Fenómeno del Reggaetón</h2>
      <p>Lo que comenzó en las calles de Puerto Rico ahora llena estadios en Europa, Asia y más allá. El reggaetón ha evolucionado, fusionándose con otros géneros y creando sonidos únicos que resuenan con audiencias de todas las edades.</p>
      
      <h2>Artistas Emergentes</h2>
      <p>Nuevas voces están emergiendo constantemente, trayendo frescura y perspectivas únicas. Desde la música regional mexicana hasta el trap latino, la diversidad de sonidos nunca ha sido tan rica.</p>
      
      <p>En Flujo TV, celebramos esta diversidad musical, ofreciendo canales dedicados a todos los géneros latinos para que disfrutes de tu música favorita las 24 horas.</p>
    `,
    contentEn: `
      <p>Latin music has transcended borders and become a global phenomenon. Artists like Bad Bunny, Karol G, and J Balvin have shown that Latin rhythm has a privileged place in the global music industry.</p>
      
      <h2>The Reggaeton Phenomenon</h2>
      <p>What started in the streets of Puerto Rico now fills stadiums in Europe, Asia, and beyond. Reggaeton has evolved, fusing with other genres and creating unique sounds that resonate with audiences of all ages.</p>
      
      <h2>Emerging Artists</h2>
      <p>New voices are constantly emerging, bringing freshness and unique perspectives. From regional Mexican music to Latin trap, the diversity of sounds has never been richer.</p>
      
      <p>At Flujo TV, we celebrate this musical diversity, offering channels dedicated to all Latin genres so you can enjoy your favorite music 24/7.</p>
    `,
    category: 'Música',
    categoryEn: 'Music',
    author: 'Carlos Rodríguez'
  },
  {
    title: 'El Fútbol Latinoamericano: Pasión que une Naciones',
    titleEn: 'Latin American Soccer: Passion that Unites Nations',
    excerpt: 'El deporte rey es mucho más que un juego en nuestra región. Conoce las historias detrás de los grandes equipos y jugadores.',
    excerptEn: 'The beautiful game is much more than just a game in our region. Discover the stories behind great teams and players.',
    content: `
      <p>El fútbol en Latinoamérica es religión, es identidad, es la forma en que millones de personas expresan sus emociones más profundas. Desde las canchas de tierra hasta los estadios más modernos, la pasión por el balompié une a generaciones.</p>
      
      <h2>Ligas que Apasionan</h2>
      <p>La Liga MX en México, el Brasileirão en Brasil, y la Superliga Argentina son solo algunas de las ligas que mantienen a millones de fanáticos al borde de sus asientos cada fin de semana.</p>
      
      <h2>Las Nuevas Estrellas</h2>
      <p>Jóvenes talentos siguen emergiendo de las canchas latinoamericanas para brillar en los clubes más importantes del mundo. La cantera latina sigue siendo una de las más prolíficas del fútbol mundial.</p>
      
      <p>En Flujo TV, entendemos esta pasión. Por eso ofrecemos cobertura completa de los partidos más importantes, análisis experto y programación dedicada al fútbol las 24 horas del día.</p>
    `,
    contentEn: `
      <p>Soccer in Latin America is religion, identity, and the way millions of people express their deepest emotions. From dirt pitches to the most modern stadiums, passion for the beautiful game unites generations.</p>
      
      <h2>Exciting Leagues</h2>
      <p>Liga MX in Mexico, Brasileirão in Brazil, and the Argentine Superliga are just some of the leagues that keep millions of fans on the edge of their seats every weekend.</p>
      
      <h2>New Stars</h2>
      <p>Young talents continue to emerge from Latin American pitches to shine in the world's most important clubs. The Latin talent pool remains one of the most prolific in world soccer.</p>
      
      <p>At Flujo TV, we understand this passion. That's why we offer complete coverage of the most important matches, expert analysis, and programming dedicated to soccer 24 hours a day.</p>
    `,
    category: 'Deportes',
    categoryEn: 'Sports',
    author: 'Miguel Fernández'
  },
  {
    title: 'Series Latinas que Debes Ver este Mes',
    titleEn: 'Latin Series You Must Watch This Month',
    excerpt: 'La producción de series en Latinoamérica está en su mejor momento. Te presentamos las producciones más destacadas.',
    excerptEn: 'Series production in Latin America is at its best. We present the most outstanding productions.',
    content: `
      <p>La era dorada de las series latinoamericanas ha llegado. Con producciones de alta calidad que compiten con las mejores series internacionales, nuestras historias están cautivando audiencias globales.</p>
      
      <h2>Telenovelas Reinventadas</h2>
      <p>Las telenovelas tradicionales han evolucionado, adoptando formatos más cortos y narrativas más complejas que mantienen a los espectadores enganchados. La calidad de producción ha alcanzado niveles cinematográficos.</p>
      
      <h2>Dramas Contemporáneos</h2>
      <p>Series que exploran temas sociales actuales, desde la política hasta las relaciones familiares modernas, están ganando reconocimiento crítico y popular. Historias auténticas que reflejan nuestra realidad.</p>
      
      <p>En Flujo TV, te traemos las mejores series latinas en un solo lugar. Desde clásicos hasta los últimos estrenos, todo el contenido que amas está disponible cuando tú quieras.</p>
    `,
    contentEn: `
      <p>The golden age of Latin American series has arrived. With high-quality productions that compete with the best international series, our stories are captivating global audiences.</p>
      
      <h2>Reinvented Telenovelas</h2>
      <p>Traditional telenovelas have evolved, adopting shorter formats and more complex narratives that keep viewers hooked. Production quality has reached cinematic levels.</p>
      
      <h2>Contemporary Dramas</h2>
      <p>Series exploring current social themes, from politics to modern family relationships, are gaining critical and popular recognition. Authentic stories that reflect our reality.</p>
      
      <p>At Flujo TV, we bring you the best Latin series in one place. From classics to the latest releases, all the content you love is available whenever you want.</p>
    `,
    category: 'Entretenimiento',
    categoryEn: 'Entertainment',
    author: 'Laura Sánchez'
  },
  // SEO-OPTIMIZED ARTICLES
  {
    title: 'Cómo Instalar Flujo TV en Smart TV, Fire Stick y Roku - Guía 2026',
    titleEn: 'How to Install Flujo TV on Smart TV, Fire Stick and Roku - Guide 2026',
    excerpt: 'Guía completa para instalar Flujo TV en cualquier dispositivo: Smart TV Samsung, LG, Fire Stick, Roku, Android TV y más. Paso a paso con imágenes.',
    excerptEn: 'Complete guide to install Flujo TV on any device: Samsung Smart TV, LG, Fire Stick, Roku, Android TV and more. Step by step with images.',
    content: `
      <p>Instalar <strong>Flujo TV</strong> en tu dispositivo es rápido y sencillo. En esta guía te mostramos cómo instalar Flujo TV en Smart TV, Fire Stick, Roku, Android TV y más dispositivos.</p>
      
      <h2>Cómo Instalar Flujo TV en Smart TV</h2>
      <p>Las Smart TVs de Samsung, LG, Sony y otras marcas son compatibles con Flujo TV. Sigue estos pasos:</p>
      <ol>
        <li>Abre la tienda de aplicaciones de tu Smart TV</li>
        <li>Busca una aplicación IPTV compatible</li>
        <li>Instala la aplicación</li>
        <li>Abre la app e ingresa tus credenciales de Flujo TV</li>
        <li>¡Disfruta de más de 1200 canales!</li>
      </ol>
      
      <h2>Cómo Instalar Flujo TV en Fire Stick</h2>
      <p>Amazon Fire TV Stick es uno de los dispositivos más populares para ver Flujo TV:</p>
      <ol>
        <li>Ve a Configuración → Dispositivo → Opciones para desarrolladores</li>
        <li>Activa "Apps de orígenes desconocidos"</li>
        <li>Instala la app Downloader desde la Amazon App Store</li>
        <li>Abre Downloader e ingresa la URL proporcionada</li>
        <li>Instala la app y configura con tus credenciales</li>
      </ol>
      
      <h2>Cómo Instalar Flujo TV en Roku</h2>
      <p>Para usar Flujo TV en Roku necesitas:</p>
      <ol>
        <li>Agregar el canal IPTV desde la Roku Channel Store</li>
        <li>O usar screen mirroring desde tu teléfono</li>
        <li>Configurar con tus datos de acceso</li>
      </ol>
      
      <h2>Requisitos para Flujo TV</h2>
      <ul>
        <li>Conexión a internet mínima de 10 Mbps</li>
        <li>Dispositivo compatible (Smart TV, Fire Stick, Roku, Android, iOS)</li>
        <li>Suscripción activa en flujo3tv.com</li>
      </ul>
      
      <p>¿Necesitas ayuda? Contáctanos por WhatsApp o visita <strong>flujo3tv.com</strong> para soporte técnico.</p>
    `,
    contentEn: `
      <p>Installing <strong>Flujo TV</strong> on your device is quick and easy. In this guide we show you how to install Flujo TV on Smart TV, Fire Stick, Roku, Android TV and more devices.</p>
      
      <h2>How to Install Flujo TV on Smart TV</h2>
      <p>Samsung, LG, Sony and other Smart TVs are compatible with Flujo TV. Follow these steps:</p>
      <ol>
        <li>Open your Smart TV app store</li>
        <li>Search for a compatible IPTV application</li>
        <li>Install the application</li>
        <li>Open the app and enter your Flujo TV credentials</li>
        <li>Enjoy over 1200 channels!</li>
      </ol>
      
      <h2>Requirements for Flujo TV</h2>
      <ul>
        <li>Minimum 10 Mbps internet connection</li>
        <li>Compatible device (Smart TV, Fire Stick, Roku, Android, iOS)</li>
        <li>Active subscription at flujo3tv.com</li>
      </ul>
      
      <p>Need help? Contact us via WhatsApp or visit <strong>flujo3tv.com</strong> for technical support.</p>
    `,
    category: 'Guías',
    categoryEn: 'Guides',
    author: 'Flujo TV Team'
  },
  {
    title: 'Ver TV Latina en Estados Unidos: La Guía Completa 2026',
    titleEn: 'Watch Latino TV in the United States: The Complete Guide 2026',
    excerpt: 'Descubre cómo ver canales latinos en Estados Unidos: canales de México, Colombia, Argentina y más. Las mejores opciones para mantenerte conectado con tu cultura.',
    excerptEn: 'Discover how to watch Latino channels in the United States: channels from Mexico, Colombia, Argentina and more. The best options to stay connected with your culture.',
    content: `
      <p>Para millones de latinos viviendo en Estados Unidos, mantenerse conectados con su cultura a través de la televisión es fundamental. <strong>Flujo TV</strong> te ofrece la solución perfecta para ver canales latinos desde cualquier lugar.</p>
      
      <h2>¿Por Qué Ver TV Latina en Estados Unidos?</h2>
      <p>Los latinos en Estados Unidos buscan:</p>
      <ul>
        <li><strong>Noticias de su país</strong> - Mantenerse informados sobre lo que pasa en casa</li>
        <li><strong>Deportes en vivo</strong> - Liga MX, fútbol sudamericano, box, UFC</li>
        <li><strong>Series y novelas</strong> - Contenido en español de calidad</li>
        <li><strong>Programación infantil</strong> - Dibujos animados en español para los niños</li>
        <li><strong>Eventos especiales</strong> - Fiestas patronales, conciertos, celebraciones</li>
      </ul>
      
      <h2>Canales Latinoamericanos Disponibles</h2>
      
      <h3>Canales de México</h3>
      <p>Con Flujo TV tienes acceso a Televisa, TV Azteca, Canal de las Estrellas, Las Estrellas, y más canales mexicanos en vivo.</p>
      
      <h3>Canales de Colombia</h3>
      <p>Disfruta de Caracol TV, RCN Television, City TV, y toda la programación colombiana desde Estados Unidos.</p>
      
      <h3>Canales de Argentina</h3>
      <p>Telefe, El Trece, América TV, y los mejores canales argentinos están disponibles 24/7.</p>
      
      <h2>Opciones para Ver TV Latina</h2>
      <table>
        <tr><th>Servicio</th><th>Precio</th><th>Canales</th></tr>
        <tr><td>Cable tradicional</td><td>$80-150/mes</td><td>50-100</td></tr>
        <tr><td>Hulu Live</td><td>$70+/mes</td><td>75+</td></tr>
        <tr><td>Sling Latino</td><td>$10-35/mes</td><td>20-50</td></tr>
        <tr><td><strong>Flujo TV</strong></td><td><strong>$9/mes</strong></td><td><strong>1200+</strong></td></tr>
      </table>
      
      <p>¿Listo para ver TV latina en Estados Unidos? Visita <strong>flujo3tv.com</strong> y comienza hoy mismo.</p>
    `,
    contentEn: `
      <p>For millions of Latinos living in the United States, staying connected with their culture through television is essential. <strong>Flujo TV</strong> offers you the perfect solution to watch Latino channels from anywhere.</p>
      
      <h2>Why Watch Latino TV in the United States?</h2>
      <p>Latinos in the United States look for:</p>
      <ul>
        <li><strong>News from their country</strong> - Stay informed about what's happening at home</li>
        <li><strong>Live sports</strong> - Liga MX, South American soccer, boxing, UFC</li>
        <li><strong>Series and novelas</strong> - Quality Spanish content</li>
        <li><strong>Kids programming</strong> - Cartoons in Spanish for children</li>
      </ul>
      
      <h2>Available Latin American Channels</h2>
      
      <h3>Mexican Channels</h3>
      <p>With Flujo TV you have access to Televisa, TV Azteca, Canal de las Estrellas, Las Estrellas, and more Mexican channels live.</p>
      
      <h3>Colombian Channels</h3>
      <p>Enjoy Caracol TV, RCN Television, City TV, and all Colombian programming from the United States.</p>
      
      <p>Ready to watch Latino TV in the United States? Visit <strong>flujo3tv.com</strong> and start today.</p>
    `,
    category: 'Flujo TV',
    categoryEn: 'Flujo TV',
    author: 'Flujo TV Team'
  },
  {
    title: 'Flujo TV vs Cable: Comparación Completa de Precios y Beneficios 2026',
    titleEn: 'Flujo TV vs Cable: Complete Price and Benefits Comparison 2026',
    excerpt: 'Compara Flujo TV con el cable tradicional: precios, canales, calidad y beneficios. Descubre por qué miles de latinos están cambiando al streaming.',
    excerptEn: 'Compare Flujo TV with traditional cable: prices, channels, quality and benefits. Discover why thousands of Latinos are switching to streaming.',
    content: `
      <p>¿Estás considerando cambiar del cable a <strong>Flujo TV</strong>? En esta comparación completa te mostramos por qué miles de familias latinas están haciendo el cambio.</p>
      
      <h2>Comparación de Precios</h2>
      <table>
        <tr><th>Servicio</th><th>Precio Mensual</th><th>Precio Anual</th></tr>
        <tr><td>Cable básico</td><td>$80-100</td><td>$960-1200</td></tr>
        <tr><td>Cable premium</td><td>$120-150</td><td>$1440-1800</td></tr>
        <tr><td><strong>Flujo TV 1 mes</strong></td><td><strong>$9</strong></td><td><strong>$108</strong></td></tr>
        <tr><td><strong>Flujo TV 12 meses</strong></td><td><strong>$7.25</strong></td><td><strong>$87</strong></td></tr>
      </table>
      <p><strong>Ahorra más de $1000 al año con Flujo TV!</strong></p>
      
      <h2>Por Qué Los Latinos Prefieren Flujo TV</h2>
      <ul>
        <li>💰 <strong>Ahorro significativo</strong> - Hasta 90% menos que el cable</li>
        <li>📺 <strong>Más contenido</strong> - 1200+ canales vs 50-100</li>
        <li>🌍 <strong>Ver desde cualquier lugar</strong> - En casa o de viaje</li>
        <li>📱 <strong>Múltiples dispositivos</strong> - Smart TV, teléfono, tablet</li>
        <li>⚡ <strong>Sin esperas</strong> - Activación inmediata</li>
      </ul>
      
      <p><strong>¿Listo para ahorrar?</strong> Visita <strong>flujo3tv.com</strong> y comienza hoy.</p>
    `,
    contentEn: `
      <p>Are you considering switching from cable to <strong>Flujo TV</strong>? In this complete comparison we show you why thousands of Latino families are making the switch.</p>
      
      <h2>Price Comparison</h2>
      <table>
        <tr><th>Service</th><th>Monthly Price</th><th>Annual Price</th></tr>
        <tr><td>Basic cable</td><td>$80-100</td><td>$960-1200</td></tr>
        <tr><td>Premium cable</td><td>$120-150</td><td>$1440-1800</td></tr>
        <tr><td><strong>Flujo TV 1 month</strong></td><td><strong>$9</strong></td><td><strong>$108</strong></td></tr>
        <tr><td><strong>Flujo TV 12 months</strong></td><td><strong>$7.25</strong></td><td><strong>$87</strong></td></tr>
      </table>
      <p><strong>Save over $1000 per year with Flujo TV!</strong></p>
      
      <p><strong>Ready to save?</strong> Visit <strong>flujo3tv.com</strong> and start today.</p>
    `,
    category: 'Comparaciones',
    categoryEn: 'Comparisons',
    author: 'Flujo TV Team'
  },
  {
    title: 'Flujo TV Precios y Planes 2026: Ofertas y Descuentos',
    titleEn: 'Flujo TV Prices and Plans 2026: offers and Discounts',
    excerpt: 'Conoce todos los planes y precios de Flujo TV 2026. Desde $9/mes con 1200+ canales. Descuentos en planes de 3, 6 y 12 meses. ¡Ahorra hasta 50%!',
    excerptEn: 'Learn about all Flujo TV 2026 plans and prices. From $9/month with 1200+ channels. Discounts on 3, 6 and 12 month plans. Save up to 50%!',
    content: `
      <p><strong>Flujo TV</strong> ofrece los precios más competitivos del mercado para streaming latino. Conoce todos nuestros planes y elige el que mejor se adapte a tus necesidades.</p>
      
      <h2>Planes y Precios de Flujo TV 2026</h2>
      
      <h3>Plan 1 Mes</h3>
      <ul>
        <li><strong>Precio:</strong> $9 USD</li>
        <li><strong>Canales:</strong> 1200+</li>
        <li><strong>Pantallas:</strong> 3 simultáneas</li>
        <li><strong>Calidad:</strong> HD y 4K</li>
      </ul>
      
      <h3>Plan 12 Meses - 20% Descuento ⭐ MEJOR VALOR</h3>
      <ul>
        <li><strong>Precio:</strong> $87 USD ($7.25/mes)</li>
        <li><strong>Canales:</strong> 1200+</li>
        <li><strong>Pantallas:</strong> 3 simultáneas</li>
        <li><strong>Calidad:</strong> HD y 4K</li>
      </ul>
      
      <h2>Qué Incluyen Todos los Planes</h2>
      <ul>
        <li>✅ Más de 1200 canales en vivo</li>
        <li>✅ Canales de México, Colombia, Argentina, Chile, USA</li>
        <li>✅ Deportes en vivo (Liga MX, fútbol, box, UFC)</li>
        <li>✅ Películas y series bajo demanda</li>
        <li>✅ 3 pantallas simultáneas</li>
        <li>✅ Calidad HD y 4K</li>
        <li>✅ Soporte técnico en español</li>
      </ul>
      
      <p><strong>¿Listo para comenzar?</strong> Visita <strong>flujo3tv.com</strong> y elige tu plan hoy.</p>
    `,
    contentEn: `
      <p><strong>Flujo TV</strong> offers the most competitive prices in the market for Latino streaming. Learn about all our plans and choose the one that best fits your needs.</p>
      
      <h2>Flujo TV Plans and Prices 2026</h2>
      
      <h3>1 Month Plan</h3>
      <ul>
        <li><strong>Price:</strong> $9 USD</li>
        <li><strong>Channels:</strong> 1200+</li>
        <li><strong>Screens:</strong> 3 simultaneous</li>
      </ul>
      
      <h3>12 Month Plan - 20% Discount ⭐ BEST VALUE</h3>
      <ul>
        <li><strong>Price:</strong> $87 USD ($7.25/month)</li>
        <li><strong>Channels:</strong> 1200+</li>
      </ul>
      
      <p><strong>Ready to start?</strong> Visit <strong>flujo3tv.com</strong> and choose your plan today.</p>
    `,
    category: 'Planes',
    categoryEn: 'Plans',
    author: 'Flujo TV Team'
  },
  {
    title: 'Flujo TV Deportes: Liga MX, Fútbol y Más en Vivo 2026',
    titleEn: 'Flujo TV Sports: Liga MX, Soccer and More Live 2026',
    excerpt: 'Disfruta de todos los deportes en vivo con Flujo TV: Liga MX, fútbol sudamericano, UFC, box, NBA, NFL y más. Guía completa de canales deportivos.',
    excerptEn: 'Enjoy all live sports with Flujo TV: Liga MX, South American soccer, UFC, boxing, NBA, NFL and more. Complete guide to sports channels.',
    content: `
      <p>Los deportes son pasión, y <strong>Flujo TV</strong> te trae la mejor cobertura deportiva en vivo. Desde la Liga MX hasta eventos internacionales, todo en un solo lugar.</p>
      
      <h2>Fútbol en Vivo</h2>
      
      <h3>Liga MX - México</h3>
      <p>Sigue todos los partidos de la Liga MX en vivo:</p>
      <ul>
        <li>América</li>
        <li>Chivas</li>
        <li>Cruz Azul</li>
        <li>Rayados</li>
        <li>Tigres</li>
        <li>y todos los equipos de la Liga MX</li>
      </ul>
      
      <h2>Canales Deportivos en Flujo TV</h2>
      <ul>
        <li>ESPN Deportes</li>
        <li>Fox Sports</li>
        <li>Univision Deportes</li>
        <li>Telemundo Deportes</li>
        <li>TDN (Televisa Deportes)</li>
        <li>Claro Sports</li>
      </ul>
      
      <h2>Precio</h2>
      <p>Accede a TODOS los canales deportivos desde solo <strong>$9/mes</strong> con Flujo TV. Sin pagos extra por eventos especiales.</p>
      
      <p><strong>¿Listo para disfrutar del mejor deporte?</strong> Visita <strong>flujo3tv.com</strong> y activa tu cuenta hoy.</p>
    `,
    contentEn: `
      <p>Sports are passion, and <strong>Flujo TV</strong> brings you the best live sports coverage. From Liga MX to international events, all in one place.</p>
      
      <h2>Live Soccer</h2>
      
      <h3>Liga MX - Mexico</h3>
      <p>Watch all Liga MX matches live:</p>
      <ul>
        <li>América</li>
        <li>Chivas</li>
        <li>Cruz Azul</li>
        <li>Rayados</li>
        <li>Tigres</li>
      </ul>
      
      <h2>Sports Channels on Flujo TV</h2>
      <ul>
        <li>ESPN Deportes</li>
        <li>Fox Sports</li>
        <li>Univision Deportes</li>
        <li>Telemundo Deportes</li>
      </ul>
      
      <p><strong>Ready to enjoy the best sports?</strong> Visit <strong>flujo3tv.com</strong> and activate your account today.</p>
    `,
    category: 'Deportes',
    categoryEn: 'Sports',
    author: 'Flujo TV Team'
  },
  {
    title: '¿Qué es IPTV y Por Qué es la Mejor Opción para Ver TV en 2026?',
    titleEn: 'What is IPTV and Why It\'s the Best Option for Watching TV in 2026?',
    excerpt: 'Descubre qué es IPTV, cómo funciona y por qué millones de latinos están cambiando del cable tradicional a este servicio de streaming. Más canales, mejor calidad y menor precio.',
    excerptEn: 'Discover what IPTV is, how it works, and why millions of Latinos are switching from traditional cable to this streaming service. More channels, better quality, and lower prices.',
    content: `
      <p><strong>IPTV (Internet Protocol Television)</strong> o Televisión por Protocolo de Internet es la tecnología que está revolucionando la forma en que millones de personas consumen contenido audiovisual.</p>
      
      <h2>¿Qué es IPTV y Cómo Funciona?</h2>
      <p>IPTV es un sistema de transmisión de televisión que funciona a través de Internet, sin necesidad de antenas, cables tradicionales o satélites.</p>
      
      <h2>7 Razones Por Las Que IPTV es Mejor que el Cable Tradicional</h2>
      
      <h3>1. Mayor Variedad de Contenido</h3>
      <p>Con servicios como <strong>Flujo TV</strong>, tienes acceso a más de <strong>1200+ canales</strong> de Latinoamérica y Estados Unidos.</p>
      
      <h3>2. Calidad Superior: HD y 4K</h3>
      <p>IPTV ofrece calidad <strong>Full HD y 4K</strong> en la mayoría de sus canales.</p>
      
      <h3>3. Precio Más Accesible</h3>
      <table>
        <tr><th>Servicio</th><th>Precio Mensual</th><th>Canales</th></tr>
        <tr><td>Cable tradicional</td><td>$80-$150</td><td>100-200</td></tr>
        <tr><td><strong>Flujo TV</strong></td><td><strong>$9</strong></td><td><strong>1200+</strong></td></tr>
      </table>
      
      <h3>4. Múltiples Dispositivos</h3>
      <p>Smartphones, Smart TVs, Fire Stick, Roku, tablets y más.</p>
      
      <h3>5. Sin Contratos Ni Compromisos</h3>
      <p>Pagos mensuales flexibles sin penalidades.</p>
      
      <h3>6. 3 Pantallas Simultáneas</h3>
      <p>Una cuenta, tres dispositivos al mismo tiempo.</p>
      
      <h3>7. Contenido de tu País de Origen</h3>
      <p>Para los latinos viviendo en Estados Unidos, IPTV es la mejor forma de mantenerse conectado con su cultura.</p>
      
      <h2>¿Por Qué Elegir Flujo TV?</h2>
      <ul>
        <li>🌎 <strong>1200+ canales</strong> de Latinoamérica y USA</li>
        <li>📺 <strong>Calidad HD/4K</strong> sin interrupciones</li>
        <li>💰 <strong>Precios accesibles</strong> desde $9/mes</li>
        <li>⚡ <strong>Activación inmediata</strong></li>
        <li>📞 <strong>Soporte técnico</strong> en español</li>
      </ul>
      
      <p><strong>¿Listo para dar el salto?</strong> Visita <strong>flujo3tv.com</strong> y comienza hoy.</p>
    `,
    contentEn: `
      <p><strong>IPTV (Internet Protocol Television)</strong> is the technology that is revolutionizing the way millions of people consume audiovisual content.</p>
      
      <h2>What is IPTV and How Does It Work?</h2>
      <p>IPTV is a television transmission system that works through the Internet, without the need for antennas, traditional cables, or satellites.</p>
      
      <h2>7 Reasons Why IPTV is Better than Traditional Cable</h2>
      
      <h3>1. More Content Variety</h3>
      <p>With services like <strong>Flujo TV</strong>, you have access to more than <strong>1200+ channels</strong>.</p>
      
      <h3>2. Superior Quality: HD and 4K</h3>
      <p>IPTV offers <strong>Full HD and 4K</strong> quality on most channels.</p>
      
      <h3>3. More Affordable Price</h3>
      <table>
        <tr><th>Service</th><th>Monthly Price</th><th>Channels</th></tr>
        <tr><td>Traditional Cable</td><td>$80-$150</td><td>100-200</td></tr>
        <tr><td><strong>Flujo TV</strong></td><td><strong>$9</strong></td><td><strong>1200+</strong></td></tr>
      </table>
      
      <h2>Why Choose Flujo TV?</h2>
      <ul>
        <li>🌎 <strong>1200+ channels</strong> from Latin America and USA</li>
        <li>📺 <strong>HD/4K quality</strong> without interruptions</li>
        <li>💰 <strong>Affordable prices</strong> starting at $9/month</li>
        <li>⚡ <strong>Immediate activation</strong></li>
      </ul>
      
      <p><strong>Ready to make the switch?</strong> Visit <strong>flujo3tv.com</strong> and start today.</p>
    `,
    category: 'Guías',
    categoryEn: 'Guides',
    author: 'Flujo TV Team'
  }
]

export async function POST() {
  try {
    // Delete all existing posts
    await db.post.deleteMany({})
    
    // Create new posts with 2026 dates
    const createdPosts = await Promise.all(
      samplePosts.map(post => 
        db.post.create({
          data: {
            ...post,
            published: true
          }
        })
      )
    )

    return NextResponse.json({ 
      success: true,
      message: 'Database reset and re-seeded with 2026 content!', 
      count: createdPosts.length 
    })
  } catch (error) {
    console.error('Error resetting database:', error)
    return NextResponse.json({ 
      error: 'Failed to reset database',
      details: String(error)
    }, { status: 500 })
  }
}
