import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";
import Header from "@/app/components/Header";
import Footer from "./components/Footer";

const sg = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Variant616",
  description: "Movie recommendations and reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(sg.className, "antialiased bg-[#141A13] ")}>
        <div className="wrapper bg-[#141A13] max-w-[900px] mx-auto flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
