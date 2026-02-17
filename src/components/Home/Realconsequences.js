"use client";

import Image from "next/image";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GradientBadge from "../ui/GradientBadge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

const stories = [
  {
    title: "Pacemaker at 22?",
    description:
      "Her complete medical history was unavailable. A crucial report—showing that her symptoms were a medication side effect, not a heart condition—was missing because she did not carry it.",
    highlight: "MediBank prevents this.",
    image: "/images/story1.png",
  },
  {
    title: "Unconscious in ER",
    description:
      "The patient arrived with no accompanying files and no access to past diagnostics. Doctors lost precious minutes before understanding his blood group and pre-existing conditions.",
    highlight: "MediBank prevents this.",
    image: "/images/story2.png",
  },
  {
    title: "Critical allergy missed",
    description:
      "A life-threatening allergy was buried in old records at another facility. With no instant visibility, treatment decisions became risky in a critical moment.",
    highlight: "MediBank prevents this.",
    image: "/images/story1.png",
  },
];

const Realconsequences = () => {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 10000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="bg-white py-14  md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center px-4">
          <GradientBadge innerClassName="bg-white text-[#2A2FAE] border border-[#F2A400] px-6 py-1 font-semibold">
            Real Consequences
          </GradientBadge>

          <h2 className="mt-6 text-3xl md:text-5xl font-medium text-[#5A1FA8]">
            These stories happen <span className="font-bold">every day</span> in hospitals across India
          </h2>
          <p className="mt-3 text-xl md:text-4xl text-[#111D89]">How MediBank Fixes Them</p>
        </div>

        <div className="mt-12">
          <Carousel
            opts={{ align: "start", loop: true }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="pl-4 md:px-7 ">
              {stories.map((story) => (
                <CarouselItem
                  key={story.title}
                  className="basis-[95%] md:basis-[78%] lg:basis-[70%] "
                >
                  <article className="relative py-6 ml-[120px] z-10 rounded-[28px] bg-[#E8DFF3] px-6 pb-8 md:px-10 lg:pl-[340px]">
                    <div className="absolute left-1/2 top-[-5px] z-30 -translate-x-1/2 h-[220px] w-[180px] overflow-hidden rounded-[24px] md:left-8 md:h-[350px] md:w-[300px] lg:left-10">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover "
                        sizes="(max-width: 768px) 180px, 260px"
                      />
                    </div>

                    <h3 className="text-3xl font-semibold text-[#0E1463]">{story.title}</h3>
                    <p className="mt-4 max-w-2xl text-2xl leading-relaxed text-[#141B63]">
                      {story.description}
                    </p>
                    <p className="mt-8 text-2xl font-semibold text-[#5821AC]">| {story.highlight}</p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="mt-8 flex items-center justify-center gap-6 text-[#2230B4]">
            <button
              onClick={() => api?.scrollPrev()}
              className="transition hover:opacity-70"
              aria-label="Previous story"
            >
              <ArrowLeft size={24} />
            </button>

            <div className="flex items-center gap-2">
              {stories.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    current === index ? "w-6 bg-[#2230B4]" : "w-2 bg-[#8E95DC]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => api?.scrollNext()}
              className="transition hover:opacity-70"
              aria-label="Next story"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Realconsequences;
