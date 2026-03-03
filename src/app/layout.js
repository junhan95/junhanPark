import { Outfit, Inter, Fira_Code } from 'next/font/google';
import './globals.css';
import ClientProviders from './ClientProviders';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata = {
  title: 'Junhan Park — AI Vibe Coder | 풀스택 개발자 포트폴리오',
  description: 'AI Vibe Coding으로 아이디어를 현실로 만드는 풀스택 개발자 박준한의 포트폴리오. React, Node.js, Python, AI/RAG 기반 프로젝트를 소개합니다.',
  keywords: ['Junhan Park', '박준한', 'AI Vibe Coder', '풀스택 개발자', 'React', 'Node.js', 'Python', 'AI', 'RAG', '포트폴리오'],
  authors: [{ name: 'Junhan Park' }],
  metadataBase: new URL('https://junhanpark.work'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Junhan Park — AI Vibe Coder',
    description: 'AI Vibe Coding으로 아이디어를 현실로 만드는 풀스택 개발자 박준한의 포트폴리오.',
    type: 'website',
    url: 'https://junhanpark.work/',
    images: [
      {
        url: '/images/og-thumbnail.webp',
        width: 1200,
        height: 630,
        alt: 'Junhan Park Portfolio',
      },
    ],
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    siteName: 'Junhan Park Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Junhan Park — AI Vibe Coder',
    description: 'AI Vibe Coding으로 아이디어를 현실로 만드는 풀스택 개발자 박준한의 포트폴리오.',
    images: ['/images/og-thumbnail.webp'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  other: {
    'theme-color': '#7c3aed',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Junhan Park',
                alternateName: '박준한',
                url: 'https://junhanpark.work/',
                jobTitle: 'AI Vibe Coder & Full-Stack Developer',
                description: 'AI Vibe Coding으로 아이디어를 현실로 만드는 풀스택 개발자',
                knowsAbout: ['JavaScript', 'React', 'Node.js', 'Python', 'AI', 'RAG', 'GraphQL', 'SEO'],
                sameAs: ['https://github.com/junhan95'],
                email: 'junhanpark95@gmail.com',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Junhan Park Portfolio',
                url: 'https://junhanpark.work/',
                description: 'AI Vibe Coding으로 아이디어를 현실로 만드는 풀스택 개발자 박준한의 포트폴리오',
                inLanguage: ['ko', 'en'],
              },
            ]),
          }}
        />
      </head>
      <body className={`${outfit.variable} ${inter.variable} ${firaCode.variable}`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
