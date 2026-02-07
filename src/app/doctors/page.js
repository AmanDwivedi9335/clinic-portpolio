"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { createGsapContext } from "@/lib/gsap";

const questions = [
  {
    text: "Was this condition chronic?",
    detail: "Timeline hint: previous episodes noted, missing dates.",
  },
  {
    text: "What meds were used before?",
    detail: "History hint: last Rx list unavailable in chart.",
  },
  {
    text: "Any allergies?",
    detail: "Risk hint: allergy list not confirmed yet.",
  },
  {
    text: "Any interactions?",
    detail: "Safety hint: interaction checks incomplete.",
  },
  {
    text: "What tests were already done?",
    detail: "Lab hint: prior results not linked.",
  },
];

const benefits = [
  "A full picture of every patient",
  "Better-informed decisions",
  "Higher patient trust",
  "Fewer repeated tests",
  "Reduced liability",
  "Time saved in every consultation",
];

const progressSteps = [
  "Uncertainty",
  "Questions",
  "Transition",
  "Clarity",
];

const splitText = (text) =>
  text.split("").map((char, index) => (
    <span
      key={`${char}-${index}`}
      className="shatter-letter inline-block"
      aria-hidden="true"
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

export default function DoctorsPage() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const cleanup = createGsapContext(sectionRef, (gsap) => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            ".intro-line",
            ".chip",
            ".doctor-visual",
            ".benefit-card",
            ".panel-card",
            ".shatter-line",
            ".second-line",
          ],
          { opacity: 1, y: 0, x: 0, filter: "none" }
        );
        gsap.set(".scanline", { opacity: 0.15 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isDesktop } = context.conditions;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: isDesktop ? "+=160%" : "+=120%",
              scrub: 0.8,
              pin: isDesktop,
              onUpdate: (self) => {
                const stepIndex = Math.min(
                  progressSteps.length - 1,
                  Math.floor(self.progress * progressSteps.length)
                );
                setActiveStep(stepIndex);
              },
            },
          });

          timelineRef.current = tl;

          tl.fromTo(
            ".intro-line",
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out" }
          )
            .fromTo(
              ".scanline",
              { opacity: 0 },
              { opacity: 0.6, duration: 0.6 },
              "<"
            )
            .fromTo(
              ".doctor-visual",
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
              "<+0.1"
            )
            .fromTo(
              ".fragment-card",
              { filter: "blur(0px)" },
              { filter: "blur(6px)", duration: 0.7, ease: "power2.out" },
              ">-0.4"
            )
            .fromTo(
              ".ghost-question",
              { opacity: 0, scale: 0.8 },
              { opacity: 0.9, scale: 1, duration: 0.5, ease: "power2.out" },
              "<+0.1"
            )
            .to(
              ".ghost-question",
              { opacity: 0, scale: 1.2, duration: 0.6, ease: "power2.out" },
              ">+0.1"
            )
            .fromTo(
              ".chip",
              {
                y: 14,
                x: () => gsap.utils.random(-8, 8),
                opacity: 0,
                rotate: () => gsap.utils.random(-6, 6),
              },
              {
                y: 0,
                x: 0,
                opacity: 1,
                rotate: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: "power2.out",
              }
            )
            .fromTo(
              ".wipe",
              { scaleX: 0, transformOrigin: "left center" },
              { scaleX: 1, duration: 0.6, ease: "power2.out" },
              ">-0.1"
            )
            .to(
              ".fragment-card",
              {
                x: () => gsap.utils.random(80, 120),
                y: () => gsap.utils.random(-40, 40),
                scale: 0.9,
                opacity: 0,
                duration: 0.7,
                ease: "power2.inOut",
                stagger: 0.1,
              },
              "<+0.1"
            )
            .fromTo(
              ".unified-card",
              { opacity: 0, scale: 0.96, filter: "blur(6px)" },
              { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8 },
              "<+0.2"
            )
            .fromTo(
              ".highlight-sweep",
              { x: "-120%", opacity: 0 },
              { x: "120%", opacity: 0.6, duration: 0.8, ease: "power2.out" },
              "<+0.2"
            )
            .fromTo(
              ".shatter-letter",
              { x: () => gsap.utils.random(-16, 16), opacity: 0 },
              { x: 0, opacity: 1, duration: 0.6, stagger: 0.02, ease: "power2.out" }
            )
            .fromTo(
              ".second-line",
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
              "<+0.1"
            )
            .fromTo(
              ".benefit-card",
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
              }
            );

          gsap.to(".scanline", {
            opacity: 0.3,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          gsap.utils.toArray(".benefit-card").forEach((card) => {
            gsap.to(card, {
              boxShadow: "0 20px 40px rgba(30, 64, 175, 0.15)",
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          });

          return () => {
            if (timelineRef.current) {
              timelineRef.current.scrollTrigger?.kill();
              timelineRef.current.kill();
              timelineRef.current = null;
            }
            mm.revert();
          };
        }
      );
    });

    return () => cleanup();
  }, [prefersReducedMotion]);

  const replayAnimation = () => {
    if (!timelineRef.current) return;
    timelineRef.current.restart(true, false);
  };

  const renderProgress = useMemo(
    () => (
      <div className="hidden lg:flex flex-col items-center gap-3">
        {progressSteps.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full border transition-all duration-300 ${
                index <= activeStep
                  ? "border-[#6D4AFF] bg-[#6D4AFF] shadow-[0_0_12px_rgba(109,74,255,0.6)]"
                  : "border-[#B7B7CC] bg-white"
              }`}
            />
            {index < progressSteps.length - 1 && (
              <span className="h-8 w-px bg-gradient-to-b from-[#B7B7CC] to-transparent" />
            )}
          </div>
        ))}
      </div>
    ),
    [activeStep]
  );

  return (
    <main ref={sectionRef} className="bg-white text-[#0B0F2A]">
      <section className="relative overflow-hidden px-6 py-24 md:py-28">
        <div className="absolute -top-40 right-0 h-72 w-72 rounded-full bg-[#6D4AFF]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#282672]/10 blur-3xl" />
        <div className="absolute inset-y-0 right-8 top-0 z-20 hidden lg:flex">
          {renderProgress}
        </div>

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3">
              <span className="intro-line inline-flex items-center rounded-full bg-[#282672]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#3A3A5E]">
                For Doctors
              </span>
              <h1 className="intro-line text-4xl font-semibold leading-tight text-[#121041] md:text-6xl">
                Blind consultations are dangerous consultations.
              </h1>
              <p className="intro-line text-lg text-[#3A3A5E] md:text-xl">
                Doctors are forced to guess.
              </p>
            </div>
            {!prefersReducedMotion && (
              <button
                type="button"
                onClick={replayAnimation}
                className="intro-line inline-flex items-center gap-2 rounded-full border border-[#DAD7FF] bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#6D4AFF] transition hover:border-[#6D4AFF] hover:bg-[#F5F3FF]"
              >
                Replay animation
              </button>
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div className="relative overflow-hidden rounded-[32px] border border-[#2B2B45] bg-[#111326] p-8 text-white shadow-[0_30px_70px_rgba(15,23,42,0.35)]">
              <div className="scanline pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.08)_45%,transparent_55%)] opacity-0" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,90,90,0.2),_transparent_55%)]" />
              <div className="relative z-10 flex flex-col gap-6">
                <p className="intro-line text-sm uppercase tracking-[0.3em] text-[#FFB8B8]">
                  Uncertainty / Blind consultations
                </p>
                <div className="flex items-center gap-4">
                  <div className="doctor-visual relative h-40 w-40 shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="ghost-question text-6xl font-semibold text-white/50">
                        ?
                      </span>
                    </div>
                    <div className="fragment-card absolute left-0 top-4 h-28 w-32 rotate-[-8deg] rounded-2xl border border-white/10 bg-white/10 p-3 shadow-lg backdrop-blur">
                      <div className="h-3 w-10 rounded-full bg-white/30" />
                      <div className="mt-3 h-16 rounded-xl bg-white/5" />
                    </div>
                    <div className="fragment-card absolute right-0 top-10 h-28 w-32 rotate-[6deg] rounded-2xl border border-white/10 bg-white/10 p-3 shadow-lg backdrop-blur">
                      <div className="h-3 w-12 rounded-full bg-white/30" />
                      <div className="mt-3 h-16 rounded-xl bg-white/5" />
                    </div>
                    <div className="fragment-card absolute left-6 bottom-0 h-28 w-32 rotate-[2deg] rounded-2xl border border-white/10 bg-white/10 p-3 shadow-lg backdrop-blur">
                      <div className="h-3 w-14 rounded-full bg-white/30" />
                      <div className="mt-3 h-16 rounded-xl bg-white/5" />
                    </div>
                  </div>
                  <div>
                    <h2 className="intro-line text-2xl font-semibold">
                      Every missing detail carries risk.
                    </h2>
                    <p className="intro-line mt-2 text-sm text-white/70">
                      Fragments of a patient story create blind spots.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {questions.map((item, index) => {
                    const isExpanded = expandedQuestion === index;
                    const isActive = activeQuestion === index;
                    return (
                      <button
                        key={item.text}
                        type="button"
                        onClick={() =>
                          setExpandedQuestion(isExpanded ? null : index)
                        }
                        onMouseEnter={() => setActiveQuestion(index)}
                        onMouseLeave={() => setActiveQuestion(null)}
                        aria-expanded={isExpanded}
                        className={`chip group flex items-center gap-2 rounded-full border px-4 py-2 text-left text-xs font-medium transition-all duration-300 hover:-rotate-1 hover:shadow-[0_0_18px_rgba(255,184,184,0.35)] ${
                          isExpanded
                            ? "border-[#FFB8B8] bg-white/10"
                            : "border-white/10 bg-white/5"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full transition ${
                            isActive ? "bg-[#FFB8B8]" : "bg-white/40"
                          }`}
                        />
                        <span className="text-white/90">{item.text}</span>
                        {isExpanded && (
                          <span className="ml-2 text-[11px] text-white/60">
                            {item.detail}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="doctor-visual mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-white/10">
                    <Image
                      src="/images/fragments.png"
                      alt="Blurred patient file fragments"
                      fill
                      className="object-cover opacity-70"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      Fragmented patient file
                    </p>
                    <p className="text-xs text-white/60">
                      Incomplete context, higher uncertainty.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-[#E3E0FF] bg-white p-8 shadow-[0_30px_70px_rgba(15,23,42,0.08)]">
              <div className="wipe pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0B0F2A]/80 via-transparent to-transparent" />
              <div className="pointer-events-none absolute -top-10 right-6 h-20 w-20 rounded-full bg-[#6D4AFF]/20 blur-2xl" />

              <div className="relative z-10 flex flex-col gap-6">
                <p className="intro-line text-sm uppercase tracking-[0.3em] text-[#6D4AFF]">
                  MediBank Advantage
                </p>
                <h2 className="intro-line text-3xl font-semibold text-[#121041]">
                  MediBank eliminates uncertainty.
                </h2>
                <p className="intro-line text-base text-[#3A3A5E]">
                  You see the whole patient, not fragments.
                </p>

                <div className="panel-card rounded-2xl border border-[#E6E3FF] bg-gradient-to-br from-[#F7F6FF] to-white p-5 text-sm text-[#4C4C6A] shadow-sm">
                  A unified, longitudinal record gives every consultation the
                  clarity it deserves.
                </div>

                <div className="doctor-visual relative flex items-center gap-4 rounded-2xl border border-[#E6E3FF] bg-white p-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-[#EEF0FF]">
                    <Image
                      src="/images/unified.png"
                      alt="Unified patient record"
                      fill
                      className="object-cover"
                    />
                    <div className="highlight-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#121041]">
                      Unified timeline record
                    </p>
                    <p className="text-xs text-[#6B6B88]">
                      Longitudinal clarity across every visit.
                    </p>
                  </div>
                </div>

                <div className="doctor-visual relative overflow-hidden rounded-2xl border border-[#E6E3FF] bg-white p-5">
                  <div className="unified-card flex items-center gap-6">
                    <div className="relative h-24 w-20 overflow-hidden rounded-2xl bg-[#EEF0FF]">
                      <Image
                        src="/images/doctor.png"
                        alt="Doctor reviewing a unified record"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6D4AFF]">
                          Record
                        </span>
                        <span className="text-xs text-[#9A9AB0]">Timeline</span>
                      </div>
                      <div className="mt-3 h-2 w-full rounded-full bg-[#EEF0FF]">
                        <div className="h-2 w-2/3 rounded-full bg-[#6D4AFF]" />
                      </div>
                      <div className="mt-4 space-y-2">
                        <div className="h-2 w-3/4 rounded-full bg-[#E0E3FF]" />
                        <div className="h-2 w-5/6 rounded-full bg-[#E0E3FF]" />
                        <div className="h-2 w-2/3 rounded-full bg-[#E0E3FF]" />
                      </div>
                    </div>
                  </div>
                  <svg
                    className="mt-6 h-10 w-full"
                    viewBox="0 0 200 40"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 20 H40 L55 8 L75 32 L100 10 L120 30 L140 18 L160 25 L200 16"
                      fill="none"
                      stroke="#6D4AFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="shatter-line text-lg font-semibold text-[#121041]">
                    <span className="sr-only">
                      You see the whole patient, not fragments.
                    </span>
                    {splitText("You see the whole patient, not fragments.")}
                  </p>
                  <p className="second-line mt-3 text-base font-semibold text-[#3A3A5E]">
                    You see the whole patient, not fragments.
                    <span className="relative ml-3 inline-flex h-2 w-10 overflow-hidden align-middle">
                      <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-[#6D4AFF]/20" />
                      <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-[#6D4AFF] motion-safe:animate-[wave_1.5s_ease-in-out_infinite]" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#E3E0FF] bg-white px-8 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <h3 className="intro-line text-sm font-semibold uppercase tracking-[0.3em] text-[#6D4AFF]">
              MediBank Advantage
            </h3>
            <h4 className="intro-line mt-4 text-2xl font-semibold text-[#121041]">
              MediBank eliminates uncertainty.
            </h4>
            <p className="intro-line mt-3 text-sm text-[#3A3A5E]">
              A unified, longitudinal record gives every consultation the
              clarity it deserves.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="benefit-card group flex h-full items-start gap-3 rounded-2xl border border-[#E6E3FF] bg-white p-5 text-sm text-[#1F245A] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#6D4AFF]/40"
                >
                  <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F2FF] text-[#6D4AFF] transition group-hover:scale-105">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
