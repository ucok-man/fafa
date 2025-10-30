import "@/app/styles/globals.css";
import { AlertCircle, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { Patrick_Hand, Recursive } from "next/font/google";
import { Toaster } from "sonner";

const recursive = Recursive({
  variable: "--font-recursive",
  subsets: ["latin"],
});

const patrick = Patrick_Hand({
  variable: "--font-patrick",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Fafa - AI-Powered Data Extraction & JSON Transformation API",
  description:
    "Transform unstructured data into structured JSON with AI. Extract information from text, documents, and convert it into your desired format instantly. Fast, accurate, and developer-friendly API.",
  keywords: [
    "data extraction",
    "JSON transformation",
    "AI data parsing",
    "unstructured data",
    "data conversion API",
    "text to JSON",
    "data structuring",
    "API integration",
    "machine learning data extraction",
  ],
  authors: [{ name: "Ucokman", url: "https://fafa.ucokman.web.id" }],
  creator: "Ucokman",
  publisher: "Ucokman",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fafa.ucokman.web.id",
    title: "Fafa - AI-Powered Data Extraction & JSON Transformation API",
    description:
      "Transform unstructured data into structured JSON with AI. Extract information from text, documents, and convert it into your desired format instantly.",
    siteName: "Fafa",
    // images: [
    //   {
    //     url: "https://fafa.ucokman.web.id/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Fafa - Data Extraction API",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fafa - AI-Powered Data Extraction & JSON Transformation API",
    description:
      "Transform unstructured data into structured JSON with AI. Fast, accurate, and developer-friendly.",
    // images: ["https://fafa.ucokman.web.id/og-image.png"],
    creator: "@ucokman",
  },
  alternates: {
    canonical: "https://fafa.ucokman.web.id",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${recursive.variable} ${patrick.variable} antialiased grainy-dark`}
      >
        {children}
        <Toaster
          richColors
          toastOptions={{
            classNames: {
              error: "bg-red-400 text-white border-red-400",
              success: "bg-green-400 text-white border-green-400",
              // You can also add other toast types like warning, info, etc.
            },
          }}
          icons={{
            success: <CheckCircle className="h-5 w-5" />,
            error: <AlertCircle className="h-5 w-5" />,
          }}
        />
      </body>
    </html>
  );
}
