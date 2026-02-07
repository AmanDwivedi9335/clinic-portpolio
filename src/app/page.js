"use client";
import Hero from "@/components/Home/Hero";
import ReportCarouselSection from "@/components/Home/ReportCarouselSection";
import HealthIdentitySection from "@/components/Home/HealthIdentitySection";
import LovedOnesSection from "@/components/Home/LovedOnesSection";
import DataControlSection from "@/components/Home/DataControlSection";
import StackSection from "@/components/StackSection";

export default function Home() {
	return (
		<main className="bg-slate-50">
			<StackSection zIndex={10} backgroundClassName="bg-white">
				<div className="h-full w-full px-4 md:px-8 flex items-center">
					<Hero />
				</div>
			</StackSection>

			<StackSection zIndex={20} backgroundClassName="bg-white">
				<div className="h-full w-full px-4 md:px-8 flex items-center">
					<ReportCarouselSection />
				</div>
			</StackSection>

			<StackSection zIndex={30} backgroundClassName="bg-white">
				<div className="h-full w-full px-4 md:px-8 flex items-center">
					<HealthIdentitySection />
				</div>
			</StackSection>

			<StackSection zIndex={40} backgroundClassName="bg-[#F3F0FF]">
				<div className="h-full w-full px-4 md:px-8 flex items-center">
					<LovedOnesSection />
				</div>
			</StackSection>

			<StackSection zIndex={50} backgroundClassName="bg-[#F3F0FF]">
				<div className="h-full w-full px-4 md:px-8 flex items-center">
					<DataControlSection />
				</div>
			</StackSection>
		</main>
	);
}
