import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { Patrick_Hand, Recursive } from "next/font/google";

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
      <body className={`${recursive.variable} ${patrick.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
