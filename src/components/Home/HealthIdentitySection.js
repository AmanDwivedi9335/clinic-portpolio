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
        className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#0E1F83] via-[#4E0F9A] to-[#94009A] py-8 md:h-[80vh] md:max-h-[80vh] md:py-6"
      >
        <div className="identity-heading mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8">
          <GradientBadge innerClassName="bg-[#1A1D8A] px-5 text-white/95">
            The Promise
          </GradientBadge>
          <h2 className="mt-4 text-2xl font-medium text-white md:text-[clamp(2rem,3.1vw,2.45rem)] md:leading-[1.12]">
            With MediBank, your <span className="font-bold">&quot;what if&quot;</span> becomes
            <span className="font-bold"> &quot;we&apos;re ready&quot;</span>
          </h2>
          <p className="identity-subheading mt-3 text-sm text-white/85 md:text-[clamp(1rem,1.7vw,1.3rem)] md:leading-[1.2]">
            No Missing Reports | No blind emergencies | No guesswork | No repeated tests
          </p>
        </div>

        <div className="identity-grid-title relative mx-auto mt-8 w-full max-w-[1120px] rounded-[42px] border border-[#BC4AE7]/70 px-5 pb-10 pt-12 sm:px-7 md:mt-6 md:h-[calc(80vh-230px)] md:max-h-[640px] md:px-8 md:pb-6 md:pt-10">
          <h3 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-gradient-to-r from-[#101976] to-[#7D0B98] px-4 text-center text-xl font-semibold text-white md:px-6 md:text-[clamp(1.8rem,2.8vw,2.4rem)] md:leading-none">
            Everything in One Place
          </h3>

          <div className="identity-grid flex flex-col gap-4 md:h-full md:justify-between md:gap-4">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
              {identityItems.slice(0, 4).map((item) => (
                <div
                  key={item.title}
                  className="identity-card relative mt-8 flex min-h-[118px] flex-col items-center justify-end gap-2 rounded-[24px] bg-gradient-to-b from-[#9608BC] to-[#3325AF] px-4 pb-5 pt-8 text-center shadow-[0_18px_32px_rgba(20,13,86,0.35)] md:mt-8 md:min-h-[clamp(124px,16vh,152px)] md:rounded-[26px] md:pb-4 md:pt-7"
                >
                  <div className="absolute -top-11 flex h-[84px] w-[84px] items-center justify-center md:-top-11 md:h-[clamp(78px,10vh,92px)] md:w-[clamp(78px,10vh,92px)]">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-normal text-white md:text-[clamp(1.22rem,1.95vw,1.45rem)] md:leading-none md:tracking-[-0.01em]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5">
              {identityItems.slice(4).map((item) => (
                <div
                  key={item.title}
                  className="identity-card relative mt-8 flex min-h-[118px] flex-col items-center justify-end gap-2 rounded-[24px] bg-gradient-to-b from-[#9608BC] to-[#3325AF] px-4 pb-5 pt-8 text-center shadow-[0_18px_32px_rgba(20,13,86,0.35)] md:mt-8 md:min-h-[clamp(124px,16vh,152px)] md:rounded-[26px] md:pb-4 md:pt-7"
                >
                  <div className="absolute -top-11 flex h-[84px] w-[84px] items-center justify-center md:-top-11 md:h-[clamp(78px,10vh,92px)] md:w-[clamp(78px,10vh,92px)]">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-normal text-white md:text-[clamp(1.22rem,1.95vw,1.45rem)] md:leading-none md:tracking-[-0.01em]">
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
