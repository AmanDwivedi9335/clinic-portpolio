"use client";
import Hero from "@/components/Home/Hero";
import ReportCarouselSection from "@/components/Home/ReportCarouselSection";
import HealthIdentitySection from "@/components/Home/HealthIdentitySection";
import LovedOnesSection from "@/components/Home/LovedOnesSection";
import DataControlSection from "@/components/Home/DataControlSection";
import ContactCard from "@/components/Home/ContactCard";

export default function Home() {
	return (
		<main className="overflow-x-hidden">
			{/* Hero Section */}
			<div className="bg-white px-2 pt-14 pb-6 md:px-8 md:pt-1 md:pb-1">
				<Hero />
			</div>

			{/* About Section */}
			<div className="bg-white px-4 py-6 md:px-8 md:py-4">
				<ReportCarouselSection />
			</div>

			{/* HealthIdentity Section */}
			<div className="bg-white px-4 py-6 md:px-8 md:py-14 lg:px-12">
				<HealthIdentitySection />
			</div>

			{/* LovedOnes Section */}
			<div className="bg-[#F3F0FF] py-6 md:py-12 px-4 md:px-8">
				<LovedOnesSection />
			</div>

			{/* Data Control Section */}
			<div className="bg-[#F3F0FF] py-6 md:py-12 px-4 md:px-8">
				<DataControlSection />
			</div>
		</main>
	);
}
