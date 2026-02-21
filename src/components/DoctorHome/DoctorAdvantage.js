import Image from "next/image";

const advantageCards = [
  {
    title: "Fewer Repeated Tests",
    icon: "/images/labtest.png",
  },
  {
    title: "A Full Picture Of Every Patient",
    icon: "/images/doctornotes.png",
  },
  {
    title: "Higher Patient Trust",
    icon: "/images/doctorIcon.png",
  },
  {
    title: "Reduced Liability",
    icon: "/images/labreport.png",
  },
  {
    title: "Time Saved In Every Consultation",
    icon: "/images/scans.png",
  },
  {
    title: "Better-Informed Decisions",
    icon: "/images/diagnosis.png",
  },
];

export default function DoctorAdvantage() {
  return (
    <section className="pb-16 pt-6 md:pt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto w-fit rounded-full border border-[#8B5CF6] bg-white px-5 py-1 text-xs font-medium text-[#282672] shadow-sm">
          MediBank&apos;s Advantage
        </div>

        <h2 className="mt-4 text-center text-3xl font-extrabold text-wave md:text-5xl">
          MediBank Eliminates Uncertainty.
        </h2>
        <p className="mt-2 text-center text-sm text-[#1E1B6A] md:text-lg">
          You see the whole patient, not fragments.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantageCards.map((card) => (
            <div
              key={card.title}
              className="flex min-h-[92px] items-center gap-3 rounded-2xl border border-[#d291ff] bg-white px-4 py-3 shadow-[0_6px_14px_rgba(41,33,125,0.12)]"
            >
              <div className="relative h-14 w-14 shrink-0">
                <Image src={card.icon} alt={card.title} fill className="object-contain" />
              </div>
              <p className="text-xl font-semibold leading-tight text-[#1B185B] md:text-2xl">
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
