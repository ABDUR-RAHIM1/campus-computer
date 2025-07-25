import { Noto_Sans_Bengali } from "next/font/google";
import "../../globals.css";
import ProfileNavbar from "./components/ProfileNavbar"; 
import { Toaster } from "sonner"; 
import ContextApiState from "@/contextApi/ContextApi";

// Bengali font
const bengaliFont = Noto_Sans_Bengali({
  weight: ["400", "500", "700"],
  subsets: ["bengali"],
  variable: "--font-bengali",
});

export const metadata = {
  title: "Profile - Campus Computer",
  description: "College Bazar lalmonirhat",
};

export default function ProfileLayout({ children }) {
  return (
    <html lang="bn">
      <body
        cz-shortcut-listen="true"
        className={`${bengaliFont.variable} font-sans antialiased`}
      >
        <ContextApiState>
        <Toaster position="top-right" />
          <ProfileNavbar />
          {children}

        </ContextApiState>
      </body>
    </html>
  );
}
