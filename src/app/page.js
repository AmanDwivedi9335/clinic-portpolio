"use client";
import Hero from "@/components/Home/Hero";
import ReportCarouselSection from "@/components/Home/ReportCarouselSection";
import HealthIdentitySection from "@/components/Home/HealthIdentitySection";
import LovedOnesSection from "@/components/Home/LovedOnesSection";
import DataControlSection from "@/components/Home/DataControlSection";
import ContactCard from "@/components/Home/ContactCard";
import Howitworks from "@/components/Home/Howitworks";
import Realconsequences from "@/components/Home/Realconsequences";
import Subscription from "@/components/Home/Subscription";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="sticky h-screen z-[-1] top-[5px]">
        <Hero />
      </div>

      {/* About Section */}
      <div className="bg-white py-6 md:py-12 px-4 md:px-8 sticky h-screen z-[-1] top-[5px]">
        <ReportCarouselSection />
      </div>

      {/* HealthIdentity Section */}
      <div className="bg-white py-6 md:py-12 px-4 md:px-8">
        <HealthIdentitySection />
      </div>

      <div className="">
        <Realconsequences />
      </div>

      <div className="">
        <Howitworks />
      </div>

      {/* LovedOnes Section */}
      <div className="bg-[#F3F0FF] py-6 md:py-12 px-4 md:px-8 sticky h-screen z-[-1] top-[5px]">
        <LovedOnesSection />
      </div>

      <div className="">
        <Subscription />
      </div>

      {/* Data Control Section */}
      <div className="bg-[#F3F0FF] py-6 md:py-12 px-4 md:px-8">
        <DataControlSection />
      </div>
    </>
  );
}
