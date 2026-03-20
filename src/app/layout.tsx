import type { Metadata } from "next";
import "@/app/globals.css";

const siteUrl = "https://fgcode.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Felipe Gabriel | Full Stack Developer & DevOps",
    template: "%s | Felipe Gabriel"
  },
  description: "Portfólio profissional de Felipe Gabriel - Desenvolvedor Full Stack especializado em Next.js, React, Node.js, DevOps e automações inteligentes. Transformo ideias em produtos digitais escaláveis.",
  keywords: ["desenvolvedor full stack", "next.js", "react", "devops", "automações", "web developer", "node.js", "typescript"],
  authors: [{ name: "Felipe Gabriel" }],
  creator: "Felipe Gabriel",
  publisher: "Felipe Gabriel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Felipe Gabriel | Full Stack Developer",
    title: "Felipe Gabriel | Full Stack Developer & DevOps",
    description: "Portfólio profissional com foco em web, DevOps e automações inteligentes. Especialista em Next.js, React e arquiteturas escaláveis.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Felipe Gabriel - Full Stack Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipe Gabriel | Full Stack Developer & DevOps",
    description: "Portfólio profissional com foco em web, DevOps e automações inteligentes.",
    images: ["/og-image.jpg"],
    creator: "@fgcode",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'pt-BR': `${siteUrl}/pt`,
      'en-US': `${siteUrl}/en`,
      'en': `${siteUrl}/en`,
    },
  },
  verification: {
    google: "seu-codigo-google-search-console",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

