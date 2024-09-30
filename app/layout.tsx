import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import { UserProvider } from "./hooks/UserContext";
import { CategoriesProvider } from "./hooks/CategoriesContext";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
          <UserProvider>
          <CategoriesProvider>
          <Navbar />
          {children}
          <Footer />
          </CategoriesProvider>
          </UserProvider>
      </body>
    </html>
  );
}
