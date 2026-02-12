"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { createGsapContext } from "@/lib/gsap";
import GradientBadge from "@/components/ui/GradientBadge";

const slides = [
  {
    image: "/images/img-carousel1.png",
    alt: "Person checking old health messages on phone",
    title: "What if your prescription history exists only in WhatsApp forwards?",
    description: "Scattered across 47 chats. None backed up.",
  },
  {
    image: "/images/img-carousel2.png",
    alt: "Family and doctor discussing care",
    title: "What if the ER doctor doesn't know you're allergic to penicillin?",
    description: "And your family is too panicked to remember.",
  },
  {
    image: "/images/img-carousel3.png",
    alt: "Patient and physician in consultation room",
    title: "What if your latest scan stays in one clinic's local system?",
    description: "And treatment is delayed while records are requested.",
  },
  {
    image: "/images/img-carousel4.png",
    alt: "Clinician searching through scattered records",
    title: "What if your reports are scattered when every second matters?",
    description: "Critical decisions can't wait for file hunting.",
  },
  {
    image: "/images/img-carousel5.png",
    alt: "Clinician searching through scattered records",
    title: "What if your blood group report is buried in old emails?",
    description: "Emergency care needs immediate facts, not guesses.",
  },
  {
    image: "/images/img-carousel6.png",
    alt: "Clinician searching through scattered records",
    title: "What if your medical timeline is split across three hospitals?",
    description: "Fragmented records lead to repeated tests and delays.",
  },
  {
    image: "/images/img-carousel7.png",
    alt: "Clinician searching through scattered records",
    title: "What if the one report that could save your life isn't available?",
    description: "A missing document can change everything.",
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

    return () => api.off("select", handleSelect);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const startAutoplay = () => {
      if (autoplayRef.current) return;
      autoplayRef.current = setInterval(() => {
        if (!isHoveredRef.current) {
          api.scrollNext();
        }
      }, 3500);
    };

    const stopAutoplay = () => {
      if (!autoplayRef.current) return;
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };

    startAutoplay();

    return () => stopAutoplay();
  }, [api]);

  useEffect(() => {
    return createGsapContext(sectionRef, (gsap) => {
      gsap.fromTo(
        ".report-intro",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".report-carousel",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".report-carousel",
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-10 md:py-14">
      <div className="report-intro mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8">
        <GradientBadge innerClassName="bg-white text-[#141E7A]">
          The Moment No One Thinks About
        </GradientBadge>

        <h2 className="text-2xl mt-4 font-semibold leading-snug text-[#7B1FA2] md:text-4xl">
          What if the one report that could save your life...
          <span className="block font-normal text-[#5A2D82]">
            wasn&apos;t there when you needed it?
          </span>
        </h2>
      </div>

      <div className="report-carousel mx-auto mt-7 max-w-6xl px-2 sm:px-4 md:px-8">
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
          <CarouselContent className="py-3 md:py-3">
            {slides.map((slide, index) => (
              <CarouselItem key={`${slide.title}-${index}`} className="basis-[75%] sm:basis-[42%] lg:basis-1/3">
                <article
                  className={`report-slide group relative flex h-full min-h-[500px] flex-col rounded-[32px] border-2 border-[#BFC0E4] bg-[#D9C6E3] p-2 shadow-[0_10px_26px_rgba(63,55,109,0.12)] transition duration-300 hover:border-[#2A37BB] hover:shadow-[0_14px_30px_rgba(42,55,187,0.16)] ${
                    activeIndex === index
                      ? "scale-[1.01] opacity-100"
                      : "scale-[0.97] opacity-85"
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[32px]">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 47vw, 84vw"
                      priority={index === 0}
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
                    <h3 className="text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#252B7F]">
                      {slide.title}
                    </h3>
                    <p className="mt-4 text-[20px] leading-[1.3] text-[#0A1C77]">
                      {slide.description}
                    </p>
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-[30px] bg-[#C22ECC] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="sr-only">
                    {slide.title}
                  </p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
