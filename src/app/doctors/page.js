"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createGsapContext } from "@/lib/gsap";

const questions = [
  "Was this condition chronic?",
  "What meds were used before?",
  "Any allergies?",
  "Any interactions?",
  "What tests were already done?",
];

const benefits = [
  "You see the whole patient, not fragments.",
  "A full picture of every patient",
  "Better-informed decisions",
  "Higher patient trust",
  "Fewer repeated tests",
  "Reduced liability",
  "Time saved in every consultation",
];

export default function DoctorsPage() {
  const sectionRef = useRef(null);
  const questionRefs = useRef([]);
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    const hoverCleanups = [];

    const cleanupGsap = createGsapContext(sectionRef, (gsap) => {
      gsap.fromTo(
        ".doctor-hero",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".doctor-hero",
            start: "top 80%",
          },
        }
      );

      questionRefs.current.forEach((question, index) => {
        if (!question) return;

        gsap.fromTo(
          question,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: question,
              start: "top 80%",
            },
          }
        );

        gsap.to(question, {
          scrollTrigger: {
            trigger: question,
            start: "top 70%",
            end: "bottom 30%",
            onEnter: () => setActiveQuestion(index),
            onEnterBack: () => setActiveQuestion(index),
          },
        });
      });

      const hoverTargets = gsap.utils.toArray(".doctor-hover");
      hoverTargets.forEach((target) => {
        const enter = () => {
          gsap.to(target, {
            y: -6,
            color: "#6D4AFF",
            duration: 0.3,
            ease: "power2.out",
          });
        };
        const leave = () => {
          gsap.to(target, {
            y: 0,
            color: "#3A3A5E",
            duration: 0.3,
            ease: "power2.out",
          });
        };

        target.addEventListener("mouseenter", enter);
        target.addEventListener("mouseleave", leave);
        hoverCleanups.push(() => {
          target.removeEventListener("mouseenter", enter);
          target.removeEventListener("mouseleave", leave);
        });
      });

      gsap.fromTo(
        ".doctor-panel",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".doctor-benefits",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".doctor-benefit",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".doctor-benefits-grid",
            start: "top 85%",
          },
        }
      );
    });

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      cleanupGsap();
    };
  }, []);

  return (
    <main
      ref={sectionRef}
      className="bg-white text-[#0B0F2A] pt-28 md:pt-32"
    >
      <section className="relative overflow-hidden px-6">
        {/* outer soft glows */}
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full" />

        <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[32px] border border-[#E3E0FF] bg-[#6D4AFF] shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          {/* inner gradient wash */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-[#F0F4FF]/80" />

          <div className="relative z-10 flex flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between md:gap-16 md:px-12 md:py-16">
            {/* LEFT */}
            <div className="flex-1">
              <span className="inline-flex items-center rounded-full bg-[#282672]/10 px-4 py-1 text-sm font-semibold tracking-[0.3em] text-[#3A3A5E]">
                Doctors are forced to guess!
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-[#121041] md:text-6xl">
                Blind consultations
                <br />
                are dangerous
                <br />
                consultations.
              </h1>

              
            </div>

            {/* RIGHT (PILL like screenshot) */}
            <div className="relative flex-1">
              <div className="relative ml-auto h-[50vh] w-full max-w-[520px] overflow-hidden">
                <Image
                  src="/images/vectorfordoctor.png"
                  alt="vectorfordoctor"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="doctor-benefits relative px-6 py-16 md:py-20">
        <div className="doctor-panel mx-auto w-full max-w-6xl rounded-[32px] border border-[#E3E0FF] bg-white px-6 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:px-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <span className="inline-flex items-center rounded-full bg-[#6D4AFF]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#6D4AFF]">
                MediBank Advantage
              </span>
              <h2 className="mt-6 text-3xl font-semibold text-[#121041] md:text-4xl">
                MediBank eliminates uncertainty.
              </h2>
              <p className="mt-4 text-base text-[#3A3A5E] md:text-lg">
                You see the whole patient, not fragments.
              </p>
            </div>
            <div className="rounded-2xl border border-[#E6E3FF] bg-gradient-to-br from-[#F7F6FF] to-white px-6 py-5 text-sm text-[#4C4C6A] shadow-sm">
              A unified, longitudinal record gives every consultation the
              clarity it deserves.
            </div>
          </div>
          <div className="doctor-benefits-grid mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <div
                key={item}
                className="doctor-benefit flex h-full items-start gap-3 rounded-2xl border border-[#E6E3FF] bg-white p-5 text-sm text-[#1F245A] shadow-sm"
              >
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#282672]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
