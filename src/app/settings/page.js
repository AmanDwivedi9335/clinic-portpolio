const sections = [
  {
    id: "integrations",
    title: "Integrations",
    description:
      "Connect external systems and automate data exchange securely across your clinic workflows.",
    items: [
      "ABDM / ABHA connectivity for compliant health record exchange.",
      "Lab and diagnostic sync with configurable webhook endpoints.",
      "Billing and payment gateway integrations with status tracking.",
      "Audit logs for every outbound and inbound integration event.",
    ],
  },
  {
    id: "approval-settings",
    title: "Approval Settings",
    description:
      "Control what actions require review, who can approve requests, and how escalation should work.",
    items: [
      "Enable or disable approvals for record edits, exports, and deletions.",
      "Define multi-step approval chains for sensitive workflows.",
      "Set SLA timers, reminders, and automatic escalation rules.",
      "Keep complete approval history for compliance and auditing.",
    ],
  },
  {
    id: "staff-permissions",
    title: "Staff & Permissions",
    description:
      "Assign role-based access and make sure every team member sees only what they need.",
    items: [
      "Role templates for doctors, front-desk, billing, and support teams.",
      "Fine-grained module permissions for patient data and operations.",
      "Department-level restrictions with optional temporary access.",
      "Session security policies such as timeout and re-authentication.",
    ],
  },
];

export default function SettingsPage() {
  return (
    <main className="pt-[96px] md:pt-[110px] pb-16 bg-[#f5f7ff] min-h-screen">
      <div className="mx-auto w-[95%] max-w-[1200px]">
        <div className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-10 shadow-[0_16px_40px_rgba(40,38,114,0.08)]">
          <p className="text-xs tracking-[0.2em] uppercase text-indigo-500 font-semibold">
            Workspace Settings
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#282672]">
            Settings
          </h1>
          <p className="mt-4 max-w-3xl text-[#4e4a8f] leading-7">
            Manage your clinic workspace from one place. Integrations, Approval
            Settings, and Staff &amp; Permissions are available through the
            sidebar menu on this page.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-[120px] h-fit rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
            <h2 className="px-2 pb-3 text-sm font-semibold uppercase tracking-wider text-indigo-500">
              Menu
            </h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-xl border border-transparent bg-indigo-50 px-4 py-3 text-sm font-medium text-[#282672] transition hover:border-indigo-200 hover:bg-indigo-100"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <section className="space-y-5">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-[120px] rounded-2xl border border-indigo-100 bg-white p-6 md:p-8 shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-[#282672]">
                  {section.title}
                </h3>
                <p className="mt-3 text-[#4e4a8f] leading-7">
                  {section.description}
                </p>
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-indigo-100 bg-[#f8f9ff] px-4 py-3 text-[#373280]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
