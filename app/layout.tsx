import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders_Stencil } from "next/font/google";
import { brand } from "@/data/site";
import "./globals.css";

// Poster stencil caps for display; Archivo (with its width axis) for text and narrow labels.
const stencil = Big_Shoulders_Stencil({
  variable: "--font-stencil",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.description,
    type: "website",
    siteName: brand.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#3b2112",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${stencil.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
