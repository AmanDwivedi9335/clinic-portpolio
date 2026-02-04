"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";

const identityItems = [
  { title: "Past Treatments", icon: "/images/doctorNew.png" },
  { title: "Medical History", icon: "/images/stethoscope.png" },
  { title: "Doctor Notes", icon: "/images/sign_cross.png" },
  { title: "Prescriptions", icon: "/images/plus.png" },
  { title: "Allergies", icon: "/images/heart_rate.png" },
  { title: "Scans", icon: "/images/microscope.png" },
  { title: "Diagnoses", icon: "/images/hospital.png" },
  { title: "Lab reports", icon: "/images/healthResources.png" },
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
      className="bg-gradient-to-br from-[#5A0BA0] via-[#6B128A] to-[#1C2E9C] py-14 md:py-20"
    >
      <div className="identity-heading mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8">
        <h2 className="text-2xl font-semibold text-white md:text-4xl">
          With MediBank, your "what if" becomes "we're ready."
        </h2>
        <p className="mt-2 text-sm text-white/80 md:text-base">
          No Missing Reports   |     No blind emergencies    |     No guesswork    |     No repeated tests
        </p>
      </div>

      <div className="identity-grid mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 md:px-8">
        {identityItems.map((item) => (
          <div
            key={item.title}
            className="identity-card flex flex-col items-center gap-3 rounded-3xl bg-white px-4 py-5 text-center shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF0FF] shadow-inner">
              <Image
                src={item.icon}
                alt={item.title}
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </div>
            <span className="text-sm font-semibold text-[#1C2E9C]">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      <div className="identity-footer mx-auto mt-8 max-w-3xl px-4 text-center text-sm text-white/90 md:px-8 md:text-base">
        And is instantly accessible. <span className="font-semibold">With your consent.</span>{" "}
        To any doctor, in any city, at any time.
      </div>

      <div className="identity-footer mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-3 rounded-full bg-white/20 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur md:gap-6 md:text-sm">
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
