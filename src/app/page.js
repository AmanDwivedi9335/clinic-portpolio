"use client";
import { useEffect, useRef } from "react";
import Hero from "@/components/Home/Hero";
import ReportCarouselSection from "@/components/Home/ReportCarouselSection";
import HealthIdentitySection from "@/components/Home/HealthIdentitySection";
import LovedOnesSection from "@/components/Home/LovedOnesSection";
import DataControlSection from "@/components/Home/DataControlSection";
import { createGsapContext } from "@/lib/gsap";

export default function Home() {
	const mainRef = useRef(null);

	useEffect(() => {
		return createGsapContext(mainRef, (gsap) => {
			const sections = gsap.utils.toArray(".home-stack-section");

			sections.forEach((section, index) => {
				gsap.set(section, { zIndex: sections.length - index });

				gsap.fromTo(
					section,
					{ yPercent: index === 0 ? 0 : 18 },
					{
						yPercent: 0,
						duration: 1,
						ease: "power2.out",
						scrollTrigger: {
							trigger: section,
							start: "top bottom-=10%",
							end: "top top+=14%",
							scrub: 1.2,
						},
					}
				);
			});
		});
	}, []);

	return (
		<main ref={mainRef} className="overflow-x-hidden">
			{/* Hero Section */}
			<div className="home-stack-section bg-white px-2 pt-14 pb-6 md:px-8 md:pt-1 md:pb-1">
				<Hero />
			</div>

			{/* About Section */}
			<div className="home-stack-section bg-white px-4 pb-6 pt-24 md:px-8 md:pb-4 md:pt-28">
				<ReportCarouselSection />
			</div>

			{/* HealthIdentity Section */}
			<div className="home-stack-section bg-white px-4 pb-6 pt-24 md:px-8 md:pb-14 md:pt-28 lg:px-12">
				<HealthIdentitySection />
			</div>

			{/* LovedOnes Section */}
			<div className="home-stack-section bg-[#F3F0FF] px-4 pb-6 pt-24 md:px-8 md:pb-12 md:pt-28">
				<LovedOnesSection />
			</div>

			{/* Data Control Section */}
			<div className="home-stack-section bg-[#F3F0FF] px-4 pb-6 pt-24 md:px-8 md:pb-12 md:pt-28">
				<DataControlSection />
			</div>
		</main>
	);
}
