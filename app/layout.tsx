import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";



export const metadata: Metadata = {
  title: "Sellify Website",
  description: "Buy and sell items with ease on Sellify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
         <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
