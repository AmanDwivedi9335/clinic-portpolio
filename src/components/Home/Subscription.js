"use client";

import React from "react";

const CheckCircle = ({ className = "" }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM13.707 8.707C13.8892 8.5184 13.99 8.2658 13.9877 8.0036C13.9854 7.7414 13.8802 7.49059 13.6948 7.30518C13.5094 7.11977 13.2586 7.0146 12.9964 7.01233C12.7342 7.01005 12.4816 7.11084 12.293 7.293L9 10.586L7.707 9.293C7.5184 9.11084 7.2658 9.01005 7.0036 9.01233C6.7414 9.0146 6.49059 9.11977 6.30518 9.30518C6.11977 9.49059 6.0146 9.7414 6.01233 10.0036C6.01005 10.2658 6.11084 10.5184 6.293 10.707L8.293 12.707C8.48053 12.8945 8.73484 12.9998 9 12.9998C9.26516 12.9998 9.51947 12.8945 9.707 12.707L13.707 8.707Z"
      fill="#F0F1FF"
    />
  </svg>
);

const Subscription = () => {
  const features = [
    "All your medical records in one place",
    "Prescriptions, lab reports, scans, diagnoses, notes",
    "Book lab tests & auto-sync reports",
    "AI-based health trend monitoring",
    "Highest-grade encryption & security",
    "Share records with any doctor, anywhere",
    "Book doctor appointments",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
      {/* soft ambient background */}
      <div className="pointer-events-none absolute inset-0">
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl  tracking-[-0.02em] md:text-5xl lg:text-[40px] lg:leading-[1.05]">
            <span
              className="
                bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
                bg-clip-text
                text-transparent
              "
            >
              Healthcare Infrastructure
            </span>
            <span   className=" font-extrabold
                bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
                bg-clip-text
                text-transparent
              ">, Not a Subscription</span>
          </h2>

          <p className="mt-3 text-[15px] leading-relaxed text-[#0B137A] md:mt-4 md:text-[16px] lg:text-[18px]">
            Lifetime access to your completed medical history—securely stored, instantly shareable,
            and fully under your control.
          </p>
        </div>

        {/* Card */}
        <div className="mt-10 flex justify-center md:mt-12">
          <div className="relative w-full max-w-[980px]">
            <svg
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden w-[170%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90 md:block"
              viewBox="0 0 1440 444"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M-287 1.97016C-287 1.97016 195.165 -16.286 195.165 75.8671C195.165 168.02 81.1438 267.128 243.685 315.378C406.226 363.629 1021.21 62.3913 1218.93 148.459C1416.65 234.527 1057 335.809 1322.64 400.142C1588.29 464.475 1860 234.527 1860 234.527" stroke="#9F028D" />
              <path d="M-290 10.9702C-290 10.9702 191.941 -7.28597 191.941 84.8671C191.941 177.02 77.9723 276.128 240.438 324.378C402.903 372.629 1017.61 71.3913 1215.23 157.459C1412.86 243.527 1053.37 344.809 1318.89 409.142C1584.42 473.475 1856 243.527 1856 243.527" stroke="#9F028D" strokeOpacity="0.5" />
              <path d="M-290 22.9702C-290 22.9702 191.941 4.71403 191.941 96.8671C191.941 189.02 77.9723 288.128 240.438 336.378C402.903 384.629 1017.61 83.3913 1215.23 169.459C1412.86 255.527 1053.37 356.809 1318.89 421.142C1584.42 485.475 1856 255.527 1856 255.527" stroke="#9F028D" strokeOpacity="0.3" />
              <path d="M-290 33.9702C-290 33.9702 191.941 15.714 191.941 107.867C191.941 200.02 77.9723 299.128 240.438 347.378C402.903 395.629 1017.61 94.3913 1215.23 180.459C1412.86 266.527 1053.37 367.809 1318.89 432.142C1584.42 496.475 1856 266.527 1856 266.527" stroke="#9F028D" strokeOpacity="0.1" />
            </svg>

            {/* glow */}
            <div className="pointer-events-none absolute -inset-6 rounded-[36px] [background: linear-gradient(138.58deg, #02042B 0%, #060B4E 40%, #7D2A84 100%);
] blur-2xl" />

            <div
              className="
                relative z-10 overflow-hidden rounded-[28px]
                bg-[linear-gradient(175deg,#02042B_0%,#060B4E_40%,#7D2A84_100%)]
                shadow-[0_28px_70px_rgba(24,14,74,0.35)]
              "
            >
              {/* inner shine */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_420px_at_10%_10%,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.00)_60%)]" />

              <div className="grid gap-8 p-6 md:grid-cols-[1.05fr_1.4fr] md:gap-10 md:p-10 lg:p-12">
                {/* Left: Plan */}
                <div className="relative">
                  <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-[#F0F1FF]">
                    Monthly Plan
                  </div>

                  <div className="mt-7">
                    <div className="flex items-end gap-2">
                      <div className="text-5xl font-extrabold tracking-[-0.02em] text-white md:text-6xl">
                        Rs. 100
                      </div>
                      <div className="pb-2 text-sm text-white/70">/mon</div>
                    </div>

                    <button
                      className="
                        mt-7 w-full rounded-xl bg-white px-5 py-3
                        text-sm font-semibold text-[#0B137A]
                        shadow-[0_14px_35px_rgba(0,0,0,0.25)]
                        transition hover:brightness-105 active:scale-[0.99]
                        md:max-w-[320px]
                      "
                    >
                      Claim Now
                    </button>
                  </div>

                  {/* divider (only md+) */}
                  <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-px bg-white/15 md:block" />
                </div>

                {/* Right: Features */}
                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-white/90">Features</h3>

                  <ul className="mt-4 space-y-3 md:mt-5 md:space-y-3.5">
                    {features.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="mt-[1px] shrink-0" />
                        <span className="text-[14px] leading-relaxed text-white/85 md:text-[15px]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* bottom soft fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(0,0,0,0.22),rgba(0,0,0,0))]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
