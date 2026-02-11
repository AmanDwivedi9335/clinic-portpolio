"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";
import GradientBadge from "@/components/ui/GradientBadge";

const identityItems = [
  { title: "Past Treatments", icon: "/images/promise1.png" },
  { title: "Medical History", icon: "/images/promise2.png" },
  { title: "Doctor Notes", icon: "/images/promise3.png" },
  { title: "Prescriptions", icon: "/images/promise4.png" },
  { title: "Allergies", icon: "/images/promise5.png" },
  { title: "Scans", icon: "/images/promise6.png" },
  { title: "Diagnoses", icon: "/images/promise7.png" },
  { title: "Medications", icon: "/images/promise9.png" },
  { title: "Lab reports", icon: "/images/promise8.png" },
];

export default function HealthIdentitySection() {
  const pinWrapRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    return createGsapContext(pinWrapRef, (gsap) => {
      const cards = gsap.utils.toArray(".identity-card");

      gsap.set(cards, {
        opacity: 0,
        y: 42,
        scale: 0.94,
      });

      gsap.set([".identity-heading", ".identity-subheading", ".identity-grid-title"], {
        opacity: 1,
      });

      const revealTimeline = gsap.timeline({
        defaults: {
          duration: 0.7,
          ease: "power2.out",
        },
        scrollTrigger: {
          trigger: pinWrapRef.current,
          start: "top top+=88",
          end: `+=${Math.max(cards.length * 170, 1280)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        revealTimeline.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
          },
          index === 0 ? 0 : ">-0.1"
        );
      });
    });
  }, []);

  return (
    <div ref={pinWrapRef} className="relative">
      <section
        ref={sectionRef}
        className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0E1F83] via-[#4E0F9A] to-[#94009A] py-8 md:py-12"
      >
        <div className="identity-heading mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8">
          <GradientBadge innerClassName="bg-[#1A1D8A] px-5 text-white/95">
            The Promise
          </GradientBadge>
          <h2 className="mt-4 text-2xl font-medium text-white md:text-[40px] md:leading-[1.15]">
            With MediBank, your <span className="font-bold">&quot;what if&quot;</span> becomes
            <span className="font-bold"> &quot;we&apos;re ready&quot;</span>
          </h2>
          <p className="identity-subheading mt-3 text-sm text-white/85 md:text-[22px] md:leading-[1.25]">
            No Missing Reports | No blind emergencies | No guesswork | No repeated tests
          </p>
        </div>

        <h3 className="identity-grid-title mx-auto mt-8 w-fit bg-transparent px-4 text-center text-xl font-semibold text-white md:mt-10 md:text-[34px]">
          Everything in One Place
        </h3>

        <div className="mx-auto mt-5 max-w-6xl rounded-[42px] border border-[#BC4AE7]/70 px-5 py-8 sm:px-7 md:mt-8 md:px-12">
          <div className="identity-grid flex flex-col gap-4 md:gap-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
              {identityItems.slice(0, 4).map((item) => (
                <div
                  key={item.title}
                  className="identity-card flex flex-col items-center gap-3 rounded-[24px] bg-gradient-to-b from-[#8E0CB4] to-[#3A2BBC] px-4 py-5 text-center shadow-[0_18px_32px_rgba(20,13,86,0.35)]"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl md:h-24 md:w-24">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-white md:text-[20px]">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
              {identityItems.slice(4).map((item) => (
                <div
                  key={item.title}
                  className="identity-card flex flex-col items-center gap-3 rounded-[24px] bg-gradient-to-b from-[#8E0CB4] to-[#3A2BBC] px-4 py-5 text-center shadow-[0_18px_32px_rgba(20,13,86,0.35)]"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl md:h-24 md:w-24">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-white md:text-[20px]">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
