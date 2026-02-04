"use client";

import Image from "next/image";

const lovedOnes = [
  {
    label: "Parents",
    image: "/images/doctorNew.png",
  },
  {
    label: "Partner",
    image: "/images/profile.jpeg",
  },
  {
    label: "Children",
    image: "/images/he.png",
  },
  {
    label: "Grandparents",
    image: "/images/she.png",
  },
];

export default function LovedOnesSection() {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center md:px-8">
        <span className="rounded-full bg-[#F4ECFF] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#6B21A8]">
          For Your Loved Ones
        </span>
        <h2 className="mt-5 text-2xl font-semibold text-[#6B21A8] md:text-4xl">
          Your Health Identity is Your “Protection”
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-[#3F2F63] md:text-base">
          But your Family&apos;s Health Identity is you “Power”. Create linked health
          identities of your parents, your loved ones and your children so you are
          always prepared - even when they can&apos;t be
        </p>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-4xl justify-center px-4 md:px-8">
        <div className="relative h-[340px] w-full max-w-[420px]">
          <div className="absolute left-1/2 top-1/2 h-[210px] w-px -translate-x-1/2 -translate-y-1/2 bg-[#D9C2FF]" />
          <div className="absolute left-1/2 top-1/2 h-px w-[210px] -translate-x-1/2 -translate-y-1/2 bg-[#D9C2FF]" />

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-[0_0_30px_rgba(123,31,162,0.35)]">
              <div className="absolute inset-[-10px] rounded-[24px] bg-[#EAD9FF] opacity-40" />
              <Image
                src="/images/ml_logo.png"
                alt="MediBank"
                width={44}
                height={44}
                className="relative h-10 w-10 object-contain"
              />
            </div>
          </div>

          <div className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center gap-2">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-white shadow-lg">
              <Image
                src={lovedOnes[0].image}
                alt={lovedOnes[0].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-[#2D2261]">
              {lovedOnes[0].label}
            </span>
          </div>

          <div className="absolute left-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-white shadow-lg">
              <Image
                src={lovedOnes[1].image}
                alt={lovedOnes[1].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-[#2D2261]">
              {lovedOnes[1].label}
            </span>
          </div>

          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-white shadow-lg">
              <Image
                src={lovedOnes[2].image}
                alt={lovedOnes[2].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-[#2D2261]">
              {lovedOnes[2].label}
            </span>
          </div>

          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-white shadow-lg">
              <Image
                src={lovedOnes[3].image}
                alt={lovedOnes[3].label}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-xs font-medium text-[#2D2261]">
              {lovedOnes[3].label}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
