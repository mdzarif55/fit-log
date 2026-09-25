import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FitLog",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}
>
      <body
        className={"font-oswald min-h-full bg-[#0b0c0f] flex flex-col antialiased"}
      >
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
         <Toaster
          position="top-right"
          // toastOptions={{
          //   duration: 2000,
          //   style: {
          //     background: "#15171c",
          //     color: "#ffffff",
          //     border: "1px solid #30333b",
          //     fontSize: "12px",
          //   },
          // }}
        />
      </body>
    </html>
  );
}