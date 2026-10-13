import type { Metadata } from "next";
import { Inter, Caveat, Patrick_Hand } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components";
import { navbarData, footerData } from "@/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["700"],
});

const patrickHand = Patrick_Hand({
  subsets: ["latin"],
  variable: "--font-patrick",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "GreenFarm | Agriculture & Organic",
  description:
    "Fresh organic produce, sustainable farming solutions, and bulk agricultural deals directly from GreenFarm.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} ${patrickHand.variable} ${inter.className} h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col font-sans bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900 scroll-smooth`}>
        <Navbar initialData={navbarData} />
        <main className="w-full flex-1">{children}</main>
        <Footer data={footerData} />
      </body>
    </html>
  );
}
