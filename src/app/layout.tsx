import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Get Me Hired - AI-Powered Job Matching",
  description:
    "Upload your CV and instantly discover jobs that match your skills. Powered by AI. Built as a dissertation project at the West University of Timișoara.",
  openGraph: {
    title: "Get Me Hired - AI-Powered Job Matching",
    description:
      "Upload your CV and instantly discover jobs that match your skills. Powered by AI. Built as a dissertation project at the West University of Timișoara.",
    siteName: "Get Me Hired",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Me Hired - AI-Powered Job Matching",
    description:
      "Upload your CV and instantly discover jobs that match your skills. Powered by AI. Built as a dissertation project at the West University of Timișoara.",
  },
  keywords: [
    "job matching",
    "AI",
    "CV analysis",
    "career",
    "job recommendations",
    "West University of Timișoara",
    "dissertation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
