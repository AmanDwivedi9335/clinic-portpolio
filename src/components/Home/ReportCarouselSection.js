"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { createGsapContext } from "@/lib/gsap";

const slides = [
  {
    image: "/images/panivpenicillin.png",
    alt: "Person checking old health messages on phone",
    caption: "What if... your medical history is stuck in a WhatsApp screenshot from 2021?",
  },
  {
    image: "/images/reportmissing.png",
    alt: "Family and doctor discussing care",
    caption: "What if... you arrive unconscious and no one knows your blood group or allergies?",
  },
  {
    image: "/images/newmedication.png",
    alt: "Patient and physician in consultation room",
    caption: "What if... you arrive unconscious and no one knows your blood group or allergies?",
  },
  {
    image: "/images/reportscaterred.png",
    alt: "Clinician searching through scattered records",
    caption: "What if... your reports are scattered when every second matters?",
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
        <span className="inline-flex rounded-full bg-gradient-to-r from-amber-400 via-pink-400 to-indigo-500 p-[2px]">
          <span className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1 text-[12px] font-semibold tracking-wide text-[#141E7A]">
            The Moment No One Thinks About
          </span>
        </span>

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
              <CarouselItem key={`${slide.caption}-${index}`} className="basis-[75%] sm:basis-[42%] lg:basis-1/3">
                <article
                  className={`report-slide group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#E8E2F6] shadow-md transition duration-300 will-change-transform ${
                    activeIndex === index
                      ? "scale-[1.01] opacity-100"
                      : "scale-[0.97] opacity-85"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 47vw, 84vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#7D1EA1]/95 via-[#7D1EA1]/65 to-transparent transition duration-300 md:opacity-0 md:group-hover:opacity-100" />
                  <p className="absolute inset-x-4 bottom-4 text-sm leading-snug text-white transition duration-300 md:inset-x-5 md:bottom-5 md:text-base md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                    {slide.caption}
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
