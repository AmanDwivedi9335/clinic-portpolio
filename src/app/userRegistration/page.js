"use client";
import Image from "next/image";

function HeroWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100vh] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#C9C6EA_0%,#E8C9DF_55%,#F3E6F2_100%)]" />

      {/* TOP BAND */}
      <svg
        className="hero-band hero-band-top absolute inset-x-0 h-[40%] w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >

        <g className="wave-track wave-track-top">
          <path
            d="M0,140 C240,90 520,90 720,135 C940,185 1180,185 1440,135 L1440,0 L0,0 Z"
            fill="#FFFFFF"
            fillOpacity="0.34"
          />
          <path
            d="M1440,135 C1680,90 1960,90 2160,135 C2380,185 2620,185 2880,135 L2880,0 L1440,0 Z"
            fill="#FFFFFF"
            fillOpacity="0.34"
          />
        </g>
      </svg>

      {/* MIDDLE BAND */}
      <svg
        className="hero-band hero-band-mid absolute inset-x-0 top-[24%] h-[50%] w-full"
        viewBox="0 0 1440 340"
        preserveAspectRatio="none"
      >

        <g className="wave-track wave-track-mid">
          <path
            d="M0,155 C260,215 520,215 740,165 C980,110 1210,115 1440,165 L1440,340 L0,340 Z"
            fill="#FFFFFF"
            fillOpacity="0.42"
          />
          <path
            d="M1440,165 C1700,215 1960,215 2180,165 C2420,110 2650,115 2880,165 L2880,340 L1440,340 Z"
            fill="#FFFFFF"
            fillOpacity="0.42"
          />
        </g>
      </svg>

      {/* BOTTOM BAND */}
      <svg
        className="hero-band hero-band-bottom absolute inset-x-0 bottom-0 h-[48%] w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >

        <g className="wave-track wave-track-bottom">
          <path
            d="M0,110 C250,35 520,40 720,105 C950,180 1180,185 1440,115 L1440,320 L0,320 Z"
            fill="#FFFFFF"
            fillOpacity="0.98"
          />
          <path
            d="M1440,115 C1690,35 1960,40 2160,105 C2390,180 2620,185 2880,115 L2880,320 L1440,320 Z"
            fill="#FFFFFF"
            fillOpacity="0.98"
          />
        </g>
      </svg>

      <style jsx>{`
        .hero-band {
          will-change: transform;
          mix-blend-mode: screen;
          animation: bandFloat 7.5s ease-in-out infinite;
        }

        .hero-band-top {
          filter: drop-shadow(0 10px 28px rgba(255, 255, 255, 0.45));
        }

        .hero-band-mid {
          filter: drop-shadow(0 12px 30px rgba(255, 255, 255, 0.5));
          animation-delay: -1.8s;
        }

        .hero-band-bottom {
          filter: drop-shadow(0 14px 30px rgba(255, 255, 255, 0.55));
          animation-delay: -3.4s;
        }

        .wave-track {
          will-change: transform;
          transform: translateX(0);
        }

        .wave-track-top {
          animation: waveSlideLeft 12s linear infinite;
        }

        .wave-track-mid {
          animation: waveSlideRight 15s linear infinite;
        }

        .wave-track-bottom {
          animation: waveSlideLeft 9s linear infinite;
        }

        @keyframes bandFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, 12px, 0);
          }
        }

        @keyframes waveSlideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-1440px);
          }
        }

        @keyframes waveSlideRight {
          0% {
            transform: translateX(-1440px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
export default function UserRegistrationPage() {
	return (
		<main className="relative mt-[88px] overflow-hidden bg-gradient-to-b from-[#eef4ff] via-[#f8eefe] to-white px-4 py-12 md:py-16">
			<HeroWaveBackground />
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-[#d81b60]/20 blur-3xl" />
				<div className="absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-[#3b0aa3]/20 blur-3xl" />
			</div>

			<section className="relative mx-auto w-full max-w-5xl rounded-3xl border border-white/60 bg-white/80 p-4 shadow-[0_20px_60px_rgba(59,10,163,0.14)] backdrop-blur-sm sm:p-8 md:p-10">
				<div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
					<div className="rounded-2xl bg-gradient-to-br from-[#d81b60] via-[#7b1fa2] to-[#3b0aa3] p-6 text-white md:p-8">
						<p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs tracking-[0.14em] text-white/90">
							CREATE YOUR HEALTH IDENTITY
						</p>
						<h1 className="font-aptos-black text-3xl leading-tight md:text-4xl">
							Quick User Registration
						</h1>
						<p className="mt-4 max-w-md text-sm text-white/85 md:text-base">
							Register in a few steps and keep your medical records secure,
							portable, and always in your control.
						</p>

						<div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4">
							
							<button
								type="button"
								className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-aptos-extrabold text-[#5310a2] shadow-lg transition hover:brightness-105"
							>
								<span>Register with</span>
								<Image 
										src="/images/aadhar.png"
										alt="aadhar image"
										width={40}
										height={30}
									/>
							</button>
							<div className="my-4 flex items-center gap-3 text-sm text-white/75">
								<span className="h-px flex-1 bg-white/30" />
								or
								<span className="h-px flex-1 bg-white/30" />
							</div>
							<p className="text-sm text-white/90">Click on me to fill details manually →</p>
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
