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
        { x: -140, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
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
      className="bg-gradient-to-br from-[#5A0BA0] via-[#6B128A] to-[#1C2E9C] py-6 md:py-10 border rounded-3xl"
    >
      <div className="identity-heading mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8">
        <h2 className="text-xl font-semibold text-white md:text-3xl">
          With MediBank, your &quot;what if&quot; becomes &quot;we&apos;re ready.&quot;
        </h2>
        <p className="mt-2 text-sm text-white/80 md:text-base">
          No Missing Reports   |     No blind emergencies    |     No guesswork    |     No repeated tests
        </p>
      </div>

      <div className="identity-grid mx-auto mt-5 grid max-w-6xl grid-cols-2 gap-4 px-18 sm:grid-cols-3 md:grid-cols-4 md:gap-6 md:px-8">
        {identityItems.map((item) => (
          <div
            key={item.title}
            className="identity-card flex flex-col items-center gap-3 rounded-3xl bg-white px-4 py-5 text-center shadow-lg"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl ">
              <Image
                src={item.icon}
                alt={item.title}
                width={40}
                height={40}
                className="h-20 w-20 object-contain"
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
