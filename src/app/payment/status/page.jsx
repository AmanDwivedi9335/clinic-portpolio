"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function StatusInner() {
  const searchParams = useSearchParams();
  const merchantTxnNo = searchParams.get("merchantTxnNo") || "";
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold">Payment Status</h1>
      <p className="mt-2 text-sm text-gray-600">Transaction: {merchantTxnNo || "Not available"}</p>
      {loading ? <p className="mt-6">Payment is processing...</p> : null}
      {error ? <p className="mt-6 text-red-600">{error}</p> : null}
      {status ? (
        <div className="mt-6 rounded-lg border p-4">
          <p><strong>State:</strong> {status.state}</p>
          <p><strong>Updated:</strong> {new Date(status.updatedAt).toLocaleString()}</p>
          {status.responseMessage ? <p><strong>Gateway message:</strong> {status.responseMessage}</p> : null}
          {["FAILED", "CANCELLED"].includes(status.state) ? <p className="mt-3 text-sm text-gray-600">Please retry payment from checkout.</p> : null}
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
