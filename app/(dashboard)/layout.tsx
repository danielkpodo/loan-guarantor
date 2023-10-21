import 'react-toastify/dist/ReactToastify.css';

import AuthProvider from '../context/AuthProvider';
import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import NextTopLoader from 'nextjs-toploader';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'EasyLoan - Your No1. Loan Guarantor',
  description: 'Get instant loans to sustain your business',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AuthProvider>
        <NextTopLoader />
        <Navbar />
        <main className='p-5'>{children}</main>
      </AuthProvider>
      <ToastContainer />
    </section>
  );
}
