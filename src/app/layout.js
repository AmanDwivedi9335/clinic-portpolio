import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Genric/Header/Header";
import Footer from "@/components/Genric/Footer/Footer";
import Script from "next/script";

export const metadata = {
  title: "Medibank",
  description: "Centralised EHR ",
};

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700'], // Include desired weights
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={outfit.className}>
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
        <Footer/>
        </body>
    </html>
  );
}
