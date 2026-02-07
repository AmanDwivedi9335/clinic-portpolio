"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
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

      gsap.fromTo(
        ".doctor-question",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".doctor-questions",
            start: "top 85%",
          },
        }
      );

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
  }, []);

  return (
    <main
      ref={sectionRef}
      className="bg-white text-[#0B0F2A] pt-28 md:pt-32"
    >
      <section className="relative overflow-hidden px-6">
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-[#6D4AFF]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#282672]/10 blur-3xl" />
        <div className="doctor-hero mx-auto flex w-full max-w-6xl flex-col gap-12 rounded-[32px] border border-[#E3E0FF] bg-gradient-to-br from-[#F7F6FF] via-white to-[#F0F4FF] px-6 py-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:flex-row md:items-center md:px-12 md:py-16">
          <div className="flex-1">
            <span className="inline-flex items-center rounded-full bg-[#282672]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#282672]">
              For Doctors
            </span>
            <h1 className="mt-6 text-3xl font-semibold leading-tight text-[#121041] md:text-5xl">
              Blind consultations are dangerous consultations.
            </h1>
            <p className="mt-6 text-base text-[#3A3A5E] md:text-lg">
              Doctors are forced to guess.
            </p>
            <div className="doctor-questions mt-8 grid gap-4 md:grid-cols-2">
              {questions.map((item) => (
                <div
                  key={item}
                  className="doctor-question flex items-start gap-3 rounded-2xl border border-[#E6E3FF] bg-white/80 p-4 text-sm text-[#1F245A] shadow-sm"
                >
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#6D4AFF]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="rounded-[28px] border border-[#E3E0FF] bg-white p-8 shadow-[0_20px_50px_rgba(40,38,114,0.15)]">
              <h2 className="text-xl font-semibold text-[#282672] md:text-2xl">
                Every missing detail carries risk.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#4C4C6A] md:text-base">
                Without a complete medical history, each consultation becomes
                a puzzle. The outcome depends on assumptions instead of clear
                evidence, and patients pay the price.
              </p>
              <div className="mt-6 rounded-2xl border border-[#E6E3FF] bg-[#F7F6FF] p-4 text-sm text-[#1F245A]">
                Accurate context turns uncertainty into confident care.
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
