// app/layout.js or app/(home)/layout.js

import { Noto_Sans_Bengali } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ContextApiState from "@/contextApi/ContextApi";
import { Toaster } from "sonner";
import { campusComputerMetadata } from "@/seo/metadata";

const notoSansBengali = Noto_Sans_Bengali({
  weight: ["400", "500", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali",
});

export const metadata =  campusComputerMetadata

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body
        cz-shortcut-listen="true"
        className={`${notoSansBengali.variable} font-sans antialiased`}>
        <ContextApiState>
          <Toaster position="top-right" />
          <Navbar />
          {children}
          <Footer />

        </ContextApiState>
      </body>
    </html>
  );
}
