"use client";

import Image from "next/image";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GradientBadge from "../ui/GradientBadge";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

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
  const [api, setApi] = React.useState(null);
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => api.off("select", onSelect);
  }, [api]);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => api.scrollNext(), 10000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    // ✅ REMOVE overflow-hidden so the top-floating image is not clipped
    <section className="bg-white py-10 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center px-4">
          <GradientBadge innerClassName="bg-white text-[#2A2FAE] border border-[#F2A400] px-6 py-1 font-semibold">
            Real Consequences
          </GradientBadge>

          <h2
            className="
              mt-4 md:mt-6
              text-2xl md:text-4xl
              font-extrabold
              bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
              bg-clip-text
              text-transparent
            "
          >
            These stories happen <span className="font-aptos-black">every day</span> in hospitals across India
          </h2>

          <p className="mt-2 text-base md:mt-3 md:text-xl text-[#111D89]">How MediBank Fixes Them</p>
        </div>

        <div className="mt-12 md:mt-12">
          <Carousel
            opts={{ align: "center", loop: true }}
            setApi={setApi}
            className="w-full overflow-visible [&>div]:overflow-visible [&>div>div]:overflow-visible"
          >
            <CarouselContent className="px-4 md:px-7 overflow-visible">
              {stories.map((story) => (
                <CarouselItem key={story.title} className="basis-[88%] md:basis-[78%] lg:basis-[70%] overflow-visible">
                  <article className="relative overflow-visible ml-0 rounded-[28px] bg-[#E8DFF3] px-4 pb-6 pt-20 text-center md:ml-[120px] md:px-10 md:pb-8 md:pt-8 md:text-left lg:pl-[340px]">
                    <div className="absolute left-1/2 top-[-34px] z-30 -translate-x-1/2 h-[108px] w-[108px] rounded-[18px] overflow-hidden md:left-[-40px] md:top-[-45px] md:translate-x-0 md:h-[250px] md:w-[250px] md:rounded-[24px]">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        sizes="(max-width: 768px) 108px, 250px"
                        className="object-cover object-top"
                      />
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-[#0E1463]">{story.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#141B63] md:max-w-2xl md:text-xl md:leading-relaxed">
                      {story.description}
                    </p>
                    <p className="mt-4 text-base font-semibold text-[#5821AC] md:mt-8 md:text-2xl">| {story.highlight}</p>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>


          <div className="mt-5 md:mt-8 flex items-center justify-center gap-4 md:gap-6 text-[#2230B4]">
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
