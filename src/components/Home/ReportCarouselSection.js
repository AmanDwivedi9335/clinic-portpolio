"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { createGsapContext } from "@/lib/gsap";

const slides = [
  {
    image: "/images/panivpenicillin.png",
    alt: "Doctor speaking with patient",
    caption:
      "What if your ER doctor doesn't know you're allergic to penicillin?",
  },
  {
    image: "/images/newmedication.png",
    alt: "Patients waiting in a clinic",
    caption:
      "What if a new medication conflicts with something you took 5 years ago?",
  },
  {
    image: "/images/reportmissing.png",
    alt: "Doctor with a patient in a clinic",
    caption:
      "What if the one report that could save your life is missing?",
  },
  {
    image: "/images/reportscaterred.png",
    alt: "Doctor reviewing notes",
    caption:
      "What if your health history is scattered across five hospitals?",
  },
  {
    image: "/images/reportscaterred.png",
    alt: "Clinicians discussing care",
    caption:
      "What if an emergency happens when your family can't find your records?",
  },
];

export default function ReportCarouselSection() {
  const [api, setApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);
  const isHoveredRef = useRef(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    handleSelect();
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const startAutoplay = () => {
      if (autoplayRef.current) return;
      autoplayRef.current = setInterval(() => {
        if (!isHoveredRef.current) {
          api.scrollNext();
        }
      }, 4000);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    startAutoplay();

    return () => {
      stopAutoplay();
    };
  }, [api]);

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
      gsap.fromTo(
        ".report-intro",
        { y: 28, opacity: 0 },
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
        ".report-carousel",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".report-carousel",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".report-slide",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".report-carousel",
            start: "top 75%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-8 sm:py-10 md:py-14">
      <div className="report-intro mx-auto flex max-w-6xl flex-col items-center px-1 text-center sm:px-2 md:px-4">
        <span className="mb-4 rounded-full bg-[#F4ECFF] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#6B21A8]">
          The Moment No One Thinks About
        </span>
        <h2 className="text-xl font-semibold leading-snug text-[#7B1FA2] sm:text-2xl md:text-4xl">
          What if the one report that could save your life...
          <span className="block font-normal text-[#5A2D82]">
            wasn&apos;t there when you needed it?
          </span>
        </h2>
        <p className="mt-3 max-w-3xl px-2 text-xs text-[#3F2F63] sm:mt-4 sm:text-sm md:px-0 md:text-base">
          When your health history is missing, things go wrong. Not theoretically...
          Not rarely...Every. Single. Day
        </p>
      </div>

      <div className="report-carousel mx-auto mt-8 max-w-6xl px-0 sm:px-2 md:mt-10 md:px-4">
        <Carousel
          opts={{ align: "center", loop: true }}
          setApi={setApi}
          className="relative"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
        >
          <CarouselContent className="py-6">
            {slides.map((slide, index) => (
              <CarouselItem
                key={slide.caption}
                className="report-slide basis-[92%] px-2 sm:basis-[78%] md:basis-[62%] lg:basis-[40%]"
              >
                <div
                  className={`group relative aspect-[16/10] overflow-hidden rounded-[24px] bg-[#F3F0FF] text-left shadow-lg transition-all duration-500 ease-in-out will-change-transform transform-gpu focus-within:ring-2 focus-within:ring-[#7B1FA2] focus-within:ring-offset-2 ${
                    activeIndex === index
                      ? "scale-[1.02] opacity-100 brightness-110 contrast-110 shadow-2xl md:scale-110"
                      : "scale-[0.94] opacity-75 saturate-75 md:scale-90 md:blur-[2px]"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className={`object-cover transition-transform duration-500 ease-in-out will-change-transform transform-gpu ${
                      activeIndex === index ? "scale-105" : "scale-100"
                    }`}
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 100vw"
                    priority={index === 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 text-center text-sm font-semibold text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.55)] sm:inset-x-5 sm:bottom-5 sm:text-base md:text-lg">
                    {slide.caption}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
