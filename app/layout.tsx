import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CV Express IA - Génération de CV optimisé par IA',
  description: 'Obtiens ton CV + Lettre de motivation optimisés par IA en 5 minutes pour 9,99€',
  keywords: 'CV, lettre de motivation, IA, jeunes diplômés, reconversion',
  authors: [{ name: 'CV Express IA' }],
  openGraph: {
    title: 'CV Express IA - Génération de CV optimisé par IA',
    description: 'Obtiens ton CV + Lettre de motivation optimisés par IA en 5 minutes pour 9,99€',
    type: 'website',
    locale: 'fr_FR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}