import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rodrigo De La Torre — Arquitecto de Sistemas de IA',
  description: 'Consultor, constructor y divulgador de Inteligencia Artificial. Fundador de Orion AI Consulting y Orion AI Society. Diseño sistemas que multiplican el trabajo humano — sin reemplazarlo.',
  openGraph: {
    title: 'Rodrigo De La Torre — Arquitecto de Sistemas de IA',
    description: 'Consultor, constructor y divulgador de Inteligencia Artificial. Fundador de Orion AI Consulting y Orion AI Society.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Rodrigo De La Torre',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rodrigo De La Torre — Arquitecto de Sistemas de IA',
    description: 'Consultor, constructor y divulgador de IA. Fundador de Orion AI Consulting y Orion AI Society.',
  },
  keywords: ['IA', 'Inteligencia Artificial', 'Consultoría', 'Automatización', 'N8N', 'Orion AI', 'LATAM', 'Fractalidad'],
  authors: [{ name: 'Rodrigo De La Torre' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-variation="museo" data-theme="light" data-density="editorial" data-glitch="on">
        {children}
      </body>
    </html>
  );
}
