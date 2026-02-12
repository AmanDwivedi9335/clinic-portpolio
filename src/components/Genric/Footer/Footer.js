import Link from "next/link";
import Image from "next/image";

export default function Footer() {
	return (
		<footer className="bg-white text-[#0D0B4C]">
			<div className="container mx-auto px-6 py-12">
				<div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr]">
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<Image
								src="/images/MLicon.png"
								alt="MediBank logo"
								width={62}
								height={62}
								loading="lazy"
							/>
							<div>
								<p className="text-lg font-semibold leading-tight">MediBank</p>
								<p className="text-sm text-[#6B6B8F]">
									India&apos;s First Health Identity Infrastructure™
								</p>
							</div>
						</div>
						<p className="text-sm text-[#6B6B8F] leading-relaxed max-w-sm">
							Your complete medical history—secure, portable, and always with you.
						</p>
					</div>

					<div className="space-y-4">
						<h4 className="text-base font-semibold">Contact Us</h4>
						<ul className="space-y-3 text-sm text-[#3D3D66]">
							<li className="flex items-start gap-2">
								<span className="mt-0.5">✉️</span>
								<a
									href="mailto:contact@medibank.in"
									className="hover:text-[#5C4AFF]"
								>
									contact@medibank.in
								</a>
							</li>
							<li className="flex items-start gap-2">
								<span className="mt-0.5">📞</span>
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
						<h4 className="text-base font-semibold">Quick Links</h4>
						<ul className="space-y-3 text-sm text-[#3D3D66]">
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
						<h4 className="text-base font-semibold">Follow Us:</h4>
						<div className="flex gap-3">
							<Link
								href="https://www.whatsapp.com/"
								className="flex h-10 w-10 items-center justify-center"
							>
								<Image
									src="/images/wa.png"
									alt="WhatsApp"
									width={24}
									height={24}
									loading="lazy"
								/>
							</Link>
							<Link
								href="https://instagram.com/"
								className="flex h-10 w-10 items-center justify-center"
							>
								<Image
									src="/images/instaMedi.png"
									alt="Instagram"
									width={24}
									height={24}
									loading="lazy"
								/>
							</Link>
							<Link
								href="https://x.com/"
								className="flex h-10 w-10 items-center justify-center"
							>
								<Image
									src="/images/twitter.png"
									alt="Twitter"
									width={24}
									height={24}
									loading="lazy"
								/>
							</Link>
							<Link
								href="https://linkedin.com/"
								className="flex h-10 w-10 items-center justify-center"
							>
								<Image
									src="/images/LlinkedInMedi.png"
									alt="LinkedIn"
									width={24}
									height={24}
									loading="lazy"
								/>
							</Link>
						</div>
					</div>
				</div>

				<div className="mt-10 border-t border-[#E8E8F2] pt-6 text-sm text-[#6B6B8F] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p>© 2024 MediBank. All rights reserved.</p>
					<p>
						Made with <span className="text-[#5C4AFF]">❤</span> in India
					</p>
				</div>
			</div>
		</footer>
	);
}
