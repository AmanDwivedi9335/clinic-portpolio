"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PLANS = [
  { id: "basic", name: "Basic", amountPaise: 49900 },
  { id: "pro", name: "Pro", amountPaise: 99900 },
  { id: "family", name: "Family", amountPaise: 149900 },
];

function CheckoutInner() {
  const params = useSearchParams();
  const router = useRouter();

  const [selectedPlanId, setSelectedPlanId] = useState(PLANS[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registrationId = params.get("registrationId") || "";
  const fullName = params.get("fullName") || "";
  const email = params.get("email") || "";
  const mobile = params.get("mobile") || "";
  const storage = params.get("storage") || "memory";

  const selectedPlan = useMemo(() => PLANS.find((plan) => plan.id === selectedPlanId) || PLANS[0], [selectedPlanId]);

  const handlePayNow = async () => {
    setError("");
    if (!registrationId || !fullName || !email || !mobile) {
      setError("Missing registration details. Please restart registration.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/payments/icici/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId,
          planId: selectedPlan.id,
          amountPaise: selectedPlan.amountPaise,
          customerName: fullName,
          customerEmail: email,
          customerMobile: mobile,
        }),
      });

      const result = await response.json();
      const redirectUrl =
        result?.data?.redirectUrl ||
        (result?.error?.gateway?.redirectURI && result?.error?.gateway?.tranCtx
          ? `${result.error.gateway.redirectURI}?tranCtx=${encodeURIComponent(result.error.gateway.tranCtx)}`
          : "");

      if (!redirectUrl) {
        throw new Error(result.message || "Unable to start payment");
      }

      window.location.assign(redirectUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold">Step 2: Choose your plan</h1>
      <p className="mt-2 text-sm text-gray-600">
        Registration ID: {registrationId || "-"} (stored temporarily in {storage === "redis" ? "Redis" : "in-memory fallback"} until payment
        completes)
      </p>
      <div className="mt-6 space-y-3">
        {PLANS.map((plan) => (
          <label key={plan.id} className="flex cursor-pointer items-center justify-between rounded-lg border p-4">
            <span>
              <strong>{plan.name}</strong>
              <span className="ml-2 text-gray-600">₹{(plan.amountPaise / 100).toFixed(2)}</span>
            </span>
            <input type="radio" name="plan" value={plan.id} checked={selectedPlanId === plan.id} onChange={() => setSelectedPlanId(plan.id)} />
          </label>
        ))}
      </div>
      {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
      <button className="mt-6 rounded bg-[#7b1fa2] px-5 py-3 text-white disabled:opacity-60" onClick={handlePayNow} disabled={loading}>
        {loading ? "Starting payment..." : `Pay Now ₹${(selectedPlan.amountPaise / 100).toFixed(2)}`}
      </button>
      <p className="mt-3 text-xs text-gray-500">Payment success/failure is verified server-side before final status is shown.</p>
      <button className="ml-4 mt-6 rounded border px-5 py-3" onClick={() => router.push("/userRegistration")} type="button">
        Back
      </button>
    </main>
  );
}

export default function PaymentCheckoutPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-xl p-8">Loading checkout...</main>}>
      <CheckoutInner />
    </Suspense>
  );
}
