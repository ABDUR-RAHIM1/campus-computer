import { Noto_Sans_Bengali } from "next/font/google";
import "../../globals.css";
import { Toaster } from "sonner";
import ContextApiState from "@/contextApi/ContextApi"; 
import DashboardNavbar from "./components/DashboardNavbar";

// Bengali font
const bengaliFont = Noto_Sans_Bengali({
  weight: ["400", "500", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali",
});

export const metadata = {
  title: "Dashboard - Campus Computer",
  description: "College Bazar lalmonirhat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body
        cz-shortcut-listen="true"
        className={`${bengaliFont.variable} font-sans antialiased`}
      >
        <ContextApiState>
          <Toaster position="top-right" />
          <DashboardNavbar />
          {children}

        </ContextApiState>
      </body>
    </html>
  );
}
