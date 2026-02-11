"use client";
import React, { useEffect, useRef } from "react";
import { createGsapContext } from "@/lib/gsap";

const cardData = [
	{
		title: "AES-256 Encryption",
		icon: (
			<svg
				viewBox="0 0 64 64"
				className="h-12 w-12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M32 6C20.402 6 11 15.402 11 27v9c0 12.598 9.402 22 21 22s21-9.402 21-22v-9C53 15.402 43.598 6 32 6Z"
					fill="#E9E3FF"
				/>
				<path
					d="M32 10c-9.941 0-18 8.059-18 18v8c0 9.941 8.059 18 18 18s18-8.059 18-18v-8c0-9.941-8.059-18-18-18Z"
					fill="#B6A6FF"
				/>
				<path
					d="M22 30a10 10 0 0 1 20 0v4h-4v-4a6 6 0 1 0-12 0v4h-4v-4Z"
					fill="#5C4AFF"
				/>
				<rect x="20" y="34" width="24" height="18" rx="4" fill="#6D4AFF" />
				<circle cx="32" cy="43" r="3.5" fill="#E9E3FF" />
				<rect x="31" y="43" width="2" height="6" rx="1" fill="#E9E3FF" />
			</svg>
		),
	},
	{
		title: "FHIR + ABDM Aligned",
		icon: (
			<svg
				viewBox="0 0 64 64"
				className="h-12 w-12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="8" y="24" width="20" height="20" rx="6" fill="#C9C0FF" />
				<rect x="36" y="16" width="20" height="20" rx="6" fill="#B6A6FF" />
				<rect x="36" y="40" width="20" height="20" rx="6" fill="#E9E3FF" />
				<rect x="8" y="8" width="20" height="20" rx="6" fill="#E9E3FF" />
				<rect x="22" y="30" width="20" height="20" rx="6" fill="#6D4AFF" />
				<path
					d="M32 24v16M24 32h16"
					stroke="#fff"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</svg>
		),
	},
	{
		title: "Zero Data Reselling",
		icon: (
			<svg
				viewBox="0 0 64 64"
				className="h-12 w-12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<ellipse cx="32" cy="16" rx="18" ry="6" fill="#D9D1FF" />
				<path
					d="M14 16v20c0 3.314 8.059 6 18 6s18-2.686 18-6V16"
					fill="#B6A6FF"
				/>
				<path
					d="M14 28v20c0 3.314 8.059 6 18 6s18-2.686 18-6V28"
					fill="#E9E3FF"
				/>
				<circle cx="46" cy="44" r="10" fill="#6D4AFF" />
				<path
					d="M42 44h8"
					stroke="#fff"
					strokeWidth="3"
					strokeLinecap="round"
				/>
			</svg>
		),
	},
	{
		title: "Consent-Based Access",
		icon: (
			<svg
				viewBox="0 0 64 64"
				className="h-12 w-12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="10" y="12" width="34" height="40" rx="6" fill="#E9E3FF" />
				<rect x="16" y="20" width="22" height="4" rx="2" fill="#B6A6FF" />
				<rect x="16" y="30" width="22" height="4" rx="2" fill="#B6A6FF" />
				<rect x="16" y="40" width="14" height="4" rx="2" fill="#B6A6FF" />
				<circle cx="48" cy="42" r="10" fill="#6D4AFF" />
				<path
					d="m44 42 3 3 5-6"
					stroke="#fff"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		title: "Complete Audit Trail",
		icon: (
			<svg
				viewBox="0 0 64 64"
				className="h-12 w-12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="14" y="10" width="28" height="40" rx="6" fill="#E9E3FF" />
				<path
					d="M24 10h8a4 4 0 0 1 4 4v4H20v-4a4 4 0 0 1 4-4Z"
					fill="#B6A6FF"
				/>
				<rect x="20" y="24" width="16" height="3" rx="1.5" fill="#B6A6FF" />
				<rect x="20" y="31" width="16" height="3" rx="1.5" fill="#B6A6FF" />
				<rect x="20" y="38" width="12" height="3" rx="1.5" fill="#B6A6FF" />
				<path
					d="M46 44c0 6.075-4.925 11-11 11-2.202 0-4.254-.65-5.975-1.77L18 58l4.77-11.025A10.94 10.94 0 0 1 22 44c0-6.075 4.925-11 11-11s13 4.925 13 11Z"
					fill="#6D4AFF"
				/>
				<path
					d="m30 44 3 3 6-6"
					stroke="#fff"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		title: "You Own Your Data",
		icon: (
			<svg
				viewBox="0 0 64 64"
				className="h-12 w-12"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="32" cy="18" r="10" fill="#C9C0FF" />
				<path
					d="M16 54c0-8.837 7.163-16 16-16s16 7.163 16 16"
					fill="#E9E3FF"
				/>
				<path
					d="M32 30c-9.941 0-18 8.059-18 18v6h36v-6c0-9.941-8.059-18-18-18Z"
					fill="#B6A6FF"
				/>
				<rect x="26" y="34" width="12" height="16" rx="4" fill="#6D4AFF" />
				<circle cx="32" cy="40" r="3" fill="#E9E3FF" />
			</svg>
		),
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
				<div className="data-intro inline-flex items-center rounded-full bg-[#F1ECFF] px-4 py-1 text-[12px] font-semibold text-[#5C4AFF]">
					Privacy & Security
				</div>
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
							className="data-card relative overflow-hidden border border-[#5C4AFF] rounded-[18px] px-6 py-7 flex flex-col items-center justify-center text-center bg-white transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(92,74,255,0.18)] [transform-style:preserve-3d]"
						>
							<div className="data-card-glow pointer-events-none absolute left-0 top-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(109,74,255,0.35)_0%,_rgba(109,74,255,0)_72%)] opacity-0" />
							<div className="data-card-icon data-float-1 relative z-10">{card.icon}</div>
							<p className="data-card-title data-float-2 mt-3 text-[#000339] font-semibold">
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
