"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
		var element = document.getElementById("burger");
		if (!isMobileMenuOpen) {
			element.innerHTML = "x";
		} else {
			element.innerHTML = "☰";
		}
	};

	const data = [
		{ url: "/", name: "Home" },
		{ url: "/partners", name: "Partners" },
		{ url: "/resources", name: "Resources" },
		{ url: "/about", name: "About Us" },
		{ url: "/blog", name: "Blog" },
		{ url: "/login", name: "Login" },
	];

	const menu = (
		<>
			{data.map((item, index) => {
				return (
					<a
						key={index}
						href={item.url}
						className="underline-offset-2 hover:underline bg-gradient-to-r from-purple-500 via-red-500 to-blue-700 bg-clip-text text-transparent shadow-md p-1 pl-4 font-semibold rounded-[10px] border"
					>
						{item.name}
					</a>
				);
			})}
		</>
	);

	return (
		<header className="fixed left-1/2 top-3 z-50 w-[96%] max-w-7xl -translate-x-1/2 md:top-4">
			{/* pill conatainer */}
			<div className="rounded-[50px] border border-white/60 bg-white/70 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
				{/* items container */}
				<div className="flex h-[68px] items-center px-4 md:h-[72px] md:px-8">
					<a href="/" className="flex items-center gap-2">
						<Image
							src="/images/ml_logo.png"
							alt="Medibank Logo"
							width={110}
							height={40}
							className="h-auto w-[110px]"
							priority
						/>
					</a>

					{/* desktop menu */}
					<nav className="hidden text-[#282672] hover:text-[#0B137A] lg:flex items-center ml-auto gap-14 text-[15px] font-semibold text-[#0d0d0d]">
						<a href="/" className="flex items-center gap-1 hover:opacity-70">
							Home <FiArrowUpRight size={18} color="282672"/>
						</a>

						<a href="/partners" className="flex items-center gap-1 hover:opacity-70">
							Partners <FiArrowUpRight size={18} />
						</a>

						<div className="relative group">
							<a href="/resources" className="flex items-center gap-1 hover:opacity-70">
								Resources <FiArrowUpRight size={18} />
							</a>
							<div className="absolute left-0 top-[42px] hidden group-hover:block w-[220px] rounded-2xl bg-white shadow-xl border p-3">
								<a className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/resources#resources1">ABHA / ABDM</a>
								<a className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/resources#resources2">Health Guides</a>
								<a className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/resources#resources3">Blog</a>
								<a className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/resources#resources4">Privacy policy</a>
							</div>
						</div>

						<div className="relative group">
							<a href="/about" className="flex items-center gap-1 hover:opacity-70">
								About Us <FiArrowUpRight size={18} />
							</a>
							<div className="absolute left-0 top-[42px] hidden group-hover:block w-[220px] rounded-2xl bg-white shadow-xl border p-3">
								<a className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/about#about1">Our Story</a>
								<a className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/about#about2">Our Team</a>
								<a className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/about#about3">Careers</a>
								<a className="block rounded-xl px-3 py-2 hover:bg-gray-50" href="/about#about4">Contact Us</a>
							</div>
						</div>

					</nav>

					{/* mobile menu button */}
					<button 
						className="ml-auto px-2 text-[30px] leading-none text-[#1d4ed8] lg:hidden"
						onClick={() => setIsMobileMenuOpen((s) => !s)}
						aria-label="Open menu"
					>
						{isMobileMenuOpen ? "×" : "☰"}	
					</button>
				</div>

				{/* Mobile menu	 */}
				<div
					className={`lg:hidden overflow-hidden transition-all duration-300 ${
						isMobileMenuOpen ? "max-h-[420px] pb-4" : "max-h-0"
					}`}
				>
					<div className="px-4 flex flex-col gap-2">
						{[
							{url: "/", name: "Home"},
							{url: "/partners", name: "Partners"},
							{url: "/resources", name: "Resources"},
							{url: "/about", name: "About Us"},
							{url: "/blog", name: "Blog"},
						].map((item) =>(
							<a
								key={item.name}
								href={item.url}
								className="rounded-2xl border bg-white px-4 py-3 font-semibold"
							>
								{item.name}
							</a>
						))}
					</div>
				</div>
			</div>
		</header>
		
	);
}
