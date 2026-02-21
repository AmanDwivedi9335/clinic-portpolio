import Image from "next/image";

const advantageCards = [
  {
    title: "Fewer Repeated Tests",
    icon: "/images/doctors/fordoctor1.svg",
  },
  {
    title: "A Full Picture Of Every Patient",
    icon: "/images/doctors/fordoctor2.svg",
  },
  {
    title: "Higher Patient Trust",
    icon: "/images/doctors/fordoctor3.svg",
  },
  {
    title: "Reduced Liability",
    icon: "/images/doctors/fordoctor4.svg",
  },
  {
    title: "Time Saved In Every Consultation",
    icon: "/images/doctors/fordoctor5.svg",
  },
  {
    title: "Better-Informed Decisions",
    icon: "/images/doctors/fordoctor6.svg",
  },
];

export default function DoctorAdvantage() {
  return (
    <section className="pb-16 pt-6 md:pt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto w-fit rounded-full bg-[linear-gradient(98.79deg,#FACC15_0%,#F87171_33.33%,#A855F7_66.67%,#3B82F6_100%)] p-[1.5px] shadow-sm">
          <div className="rounded-full bg-white px-5 py-1 text-xs font-medium text-[#282672]">
            MediBank&apos;s Advantage
          </div>
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
          className="rounded-2xl p-[1px] bg-[linear-gradient(180deg,#9F028D_0%,#0E1896_105%)] hover:shadow-[0_0_0_1px_rgba(159,2,141,0.35),0_10px_24px_rgba(41,33,125,0.18)] transition-shadow duration-300"
        >
          <div
            className="
              flex min-h-[92px] items-center gap-3
              rounded-2xl bg-white px-4 py-3
              shadow-[0_6px_14px_rgba(41,33,125,0.12)]
            "
          >
            <div className="relative h-14 w-14 shrink-0">
              <Image
                src={card.icon}
                alt={card.title}
                fill
                className="object-contain"
              />
            </div>

            <p className="text-xl font-semibold leading-tight text-[#1B185B] md:text-xl">
              {card.title}
            </p>
          </div>
        </div>
          ))}
        </div>
      </div>
    </section>
  );
}
