import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Playfair_Display, Cinzel } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

export const metadata = {
  title: 'The Noble Pawn',
  description: 'AI-powered Digital Pawn Shop Marketplace',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${playfair.variable} ${cinzel.variable} bg-parchment text-maroon`}>
        <body className="font-serif min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
