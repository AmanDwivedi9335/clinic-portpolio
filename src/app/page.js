"use client";
import Hero from "@/components/Home/Hero";
import ReportCarouselSection from "@/components/Home/ReportCarouselSection";
import HealthIdentitySection from "@/components/Home/HealthIdentitySection";
import LovedOnesSection from "@/components/Home/LovedOnesSection";
import DataControlSection from "@/components/Home/DataControlSection";
import ContactCard from "@/components/Home/ContactCard";

export default function Home() {
	return (
		<>
			{/* Hero Section */}
			<div className="bg-white px-3 pt-2 sm:px-4 md:px-6 lg:px-8">
				<Hero />
			</div>

			{/* About Section */}
			<div className="bg-white px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-10 lg:px-8">
				<ReportCarouselSection />
			</div>

			{/* HealthIdentity Section */}
			<div className="bg-white px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-10 lg:px-8">
				<HealthIdentitySection />
			</div>

			{/* LovedOnes Section */}
			<div className="bg-[#F3F0FF] px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-10 lg:px-8">
				<LovedOnesSection />
			</div>

			{/* Data Control Section */}
			<div className="bg-[#F3F0FF] px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-10 lg:px-8">
				<DataControlSection />
			</div>
		</>
	);
}
