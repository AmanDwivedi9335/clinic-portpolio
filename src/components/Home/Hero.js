"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";

export default function Hero() {
  const firstLineWords =
    "We ensures your complete medical history is always with you, in emergencies, in hospitals, across cities, across time.".split(
      " "
    );
  const secondLineWords =
    "Because one missing detail can change everything...".split(" ");
  const sectionRef = useRef(null);

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

  return (
    <section ref={sectionRef} className="py-3 sm:py-4 md:py-5">
      <div className="mx-auto max-w-7xl">
        {/* Rounded hero frame */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/70 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
          {/* Background image */}
          <Image
            src="/images/hero.png" 
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />

          {/* Soft left fade (so text stays readable) */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/55 via-white/15 to-transparent" />

          {/* Content */}
          <div className="relative grid min-h-[72vh] grid-cols-1 items-center sm:min-h-[78vh] md:min-h-[85vh] md:grid-cols-2 lg:min-h-[90vh]">
            {/* Left content */}
            <div className="px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16">
              <p className="hero-animate text-[11px] font-medium text-slate-700 sm:text-xs md:text-sm">
                Medibank - India&apos;s 1st Health Identity Infrastructure
              </p>

              <h1 className="hero-animate mt-4 text-[30px] font-extrabold leading-[1.08] text-wave sm:text-[38px] md:text-[50px] md:leading-[1.03] lg:text-[60px] lg:leading-[1.02]">
                Your Health
                <br />
                Identity for Life
              </h1>

              <p className="hero-animate mt-4 max-w-xl text-[13px] leading-relaxed text-slate-500 sm:mt-5 sm:text-[14px] md:text-[15px]">
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
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#4b00a3] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(75,0,163,0.28)] transition hover:opacity-95 active:scale-[0.99] sm:w-auto sm:px-6 sm:text-base"
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
