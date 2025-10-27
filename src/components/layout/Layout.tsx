import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SmoothScroll } from '@/components/animations/SmoothScroll';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
};