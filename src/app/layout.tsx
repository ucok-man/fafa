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
  title: "Anyhow",
  description:
    "Tools for converting any structure of data into json format you like",
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
