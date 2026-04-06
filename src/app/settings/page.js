import {
  FiActivity,
  FiCheckCircle,
  FiCpu,
  FiGrid,
  FiSettings,
  FiTrendingUp,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";

const settingsSections = [
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

const sidebarItems = [
  { id: "pending-tasks", title: "Pending Tasks", icon: FiGrid },
  { id: "raw-leads", title: "Raw Leads", icon: FiTrendingUp },
  { id: "leads", title: "Leads", icon: FiUsers },
  { id: "auto-followups", title: "Auto Follow-ups", icon: FiActivity },
  { id: "ai-setup", title: "AI Setup", icon: FiCpu },
];

export default function SettingsPage() {
  return (
    <main className="pt-[96px] md:pt-[110px] pb-16 bg-[#f5f7ff] min-h-screen">
      <div className="mx-auto w-[95%] max-w-[1200px] grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-[120px] h-fit rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-indigo-100 px-2 pb-4">
            <div className="h-11 w-11 rounded-full bg-[#2f5bd8] text-white font-bold grid place-items-center text-xl">
              K
            </div>
            <div>
              <p className="text-2xl leading-7 font-bold text-[#171717]">TynkWink</p>
              <p className="text-[#6b7280]">Flow with the Lead!</p>
            </div>
          </div>

          <nav className="pt-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg px-2 py-3 text-[#111827]"
                >
                  <Icon size={22} />
                  <span className="text-[22px]">{item.title}</span>
                </div>
              );
            })}

            <button
              type="button"
              className="mt-1 flex w-full items-center gap-3 rounded-lg bg-indigo-50 border border-indigo-100 px-2 py-3 text-[#282672]"
            >
              <FiSettings size={22} />
              <span className="text-xl font-semibold">Settings</span>
            </button>

            <div className="pl-2 pt-1 space-y-1">
              <a
                href="#integrations"
                className="flex items-center gap-3 rounded-lg px-2 py-3 text-[#111827]"
              >
                <FiSettings size={22} />
                <span className="text-[22px]">Integrations</span>
              </a>
              <a
                href="#approval-settings"
                className="flex items-center gap-3 rounded-lg px-2 py-3 text-[#111827]"
              >
                <FiCheckCircle size={22} />
                <span className="text-[22px]">Approval Settings</span>
              </a>
              <a
                href="#staff-permissions"
                className="flex items-center gap-3 rounded-lg px-2 py-3 text-[#111827]"
              >
                <FiUserPlus size={22} />
                <span className="text-[22px]">Staff &amp; Permissions</span>
              </a>
            </div>

            <div className="flex items-center gap-3 rounded-lg px-2 py-3 text-[#111827]">
              <FiTrendingUp size={22} />
              <span className="text-[22px]">Analytics</span>
            </div>
          </nav>
        </aside>

        <section className="space-y-5">
          <div className="rounded-3xl border border-indigo-100 bg-white p-6 md:p-10 shadow-[0_16px_40px_rgba(40,38,114,0.08)]">
            <p className="text-xs tracking-[0.2em] uppercase text-indigo-500 font-semibold">
              Settings
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-[#282672]">
              Workspace Settings
            </h1>
            <p className="mt-4 max-w-3xl text-[#4e4a8f] leading-7">
              Integrations, Approval Settings, and Staff &amp; Permissions are
              grouped under the Settings button in the sidebar.
            </p>
          </div>

          {settingsSections.map((section) => (
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
    </main>
  );
}
