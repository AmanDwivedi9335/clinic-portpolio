"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Howitworks from "@/components/Home/Howitworks";

const SHOWCASE_STEPS = [
  {
    heading: "Smart Health Overview",
    subheading: (
      <>
        Track appointments, vitals, and daily health
        <br />
        insights in one place.
      </>
    ),
    body: "A personalized multidimensional record of your ecosystem's daily health journey, and your vital trends.",
    image: "/images/users/phone-mock-1.svg",
    alt: "Smart Health Overview mobile dashboard",
  },
  {
    heading: (
      <>
        Discover Nearby
        <br />
        Healthcare Providers
      </>
    ),
    subheading: (
      <>
        Search doctors, labs, and hospitals around your
        <br />
        location.
      </>
    ),
    body: "An interactive map-based directory to explore, view availability, and book appointments with nearby providers.",
    image: "/images/users/phonemock2.svg",
    alt: "Discover nearby mobile dashboard",
  },
  {
    heading: (
      <>
        Centralized Health
        <br />
        Records
      </>
    ),
    subheading: (
      <>
        Access appointments, lab reports, and hospital
        <br />
        documents anytime.
      </>
    ),
    body: "A structured record management center for securely viewing and managing essential reports with clarity.",
    image: "/images/users/phonemock3.svg",
    alt: "Centralized Overview mobile dashboard",
  },
];

function PhoneMockup({ children, className = "" }) {
  return (
    <div
      className={`sticky top-24 relative mx-auto aspect-[9/19.5] w-full max-w-[220px] rounded-[46px] border-[7px] border-[#221640] bg-[#0D0A1A] p-[5px] shadow-[0_26px_48px_rgba(33,16,72,0.32)] ${className}`}
    >
      <div className="pointer-events-none absolute left-1/2 top-[10px] h-6 w-[108px] -translate-x-1/2 rounded-b-[18px] bg-[#07050f]" />
      <div className="relative h-full overflow-hidden rounded-[38px] bg-[#F5F2FF]">{children}</div>
    </div>
  );
}

function HeroWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100vh] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#C9C6EA_0%,#E8C9DF_55%,#F3E6F2_100%)]" />

      {/* TOP BAND */}
      <svg
        className="hero-band hero-band-top absolute inset-x-0 h-[40%] w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <g className="wave-track wave-track-top">
          <path
            d="M0,140 C240,90 520,90 720,135 C940,185 1180,185 1440,135 L1440,0 L0,0 Z"
            fill="#FFFFFF"
            fillOpacity="0.34"
          />
          <path
            d="M1440,135 C1680,90 1960,90 2160,135 C2380,185 2620,185 2880,135 L2880,0 L1440,0 Z"
            fill="#FFFFFF"
            fillOpacity="0.34"
          />
        </g>
      </svg>

      {/* MIDDLE BAND */}
      <svg
        className="hero-band hero-band-mid absolute inset-x-0 top-[24%] h-[50%] w-full"
        viewBox="0 0 1440 340"
        preserveAspectRatio="none"
      >
        <g className="wave-track wave-track-mid">
          <path
            d="M0,155 C260,215 520,215 740,165 C980,110 1210,115 1440,165 L1440,340 L0,340 Z"
            fill="#FFFFFF"
            fillOpacity="0.42"
          />
          <path
            d="M1440,165 C1700,215 1960,215 2180,165 C2420,110 2650,115 2880,165 L2880,340 L1440,340 Z"
            fill="#FFFFFF"
            fillOpacity="0.42"
          />
        </g>
      </svg>

      {/* BOTTOM BAND */}
      <svg
        className="hero-band hero-band-bottom absolute inset-x-0 bottom-0 h-[48%] w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <g className="wave-track wave-track-bottom">
          <path
            d="M0,110 C250,35 520,40 720,105 C950,180 1180,185 1440,115 L1440,320 L0,320 Z"
            fill="#FFFFFF"
            fillOpacity="0.98"
          />
          <path
            d="M1440,115 C1690,35 1960,40 2160,105 C2390,180 2620,185 2880,115 L2880,320 L1440,320 Z"
            fill="#FFFFFF"
            fillOpacity="0.98"
          />
        </g>
      </svg>

      <style jsx>{`
        .hero-band {
          will-change: transform;
          mix-blend-mode: screen;
          animation: bandFloat 7.5s ease-in-out infinite;
        }

        .hero-band-top {
          filter: drop-shadow(0 10px 28px rgba(255, 255, 255, 0.45));
        }

        .hero-band-mid {
          filter: drop-shadow(0 12px 30px rgba(255, 255, 255, 0.5));
          animation-delay: -1.8s;
        }

        .hero-band-bottom {
          filter: drop-shadow(0 14px 30px rgba(255, 255, 255, 0.55));
          animation-delay: -3.4s;
        }

        .wave-track {
          will-change: transform;
          transform: translateX(0);
        }

        .wave-track-top {
          animation: waveSlideLeft 12s linear infinite;
        }

        .wave-track-mid {
          animation: waveSlideRight 15s linear infinite;
        }

        .wave-track-bottom {
          animation: waveSlideLeft 9s linear infinite;
        }

        @keyframes bandFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, 12px, 0);
          }
        }

        @keyframes waveSlideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1440px);
          }
        }

        @keyframes waveSlideRight {
          0% {
            transform: translateX(-1440px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

function RowPillIndicators({ activeIndex = 0 }) {
  return (
    <div className="mt-6 hidden items-center gap-2 md:flex" aria-hidden="true">
      {[0, 1, 2].map((index) => {
        const isActive = index === activeIndex;

        return (
          <span
            key={index}
            className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
              isActive ? "w-10 bg-[#8F129A]" : "w-5 bg-[#e9def5]"
            }`}
          >
            {isActive ? (
              <span className="users-pill-fill absolute inset-y-0 left-0 rounded-full" />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

export default function UsersPage() {
  const stepRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  const showcaseHeadingClassName =
    "text-3xl sm:text-3xl md:text-4xl font-extrabold leading-tight bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)] bg-clip-text text-transparent";
  const showcaseSubheadingClassName =
    "mt-2 text-lg md:text-lg font-normal leading-snug bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)] bg-clip-text text-transparent";
  const showcaseBodyClassName = "mt-1 md:mt-4 max-w-[430px] text-sm text-[#0b137a]";

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const nextIndex = Number(visibleEntries[0].target.getAttribute("data-step-index"));
          if (!Number.isNaN(nextIndex)) {
            setActiveStep(nextIndex);
          }
        }
      },
      {
        threshold: [0.35, 0.6, 0.8],
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative isolate overflow-x-hidden overflow-y-clip bg-[#F4F4F8] pt-20 text-[#220A56] md:pt-24">
      <HeroWaveBackground />

      {/* HERO */}
      <section className="relative isolate h-[100vh] overflow-hidden pt-12 md:pt-16">
        <div className="relative z-10 mx-auto flex min-h-[65vh] max-w-6xl flex-col items-center justify-center px-6 text-center md:min-h-[70vh]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#282672]">
            INDIA&apos;S FIRST HEALTH IDENTITY INFRASTRUCTURE™
          </p>

          <h1
            className="
              mx-auto mt-4 max-w-4xl
              text-5xl md:text-7xl
              font-extrabold
              leading-[1.05]
              tracking-[-0.02em]
              bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
              bg-clip-text text-transparent
            "
          >
            Sneak Peek of
            <br />
            What You Get
          </h1>

          <p className="mt-4 text-sm font-medium text-[#282672] md:text-base">
            See how the app works in just a few scrolls.
          </p>

          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              className="
                rounded-xl
                px-8 py-3
                text-sm font-semibold text-white
                bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
                shadow-[0_18px_40px_rgba(159,2,141,0.35)]
                transition
                hover:brightness-110
                active:scale-[0.98]
              "
            >
              Subscribe Now
            </button>

            <button
              className="
                relative
                rounded-xl
                p-[1.5px]
                bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
                transition
                hover:brightness-110
              "
            >
              <span
                className="
                  flex h-full w-full items-center justify-center
                  rounded-[10px]
                  bg-white/90
                  px-8 py-3
                  text-sm font-semibold
                  text-[#4D267F]
                  shadow-sm
                "
              >
                Watch Demo
              </span>
            </button>
          </div>

          <div className="mt-10" aria-hidden="true">
            <svg
              className="scroll-indicator"
              width="30"
              height="36"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="scroll-indicator-chevron"
                d="M12 8L25 21L38 8"
                stroke="#8F129A"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ "--chevron-delay": "0s" }}
              />
              <path
                className="scroll-indicator-chevron"
                d="M12 24L25 37L38 24"
                stroke="#BB79C7"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ "--chevron-delay": "0.2s" }}
              />
              <path
                className="scroll-indicator-chevron"
                d="M12 40L25 53L38 40"
                stroke="#D9B8DD"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ "--chevron-delay": "0.4s" }}
              />
            </svg>
          </div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="relative mx-auto mt-20 sm:mt-20 md:mt-10 max-w-6xl bg-[#F4F4F8] px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:gap-12">
          <div className="order-2 md:order-1">
            {SHOWCASE_STEPS.map((step, index) => (
              <div
                key={index}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                data-step-index={index}
                className="min-h-[75vh] md:min-h-[100vh] flex items-center"
              >
                <div>
                  <h2 className={showcaseHeadingClassName}>{step.heading}</h2>

                  <p className={showcaseSubheadingClassName}>{step.subheading}</p>

                  <p className={showcaseBodyClassName}>{step.body}</p>

                  <RowPillIndicators activeIndex={index} />
                </div>
              </div>
            ))}
          </div>

          <div className="order-1 md:order-2 md:pt-10">
            <PhoneMockup>
              <Image
                src={SHOWCASE_STEPS[activeStep].image}
                alt={SHOWCASE_STEPS[activeStep].alt}
                fill
                className="object-cover"
                priority
              />
            </PhoneMockup>
          </div>
        </div>
      </section>

      <section>
        <Howitworks />
      </section>

      <style jsx>{`
        .users-pill-fill {
          background: linear-gradient(90deg, #9f028d 0%, #0e1896 100%);
          animation: pillFill 2.4s ease-in-out infinite;
          transform-origin: left;
        }

        @keyframes pillFill {
          0% {
            transform: scaleX(0.1);
            opacity: 0.7;
          }
          65% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
