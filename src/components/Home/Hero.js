"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createGsapContext } from "@/lib/gsap";

export default function Hero() {
  const heroImages = [
    "/images/hero.png",
    "/images/img1bg.png",
    "/images/img2bg.png",
    "/images/img3bg.png",
    "/images/img4bg.png",
  ];
  const firstLineWords =
    "We ensures your complete medical history is always with you, in emergencies, in hospitals, across cities, across time.".split(
      " "
    );
  const secondLineWords =
    "Because one missing detail can change everything...".split(" ");
  const sectionRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
      gsap.fromTo(
        ".hero-animate",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setActiveImageIndex((currentIndex) =>
        currentIndex === heroImages.length - 1 ? 0 : currentIndex + 1
      );
    }, 3000);

    return () => clearInterval(carouselInterval);
  }, [heroImages.length]);

  return (
    <section ref={sectionRef} className="pt-[5px] pb-5">
      <div className="mx-auto px-3 md:px-6">
        {/* Rounded hero frame */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/70 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
          {/* Background image */}
          {heroImages.map((heroImage, index) => (
            <Image
              key={heroImage}
              src={heroImage}
              alt={`Hero background ${index + 1}`}
              fill
              priority={index === 0}
              className={`object-cover transition-opacity duration-700 ${
                index === activeImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Soft left fade (so text stays readable) */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/55 via-white/15 to-transparent" />

          {/* Content */}
          <div className="relative grid min-h-[95vh] md:min-h-[95vh] grid-cols-1 md:grid-cols-2 items-center">
            {/* Left content */}
            <div className="px-6 md:px-10 py-12 md:py-16">
              <p className="hero-animate text-[12px] md:text-sm font-medium text-slate-700">
                Medibank - India&apos;s 1st Health Identity Infrastructure
              </p>

              <h1 className="hero-animate mt-4 text-[38px] leading-[1.05] md:text-[60px] md:leading-[1.02] font-extrabold text-wave">
                Your Health
                <br />
                Identity for Life
              </h1>

              <p className="hero-animate mt-5 max-w-xl text-[14px] md:text-[15px] leading-relaxed text-slate-400">
                {firstLineWords.map((word, index) => (
                  <span
                    key={`line-one-${word}-${index}`}
                    className="word-wave"
                    style={{ "--delay": `${index * 0.12}s` }}
                  >
                    {word}{" "}
                  </span>
                ))}
                <br />
                {secondLineWords.map((word, index) => (
                  <span
                    key={`line-two-${word}-${index}`}
                    className="word-wave font-semibold"
                    style={{
                      "--delay": `${(firstLineWords.length + index) * 0.12}s`,
                    }}
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>

              <div className="hero-animate mt-7">
                <a
                  href="/claim"
                  className="inline-flex items-center justify-center rounded-xl bg-[#4b00a3] px-6 py-3 text-white font-semibold shadow-[0_10px_25px_rgba(75,0,163,0.28)] hover:opacity-95 active:scale-[0.99] transition"
                >
                  Claim Your Health Identity
                </a>
              </div>
            </div>

            {/* Right side kept mostly visual (optional) */}
            <div className="hidden md:block" />
          </div>

          {/* Subtle vignette like mock */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/40" />
        </div>
      </div>
    </section>
  );
}
