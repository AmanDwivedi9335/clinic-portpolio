"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";

const identityItems = [
  { title: "Past Treatments", icon: "/images/labtest.png" },
  { title: "Medical History", icon: "/images/stethoscope.png" },
  { title: "Doctor Notes", icon: "/images/doctornotes.png" },
  { title: "Prescriptions", icon: "/images/prescription.png" },
  { title: "Allergies", icon: "/images/allergies.png" },
  { title: "Scans", icon: "/images/scans.png" },
  { title: "Diagnoses", icon: "/images/diagnosis.png" },
  { title: "Lab reports", icon: "/images/labreport.png" },
];

export default function HealthIdentitySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
      gsap.fromTo(
        ".identity-heading",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".identity-card",
        { y: 30, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".identity-grid",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".identity-footer",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".identity-grid",
            start: "top 70%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="rounded-3xl border bg-gradient-to-br from-[#5A0BA0] via-[#6B128A] to-[#1C2E9C] px-3 py-6 sm:px-4 md:px-6 md:py-10"
    >
      <div className="identity-heading mx-auto flex max-w-6xl flex-col items-center px-1 text-center sm:px-3 md:px-8">
        <h2 className="text-lg font-semibold text-white sm:text-xl md:text-3xl">
          With MediBank, your &quot;what if&quot; becomes &quot;we&apos;re ready.&quot;
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm md:text-base">
          No Missing Reports   |     No blind emergencies    |     No guesswork    |     No repeated tests
        </p>
      </div>

      <div className="identity-grid mx-auto mt-5 grid max-w-6xl grid-cols-2 gap-3 px-1 sm:grid-cols-3 sm:gap-4 sm:px-2 md:grid-cols-4 md:gap-6 md:px-4">
        {identityItems.map((item) => (
          <div
            key={item.title}
            className="identity-card flex flex-col items-center gap-2 rounded-2xl bg-white px-3 py-4 text-center shadow-lg sm:gap-3 sm:rounded-3xl sm:px-4 sm:py-5"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl sm:h-20 sm:w-20 md:h-24 md:w-24">
              <Image
                src={item.icon}
                alt={item.title}
                width={40}
                height={40}
                className="h-12 w-12 object-contain sm:h-16 sm:w-16 md:h-20 md:w-20"
              />
            </div>
            <span className="text-xs font-semibold text-[#1C2E9C] sm:text-sm">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      <div className="identity-footer mx-auto mt-7 max-w-3xl px-2 text-center text-xs leading-relaxed text-white/90 sm:px-4 sm:text-sm md:px-8 md:text-base">
        And is instantly accessible. <span className="font-semibold">With your consent.</span>{" "}
        To any doctor, in any city, at any time.
      </div>

      <div className="identity-footer mx-auto mt-5 flex max-w-3xl flex-wrap items-center justify-center gap-2 rounded-3xl bg-white/20 px-3 py-3 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur sm:gap-3 sm:rounded-full sm:px-4 sm:text-xs md:gap-6 md:text-sm">
        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7A45] text-white">
            ✕
          </span>
          Not a storage app
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7A45] text-white">
            ✕
          </span>
          Not an EMR
        </span>
        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF7A45] text-white">
            ✕
          </span>
          Not a file locker
        </span>
      </div>
    </section>
  );
}
