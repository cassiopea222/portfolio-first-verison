import type { Metadata } from "next";
import { Crimson_Pro, Geist_Mono, Inter } from "next/font/google";
import AppShellHeader from "@/components/AppShellHeader";
import TooltipProvider from "@/components/TooltipProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  style: ["italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Julia Bulyndina Portfolio",
  description:
    "Product designer and crafter of experiences. Creating digital tools that make life easier for real people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${crimsonPro.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <TooltipProvider>
          <div className="flex min-h-screen flex-col bg-[var(--background)]">
            <AppShellHeader />
            <main className="flex-1">{children}</main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
