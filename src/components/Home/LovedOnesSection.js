"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";
import GradientBadge from "@/components/ui/GradientBadge";

const lovedOnes = [
  {
    label: "Parents",
    image: "/images/grandparents.png",
  },
  {
    label: "Partner",
    image: "/images/partner.png",
  },
  {
    label: "Children",
    image: "/images/children.png",
  },
  {
    label: "Grandparents",
    image: "/images/grandparents2.png",
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
    <section ref={sectionRef} className="bg-white py-12 md:py-20">
      <div className="loved-intro mx-auto flex max-w-5xl flex-col items-center px-4 text-center md:px-8">
        <GradientBadge innerClassName="bg-white text-[#141E7A]">
          For Your Loved Ones
        </GradientBadge>
        <h2 className="mt-5 text-2xl font-normal text-[#3B1ED0] md:text-4xl">
          Your Health Identity is Your <b>“Protection”</b>
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-[#000339] md:text-base">
          But your Family&apos;s Health Identity is you “Power”. Create linked health
          identities of your parents, your loved ones and your children so you are
          always prepared - even when they can&apos;t be
        </p>

      </div>

      <div className="mx-auto mt-12 flex w-full max-w-4xl justify-center px-4 md:px-8">
        <div className="loved-diagram relative h-[340px] w-full max-w-[420px]">
          <div className="absolute left-1/2 top-1/2 h-[42px] w-px -translate-x-1/2 -translate-y-[calc(100%+30px)] bg-[#D9C2FF]" />
          <div className="absolute left-1/2 top-1/2 h-[42px] w-px -translate-x-1/2 translate-y-[30px] bg-[#D9C2FF]" />
          <div className="absolute left-1/2 top-1/2 h-px w-[58px] -translate-y-1/2 -translate-x-[calc(100%+36px)] bg-[#D9C2FF]" />
          <div className="absolute left-1/2 top-1/2 h-px w-[58px] -translate-y-1/2 translate-x-[36px] bg-[#D9C2FF]" />

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <Image
              src="/images/medibank-grd-logo.png"
              alt="MediBank"
              width={140}
              height={140}
              className="h-70 w-70 object-contain"
            />
          </div>

          <div
            className="loved-orbit absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center gap-2"
            data-y="120"
          >
            <div className="h-16 w-16 overflow-hidden">
              <Image
                src={lovedOnes[0].image}
                alt={lovedOnes[0].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-[#2D2261]">
              {lovedOnes[0].label}
            </span>
          </div>

          <div
            className="loved-orbit absolute left-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2"
            data-x="120"
          >
            <div className="h-16 w-16 overflow-hidden">
              <Image
                src={lovedOnes[1].image}
                alt={lovedOnes[1].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-[#2D2261]">
              {lovedOnes[1].label}
            </span>
          </div>

          <div
            className="loved-orbit absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2"
            data-x="-120"
          >
            <div className="h-16 w-16 overflow-hidden">
              <Image
                src={lovedOnes[2].image}
                alt={lovedOnes[2].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-[#2D2261]">
              {lovedOnes[2].label}
            </span>
          </div>

          <div
            className="loved-orbit absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
            data-y="-120"
          >
            <div className="h-16 w-16 overflow-hidden">
              <Image
                src={lovedOnes[3].image}
                alt={lovedOnes[3].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-[#2D2261]">
              {lovedOnes[3].label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
