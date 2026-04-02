"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

function StatusInner() {
  const searchParams = useSearchParams();
  const merchantTxnNo = searchParams.get("merchantTxnNo") || "";
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({ open: false, kind: "success", message: "" });
  const completionTriggeredRef = useRef(false);

  useEffect(() => {
    if (!merchantTxnNo) return;
    const loadStatus = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/payments/status/${merchantTxnNo}`);
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Unable to fetch payment status");
        setStatus(result.data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unable to fetch payment status");
      } finally {
        setLoading(false);
      }
    };
    loadStatus();
  }, [merchantTxnNo]);

  useEffect(() => {
    if (!status || completionTriggeredRef.current) return;

    if (status.state === "SUCCESS") {
      completionTriggeredRef.current = true;
      const finalize = async () => {
        try {
          const response = await fetch("/api/user/completeRegistration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ merchantTxnNo }),
          });

          const result = await response.json();
          if (!response.ok || !result.success) {
            throw new Error(result.message || "Unable to save registration after payment.");
          }

          setPopup({
            open: true,
            kind: "success",
            message: "Payment captured and registration saved successfully.",
          });
        } catch (e) {
          setPopup({
            open: true,
            kind: "error",
            message: e instanceof Error ? e.message : "Payment succeeded but registration save failed.",
          });
        }
      };

      finalize();
      return;
    }

    if (["FAILED", "CANCELLED"].includes(status.state)) {
      completionTriggeredRef.current = true;
      setPopup({
        open: true,
        kind: "error",
        message: "Payment was not successful. Please retry from checkout.",
      });
    }
  }, [merchantTxnNo, status]);

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold">Payment Status</h1>
      <p className="mt-2 text-sm text-gray-600">Transaction: {merchantTxnNo || "Not available"}</p>
      {loading ? <p className="mt-6">Payment is processing...</p> : null}
      {error ? <p className="mt-6 text-red-600">{error}</p> : null}
      {status ? (
        <div className="mt-6 rounded-lg border p-4">
          <p>
            <strong>State:</strong> {status.state}
          </p>
          <p>
            <strong>Updated:</strong> {new Date(status.updatedAt).toLocaleString()}
          </p>
          {status.responseMessage ? (
            <p>
              <strong>Gateway message:</strong> {status.responseMessage}
            </p>
          ) : null}
        </div>
      ) : null}

      {popup.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
            <h2 className={`text-xl font-semibold ${popup.kind === "success" ? "text-green-700" : "text-red-700"}`}>
              {popup.kind === "success" ? "Registration Complete" : "Action Required"}
            </h2>
            <p className="mt-3 text-sm text-gray-700">{popup.message}</p>
            <button
              type="button"
              className="mt-5 rounded bg-[#7b1fa2] px-4 py-2 text-white"
              onClick={() => setPopup((current) => ({ ...current, open: false }))}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-xl p-8">Loading payment status...</main>}>
      <StatusInner />
    </Suspense>
  );
}
