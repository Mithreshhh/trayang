import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { brand } from "@/data/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} – ${brand.tagline}`,
  description: brand.description,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: `${brand.name} – ${brand.tagline}`,
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
    <html lang="en" className={dmSans.variable}>
      <body>{children}</body>
    </html>
  );
}
