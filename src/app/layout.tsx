import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StoreProvider } from "@/components/StoreProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

function resolveMetadataBase() {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const value of candidates) {
    const trimmed = value?.trim();
    if (!trimmed) continue;

    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      return new URL(normalized);
    } catch {
      // Ignore malformed environment values and try the next safe candidate.
    }
  }

  return new URL("http://localhost:3000");
}

const metadataBase = resolveMetadataBase();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "EIRA | Joias sob tensão",
    template: "%s | EIRA",
  },
  description: "Joias arquitetônicas em ouro branco e safiras pálidas. Um catálogo conceitual de precisão, matéria e luz.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "EIRA | Joias sob tensão",
    description: "A coleção Intervalo apresenta joias arquitetônicas em ouro branco e safiras pálidas.",
    url: "/",
    siteName: "EIRA",
    images: [{ url: "/images/hero-ring.png", width: 1536, height: 1024, alt: "Anel Vetor em ouro branco com safira azul-clara" }],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
          <SiteHeader />
          <main id="conteudo">{children}</main>
          <SiteFooter />
        </StoreProvider>
      </body>
    </html>
  );
}
