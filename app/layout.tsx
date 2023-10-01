import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "calculator",
  description: "a calculator app built with next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="gradient-bg font-main flex p-5 h-screen items-center justify-center">
        {children}
      </body>
    </html>
  );
}
