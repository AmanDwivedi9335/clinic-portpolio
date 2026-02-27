import "./globals.css";
import Header from "@/components/Genric/Header/Header";
import Footer from "@/components/Genric/Footer/Footer";
import Script from "next/script";
import FloatingClaimButton from "@/components/Genric/FloatingClaimButton";

export const metadata = {
  title: "Medibank",
  description: "Centralised EHR ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
          strategy="afterInteractive"
        />
        <Header/>
          {children}
        <FloatingClaimButton />
        <Footer/>
        </body>
    </html>
  );
}
