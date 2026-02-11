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
    caption: "What if... your medical history is stuck in a WhatsApp screenshot from 2021?",
  },
  {
    image: "/images/img-carousel2.png",
    alt: "Family and doctor discussing care",
    caption: "What if... you arrive unconscious and no one knows your blood group or allergies?",
  },
  {
    image: "/images/img-carousel3.png",
    alt: "Patient and physician in consultation room",
    caption: "What if... you arrive unconscious and no one knows your blood group or allergies?",
  },
  {
    image: "/images/img-carousel4.png",
    alt: "Clinician searching through scattered records",
    caption: "What if... your reports are scattered when every second matters?",
  },
  {
    image: "/images/img-carousel5.png",
    alt: "Clinician searching through scattered records",
    caption: "What if... your reports are scattered when every second matters?",
  },
  {
    image: "/images/img-carousel6.png",
    alt: "Clinician searching through scattered records",
    caption: "What if... your reports are scattered when every second matters?",
  },
  {
    image: "/images/img-carousel7.png",
    alt: "Clinician searching through scattered records",
    caption: "What if... your reports are scattered when every second matters?",
  },
];

export default function ReportCarouselSection() {
  const [api, setApi] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [typedCaption, setTypedCaption] = useState("");
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
    if (hoveredIndex === null) {
      setTypedCaption("");
      return;
    }

    const text = slides[hoveredIndex]?.caption ?? "";
    let charIndex = 0;
    setTypedCaption("");

    const typingInterval = setInterval(() => {
      charIndex += 1;
      setTypedCaption(text.slice(0, charIndex));

      if (charIndex >= text.length) {
        clearInterval(typingInterval);
      }
    }, 24);

    return () => clearInterval(typingInterval);
  }, [hoveredIndex]);

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
              <CarouselItem key={`${slide.caption}-${index}`} className="basis-[75%] sm:basis-[42%] lg:basis-1/3">
                <article
                  className={`report-slide group relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#E8E2F6] shadow-md transition duration-300 will-change-transform ${
                    activeIndex === index
                      ? "scale-[1.01] opacity-100"
                      : "scale-[0.97] opacity-85"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 47vw, 84vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#7D1EA1]/95 via-[#7D1EA1]/70 to-transparent" />
                  <p className="absolute inset-x-4 bottom-4 text-sm leading-snug text-white md:inset-x-5 md:bottom-5 md:text-base">
                    {slide.caption}
                  </p>

                  <div
                    className={`pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#7D1EA1]/98 via-[#7D1EA1]/82 to-[#7D1EA1]/20 px-5 text-center transition-all duration-500 ${
                      hoveredIndex === index
                        ? "translate-y-0 opacity-100"
                        : "translate-y-12 opacity-0"
                    }`}
                  >
                    <p className="max-w-[90%] text-base font-medium leading-snug text-white md:text-lg">
                      {hoveredIndex === index ? typedCaption : ""}
                      {hoveredIndex === index && typedCaption.length < slide.caption.length ? (
                        <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-white align-middle" />
                      ) : null}
                    </p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
