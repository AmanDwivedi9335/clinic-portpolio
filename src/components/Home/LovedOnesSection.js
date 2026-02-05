"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";

const lovedOnes = [
  {
    label: "Parents",
    image: "/images/doctorNew.png",
  },
  {
    label: "Partner",
    image: "/images/profile.jpeg",
  },
  {
    label: "Children",
    image: "/images/he.png",
  },
  {
    label: "Grandparents",
    image: "/images/she.png",
  },
];

export default function LovedOnesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
      gsap.fromTo(
        ".loved-intro",
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
        ".loved-diagram",
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".loved-diagram",
            start: "top 80%",
          },
        }
      );

      const orbitItems = gsap.utils.toArray(".loved-orbit");

      const orbitTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".loved-diagram",
          start: "top 75%",
        },
      });

      orbitTimeline
        .fromTo(
          ".loved-center",
          { scale: 0.9 },
          { scale: 1, duration: 0.45, ease: "power3.out" }
        )
        .to(
          ".loved-center",
          {
            keyframes: [
              { rotation: 2 },
              { rotation: -2 },
              { rotation: 1 },
              { rotation: -1 },
              { rotation: 0 },
            ],
            duration: 0.6,
            ease: "power1.inOut",
          },
          "<"
        )
        .fromTo(
          orbitItems,
          {
            opacity: 0,
            scale: 0.6,
            x: (index, element) => Number(element.dataset.x || 0),
            y: (index, element) => Number(element.dataset.y || 0),
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "back.out(1.6)",
            stagger: 0.12,
          },
          "-=0.25"
        );
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-8 sm:py-10 md:py-16 lg:py-20">
      <div className="loved-intro mx-auto flex max-w-5xl flex-col items-center px-1 text-center sm:px-4 md:px-8">
        <span className="rounded-full bg-[#F4ECFF] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#6B21A8]">
          For Your Loved Ones
        </span>
        <h2 className="mt-4 text-xl font-semibold text-[#6B21A8] sm:mt-5 sm:text-2xl md:text-4xl">
          Your Health Identity is Your “Protection”
        </h2>
        <p className="mt-3 max-w-3xl px-2 text-xs leading-relaxed text-[#3F2F63] sm:mt-4 sm:text-sm md:px-0 md:text-base">
          But your Family&apos;s Health Identity is you “Power”. Create linked health
          identities of your parents, your loved ones and your children so you are
          always prepared - even when they can&apos;t be
        </p>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-4xl justify-center px-1 sm:mt-10 sm:px-4 md:mt-12 md:px-8">
        <div className="loved-diagram relative h-[280px] w-full max-w-[320px] sm:h-[320px] sm:max-w-[380px] md:h-[340px] md:max-w-[420px]">
          <div className="absolute left-1/2 top-1/2 h-[170px] w-px -translate-x-1/2 -translate-y-1/2 bg-[#D9C2FF] sm:h-[190px] md:h-[210px]" />
          <div className="absolute left-1/2 top-1/2 h-px w-[170px] -translate-x-1/2 -translate-y-1/2 bg-[#D9C2FF] sm:w-[190px] md:w-[210px]" />

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <div className="loved-center relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-[0_0_30px_rgba(123,31,162,0.35)] sm:h-20 sm:w-20">
              <div className="absolute inset-[-10px] rounded-[24px] bg-[#EAD9FF] opacity-40" />
              <Image
                src="/images/ml_logo.png"
                alt="MediBank"
                width={44}
                height={44}
                className="relative h-8 w-8 object-contain sm:h-10 sm:w-10"
              />
            </div>
          </div>

          <div
            className="loved-orbit absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center gap-2"
            data-y="120"
          >
            <div className="h-12 w-12 overflow-hidden rounded-full border border-white shadow-lg sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Image
                src={lovedOnes[0].image}
                alt={lovedOnes[0].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-[11px] font-medium text-[#2D2261] sm:text-xs">
              {lovedOnes[0].label}
            </span>
          </div>

          <div
            className="loved-orbit absolute left-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2"
            data-x="120"
          >
            <div className="h-12 w-12 overflow-hidden rounded-full border border-white shadow-lg sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Image
                src={lovedOnes[1].image}
                alt={lovedOnes[1].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-[11px] font-medium text-[#2D2261] sm:text-xs">
              {lovedOnes[1].label}
            </span>
          </div>

          <div
            className="loved-orbit absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2"
            data-x="-120"
          >
            <div className="h-12 w-12 overflow-hidden rounded-full border border-white shadow-lg sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Image
                src={lovedOnes[2].image}
                alt={lovedOnes[2].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-[11px] font-medium text-[#2D2261] sm:text-xs">
              {lovedOnes[2].label}
            </span>
          </div>

          <div
            className="loved-orbit absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
            data-y="-120"
          >
            <div className="h-12 w-12 overflow-hidden rounded-full border border-white shadow-lg sm:h-14 sm:w-14 md:h-16 md:w-16">
              <Image
                src={lovedOnes[3].image}
                alt={lovedOnes[3].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-[11px] font-medium text-[#2D2261] sm:text-xs">
              {lovedOnes[3].label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
