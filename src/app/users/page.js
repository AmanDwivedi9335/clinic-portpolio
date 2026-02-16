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
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[560px] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#08087D_0%,#2B1098_26%,#5A18AE_55%,#8D1CB8_78%,#B31AB6_100%)]" />

      {/* Curved wave bands to match the reference hero background */}
      <svg
        className="absolute left-0 top-[26%] h-[140px] w-full"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          fill="#5D20A9"
          fillOpacity="0.55"
          d="M0,104 C172,78 302,72 444,98 C566,120 660,160 772,158 C894,154 1008,84 1128,88 C1248,94 1354,128 1440,98 L1440,220 L0,220 Z"
        />
      </svg>

      <svg
        className="absolute left-0 top-[42%] h-[150px] w-full"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          fill="#7D1FB4"
          fillOpacity="0.58"
          d="M0,126 C160,168 332,138 486,108 C648,76 762,94 888,128 C1026,168 1162,154 1292,112 C1364,88 1414,86 1440,94 L1440,220 L0,220 Z"
        />
      </svg>

      <svg
        className="absolute left-0 top-[58%] h-[160px] w-full"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          fill="#9A1DBB"
          fillOpacity="0.62"
          d="M0,120 C166,96 318,76 468,106 C608,134 742,168 892,144 C1034,120 1140,72 1272,88 C1356,98 1408,108 1440,102 L1440,220 L0,220 Z"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-[170px] w-full"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <path
          fill="#B01EB9"
          fillOpacity="0.72"
          d="M0,136 C168,164 298,120 434,96 C546,76 654,108 768,152 C896,198 1014,172 1128,130 C1240,88 1342,92 1440,98 L1440,220 L0,220 Z"
        />
      </svg>

      <svg
        className="absolute -bottom-1 left-0 h-[95px] w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="#0A0120"
          d="M0,80 C120,118 252,98 374,66 C504,32 618,48 746,88 C876,126 1008,84 1120,70 C1246,54 1352,68 1440,74 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}

/** Animated waves that sit BEHIND content but ABOVE base gradient */
function HeroWaves() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Each layer uses a repeating SVG wave background and moves horizontally */}
      <div className="wave wave-1 absolute left-0 top-[18%] h-[220px] w-[220%] opacity-75" />
      <div className="wave wave-2 absolute left-0 top-[38%] h-[210px] w-[220%] opacity-65" />
      <div className="wave wave-3 absolute left-0 top-[58%] h-[200px] w-[220%] opacity-55" />

      {/* Local CSS for the wave background + animation */}
      <style jsx global>{`
        .wave {
          background-repeat: repeat-x;
          background-size: 50% 100%;
          will-change: transform;
          filter: blur(0.2px);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        /* Slightly different speeds for parallax feel */
        .wave-1 {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 220'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.55' d='M0,120 C180,190 360,70 540,120 C720,170 900,110 1080,135 C1260,160 1350,120 1440,110 L1440,220 L0,220 Z'/%3E%3C/svg%3E");
          animation: waveMove 8s linear infinite, waveFloat 4s ease-in-out infinite;
        }
        .wave-2 {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 220'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.48' d='M0,140 C220,90 420,200 640,140 C860,80 1040,190 1260,130 C1360,105 1410,115 1440,120 L1440,220 L0,220 Z'/%3E%3C/svg%3E");
          animation: waveMove 11s linear infinite reverse, waveFloat 5s ease-in-out infinite;
        }
        .wave-3 {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 220'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.42' d='M0,130 C240,170 420,70 660,130 C900,190 1080,85 1260,120 C1360,140 1410,130 1440,125 L1440,220 L0,220 Z'/%3E%3C/svg%3E");
          animation: waveMove 14s linear infinite, waveFloat 6s ease-in-out infinite;
        }

        @keyframes waveMove {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes waveFloat {
          0%,
          100% {
            margin-top: 0;
          }
          50% {
            margin-top: -14px;
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
      <section className="relative isolate overflow-hidden pt-12 md:pt-16">
        {/* Base gradient like screenshot */}
        {/* <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#C7A4ED] via-[#E8D7FA] to-[#F4F4F8]" /> */}

        {/* Animated wave layers */}
        <HeroWaves />

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
