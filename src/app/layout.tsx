import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Pro, Geist_Mono, Inconsolata, Inter } from "next/font/google";
import localFont from "next/font/local";
import AppShellHeader from "@/components/AppShellHeader";
import MobileOverlay from "@/components/MobileOverlay";
import TooltipProvider from "@/components/TooltipProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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

const siteDescription =
  "Product designer and crafter of experiences. Creating digital tools that make life easier for real people.";

export const metadata: Metadata = {
  metadataBase: new URL("https://julia-bulyndina.vercel.app"),
  title: "Julia Bulyndina Portfolio",
  description: siteDescription,
  openGraph: {
    title: "Julia Bulyndina — Product Designer",
    description: siteDescription,
    url: "/",
    siteName: "Julia Bulyndina Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Julia Bulyndina — Product Designer",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${inter.variable} ${inconsolata.variable} ${geistMono.variable} ${crimsonPro.variable} ${cormorantGaramond.variable} ${interDisplay.variable} min-h-screen antialiased`}
      >
        <TooltipProvider>
          <div className="flex min-h-screen flex-col bg-[var(--background)]">
            <AppShellHeader />
            <main className="flex-1">{children}</main>
            <MobileOverlay />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
