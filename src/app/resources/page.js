import React from "react";
import Image from "next/image";
import Blogsection from "@/components/Home/Blogsection";
export default function page() {
	return (
		<div className="mt-[100px]">
			<div id="resources1" className="bg-white py-2 md:px-16 px-8">
				<h1 className="text-[34px] sm:text-[42px] font-semibold text-[#1B1570]">
					Resources
				</h1>
				
				<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
					<div className="text-[13px] leading-[1.55] text-[#1D2A65] md:text-[16px] md:w-[58%] text-justify">
						<div className="text-left text-[22px] font-semibold py-3 text-[#1B1570]">
							ABHA / ABDM
						</div>
						Ayushman Bharat Digital Mission (ABDM) aims to develop the backbone
						necessary to support the integrated digital health infrastructure of
						the country. It will bridge the existing gap amongst different
						stakeholders of healthcare ecosystem through digital highways. ABHA
						(Ayushman Bharat Health Account), created as part of ABDM number is
						a 14-digit number that will uniquely identify you as a participant
						in India’s digital healthcare ecosystem. ABHA number will establish
						a strong and trustable identity for you that will be accepted by
						healthcare providers across the country. It also helps you to link
						all healthcare benefits ranging from public health programmes to
						insurance schemes to your unique ABHA number and avoid long lines
						for registration at HFR registered healthcare facilities across the
						country. If you haven’t already, you can generate your ABHA number
						directly from the government website using the link below.

						<div className="mt-7 md:mt-8 text-left">
							<a
								href="https://abha.abdm.gov.in/abha/v3/register"
								target="__blank"
								className="inline-flex items-center justify-center rounded-[10px] bg-gradient-to-r from-[#1D17AE] to-[#8E2DE2] px-6 py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(59,36,184,0.35)] transition-transform duration-200 hover:scale-[1.02]"
							>
								Register Now
							</a>
						</div>
					</div>
					<div className="md:w-[42%]">
						<div className="overflow-hidden rounded-[16px] ">
							<Image
								src="/images/abha-pic.png"
								className="h-full w-full object-cover"
								alt="ABHA and ABDM awareness"
								width="640"
								height="1511"				
							/>
						</div>
					</div>
				</div>
			</div>
			<div id="resources2" className="bg-white text-black py-10 px-16">
				<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
					<div className="text-[13px] leading-[1.55] text-[#1D2A65] md:text-[16px] md:w-[58%] text-justify">
						<div className="text-left text-[22px] font-semibold py-3 text-[#1B1570]">
							Health Guides
						</div>
						At Medibank we are not only working on improving healthcare
						co-ordination in India, but also want to educate people about
						healthy lifestyle options, tips and precautions that can be taken to
						avoid falling sick in the first place. This section of ours is a
						knowledge base of articles curated from various sources like
						Doctors, medical journals, research papers and other trustworthy
						sites that can help users to prevent a lot of common problems and
						lead a healthy lifestyle. Kindly note that this is only a place of
						general advice and knowledge as each individual situation is
						different and for specific individual needs, please consult a
						doctor.
					</div>
					<div className="md:w-[42%] relative">
						<div className="overflow-hidden rounded-[16px]">
						<Image
							src="/images/healthResources.png"
							className="h-full w-full object-cover"
							alt="she"
							width="640"
							height="1511"
						/>
						</div>

						<a href="/health-guides">
							<div className="absolute bottom-0 right-0 ">
								<Image
									src="/images/healthResourcesBtn.png"
									className=""
									alt="she"
									width="112"
									height="50"
								/>
							</div>
						</a>
					</div>
				</div>
				{/* <div className='text-center my-14'>
            <a href='https://abha.abdm.gov.in/abha/v3/register' target='__blank' className='bg-blue-400 p-4 text-white rounded'>Register Now</a>
        </div> */}
			</div>
			<div id="resources3">
				<Blogsection />
			</div>
			<div id="resources4" className="bg-white text-black py-10 px-16">
				<div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
					<div className="text-[13px] leading-[1.55] text-[#1D2A65] md:text-[16px] md:w-[58%] text-justify">
						<div className="text-left text-[22px] font-semibold py-3 text-[#1B1570]">
							Privacy Policy
						</div>
						We understand the sensitive nature of health data and peoples
						concern around the safety of their personal data and health records.
						That’s why, we are developing MediBank on HL7 FHIR standards so it
						is designed to be flexible, adaptable and can be used in a wide
						range of settings with different health care information systems.
						This done in combination with an AES-256bit encryption which is
						currently the strongest and commonly used encryption method. We have
						also put in place multi factor authentication protocols to ensure no
						health record or data is accessed without user permission. Our
						privacy policy clearly explains all that a user needs to know about
						what information we collect, how we store it, use it and share it
						with. Please click below to read more about it.
						<div className="mt-7 md:mt-8 text-left">
							<a
								href="/privacy-policy"
								className="inline-flex items-center justify-center rounded-[10px] bg-gradient-to-r from-[#1D17AE] to-[#8E2DE2] px-6 py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(59,36,184,0.35)] transition-transform duration-200 hover:scale-[1.02]"
							>
								Read More
							</a>
						</div>
					</div>
					<div className="md:w-[42%]">
						<div className="overflow-hidden rounded-[16px]">
							<Image
								src="/images/privacy.png"
								className="h-full w-full object-cover"
								alt="she"
								width="640"
								height="1511"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
