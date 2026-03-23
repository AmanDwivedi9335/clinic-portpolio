"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { createGsapContext } from "@/lib/gsap";
import GradientBadge from "@/components/ui/GradientBadge";

const slides = [
  {
    image: "/images/img-carousel1.webp",
    alt: "Person checking old health messages on phone",
    title: "your prescription history exists only in WhatsApp forwards?",
    description: "Scattered across 47 chats. None backed up.",
  },
  {
    image: "/images/img-carousel2.webp",
    alt: "Family and doctor discussing care",
    title: "the ER doctor doesn't know you're allergic to penicillin?",
    description: "And your family is too panicked to remember.",
  },
  {
    image: "/images/img-carousel3.webp",
    alt: "Patient and physician in consultation room",
    title: "your latest scan stays in one clinic's local system?",
    description: "And treatment is delayed while records are requested.",
  },
  {
    image: "/images/img-carousel4.webp",
    alt: "Clinician searching through scattered records",
    title: "your reports are scattered when every second matters?",
    description: "Critical decisions can't wait for file hunting.",
  },
  {
    image: "/images/img-carousel5.webp",
    alt: "Clinician searching through scattered records",
    title: "your blood group report is buried in old emails?",
    description: "Emergency care needs immediate facts, not guesses.",
  },
  {
    image: "/images/img-carousel6.webp",
    alt: "Clinician searching through scattered records",
    title: "your medical timeline is split across three hospitals?",
    description: "Fragmented records lead to repeated tests and delays.",
  },
  {
    image: "/images/img-carousel7.webp",
    alt: "Clinician searching through scattered records",
    title: "the one report that could save your life isn't available?",
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

    const handleSelect = () => setActiveIndex(api.selectedScrollSnap());
    handleSelect();
    api.on("select", handleSelect);

    return () => api.off("select", handleSelect);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const startAutoplay = () => {
      if (autoplayRef.current) return;
      autoplayRef.current = setInterval(() => {
        if (!isHoveredRef.current) api.scrollNext();
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
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
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
          scrollTrigger: { trigger: ".report-carousel", start: "top 80%" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-10 md:py-14 2xl:py-20">
      <div className="report-intro mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8 2xl:max-w-7xl">
        <GradientBadge innerClassName="bg-white text-[#141E7A]">
          The Moment No One Thinks About
        </GradientBadge>

        <h2 className="mt-4 max-w-4xl text-2xl font-medium leading-snug text-[#7B1FA2] md:text-4xl 2xl:max-w-5xl 2xl:text-5xl 2xl:leading-[1.15]">
          <span className="font-aptos-black">&apos;What if&apos;</span> the one report that could save your life...
          <span className="block text-xl font-normal text-[#111D89] md:text-3xl 2xl:mt-2 2xl:text-4xl">
            wasn&apos;t there when you needed it?
          </span>
        </h2>
      </div>

      <div className="report-carousel mx-auto mt-7 w-full max-w-5xl px-3 md:px-8 xl:max-w-6xl 2xl:mt-10 2xl:max-w-[92rem]">
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
          <CarouselContent className="py-3">
            {slides.map((slide, index) => (
              <CarouselItem
                key={`${slide.title}-${index}`}
                // No sm: — only base, md, lg, xl. Desktop stays 1/3 (lg+).
                className="basis-[86%] md:basis-[52%] lg:basis-1/3 xl:basis-1/3 2xl:basis-[31%]"
              >
                <article
                  className={[
                    "group relative flex flex-col rounded-[32px] border-2 border-[#BFC0E4] bg-[#D9C6E3] p-2 2xl:rounded-[36px] 2xl:p-3",
                    // Responsive height without sm:
                    "h-[clamp(340px,62vh,400px)] 2xl:h-[clamp(420px,44vh,520px)]",
                    activeIndex === index
                      ? "scale-[1.01] opacity-100 hover:border-[#C22ECC] hover:cursor-move hover:shadow-[0_14px_30px_rgba(194,46,204,0.2)]"
                      : "scale-[0.97] opacity-85",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "relative overflow-hidden rounded-[32px] transition-[height] duration-300 ease-out 2xl:rounded-[34px]",
                      // image block scales on small screens:
                      "h-[clamp(200px,36vh,250px)] 2xl:h-[clamp(250px,28vh,320px)]",
                      activeIndex === index ? "lg:group-hover:h-[245px] 2xl:group-hover:h-[310px]" : "",
                    ].join(" ")}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                       // no sm in sizes either
                      sizes="(min-width: 1536px) 29vw, (min-width: 1280px) 31vw, (min-width: 1024px) 33vw, (min-width: 768px) 52vw, 86vw"
                      priority={index === 0}
                    />
                  </div>

                  <div
                    className={[
                      "flex flex-1 flex-col px-5 pb-5 pt-4 2xl:px-6 2xl:pb-6 2xl:pt-5",
                      "transition-[padding,transform] duration-300 ease-out",
                      activeIndex === index ? "lg:group-hover:translate-y-[1px]" : "",
                    ].join(" ")}
                  >
                    <h3 className="text-[clamp(18px,1vw,25px)] font-aptos-black leading-[1.2] tracking-[-0.02em] text-[#252B7F] 2xl:text-[clamp(24px,1.15vw,34px)]">
                      What if &nbsp;
                      <span className="text-[clamp(18px,1vw,25px)] font-medium leading-[1.2] tracking-[-0.02em] text-[#282672] 2xl:text-[clamp(24px,1.15vw,34px)]">
                        {slide.title}
                      </span>
                    </h3>
                    <p className="mt-2 text-[clamp(14px,0.7vw,18px)] font-semibold text-[#282672] 2xl:text-[clamp(17px,0.8vw,22px)]">
                      {slide.description}
                    </p>
                  </div>

                  <p className="sr-only">{slide.title}</p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-5 flex items-center justify-center gap-4 text-[#2230B4] md:mt-8 md:gap-6">
          <button
            type="button"
            onClick={() => api?.scrollPrev()}
            className="transition hover:opacity-70"
            aria-label="Previous report"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <span
                key={`report-indicator-${index}`}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index ? "w-6 bg-[#2230B4]" : "w-2 bg-[#8E95DC]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => api?.scrollNext()}
            className="transition hover:opacity-70"
            aria-label="Next report"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}