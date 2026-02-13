"use client";

import Hero from "@/components/Home/Hero";
import ReportCarouselSection from "@/components/Home/ReportCarouselSection";
import HealthIdentitySection from "@/components/Home/HealthIdentitySection";
import LovedOnesSection from "@/components/Home/LovedOnesSection";
import DataControlSection from "@/components/Home/DataControlSection";

const homeSections = [
	{
		id: "hero",
		Component: Hero,
		className: "bg-white",
	},
	{
		id: "report-carousel",
		Component: ReportCarouselSection,
		className: "bg-white px-4 py-6 md:px-8 md:py-12",
	},
	{
		id: "health-identity",
		Component: HealthIdentitySection,
		className: "bg-white px-4 py-6 md:px-8 md:py-12",
	},
	{
		id: "loved-ones",
		Component: LovedOnesSection,
		className: "bg-white px-4 py-6 md:px-8 md:py-12",
	},
	{
		id: "data-control",
		Component: DataControlSection,
		className: "bg-white px-4 py-6 md:px-8 md:py-12",
	},
];

export default function Home() {
	return (
		<main className="snap-y snap-mandatory scroll-smooth">
			{homeSections.map(({ id, Component, className }, index) => (
				<section
					key={id}
					className={`${className} sticky top-0 h-screen snap-start overflow-hidden will-change-transform`}
					style={{ zIndex: index + 1 }}
				>
					<Component />
				</section>
			))}
		</main>
	);
}
