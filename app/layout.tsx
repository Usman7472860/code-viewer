import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LogicInspector from '@/components/LogicInspector';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: APP_NAME,
  description: 'Self-inspecting source code viewer — har button ka logic, har API, har hardcode.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen text-slate-200 antialiased">
        <Header />
        <main className="mx-auto max-w-[1400px] px-4 py-6">{children}</main>
        <Footer />
        <LogicInspector />
      </body>
    </html>
  );
}