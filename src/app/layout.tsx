import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/navigation/back-to-top";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { generateWebSiteJsonLd } from "@/lib/structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Intelligence — Public Accountability Platform",
    template: "%s | Intelligence",
  },
  description:
    "They promise. They break it. They count on you forgetting. Check any leader's track record in seconds.",
  metadataBase: new URL("https://intelligence-red.vercel.app"),
  openGraph: {
    title: "Intelligence — Public Accountability Platform",
    description:
      "They promise. They break it. They count on you forgetting. Check any leader's track record.",
    type: "website",
    siteName: "Intelligence",
    url: "https://intelligence-red.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intelligence — Public Accountability Platform",
    description:
      "They promise. They break it. They count on you forgetting. Check any leader's track record.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteJsonLd()),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-medium"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
