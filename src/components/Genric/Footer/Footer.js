import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Clock3 } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-[#F7F8FC] text-[#0D0B4C]">
			<div className="container mx-auto px-6 py-14">
				<div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_0.9fr]">
					<div className="space-y-5">
						<Image
							src="/images/medibank-logo.png"
							alt="MediBank logo"
							width={182}
							height={85}
							loading="lazy"
						/>
						<p className="text-base md:text-[25px] text-[#1D225B] leading-tight max-w-sm">
							India&apos;s First Health Identity Infrastructure™. Your complete medical history—secure, portable, and always with you.
						</p>
					</div>

					<div className="space-y-4">
						<h4 className="text-2xl md:text-[32px] font-semibold">Contact Us</h4>
						<ul className="space-y-3 text-base md:text-[22px] text-[#1D225B]">
							<li className="flex items-center gap-2.5">
								<Mail size={20} strokeWidth={1.8} />
								<a
									href="mailto:team@signelbiomedical.com"
									className="hover:text-[#5C4AFF]"
								>
									team@signelbiomedical.com
								</a>
							</li>
							<li className="flex items-center gap-2.5">
								<Phone size={20} strokeWidth={1.8} />
								<a
									href="tel:+918919117478"
									className="hover:text-[#5C4AFF]"
								>
									+91 8919117478
								</a>
							</li>
							<li className="flex items-center gap-2.5">
								<Clock3 size={20} strokeWidth={1.8} />
								<span>Mon–Sat | 10 AM to 7 PM</span>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="text-2xl md:text-[32px] font-semibold">Quick Links</h4>
						<ul className="list-disc pl-5 space-y-3 text-base md:text-[22px] text-[#1D225B]">
							<li>
								<Link href="/account" className="hover:text-[#5C4AFF]">
									My Account
								</Link>
							</li>
							<li>
								<Link href="/how-it-works" className="hover:text-[#5C4AFF]">
									How it Works?
								</Link>
							</li>
							<li>
								<Link href="/knowledge-center" className="hover:text-[#5C4AFF]">
									Knowledge Center
								</Link>
							</li>
							<li>
								<Link href="/faq" className="hover:text-[#5C4AFF]">
									FAQs
								</Link>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="text-2xl md:text-[32px] font-semibold">Follow Us:</h4>
						<div className="flex gap-3">
							<Link
								href="https://www.whatsapp.com/"
								className="flex h-12 w-12 items-center justify-center"
							>
								<Image
									src="/images/wa.png"
									alt="WhatsApp"
									width={44}
									height={44}
									loading="lazy"
								/>
							</Link>
							<Link
								href="https://instagram.com/"
								className="flex h-12 w-12 items-center justify-center"
							>
								<Image
									src="/images/instaMedi.png"
									alt="Instagram"
									width={44}
									height={44}
									loading="lazy"
								/>
							</Link>
							<Link
								href="https://x.com/"
								className="flex h-12 w-12 items-center justify-center"
							>
								<Image
									src="/images/twitter.png"
									alt="Twitter"
									width={44}
									height={44}
									loading="lazy"
								/>
							</Link>
							<Link
								href="https://linkedin.com/"
								className="flex h-12 w-12 items-center justify-center"
							>
								<Image
									src="/images/LlinkedInMedi.png"
									alt="LinkedIn"
									width={44}
									height={44}
									loading="lazy"
								/>
							</Link>
						</div>
					</div>
				</div>

				<div className="mt-14 border-t border-[#CDD2E7] pt-6 text-base md:text-[30px] text-[#1D225B] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p>© 2024 MediBank. All rights reserved.</p>
					<p>
						Made with <span className="text-[#6A14C9]">❤</span> in India
					</p>
				</div>
			</div>
		</footer>
	);
}
