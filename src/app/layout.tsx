import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Aula Inclusiva HN - Plataforma de Educación Digital Adaptativa",
  description:
    "Propuesta de plataforma educativa inclusiva con delivery adaptativo vía WhatsApp y web para Honduras. Proyecto Final Integrador - UTH.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-surface-light text-gray-900 antialiased">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-brand-500 focus:text-white focus:px-4 focus:py-2 focus:z-50"
        >
          Saltar al contenido principal
        </a>
        <Header />
        <main id="contenido-principal">{children}</main>
      </body>
    </html>
  );
}
