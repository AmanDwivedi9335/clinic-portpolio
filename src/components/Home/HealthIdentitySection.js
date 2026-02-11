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
  { title: "Medications", icon: "/images/promise8.png" },
  { title: "Lab reports", icon: "/images/promise9.png" },
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
        className="rounded-[80px] bg-[radial-gradient(54.48%_98.43%_at_99.17%_1.57%,_#9F028D_0%,_#070F6E_100%)] py-8 md:h-[86vh] md:max-h-[86vh] md:py-6"
      >
        <div className="identity-heading mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8">
          <GradientBadge innerClassName="bg-[#1A1D8A] px-5 text-white/95">
            The Promise
          </GradientBadge>
          <h2 className="mt-6 text-xl font-normal text-white md:text-[clamp(2rem,3.1vw,2.45rem)] ">
            With MediBank, your <span className="font-bold">&quot;what if&quot;</span> becomes
            <span className="font-bold"> &quot;we&apos;re ready&quot;</span>
          </h2>
          <p className="identity-subheading mt-6 text-sm text-white/85 md:text-[clamp(1rem,1.7vw,1.3rem)] ">
            No Missing Reports &nbsp; | &nbsp; No blind emergencies &nbsp; | &nbsp; No guesswork &nbsp; | &nbsp; No repeated tests
          </p>
        </div>

        <div className="relative mx-auto mt-10 w-full max-w-[1120px] rounded-[44px] px-6 pb-10 pt-16 sm:px-8">
          {/* Outer border */}
          <div className="pointer-events-none absolute inset-0 rounded-[44px] border border-[#BC4AE7]/55" />

          {/* subtle inner glow like reference */}
          <div className="pointer-events-none absolute inset-0 rounded-[44px] [box-shadow:inset_0_0_0_1px_rgba(188,74,231,0.15),inset_0_0_120px_rgba(188,74,231,0.10)]" />

          {/* Title sits on border with cut-out */}
          <div className="absolute left-1/2 top-0 z-30 flex -translate-x-1/2 -translate-y-1/2 items-center">
            {/* Mask plate to “cut” the border behind text */}
            <div className="absolute inset-0 -z-10 rounded-full px-6 py-3" />

            <h3 className="mx-4 shrink-0 whitespace-nowrap px-4 rounded-2xl bg-[radial-gradient(54.48%_98.43%_at_99.17%_1.57%,_#9F028D_0%,_#070F6E_100%)] text-center text-[22px] font-normal text-white ">
              Everything in One Place
            </h3>

          </div>

          {/* Grid wrapper */}
          <div className="relative z-10 flex flex-col gap-6">
            {/* Row 1: 4 cards */}
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {identityItems.slice(0, 4).map((item) => (
                <div
                  key={item.title}
                  className="group relative mt-10 flex min-h-[100px] w-[255px] flex-col items-center justify-end rounded-[26px] px-4 pb-5 pt-10 text-center"
                >
                  {/* card body with exact “purple slab” look */}
                  <div className="absolute inset-0 rounded-[26px] bg-[linear-gradient(2400deg,#9F028D_0%,#630B91_20%,#0E1896_100%)] shadow-[0_20px_40px_rgba(10,8,45,0.55)]" />

                  {/* top highlight + edge glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-[26px] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.20),0_0_0_1px_rgba(188,74,231,0.12)]" />

                  <div className="pointer-events-none absolute -inset-6 rounded-[34px] bg-[radial-gradient(circle_at_50%_10%,rgba(188,74,231,0.45)_0%,rgba(188,74,231,0.0)_65%)] opacity-40 blur-2xl" />

                  {/* Floating icon */}
                  <div className="absolute -top-12 grid h-[105px] w-[102px] place-items-center">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={106}
                      height={106}
                      className="h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.35)]"
                    />
                  </div>

                  <span className="relative z-10 text-[15px] font-medium leading-tight text-white/95 md:text-[17px]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 2: 5 cards */}
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
              {identityItems.slice(4).map((item) => (
                <div
                  key={item.title}
                  className="group relative mt-12 flex min-h-[100px] w-[185px] flex-col items-center justify-end rounded-[26px] px-4 pb-5 pt-10 text-center"
                >
                  <div className="absolute inset-0 rounded-[26px] bg-[linear-gradient(2400deg,#9F028D_0%,#630B91_20%,#0E1896_100%)] shadow-[0_20px_40px_rgba(10,8,45,0.55)]" />

                  <div className="pointer-events-none absolute inset-0 rounded-[26px] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-1px_0_rgba(0,0,0,0.20),0_0_0_1px_rgba(188,74,231,0.12)]" />

                  <div className="pointer-events-none absolute -inset-6 rounded-[34px] bg-[radial-gradient(circle_at_50%_10%,rgba(188,74,231,0.45)_0%,rgba(188,74,231,0.0)_65%)] opacity-40 blur-2xl" />

                  <div className="absolute -top-12 grid h-[92px] w-[102px] place-items-center">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={106}
                      height={106}
                      className="h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.35)]"
                    />
                  </div>

                  <span className="relative z-10 text-[15px] font-medium leading-tight text-white/95 md:text-[17px]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>


      </section>
    </div>
  );
}
