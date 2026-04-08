"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

function StatusInner() {
  const searchParams = useSearchParams();
  const merchantTxnNo = searchParams.get("merchantTxnNo") || "";
  const callbackError = searchParams.get("error") || "";
  const callbackErrorStage = searchParams.get("errorStage") || "";
  const callbackErrorDetail = searchParams.get("errorDetail") || "";
  const callbackState = searchParams.get("paymentState") || "";
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
        const response = await fetch(`/api/txn/status/${merchantTxnNo}`);
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Unable to fetch payment status");
        setStatus(result.data);
        setError("");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unable to fetch payment status");
      } finally {
        setLoading(false);
      }
    };
    loadStatus();
  }, [merchantTxnNo]);

  useEffect(() => {
    if (callbackError) {
      const callbackErrorMessages = {
        callback_hash_mismatch: "Gateway callback failed secure hash validation. Please verify hash field order and merchant key.",
        callback_unknown_transaction:
          "Gateway callback arrived with an unknown transaction reference. This can happen after app restart or missing persistence.",
        callback_invalid_state_transition:
          "Gateway callback status could not be applied from the current payment state. Check duplicate/out-of-order callbacks.",
        callback_config_error: "Payment callback configuration is invalid. Verify ICICI environment variables for callback flow.",
      };

      setPopup({
        open: true,
        kind: "error",
        message:
          callbackErrorMessages[callbackError] ||
          "We could not process payment callback. If amount was debited, please wait while advice updates are received.",
      });
    }
  }, [callbackError]);

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
      return;
    }

    if (status.state === "PENDING" || status.state === "RECONCILING") {
      setPopup({
        open: true,
        kind: "info",
        message: "Payment is still being processed by gateway. We will keep checking automatically.",
      });
    }
  }, [merchantTxnNo, status]);

  useEffect(() => {
    if (!merchantTxnNo || !status || !["PENDING", "RECONCILING", "INITIATED", "REDIRECTED"].includes(status.state)) return;
    const timer = setInterval(async () => {
      try {
        const response = await fetch(`/api/txn/status/${merchantTxnNo}`);
        const result = await response.json();
        if (!response.ok || !result.success) return;
        setStatus(result.data);
      } catch (_error) {
        // non-blocking polling errors
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [merchantTxnNo, status]);

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-semibold">Payment Status</h1>
      <p className="mt-2 text-sm text-gray-600">Transaction: {merchantTxnNo || "Not available"}</p>
      {callbackState ? <p className="mt-2 text-sm text-gray-600">Gateway callback state: {callbackState}</p> : null}
      {callbackError ? <p className="mt-2 text-sm text-gray-600">Callback error code: {callbackError}</p> : null}
      {callbackErrorStage ? <p className="mt-2 text-sm text-gray-600">Callback error stage: {callbackErrorStage}</p> : null}
      {callbackErrorDetail ? <p className="mt-2 text-sm text-gray-600">Callback error detail: {callbackErrorDetail}</p> : null}
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
            <h2
              className={`text-xl font-semibold ${
                popup.kind === "success" ? "text-green-700" : popup.kind === "info" ? "text-amber-700" : "text-red-700"
              }`}
            >
              {popup.kind === "success" ? "Registration Complete" : popup.kind === "info" ? "Payment In Progress" : "Action Required"}
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
