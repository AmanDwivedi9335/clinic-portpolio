"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const firstLineWords =
    "We ensures your complete medical history is always with you, in emergencies, in hospitals, across cities, across time.".split(
      " "
    );
  const secondLineWords =
    "Because one missing detail can change everything...".split(" ");

  return (
    <section className="pt-[5px] pb-5">
      <div className="mx-auto px-3 md:px-6">
        {/* Rounded hero frame */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/70 shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
          {/* Background image */}
          <Image
            src="/images/hero.png" 
            alt="Hero background"
            fill
            priority
            className="object-cover"
          />

          {/* Soft left fade (so text stays readable) */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/55 via-white/15 to-transparent" />

          {/* Content */}
          <div className="relative grid min-h-[95vh] md:min-h-[95vh] grid-cols-1 md:grid-cols-2 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="px-6 md:px-10 py-12 md:py-16"
            >
              <p className="text-[12px] md:text-sm font-medium text-slate-700">
                Medibank - India&apos;s 1st Health Identity Infrastructure
              </p>

              <h1 className="mt-4 text-[38px] leading-[1.05] md:text-[60px] md:leading-[1.02] font-extrabold text-wave">
                Your Health
                <br />
                Identity for Life
              </h1>

              <p className="mt-5 max-w-xl text-[14px] md:text-[15px] leading-relaxed text-slate-400">
                {firstLineWords.map((word, index) => (
                  <span
                    key={`line-one-${word}-${index}`}
                    className="word-wave"
                    style={{ "--delay": `${index * 0.12}s` }}
                  >
                    {word}{" "}
                  </span>
                ))}
                <br />
                {secondLineWords.map((word, index) => (
                  <span
                    key={`line-two-${word}-${index}`}
                    className="word-wave font-semibold"
                    style={{
                      "--delay": `${(firstLineWords.length + index) * 0.12}s`,
                    }}
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>

              <div className="mt-7">
                <a
                  href="/claim"
                  className="inline-flex items-center justify-center rounded-xl bg-[#4b00a3] px-6 py-3 text-white font-semibold shadow-[0_10px_25px_rgba(75,0,163,0.28)] hover:opacity-95 active:scale-[0.99] transition"
                >
                  Claim Your Health Identity
                </a>
              </div>
            </motion.div>

            {/* Right side kept mostly visual (optional) */}
            <div className="hidden md:block" />
          </div>

          {/* Subtle vignette like mock */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-white/40" />
        </div>
      </div>
    </section>
  );
}
