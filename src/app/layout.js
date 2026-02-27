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
          className="fixed bottom-5 left-5 z-40 rounded-2xl bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(123,31,162,0.45)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(216,27,96,0.6)] hover:brightness-110"
        >
          Claim your health identity
        </a>
        <Footer/>
        </body>
    </html>
  );
}
