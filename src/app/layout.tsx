import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SitePulse SEO | Technical Site Auditor",
  description: "High-speed technical SEO auditor for modern websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antigravity-bg min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
