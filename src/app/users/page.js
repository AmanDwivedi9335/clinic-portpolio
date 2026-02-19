"use client";

import { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";

function PhoneMockup({ children, className = "" }) {
  return (
    <div
      className={`relative mx-auto h-[430px] w-[220px] rounded-[32px] border-[6px] border-[#2A2332] bg-[#F9F9FF] shadow-[0_20px_45px_rgba(48,16,96,0.2)] ${className}`}
    >
      <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-[#2A2332]" />
      <div className="h-full overflow-hidden rounded-[26px]">{children}</div>
    </div>
  );
}

function HeroWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90vh] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#C9C6EA_0%,#E8C9DF_55%,#F3E6F2_100%)]" />

      {/* TOP BAND */}
      <svg
        className="hero-band hero-band-top absolute inset-x-0 top-[10%] h-[40%] w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >

        <g className="wave-track wave-track-top" filter="url(#waveTop)">
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

        <g className="wave-track wave-track-mid" filter="url(#waveMid)">
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

        <g className="wave-track wave-track-bottom" filter="url(#waveBottom)">
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


export default function UsersPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    return createGsapContext(pageRef, (gsap) => {
      const rows = gsap.utils.toArray(".users-feature-row");

      rows.forEach((row) => {
        const text = row.querySelector(".users-feature-text");
        const phone = row.querySelector(".users-feature-phone");

        if (!text || !phone) return;

        gsap.fromTo(
          text,
          { autoAlpha: 0, x: -72 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
            },
          }
        );

        gsap.fromTo(
          phone,
          { autoAlpha: 0, x: 72, y: 30, scale: 0.96 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 78%",
            },
          }
        );
      });
    });
  }, []);

  return (
    <main
      ref={pageRef}
      className="relative isolate overflow-hidden bg-[#F4F4F8] pb-24 pt-20 text-[#220A56] md:pt-24"
    >
      <HeroWaveBackground />

      {/* HERO */}
      <section className="relative isolate overflow-hidden h-[100vh] pt-12 md:pt-16">
        {/* Content ALWAYS above waves */}
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
            {/* Subscribe Now */}
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

            {/* Watch Demo with gradient border */}
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
              width="50"
              height="56"
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

      {/* REST */}
      <section className="mx-auto mt-12 max-w-6xl space-y-16 px-6 md:mt-16">
        <div className="users-feature-row grid gap-8 md:grid-cols-2 md:items-center">
          <div className="users-feature-text">
            <h2 className="text-4xl font-extrabold leading-tight text-[#5b0aa3]">
              Smart Health Overview
            </h2>
            <p className="mt-2 text-lg font-semibold text-[#452169]">
              Track appointments, vitals, and daily health
              <br />
              insights in one place.
            </p>
            <p className="mt-4 max-w-[430px] text-sm text-[#5f4c79]">
              A personalized multidimensional record of your ecosystem&apos;s daily
              health journey, and your vital trends.
            </p>
          </div>

          <PhoneMockup className="users-feature-phone md:justify-self-center">
            <div className="h-full bg-[#F6F1FF] p-3 pt-7">
              <div className="rounded-xl bg-[#6f1cb5] p-3 text-xs text-white shadow-md">
                <p className="font-semibold">Upcoming Appointments</p>
                <p className="opacity-90">Today, 5:30 PM • Dr. Priya</p>
              </div>
              <div className="mt-3 rounded-xl bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold text-[#6622b5]">Health Score</p>
                <div className="mt-2 flex h-20 items-end gap-2">
                  <span className="h-9 w-5 rounded-t bg-[#9f7ddd]" />
                  <span className="h-14 w-5 rounded-t bg-[#8f62d9]" />
                  <span className="h-8 w-5 rounded-t bg-[#c4a1ea]" />
                  <span className="h-16 w-5 rounded-t bg-[#7741c3]" />
                  <span className="h-11 w-5 rounded-t bg-[#a679e2]" />
                </div>
              </div>
              <div className="mt-3 rounded-xl bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold text-[#33154f]">Daily Vitals</p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-[#6b4c8f]">
                  <span>Pulse 74</span>
                  <span>Sleep 7.4h</span>
                  <span>Steps 6,200</span>
                </div>
              </div>
            </div>
          </PhoneMockup>
        </div>

        <div className="users-feature-row grid gap-8 md:grid-cols-2 md:items-center">
          <div className="users-feature-text">
            <h2 className="text-4xl font-extrabold leading-tight text-[#5b0aa3]">
              Discover Nearby
              <br />
              Healthcare Providers
            </h2>
            <p className="mt-2 text-lg font-semibold text-[#452169]">
              Search doctors, labs, and hospitals around your
              <br />
              location.
            </p>
            <p className="mt-4 max-w-[430px] text-sm text-[#5f4c79]">
              An interactive map-based directory to explore, view availability,
              and book appointments with nearby providers.
            </p>
          </div>

          <PhoneMockup className="users-feature-phone md:justify-self-center">
            <div className="relative h-full bg-white p-3 pt-7">
              <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#cce4ff] to-transparent" />
              <div className="relative z-10 rounded-xl bg-white p-2 shadow-sm">
                <div className="h-36 rounded-lg border border-[#d4d8e8] bg-[radial-gradient(circle_at_30%_40%,#7ec9ff_0_8px,transparent_9px),radial-gradient(circle_at_65%_35%,#f973b0_0_8px,transparent_9px),radial-gradient(circle_at_50%_70%,#8b5cf6_0_8px,transparent_9px),linear-gradient(#eef2ff_1px,transparent_1px),linear-gradient(90deg,#eef2ff_1px,transparent_1px)] bg-[length:auto,auto,auto,20px_20px,20px_20px]" />
              </div>
              <div className="relative z-10 mt-3 space-y-2">
                {["Dr. John D.", "Dr. Sneha M.", "Ana Wellness"].map((name) => (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-xl bg-[#f7f2ff] px-3 py-2 text-xs"
                  >
                    <span className="font-medium text-[#3D245D]">{name}</span>
                    <span className="rounded-full bg-[#6f1cb5] px-2 py-1 text-[10px] text-white">
                      Connect
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </PhoneMockup>
        </div>

        <div className="users-feature-row grid gap-8 md:grid-cols-2 md:items-center">
          <div className="users-feature-text">
            <h2 className="text-4xl font-extrabold leading-tight text-[#5b0aa3]">
              Centralized Health
              <br />
              Records
            </h2>
            <p className="mt-2 text-lg font-semibold text-[#452169]">
              Access appointments, lab reports, and hospital
              <br />
              documents anytime.
            </p>
            <p className="mt-4 max-w-[430px] text-sm text-[#5f4c79]">
              A structured record management center for securely viewing and
              managing essential reports with clarity.
            </p>
          </div>

          <PhoneMockup className="users-feature-phone md:justify-self-center">
            <div className="relative h-full bg-[#FBF8FF] p-3 pt-7">
              <div className="mb-3 flex gap-2 text-[11px] font-semibold">
                <span className="rounded-full bg-[#6f1cb5] px-3 py-1 text-white">
                  Records
                </span>
                <span className="rounded-full bg-[#ead9ff] px-3 py-1 text-[#5f2d9f]">
                  Appointments
                </span>
              </div>

              {["Blood Test Report", "MRI Scan Result", "Prescription - Jan", "Wellness Report"].map(
                (item, idx) => (
                  <div key={item} className="mb-2 rounded-xl border border-[#eadff6] bg-white p-3">
                    <p className="text-xs font-semibold text-[#32114f]">{item}</p>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-[#6f6480]">
                      <span>Updated {idx + 1}d ago</span>
                      <span className="rounded-full bg-[#6f1cb5] px-2 py-1 text-white">
                        View
                      </span>
                    </div>
                  </div>
                )
              )}

              <div className="absolute bottom-4 right-4 rounded-full bg-[#1eb980] px-3 py-2 text-xs font-semibold text-white shadow-md">
                + Add
              </div>
            </div>
          </PhoneMockup>
        </div>
      </section>
    </main>
  );
}
