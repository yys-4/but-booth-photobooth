import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://butbooth.com'), // Base URL for resolving relative links
  title: "ButBooth - Retro Photo Booth",
  description: "Capture cute retro-style photos with ButBooth! Choose from fun themes and save your memories instantly.",
  openGraph: {
    title: "ButBooth - Retro Photo Booth",
    description: "Capture cute retro-style photos with ButBooth! Choose from fun themes and save your memories instantly.",
    url: "https://butbooth.com", // This is a placeholder, strictly speaking we don't have a domain yet but it helps for structure
    siteName: "ButBooth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ButBooth Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ButBooth - Retro Photo Booth",
    description: "Capture cute retro-style photos with ButBooth! Choose from fun themes and save your memories instantly.",
    images: ["/og-image.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
