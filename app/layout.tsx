import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import SessionWrapper from "./sessionwrapper";
import { Suspense } from "react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  // weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AI-Powered PDF Summarizer",
  description:
    "Upload any PDF and get a concise, accurate summary in seconds using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SessionWrapper>
        <html lang="en">
          <body className={`${outfit.variable} font-outfit  antialiased`}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </SessionWrapper>
    </Suspense>
  );
}
