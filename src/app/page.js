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
			{homeSections.map(({ id, Component, className }, index) => {
				const isDataControlSection = id === "data-control";

				return (
					<section
						key={id}
						className={`${className} snap-start ${
							isDataControlSection
								? "relative min-h-screen overflow-visible"
								: "sticky top-0 h-screen overflow-hidden will-change-transform"
						}`}
						style={{ zIndex: isDataControlSection ? "auto" : index + 1 }}
					>
						<Component />
					</section>
				);
			})}
		</main>
	);
}
