"use client";
import Hero from "@/components/Home/Hero";
import DoctorHero from "@/components/DoctorHome/DoctorHero";

export default function Home() {
  return (
    <>
      {/* Sticky stack panels */}
      <div className="relative isolate">
        <div className="">
          <DoctorHero />
        </div>

      </div>
    </>
  );
}
