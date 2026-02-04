"use client";
import React from "react";

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
	return (
		<section className="bg-white py-10 md:py-16 px-4 md:px-8">
			<div className="mxxxl:container xl:container w-[90%] mx-auto text-center">
				<div className="inline-flex items-center rounded-full bg-[#F1ECFF] px-4 py-1 text-[12px] font-semibold text-[#5C4AFF]">
					For Your Loved Ones
				</div>
				<h2 className="mt-4 text-[28px] md:text-[40px] font-semibold text-[#5C4AFF]">
					Your Data. Your Control.{" "}
					<span className="font-bold text-[#3B1ED0]">Absolutely.</span>
				</h2>
				<p className="mt-3 text-[#000339] max-w-3xl mx-auto text-sm md:text-base">
					Built with healthcare-grade security from the ground up. We don&apos;t
					just protect your data—we give you complete ownership of it.
				</p>

				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{cardData.map((card) => (
						<div
							key={card.title}
							className="border border-[#5C4AFF] rounded-[18px] px-6 py-7 flex flex-col items-center justify-center text-center bg-white"
						>
							{card.icon}
							<p className="mt-3 text-[#000339] font-semibold">{card.title}</p>
						</div>
					))}
				</div>

				<p className="mt-8 text-[#000339] text-base md:text-lg">
					No hospital, clinic, insurer, or doctor owns your data. Only you do.
				</p>
			</div>

			<div className="mt-12 md:mt-16">
				<div className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-[#3413A8] via-[#5B1FAE] to-[#A244B4] px-6 py-10 text-left text-white md:px-12 md:py-12">
					<div className="relative z-10 max-w-xl">
						<h3 className="text-[28px] md:text-[36px] font-semibold leading-tight">
							Don&apos;t wait for a crisis to organise your medical life.
						</h3>
						<p className="mt-3 text-sm md:text-base text-white/90">
							The best time to claim your Health Identity is before you need it.
						</p>
						<button
							type="button"
							className="mt-6 inline-flex items-center rounded-[10px] bg-[#E9E3FF] px-5 py-2 text-sm font-semibold text-[#3413A8] shadow-sm transition hover:brightness-95"
						>
							Claim Your Health Identity
						</button>
					</div>

					<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 items-center justify-end md:flex">
						<div className="relative h-[220px] w-[220px]">
							<div className="absolute inset-0 rounded-full border-[18px] border-white/10" />
							<div className="absolute inset-6 rounded-full border-[18px] border-white/20" />
							<div className="absolute inset-12 rounded-full border-[18px] border-white/30" />
							<div className="absolute inset-16 rounded-full border-[18px] border-white/50" />
							<div className="absolute inset-20 rounded-full border-[18px] border-white/80" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
