import './globals.css';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'calculator',
  description: 'a calculator app built with next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${rubik.className} flex h-full justify-center bg-gradient-to-bl from-purple-medium-bg to-purple-light-bg p-5`}
      >
        {children}
      </body>
    </html>
  );
}
