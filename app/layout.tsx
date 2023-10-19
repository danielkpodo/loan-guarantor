import './globals.css';

import AuthProvider from './context/AuthProvider';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EasyLoan::Your No1. Loan Guarantor',
  description: 'Get instant loans to sustain your business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main className='p-5'>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
