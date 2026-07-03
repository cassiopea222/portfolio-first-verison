import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Pro, Geist, Geist_Mono, Inconsolata } from "next/font/google";
import localFont from "next/font/local";
import AppShellHeader from "@/components/AppShellHeader";
import TooltipProvider from "@/components/TooltipProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-inconsolata-raw",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  style: ["italic"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const interDisplay = localFont({
  src: "../fonts/inter-display/InterDisplay-SemiBold.woff2",
  weight: "600",
  variable: "--font-inter-display",
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
        className={`${geist.className} ${geist.variable} ${inconsolata.variable} ${geistMono.variable} ${crimsonPro.variable} ${cormorantGaramond.variable} ${interDisplay.variable} min-h-screen antialiased`}
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
