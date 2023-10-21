import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Easy Loans - your trusted loan partner',
  description: 'Access loans in a matter of minutes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='p-5'>{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}
