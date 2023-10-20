import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import AuthProvider from './context/AuthProvider';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EasyLoan - Your No1. Loan Guarantor',
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
          <NextTopLoader />
          <Navbar />
          <main className='p-5'>{children}</main>
        </AuthProvider>
        <ToastContainer className='w-1/2' />
      </body>
    </html>
  );
}
