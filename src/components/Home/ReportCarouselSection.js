"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "/images/doctorNew.png",
    alt: "Doctor speaking with patient",
    caption:
      "What if your ER doctor doesn't know you're allergic to penicillin?",
  },
  {
    image: "/images/doctors2.png",
    alt: "Patients waiting in a clinic",
    caption:
      "What if a new medication conflicts with something you took 5 years ago?",
  },
  {
    image: "/images/singledoctor.png",
    alt: "Doctor with a patient in a clinic",
    caption:
      "What if the one report that could save your life is missing?",
  },
  {
    image: "/images/doctorNew.png",
    alt: "Doctor reviewing notes",
    caption:
      "What if your health history is scattered across five hospitals?",
  },
  {
    image: "/images/doctors2.png",
    alt: "Clinicians discussing care",
    caption:
      "What if an emergency happens when your family can't find your records?",
  },
];

export default function ReportCarouselSection() {
  const [api, setApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateIndex = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    updateIndex();
    api.on("select", updateIndex);
    api.on("reInit", updateIndex);

    return () => {
      api.off("select", updateIndex);
      api.off("reInit", updateIndex);
    };
  }, [api]);

  return (
    <section className="bg-white py-10 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center md:px-8">
        <span className="mb-4 rounded-full bg-[#F4ECFF] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#6B21A8]">
          The Moment No One Thinks About
        </span>
        <h2 className="text-2xl font-semibold leading-snug text-[#7B1FA2] md:text-4xl">
          What if the one report that could save your life...
          <span className="block font-normal text-[#5A2D82]">
            wasn't there when you needed it?
          </span>
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-[#3F2F63] md:text-base">
          When your health history is missing, things go wrong. Not theoretically...
          Not rarely...Every. Single. Day
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-4 md:px-8">
        <Carousel
          opts={{ align: "center", loop: true }}
          setApi={setApi}
          className="relative"
        >
          <CarouselContent className="py-8">
            {slides.map((slide, index) => (
              <CarouselItem
                key={slide.caption}
                className="md:basis-2/3 lg:basis-1/2"
              >
                <div
                  className={`group relative h-72 overflow-hidden rounded-[36px] bg-[#F3F0FF] transition-all duration-500 md:h-80 ${
                    index === selectedIndex
                      ? "scale-100 opacity-100 shadow-[0_32px_70px_rgba(63,24,106,0.35)]"
                      : "scale-90 opacity-70"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    priority={index === 2}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      index === selectedIndex
                        ? "from-black/80 via-black/35"
                        : "from-black/60 via-black/25"
                    } to-transparent`}
                  />
                  <div
                    className={`absolute inset-x-6 bottom-6 rounded-2xl bg-black/35 px-4 py-3 text-center text-sm font-semibold text-white backdrop-blur-sm transition-all duration-500 md:text-base ${
                      index === selectedIndex
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-80"
                    }`}
                  >
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
