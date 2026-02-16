"use client";

import Image from "next/image";

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
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[90vh] overflow-hidden">
      {/* Base hero gradient (same vibe as reference) */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#C9C6EA_0%,#E8C9DF_55%,#F3E6F2_100%)]" />

      {/* Top soft band */}
      <svg
        className="hero-band hero-band-top absolute inset-x-0 top-[10%] h-[38%] w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <g className="hero-band-track hero-band-track-1">
          <path
            d="M0,140 C240,90 520,90 720,135 C940,185 1180,185 1440,135 L1440,0 L0,0 Z"
            fill="#FFFFFF"
            fillOpacity="0.18"
          />
          <path
            d="M1440,140 C1680,90 1960,90 2160,135 C2380,185 2620,185 2880,135 L2880,0 L1440,0 Z"
            fill="#FFFFFF"
            fillOpacity="0.18"
          />
        </g>
      </svg>

      {/* Middle band */}
      <svg
        className="hero-band hero-band-mid absolute inset-x-0 top-[26%] h-[46%] w-full"
        viewBox="0 0 1440 340"
        preserveAspectRatio="none"
      >
        <g className="hero-band-track hero-band-track-2">
          <path
            d="M0,155 C260,215 520,215 740,165 C980,110 1210,115 1440,165 L1440,340 L0,340 Z"
            fill="#FFFFFF"
            fillOpacity="0.28"
          />
          <path
            d="M1440,155 C1700,215 1960,215 2180,165 C2420,110 2650,115 2880,165 L2880,340 L1440,340 Z"
            fill="#FFFFFF"
            fillOpacity="0.28"
          />
        </g>
      </svg>

      {/* Bottom white band */}
      <svg
        className="hero-band hero-band-bottom absolute inset-x-0 bottom-0 h-[42%] w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <g className="hero-band-track hero-band-track-3">
          <path
            d="M0,110 C250,35 520,40 720,105 C950,180 1180,185 1440,115 L1440,320 L0,320 Z"
            fill="#FFFFFF"
            fillOpacity="0.98"
          />
          <path
            d="M1440,110 C1690,35 1960,40 2160,105 C2390,180 2620,185 2880,115 L2880,320 L1440,320 Z"
            fill="#FFFFFF"
            fillOpacity="0.98"
          />
        </g>
      </svg>

      <style jsx>{`
        .hero-band {
          transform-origin: center;
          will-change: transform;
        }

        .hero-band-top {
          animation: heroWaveShiftTop 11s ease-in-out infinite;
        }

        .hero-band-mid {
          animation: heroWaveShiftMid 14s ease-in-out infinite;
        }

        .hero-band-bottom {
          animation: heroWaveShiftBottom 17s ease-in-out infinite;
        }

        @keyframes heroWaveShiftTop {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-1.2%, 1.2%, 0);
          }
        }

        @keyframes heroWaveShiftMid {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(1.5%, -1%, 0);
          }
        }

        @keyframes heroWaveShiftBottom {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-1%, 0.9%, 0);
          }
        }
      `}</style>
    </div>
  );
}

      <style jsx>{`
        .hero-band {
          overflow: hidden;
        }

        .hero-band-track {
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform;
        }

        .hero-band-track-1 {
          animation: waveDriftLeft 12s linear infinite, waveLiftA 6s ease-in-out infinite;
        }

        .hero-band-track-2 {
          animation: waveDriftRight 16s linear infinite, waveLiftB 8s ease-in-out infinite;
        }

        .hero-band-track-3 {
          animation: waveDriftLeft 20s linear infinite, waveLiftC 10s ease-in-out infinite;
        }

        @keyframes waveDriftLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes waveDriftRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes waveLiftA {
          0%,
          100% {
            margin-top: 0;
          }
          50% {
            margin-top: -8px;
          }
        }

        @keyframes waveLiftB {
          0%,
          100% {
            margin-top: 0;
          }
          50% {
            margin-top: 6px;
          }
        }

        @keyframes waveLiftC {
          0%,
          100% {
            margin-top: 0;
          }
          50% {
            margin-top: -5px;
          }
        }
      `}</style>
    </div>
  );
}



export default function UsersPage() {
  return (
    <main className="relative isolate overflow-hidden bg-[#F4F4F8] pb-24 pt-20 text-[#220A56] md:pt-24">
      <HeroWaveBackground />

            {/* HERO */}
      <section className="relative isolate overflow-hidden h-[100vh] pt-12 md:pt-16">
        {/* Base gradient like screenshot */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#C7A4ED] via-[#E8D7FA] to-[#F4F4F8]" /> */}

        {/* Content ALWAYS above waves */}
        <div className="relative z-10 mx-auto flex min-h-[65vh] max-w-6xl flex-col items-center justify-center px-6 text-center md:min-h-[70vh]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4F2C84]">
            INDIA&apos;S FIRST HEALTH IDENTITY INFRASTRUCTURE™
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-[-0.02em] text-[#47108A] md:text-7xl">
            Sneak Peek of
            <br />
            What You Get
          </h1>

          <p className="mt-4 text-sm font-medium text-[#5b3a84] md:text-base">
            See how the app works in just a few scrolls.
          </p>

          <div className="mt-7 flex items-center justify-center gap-4">
            <button className="rounded-xl bg-gradient-to-b from-[#7b2ed6] to-[#5f1fa8] px-8 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(123,46,214,0.25)] hover:brightness-110 active:scale-[0.98] transition">
              Subscribe Now
            </button>
            <button className="rounded-xl border border-[#8f6bb8] bg-white/80 px-8 py-3 text-sm font-semibold text-[#4D267F] shadow-sm hover:bg-white transition">
              Watch Demo
            </button>
          </div>

          <div className="mt-10 text-2xl text-[#8c62c0]">⌄</div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-y-16 px-6 md:mt-16 md:grid-cols-2 md:items-center">
        <div>
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

        <PhoneMockup className="md:justify-self-center">
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

        <PhoneMockup className="md:order-3 md:justify-self-start">
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

        <div className="md:order-4 md:justify-self-end">
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

        <div>
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

        <PhoneMockup className="md:justify-self-center">
          <div className="h-full bg-[#FBF8FF] p-3 pt-7">
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
                <div
                  key={item}
                  className="mb-2 rounded-xl border border-[#eadff6] bg-white p-3"
                >
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
      </section>

    </main>
  );
}
