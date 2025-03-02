import { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen bg-gray-200">
      <Header />
      <div className="px-8 py-2">
        {children}
      </div>
    </main>
  );
}
