import './globals.css';
import type { Metadata } from 'next';
import { Nav } from '@/app/shared';

export const metadata: Metadata = {
  title: 'Prediction App',
  description: 'generate predictions for image using machine learning'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
