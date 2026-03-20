import React from "react";

const termSections = [
  {
    title: "1. Definitions",
    points: [
      "“Medibank” / “We” / “Our” / “Us” refers to the Medibank platform and its operators.",
      "“User” / “You” refers to any individual or entity using the Platform.",
      "“Services” include digital health identity creation, record storage, sharing, doctor portals, and related features.",
      "“Health Data” refers to any medical, personal, or health-related information uploaded or generated.",
    ],
  },
  {
    title: "2. Eligibility",
    intro: "You must:",
    points: [
      "Be at least 18 years old, or use the platform under parental/guardian supervision.",
      "Provide accurate and complete information during registration.",
      "Comply with all applicable laws in India.",
    ],
  },
  {
    title: "3. Nature of Service",
    intro: "Medibank provides:",
    points: [
      "A digital health identity system",
      "Secure storage of medical records",
      "Sharing of records with consent-based access",
      "Integration with healthcare providers (ABDM-aligned where applicable)",
    ],
    noteTitle: "Important:",
    note:
      "Medibank does NOT provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional.",
  },
  {
    title: "4. User Responsibilities",
    intro: "You agree to:",
    points: [
      "Maintain confidentiality of your login credentials",
      "Provide accurate medical and personal data",
      "Use the platform only for lawful purposes",
      "Not misuse, hack, or disrupt the system",
    ],
    outro: "You are solely responsible for:",
    outroPoints: [
      "Any data you upload",
      "Any access granted via your account",
    ],
  },
  {
    title: "5. Consent & Data Usage",
    intro: "By using Medibank, you:",
    points: [
      "Provide explicit consent to store and process your health data",
      "Authorize Medibank to store your records securely",
      "Authorize Medibank to share data with healthcare providers only with your consent",
      "Can revoke consent anytime via platform controls",
    ],
    outro: "We follow:",
    outroPoints: [
      "Consent-based data sharing",
      "Minimal data processing principles",
    ],
  },
  {
    title: "6. Data Security",
    intro: "We implement:",
    points: [
      "AES-256 encryption",
      "Secure cloud infrastructure",
      "Role-based access controls",
      "Audit logs for all activities",
    ],
    outro: "However, you acknowledge:",
    outroPoints: [
      "No system is 100% secure",
      "You use the platform at your own risk",
    ],
  },
  {
    title: "7. Intellectual Property",
    intro: "All rights related to:",
    points: ["Software", "Design", "Branding", "Content"],
    outro: "are owned by Medibank. You may NOT:",
    outroPoints: [
      "Copy, modify, or reverse-engineer the platform",
      "Use Medibank branding without permission",
    ],
  },
  {
    title: "8. Third-Party Integrations",
    intro: "Medibank may integrate with:",
    points: [
      "Government systems (e.g., ABDM/ABHA)",
      "Hospitals, labs, and doctors",
      "External APIs",
    ],
    outro: "We are not responsible for:",
    outroPoints: [
      "Data accuracy from third parties",
      "Downtime or failures of external services",
    ],
  },
  {
    title: "9. Limitation of Liability",
    intro: "Medibank is not liable for:",
    points: [
      "Medical decisions taken based on stored data",
      "Loss due to incorrect data entered by users",
      "Service interruptions or downtime",
      "Unauthorized access caused by user negligence",
    ],
    outro: "Maximum liability (if applicable) is limited to:",
    outroPoints: ["Amount paid (if any) for services"],
  },
  {
    title: "10. Account Suspension / Termination",
    intro: "We may suspend or terminate your account if:",
    points: [
      "You violate these Terms",
      "Fraudulent or suspicious activity is detected",
      "Legal compliance requires it",
    ],
    paragraph: "You may also delete your account anytime.",
  },
  {
    title: "11. Data Retention & Deletion",
    points: [
      "Your data is retained as long as your account is active",
      "Upon deletion, data may be deleted or anonymized",
      "Some records may be retained for legal compliance",
    ],
  },
  {
    title: "12. Compliance with Laws",
    intro: "Medibank operates in compliance with:",
    points: [
      "Information Technology Act, 2000 (India)",
      "Applicable data protection laws",
      "ABDM guidelines (where integrated)",
    ],
  },
  {
    title: "13. Modifications to Terms",
    paragraph: "We may update these Terms from time to time.",
    points: [
      "Updates will be posted on the platform",
      "Continued use = acceptance of updated Terms",
    ],
  },
  {
    title: "14. Governing Law & Jurisdiction",
    points: ["These Terms are governed by the laws of India."],
    paragraph: "Jurisdiction: Courts of Hyderabad",
  },
  {
    title: "15. Contact Information",
    paragraph: "For any questions or concerns:",
    contact: [
      "Medibank Support Team",
      "Email: support@medibank.in",
      "Website: https://medibank.in",
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <div className="mt-[100px] bg-[#F8FAFF] py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-[32px] bg-white px-6 py-10 shadow-[0_12px_50px_rgba(13,11,76,0.08)] md:px-10 md:py-14">
          <div className="border-b border-[#E6EAF7] pb-8">
            <span className="inline-flex rounded-full bg-[#EEF1FF] px-4 py-1 text-sm font-medium text-[#3024AE]">
              Legal
            </span>
            <h1 className="mt-4 text-3xl font-bold text-[#0D0B4C] md:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-base leading-7 text-[#4B4F7B] md:text-lg">
              Welcome to Medibank. These Terms &amp; Conditions (“Terms”) govern your access to and use of the Medibank platform, including our website, mobile applications, and related services (collectively, the “Platform”).
            </p>
            <p className="mt-3 text-base leading-7 text-[#4B4F7B]">
              By accessing or using Medibank, you agree to be bound by these Terms.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm font-medium text-[#1D225B] md:flex-row md:gap-8">
              <p>Effective Date: 20-03-2026</p>
              <p>Last Updated: 20-03-2026</p>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {termSections.map((section) => (
              <section
                key={section.title}
                className="rounded-3xl border border-[#E9ECF8] bg-[#FCFDFF] p-6 md:p-8"
              >
                <h2 className="text-2xl font-semibold text-[#0D0B4C]">{section.title}</h2>

                {section.intro && (
                  <p className="mt-4 text-base leading-7 text-[#4B4F7B]">{section.intro}</p>
                )}

                {section.paragraph && (
                  <p className="mt-4 text-base leading-7 text-[#4B4F7B]">{section.paragraph}</p>
                )}

                {section.points && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-[#1D225B] marker:text-[#5C4AFF]">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}

                {section.note && (
                  <div className="mt-5 rounded-2xl border border-[#FFE0B2] bg-[#FFF8EE] px-5 py-4 text-[#8A4B00]">
                    <p className="font-semibold">⚠️ {section.noteTitle}</p>
                    <p className="mt-2 text-base leading-7">{section.note}</p>
                  </div>
                )}

                {section.outro && (
                  <p className="mt-5 text-base leading-7 text-[#4B4F7B]">{section.outro}</p>
                )}

                {section.outroPoints && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-[#1D225B] marker:text-[#5C4AFF]">
                    {section.outroPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}

                {section.contact && (
                  <div className="mt-4 space-y-2 text-base leading-7 text-[#1D225B]">
                    {section.contact.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
