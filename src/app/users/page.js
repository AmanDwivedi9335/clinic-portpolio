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
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#C7A4ED] via-[#E8D7FA] to-[#F4F4F8]" />
      <div className="absolute -top-10 left-[-10%] h-48 w-[130%] rounded-[50%] bg-[#b786e6]/50" />
      <div className="absolute top-24 left-[-20%] h-44 w-[140%] rounded-[50%] bg-[#d4b5ef]/60" />
      <div className="absolute top-48 left-[-5%] h-40 w-[120%] rounded-[50%] bg-[#ebd9f8]" />
    </div>
  );
}

export default function UsersPage() {
  return (
    <main className="relative overflow-hidden bg-[#F4F4F8] pb-24 pt-28 text-[#220A56] md:pt-36">
      <HeroWaveBackground />

      <section className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4F2C84]">
          INDIA&apos;S FIRST HEALTH IDENTITY INFRASTRUCTURE
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-5xl font-bold leading-[1.05] text-[#47108A] md:text-7xl">
          Sneak Peek of
          <br />
          What You Get
        </h1>
        <p className="mt-3 text-sm font-medium text-[#5b3a84] md:text-base">
          See how the app works in just a few scrolls.
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button className="rounded-full bg-gradient-to-r from-[#7b2ed6] to-[#5f1fa8] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7b2ed6]/30">
            Subscribe Now
          </button>
          <button className="rounded-full border border-[#8f6bb8] bg-white px-7 py-3 text-sm font-semibold text-[#4D267F]">
            Watch Demo
          </button>
        </div>

        <div className="mt-5 text-xl text-[#8c62c0]">⌄</div>
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

      <div className="pointer-events-none absolute left-6 top-6 opacity-85">
        <Image src="/images/ml_logo.png" alt="Medilink" width={90} height={36} />
      </div>
    </main>
  );
}
