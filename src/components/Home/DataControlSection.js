"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { createGsapContext } from "@/lib/gsap";
import GradientBadge from "@/components/ui/GradientBadge";

const cardData = [
	{
		title: "Zero Data Reselling",
		icon: "/images/pr1.png",
	},
	{
		title: "FHIR + ABDM Aligned",
		icon: "/images/pr2.png",
	},
	{
		title: "AES-256 Encryption",
		icon: "/images/pr3.png",
	},
	{
		title: "You Own Your Data",
		icon: "/images/pr4.png",
	},
	{
		title: "Complete Audit Trail",
		icon: "/images/pr5.png",
	},
	{
		title: "Consent-Based Access",
		icon: "/images/pr6.png",
	},
];

export default function DataControlSection() {
	const sectionRef = useRef(null);

	useEffect(() => {
		return createGsapContext(sectionRef, (gsap) => {
			const mm = gsap.matchMedia();

			gsap.fromTo(
				".data-intro",
				{ y: 24, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
					},
				}
			);

			gsap.fromTo(
				".data-head-word",
				{ yPercent: 120, rotateX: -50, opacity: 0 },
				{
					yPercent: 0,
					rotateX: 0,
					opacity: 1,
					duration: 0.9,
					ease: "power3.out",
					stagger: 0.08,
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
					},
				}
			);

			gsap.fromTo(
				".data-card",
				{ y: 22, opacity: 0, scale: 0.96 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.8,
					ease: "power3.out",
					stagger: 0.1,
					scrollTrigger: {
						trigger: ".data-grid",
						start: "top 80%",
					},
				}
			);

			gsap.fromTo(
				".data-cta",
				{ y: 30, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".data-cta",
						start: "top 80%",
					},
				}
			);

			gsap.to(".data-float-1", {
				yPercent: -14,
				duration: 3,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});

			gsap.to(".data-float-2", {
				yPercent: 12,
				xPercent: 6,
				duration: 4,
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
			});

			mm.add("(pointer: fine)", () => {
				const cards = gsap.utils.toArray(".data-card");
				const cleanups = cards.map((card) => {
					const glow = card.querySelector(".data-card-glow");
					const icon = card.querySelector(".data-card-icon");
					const title = card.querySelector(".data-card-title");

					const moveX = gsap.quickTo(card, "x", {
						duration: 0.5,
						ease: "power3.out",
					});
					const moveY = gsap.quickTo(card, "y", {
						duration: 0.5,
						ease: "power3.out",
					});
					const rotateX = gsap.quickTo(card, "rotationX", {
						duration: 0.5,
						ease: "power3.out",
					});
					const rotateY = gsap.quickTo(card, "rotationY", {
						duration: 0.5,
						ease: "power3.out",
					});
					const glowX = glow
						? gsap.quickTo(glow, "x", { duration: 0.25, ease: "power2.out" })
						: null;
					const glowY = glow
						? gsap.quickTo(glow, "y", { duration: 0.25, ease: "power2.out" })
						: null;
					const glowOpacity = glow
						? gsap.quickTo(glow, "opacity", { duration: 0.25, ease: "power2.out" })
						: null;
					const iconX = icon
						? gsap.quickTo(icon, "x", { duration: 0.35, ease: "power2.out" })
						: null;
					const iconY = icon
						? gsap.quickTo(icon, "y", { duration: 0.35, ease: "power2.out" })
						: null;
					const titleX = title
						? gsap.quickTo(title, "x", { duration: 0.35, ease: "power2.out" })
						: null;
					const titleY = title
						? gsap.quickTo(title, "y", { duration: 0.35, ease: "power2.out" })
						: null;

					const onMouseMove = (event) => {
						const bounds = card.getBoundingClientRect();
						const relativeX = event.clientX - bounds.left;
						const relativeY = event.clientY - bounds.top;
						const percentX = relativeX / bounds.width - 0.5;
						const percentY = relativeY / bounds.height - 0.5;

						moveX(percentX * 12);
						moveY(percentY * 10);
						rotateX(-percentY * 8);
						rotateY(percentX * 10);

						if (glowX && glowY && glowOpacity) {
							glowX(relativeX);
							glowY(relativeY);
							glowOpacity(1);
						}

						if (iconX && iconY && titleX && titleY) {
							iconX(percentX * 6);
							iconY(percentY * 5);
							titleX(percentX * -8);
							titleY(percentY * -5);
						}
					};

					const onMouseLeave = () => {
						gsap.to(card, {
							x: 0,
							y: 0,
							rotationX: 0,
							rotationY: 0,
							duration: 0.6,
							ease: "elastic.out(1, 0.5)",
						});
						if (glowOpacity) {
							glowOpacity(0);
						}
						if (iconX && iconY && titleX && titleY) {
							iconX(0);
							iconY(0);
							titleX(0);
							titleY(0);
						}
					};

					card.addEventListener("mousemove", onMouseMove);
					card.addEventListener("mouseleave", onMouseLeave);

					return () => {
						card.removeEventListener("mousemove", onMouseMove);
						card.removeEventListener("mouseleave", onMouseLeave);
					};
				});

				return () => {
					cleanups.forEach((cleanup) => cleanup());
				};
			});

			return () => mm.revert();
		});
	}, []);

	return (
		<section ref={sectionRef} className="bg-white py-10 md:py-16 px-4 md:px-8">
			<div className="mxxxl:container xl:container w-[90%] mx-auto text-center">
				<GradientBadge
					className="data-intro"
					innerClassName="bg-white text-[#141E7A]"
				>
					Privacy & Security
				</GradientBadge>
				<h2 className="data-intro mt-4 text-[28px] md:text-[40px] font-semibold text-[#5C4AFF] [perspective:800px]">
					<span className="inline-flex flex-wrap justify-center gap-x-3 md:gap-x-4">
						{["Your", "Data.", "Your", "Control.", "Absolutely."].map((word, index) => (
							<span
								key={`${word}-${index}`}
								className={`data-head-word inline-block ${
									word === "Absolutely." ? "font-bold text-[#3B1ED0]" : ""
								}`}
							>
								{word}
							</span>
						))}
					</span>
				</h2>
				<p className="data-intro mt-3 text-[#000339] max-w-3xl mx-auto text-sm md:text-base">
					Built with healthcare-grade security from the ground up. We don&apos;t
					just protect your data—we give you complete ownership of it.
				</p>

				<div className="data-grid mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{cardData.map((card) => (
						<div
							key={card.title}
							className="data-card group relative overflow-hidden rounded-[30px] border border-[#CED0E5] bg-[#ECECF5] px-6 py-8 text-center [box-shadow:0_2px_0_rgba(255,255,255,0.8)_inset,0_-1px_0_rgba(197,202,230,0.8)_inset,0_5px_0_rgba(216,219,237,0.95),0_11px_24px_rgba(51,61,122,0.14)] transition-all duration-300 hover:[box-shadow:0_2px_0_rgba(255,255,255,0.92)_inset,0_-1px_0_rgba(197,202,230,0.95)_inset,0_7px_0_rgba(212,216,236,1),0_14px_28px_rgba(51,61,122,0.18)] [transform-style:preserve-3d]"
						>
							<div className="pointer-events-none absolute inset-[2px] rounded-[28px] border border-white/55" />
							<div className="data-card-glow pointer-events-none absolute left-0 top-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(109,74,255,0.35)_0%,_rgba(109,74,255,0)_72%)] opacity-0" />
							<div className="data-card-icon data-float-1 relative z-10 mx-auto flex h-14 w-14 items-center justify-center drop-shadow-[0_8px_9px_rgba(125,104,199,0.22)]">
								<Image
									src={card.icon}
									alt={card.title}
									width={56}
									height={56}
									className="h-12 w-12 object-contain"
								/>
							</div>
							<p className="data-card-title data-float-2 relative z-10 mt-3 text-[#111D75] font-semibold drop-shadow-[0_1px_0_rgba(255,255,255,0.65)]">
								{card.title}
							</p>
						</div>
					))}
				</div>

				<p className="data-intro mt-8 text-[#000339] text-base md:text-lg">
					No hospital, clinic, insurer, or doctor owns your data. Only you do.
				</p>
			</div>

			<div className="data-cta mt-12 md:mt-16">
				<div className="relative flex min-h-[320px] items-center overflow-hidden rounded-[24px] bg-[linear-gradient(110deg,_#2B0B78_0%,_#6D1AA6_45%,_#1C2A85_100%)] px-6 py-10 text-left text-white md:min-h-[320px] md:px-12 md:py-12">
					<div className="relative z-10 w-full max-w-[600px] text-center md:text-left">
						<h3 className="text-[30px] leading-tight md:text-[40px] md:leading-[1.2] font-semibold">
							Don&apos;t wait for a crisis to organise your medical life.
						</h3>
						<p className="mt-3 text-[15px] md:text-[16px] text-white/90 max-w-[520px] mx-auto md:mx-0">
							The best time to claim your Health Identity is before you need it.
						</p>
						<button
							type="button"
							className="mt-6 inline-flex items-center rounded-[10px] bg-[#E2CCFF] px-5 py-2 text-sm font-semibold text-[#4A1A96] shadow-sm transition duration-200 hover:brightness-105"
						>
							Claim Your Health Identity
						</button>
					</div>

					<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] items-center justify-end md:flex">
						<div className="relative h-[260px] w-[260px]">
							<div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0.08)_48%,_rgba(255,255,255,0)_72%)]" />
							<div className="absolute inset-6 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0.1)_50%,_rgba(255,255,255,0)_76%)]" />
							<div className="absolute inset-12 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.35)_0%,_rgba(255,255,255,0.12)_52%,_rgba(255,255,255,0)_80%)]" />
							<div className="absolute inset-16 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.5)_0%,_rgba(255,255,255,0.18)_55%,_rgba(255,255,255,0)_85%)]" />
							<div className="absolute inset-20 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.7)_0%,_rgba(255,255,255,0.22)_60%,_rgba(255,255,255,0)_90%)]" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
