import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Sanskrithi Group of Institutions",
  description: "Developed by Sanskrithi Group of Institutions",
  icons: {
    icon: "/Icon-03.png", 
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
       className={`${inter.variable} antialiased`}
      >
        <Navbar />
        <Toaster position="top-right" />
        <main className="mt-[72px] px-4 pb-6">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
