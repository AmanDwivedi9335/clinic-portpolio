"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Hero from "@/components/Home/Hero";
import Blogsection from "@/components/Home/Blogsection";
import Aboutsection from "@/components/Home/Aboutsection";
import WhyUs from "@/components/Home/WhyUs";
import ReportCarouselSection from "@/components/Home/ReportCarouselSection";
import ContactCard from "@/components/Home/ContactCard";
import Faq from "@/components/Home/Faq";

export default function Home() {
	// Animation Variants
	const fadeInText = {
		hidden: { opacity: 0, x: -50 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
	};

	const fadeInImage = {
		hidden: { opacity: 0, scale: 0.9 },
		visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
	};

	const fadeInButton = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
	};

	return (
		<>
			{/* Hero Section */}
			<Hero />

			{/* About Section */}
			<div className="py-6 md:py-12 px-4 md:px-8 lg:px-0 bg-inherit sticky h-screen z-[-1] top-[90px]">
				<Aboutsection />
			</div>

			{/* Why Us Section */}
			<div className="bg-white py-6 md:py-12 px-4 md:px-8 sticky h-screen z-[-1] top-[90px]">
				<WhyUs />
			</div>

			<ReportCarouselSection />

			{/* Blog Section */}
			<div className="bg-[#F3F0FF] py-6 md:py-12 px-4 md:px-8">
				<Blogsection />
			</div>

			{/* Contact Us Section */}
			<div className="bg-[#F3F0FF] py-6 md:py-12 px-4 md:px-8">
				<ContactCard />
			</div>

			{/* FAQ Section */}
			<div className="px-4 md:px-8 py-6 md:py-12 bg-inherit">
				<Faq />
			</div>
		</>
	);
}
