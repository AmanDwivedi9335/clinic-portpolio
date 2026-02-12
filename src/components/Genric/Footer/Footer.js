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
							width={122}
							height={85}
							loading="lazy"
						/>
						<p className="text-base md:text-[15px] text-[#1D225B] leading-tight max-w-sm">
							India&apos;s First Health Identity Infrastructure™. Your complete medical history—secure, portable, and always with you.
						</p>
					</div>

					<div className="space-y-4">
						<h4 className="text-2xl md:text-[20px] font-semibold">Contact Us</h4>
						<ul className="space-y-3 text-base md:text-[15px] text-[#1D225B]">
							<li className="flex items-center gap-2.5">
								<Mail size={20} strokeWidth={1.8} />
								<a
									href="mailto:contact@medibank.in"
									className="hover:text-[#5C4AFF]"
								>
									contact@medibank.in
								</a>
							</li>
							<li className="flex items-center gap-2.5">
								<Phone size={20} strokeWidth={1.8} />
								<a
									href="tel:+919959095217"
									className="hover:text-[#5C4AFF]"
								>
									+91 9959095217
								</a>
							</li>
							
						</ul>
					</div>

					<div className="space-y-4">
						<h4 className="text-2xl md:text-[20px] font-semibold">Quick Links</h4>
						<ul className="list-disc pl-5 space-y-3 text-base md:text-[15px] text-[#1D225B]">
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
						<h4 className="text-2xl md:text-[20px] font-semibold">Follow Us:</h4>
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

				<div className="mt-14 border-t border-[#CDD2E7] pt-6 text-base md:text-[20px] text-[#1D225B] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p>© 2026 MediBank. All rights reserved.</p>
					<p className="text-sm text-white">
						Made with{" "}
						<span
							className="
							inline-block
							bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)]
							bg-clip-text
							text-transparent
							"
							aria-hidden="true"
						>
							❤
						</span>{" "}
						in India
					</p>

				</div>
			</div>
		</footer>
	);
}
