"use client";
import Hero from "@/components/Home/Hero";
import ReportCarouselSection from "@/components/Home/ReportCarouselSection";
import HealthIdentitySection from "@/components/Home/HealthIdentitySection";
import LovedOnesSection from "@/components/Home/LovedOnesSection";
import DataControlSection from "@/components/Home/DataControlSection";
import Howitworks from "@/components/Home/Howitworks";
import Realconsequences from "@/components/Home/Realconsequences";
import Subscription from "@/components/Home/Subscription";

export default function Home() {
  return (
    <>
      {/* Sticky stack panels */}
      <div className="relative isolate">
        <div className="sticky  top-[5px]  h-screen z-50">
          <Hero />
        </div>

        <div className="sticky top-[5px] h-screen z-40 bg-white py-6 md:py-12 px-4 md:px-8">
          <ReportCarouselSection />
        </div>
        <div className="sticky top-[5px] h-screen z-30 top-5">
          <Realconsequences />
        </div>
        <div className="sticky top-[45px] h-screen z-20 bg-white py-6 md:py-12 px-4 md:px-8">
          <HealthIdentitySection />
        </div>


        {/* <div className="sticky top-[5px] h-screen z-0">
          <Howitworks />
        </div> */}

        <div className="sticky top-[5px] h-screen z-10 bg-white py-6 md:py-12 px-4 md:px-8">
          <LovedOnesSection />
        </div>

        {/* <div className="sticky top-[5px] h-screen z-0">
          <Subscription />
        </div> */}

         {/* Normal scrolling section after sticky stack ends */}
      <div className="bg-white py-6 md:py-12 px-4 md:px-8 sticky top-5 ">
        <DataControlSection />
      </div>
      </div>

     
    </>
  );
}
