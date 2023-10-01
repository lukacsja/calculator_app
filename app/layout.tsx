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
        className={`${rubik.className} to-purple-light-bg from-purple-medium-bg flex h-screen items-center justify-center bg-gradient-to-bl p-5`}
      >
        {children}
      </body>
    </html>
  );
}
