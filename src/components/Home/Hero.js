"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createGsapContext } from "@/lib/gsap";

export default function Hero() {
  const heroImages = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
  ];
  const firstLineText =
    "We ensures your complete medical history is always with you, in emergencies, in hospitals, across cities, across time.";
  const secondLineText = "Because one missing detail can change everything...";
  const typingSpeed = 60;
  const totalTypingCharacters =
    firstLineText.length + 1 + secondLineText.length;
  const sectionRef = useRef(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [typedCharacters, setTypedCharacters] = useState(0);

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

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setTypedCharacters((currentCharacters) => {
        if (currentCharacters >= totalTypingCharacters) {
          clearInterval(typingInterval);
          return currentCharacters;
        }

        return currentCharacters + 1;
      });
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [totalTypingCharacters]);

  const hasStartedSecondLine = typedCharacters > firstLineText.length;
  const firstLineVisible = firstLineText.slice(
    0,
    Math.min(typedCharacters, firstLineText.length)
  );
  const secondLineVisible = secondLineText.slice(
    0,
    Math.max(0, typedCharacters - firstLineText.length - 1)
  );
  const isTypingComplete = typedCharacters >= totalTypingCharacters;

  return (
    <section ref={sectionRef} className="pt-[104px] pb-5">
      <div className="mx-auto px-3 md:px-6">
        {/* Rounded hero frame */}
        <div className="relative overflow-hidden rounded-[28px] ">
          {/* Background image */}
          {heroImages.map((heroImage, index) => (
            <Image
              key={heroImage}
              src={heroImage}
              alt={`Hero background ${index + 1}`}
              fill
              priority={index === 0}
              className={`object-cover object-top !top-[-0px] !h-[calc(100%+70px)] transition-opacity duration-700 ${
                index === activeImageIndex ? "opacity-100" : "opacity-0"
              }`}
              sizes="100vw"
            />
          ))}

          {/* Soft left fade (so text stays readable) */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/55 via-white/15 to-transparent" />

          {/* Content */}
          <div className="relative z-10 grid min-h-[calc(100vh-124px)] md:min-h-[calc(100vh-124px)] grid-cols-1 md:grid-cols-2 items-center">
            {/* Left content */}
            <div className="px-6 md:px-10 py-12 md:py-16">
              <p className="hero-animate text-[12px] md:text-sm font-medium text-slate-700">
                <Image
                  key="heroStar"
                  src="/images/star.png"
                  width={10}
                  height={10}
                  alt={`Hero star`}
                  className="object-contain !top-[-2px] !h-[18px] inline-block mr-2"
                />
                India&apos;s 1st Health Identity Infrastructure &nbsp;
                <Image
                  key="heroStar"
                  src="/images/star.png"
                  width={10}
                  height={10}
                  alt={`Hero star`}
                  className="object-contain !top-[-2px] !h-[18px] inline-block mr-2"
                />
              </p>

              <h1 className="hero-animate mt-4 text-[38px] leading-[1.05] md:text-[60px] md:leading-[1.02] font-extrabold text-wave">
                Your Health Identity<br />
                
                for Life...
              </h1>

              <p className="hero-animate mt-5 max-w-xl text-[14px] md:text-[15px] leading-relaxed text-[#7B1FA2]">
                <span>{firstLineVisible}</span>
                {hasStartedSecondLine && <br />}
                <span className="font-semibold">{secondLineVisible}</span>
                {!isTypingComplete && (
                  <span className="ml-0.5 inline-block animate-pulse">|</span>
                )}
              </p>

              <div className="hero-animate mt-7">
                <a
                  href="/claim"
                  className="
                    inline-flex items-center !cursor-pointer justify-center
                    rounded-2xl px-8 py-3
                    font-semibold text-white
                    bg-gradient-to-b from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3]
                    shadow-[0_12px_30px_rgba(123,31,162,0.45)]
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:shadow-[0_22px_50px_rgba(216,27,96,0.6)]
                    hover:brightness-110
                    active:scale-[0.97]
                  "
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
