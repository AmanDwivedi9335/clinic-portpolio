"use client";

import DoctorHero from "@/components/DoctorHome/DoctorHero";
import DoctorAdvantage from "@/components/DoctorHome/DoctorAdvantage";

export default function Home() {
  return (
    <>
      <div className="relative isolate">
        <DoctorHero />
        <DoctorAdvantage />
      </div>
    </>
  );
}
