import Navbar from '../components/Navbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <main className='p-5'>{children}</main>
    </section>
  );
}
