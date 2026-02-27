export default function UserRegistrationPage() {
	return (
		<main className="relative mt-[88px] overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f8eefe] to-white px-4 py-12 md:py-16">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#d81b60]/20 blur-3xl" />
				<div className="absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-[#3b0aa3]/20 blur-3xl" />
			</div>

			<section className="relative mx-auto w-full max-w-5xl rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_20px_60px_rgba(59,10,163,0.14)] backdrop-blur-sm sm:p-8 md:p-10">
				<div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
					<div className="rounded-2xl bg-gradient-to-br from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] p-6 text-white md:p-8">
						<p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs tracking-[0.14em] text-white/90">
							HEALTH IDENTITY
						</p>
						<h1 className="font-aptos-black text-3xl leading-tight md:text-4xl">
							Quick User Registration
						</h1>
						<p className="mt-4 max-w-md text-sm text-white/85 md:text-base">
							Register in a few steps and keep your medical records secure,
							portable, and always in your control.
						</p>

						<div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4">
							<p className="text-xs tracking-[0.16em] text-white/80">
								REGISTER WITH
							</p>
							<button
								type="button"
								className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-aptos-extrabold text-[#5310a2] shadow-lg transition hover:brightness-105"
							>
								<span aria-hidden="true">🪪</span>
								<span>Aadhaar Sign-Up</span>
							</button>
							<div className="my-4 flex items-center gap-3 text-sm text-white/75">
								<span className="h-px flex-1 bg-white/30" />
								or
								<span className="h-px flex-1 bg-white/30" />
							</div>
							<p className="text-sm text-white/90">Use the First Initial Form →</p>
						</div>
					</div>

					<form className="grid gap-4 rounded-2xl bg-white p-2 sm:grid-cols-2">
						<div className="sm:col-span-2">
							<label className="mb-1 block text-sm text-[#2b2b43]">Full Name</label>
							<input className="w-full rounded-xl border border-[#ddd9f5] bg-[#faf9ff] px-4 py-3 outline-none transition focus:border-[#7b1fa2] focus:ring-2 focus:ring-[#7b1fa2]/20" type="text" placeholder="Enter your full name" />
						</div>

						<div>
							<label className="mb-1 block text-sm text-[#2b2b43]">DOB</label>
							<input className="w-full rounded-xl border border-[#ddd9f5] bg-[#faf9ff] px-4 py-3 outline-none transition focus:border-[#7b1fa2] focus:ring-2 focus:ring-[#7b1fa2]/20" type="date" />
						</div>

						<div>
							<label className="mb-1 block text-sm text-[#2b2b43]">Sex / Gender</label>
							<select className="w-full rounded-xl border border-[#ddd9f5] bg-[#faf9ff] px-4 py-3 outline-none transition focus:border-[#7b1fa2] focus:ring-2 focus:ring-[#7b1fa2]/20">
								<option value="">Select</option>
								<option>Female</option>
								<option>Male</option>
								<option>Other</option>
							</select>
						</div>

						<div>
							<label className="mb-1 block text-sm text-[#2b2b43]">Mobile Number</label>
							<input className="w-full rounded-xl border border-[#ddd9f5] bg-[#faf9ff] px-4 py-3 outline-none transition focus:border-[#7b1fa2] focus:ring-2 focus:ring-[#7b1fa2]/20" type="tel" placeholder="10-digit mobile number" />
						</div>

						<div>
							<label className="mb-1 block text-sm text-[#2b2b43]">Email</label>
							<input className="w-full rounded-xl border border-[#ddd9f5] bg-[#faf9ff] px-4 py-3 outline-none transition focus:border-[#7b1fa2] focus:ring-2 focus:ring-[#7b1fa2]/20" type="email" placeholder="you@example.com" />
						</div>

						<div>
							<label className="mb-1 block text-sm text-[#2b2b43]">City / Town</label>
							<input className="w-full rounded-xl border border-[#ddd9f5] bg-[#faf9ff] px-4 py-3 outline-none transition focus:border-[#7b1fa2] focus:ring-2 focus:ring-[#7b1fa2]/20" type="text" placeholder="Enter city or town" />
						</div>

						<div>
							<label className="mb-1 block text-sm text-[#2b2b43]">State</label>
							<input className="w-full rounded-xl border border-[#ddd9f5] bg-[#faf9ff] px-4 py-3 outline-none transition focus:border-[#7b1fa2] focus:ring-2 focus:ring-[#7b1fa2]/20" type="text" placeholder="Enter state" />
						</div>

						<button
							type="submit"
							className="sm:col-span-2 mt-3 rounded-xl bg-gradient-to-r from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] px-6 py-3 text-base font-aptos-extrabold text-white shadow-[0_12px_30px_rgba(123,31,162,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(216,27,96,0.4)]"
						>
							Register
						</button>
					</form>
				</div>
			</section>
		</main>
	);
}
