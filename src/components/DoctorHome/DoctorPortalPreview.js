"use client";

import Image from "next/image";
import { useState } from "react";

const previewSlides = [
  {
    badge: "Basic Plan",
    title: "Follow-Up Appointments Dashboard",
    subtitle: "Centralized view of patient visits with real-time status tracking",
    description:
      "A clean, structured doctor dashboard displaying scheduled appointments, follow-ups, patient details (MID, date, time, reason, type), and color-coded status indicators (Past Due, Upcoming, Completed) to streamline daily consultation management.",
    image: "/images/doctors2.png",
  },
  {
    badge: "Pro Plan",
    title: "Follow-Up Appointments Dashboard",
    subtitle: "Advanced appointment intelligence for high-efficiency practices",
    description:
      "An exclusive Pro feature providing a centralized, real-time view of scheduled and follow-up appointments with patient details (MID, date, time, reason, type) and color-coded status indicators (Past Due, Upcoming, Completed) to help doctors manage consultations with precision and speed.",
    image: "/images/doctorNew.png",
  },
];

export default function DoctorPortalPreview() {
  const [activeSlide, setActiveSlide] = useState(0);

  const goToNext = () => {
    setActiveSlide((prev) => (prev + 1) % previewSlides.length);
  };

  const goToPrevious = () => {
    setActiveSlide((prev) => (prev - 1 + previewSlides.length) % previewSlides.length);
  };

  const currentSlide = previewSlides[activeSlide];

  return (
    <section className="pb-16 pt-8 md:pt-14">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto w-fit rounded-full border border-[#7f5af0] bg-white px-6 py-1 text-xs font-semibold text-[#282672]">
          Doctor Portal Preview
        </div>

        <h2 className="mt-5 text-center text-3xl font-extrabold leading-tight text-wave md:text-6xl">
          Built for Doctors. Designed for Clinical Clarity.
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-base text-[#2c277e] md:text-3xl">
          MediBank isn&apos;t another software dashboard.
          <br className="hidden md:block" />
          It&apos;s a clinical decision-support system built around real consultation workflows.
        </p>

        <div className="mt-10 grid items-center gap-8 rounded-[34px] border border-[#ece6ff] bg-[#f8f7ff] p-6 shadow-[0_12px_30px_rgba(43,22,125,0.08)] md:grid-cols-[0.9fr_1.6fr] md:p-10">
          <div>
            <div className="w-fit rounded-full border border-[#5946d2] bg-white px-4 py-1 text-xs font-semibold text-[#3d2b9e]">
              {currentSlide.badge}
            </div>
            <h3 className="mt-4 text-4xl font-bold leading-tight text-[#6611a8] md:text-[48px]">
              {currentSlide.title}
            </h3>
            <p className="mt-2 text-2xl text-[#7b26b3] md:text-3xl">{currentSlide.subtitle}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#1a1f73] md:text-lg">
              {currentSlide.description}
            </p>

            <div className="mt-7 flex items-center gap-6">
              <div className="flex items-center gap-2">
                {previewSlides.map((slide, index) => (
                  <button
                    key={slide.badge}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeSlide ? "w-9 bg-[#8e12b7]" : "w-5 bg-[#d3b6e6]"
                    }`}
                    aria-label={`Go to ${slide.badge} slide`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous preview"
                className="text-4xl font-light text-[#6d1cb3] transition hover:-translate-x-0.5"
              >
                ←
              </button>
              <button
                type="button"
                onClick={goToNext}
                aria-label="Next preview"
                className="text-4xl font-light text-[#6d1cb3] transition hover:translate-x-0.5"
              >
                →
              </button>
            </div>

            <a
              href="/doctors"
              className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-[#620ea4] to-[#8c25c6] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(102,17,168,0.35)]"
            >
              Explore Doctor Portal
            </a>
          </div>

          <div className="relative h-[260px] overflow-hidden rounded-[22px] border border-[#e9e3fb] bg-white md:h-[420px]">
            <Image
              src={currentSlide.image}
              alt={`${currentSlide.badge} portal preview`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover object-left transition-all duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
