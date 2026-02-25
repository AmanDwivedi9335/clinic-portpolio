import "./globals.css";
import Header from "@/components/Genric/Header/Header";
import Footer from "@/components/Genric/Footer/Footer";
import Script from "next/script";

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
        <a
          href="/login"
          className="fixed bottom-5 right-5 z-40 rounded-full bg-[#282672] px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#1f1d59]"
        >
          Claim your health identity
        </a>
        <Footer/>
        </body>
    </html>
  );
}
