import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from './components/Navbar';
import AppContext from './AppContext';
import 'dayjs/locale/fr';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rapport de garde',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`min-h-screen ${inter.className} bg-secondary overflow-hidden overflow-y-auto w-screen`}
      >
        <AppContext>
          <Navbar />
          <main className="flex flex-col items-center justify-center w-screen py-8 sm:px-6 md:px-12 lg:px-24">
            {children}
          </main>
        </AppContext>
      </body>
    </html>
  );
}
