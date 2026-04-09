"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

function StatusInner() {
  const searchParams = useSearchParams();

  const merchantTxnNo = searchParams.get("merchantTxnNo") || "";
  const callbackError = searchParams.get("error") || "";
  const callbackErrorStage = searchParams.get("errorStage") || "";
  const callbackErrorDetail = searchParams.get("errorDetail") || "";
  const callbackState = searchParams.get("paymentState") || "";
  const callbackHashStatus = searchParams.get("callbackHashStatus") || "";
  const callbackHashPayload = searchParams.get("callbackHashPayload") || "";
  const generatedSecureHash = searchParams.get("generatedSecureHash") || "";
  const receivedSecureHash = searchParams.get("receivedSecureHash") || "";
  const paymentStatus = searchParams.get("paymentStatus") || "";

  const callbackPayload = useMemo(() => {
    const payload = {};
    for (const [key, value] of searchParams.entries()) {
      payload[key] = value;
    }
    return payload;
  }, [searchParams]);

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({
    open: false,
    kind: "success",
    message: "",
  });

  const completionTriggeredRef = useRef(false);

  useEffect(() => {
    if (!merchantTxnNo) return;

    const loadStatus = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/txn/status/${merchantTxnNo}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to fetch payment status");
        }

        setStatus(result.data);
        setError("");
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Unable to fetch payment status"
        );
      } finally {
        setLoading(false);
      }
    };

    loadStatus();
  }, [merchantTxnNo]);

  useEffect(() => {
    if (callbackHashStatus === "matched") {
      setPopup({
        open: true,
        kind: "success",
        message:
          "ICICI callback secure hash matched successfully after concatenating all callback values except secureHash.",
      });
      return;
    }

    if (callbackError) {
      const callbackErrorMessages = {
        callback_hash_mismatch:
          "Gateway callback secure hash validation failed. Please check callback payload, concatenated string, generated hash, and received hash below.",
        callback_unknown_transaction:
          "Gateway callback arrived with an unknown merchant transaction number.",
        callback_invalid_state_transition:
          "Gateway callback status could not be applied from the current payment state.",
        callback_processing_failed:
          "We could not process the payment callback. Please review the callback details below.",
        callback_config_error:
          "ICICI payment callback configuration is invalid or incomplete.",
        patient_register_api_failed:
          "Payment is successful, but patient registration API failed. Please review the register API details below.",
      };

      setPopup({
        open: true,
        kind: "error",
        message:
          callbackErrorMessages[callbackError] ||
          "We could not process the payment callback.",
      });
    }
  }, [callbackError, callbackHashStatus]);

  useEffect(() => {
    if (!status || completionTriggeredRef.current) return;

    if (status.state === "SUCCESS") {
      completionTriggeredRef.current = true;

      const finalize = async () => {
        try {
          const response = await fetch("/api/user/completeRegistration", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ merchantTxnNo }),
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(
              result.message || "Unable to save registration after payment."
            );
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
            message:
              e instanceof Error
                ? e.message
                : "Payment succeeded but registration save failed.",
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

    if (
      ["PENDING", "RECONCILING", "INITIATED", "REDIRECTED"].includes(
        status.state
      )
    ) {
      setPopup({
        open: true,
        kind: "info",
        message:
          "Payment is still being processed by the gateway. We will keep checking automatically.",
      });
    }
  }, [merchantTxnNo, status]);

  useEffect(() => {
    if (
      !merchantTxnNo ||
      !status ||
      !["PENDING", "RECONCILING", "INITIATED", "REDIRECTED"].includes(
        status.state
      )
    ) {
      return;
    }

    const timer = setInterval(async () => {
      try {
        const response = await fetch(`/api/txn/status/${merchantTxnNo}`);
        const result = await response.json();

        if (!response.ok || !result.success) return;

        setStatus(result.data);
      } catch (_error) {
        // non-blocking polling error
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [merchantTxnNo, status]);

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold">Payment Status</h1>

      <p className="mt-2 text-sm text-gray-600">
        Transaction: {merchantTxnNo || "Not available"}
      </p>

      {paymentStatus ? (
        <p className="mt-2 text-sm text-gray-600">
          Payment status: {paymentStatus}
        </p>
      ) : null}

      {callbackState ? (
        <p className="mt-2 text-sm text-gray-600">
          Gateway callback state: {callbackState}
        </p>
      ) : null}

      {callbackHashStatus ? (
        <p className="mt-2 text-sm text-gray-600">
          Callback hash status: {callbackHashStatus}
        </p>
      ) : null}

      {callbackError ? (
        <p className="mt-2 text-sm text-red-600">
          Callback error code: {callbackError}
        </p>
      ) : null}

      {callbackErrorStage ? (
        <p className="mt-2 text-sm text-red-600">
          Callback error stage: {callbackErrorStage}
        </p>
      ) : null}

      {generatedSecureHash ? (
        <p className="mt-2 break-all text-sm text-gray-600">
          Generated secure hash: {generatedSecureHash}
        </p>
      ) : null}

      {receivedSecureHash ? (
        <p className="mt-2 break-all text-sm text-gray-600">
          Received secure hash: {receivedSecureHash}
        </p>
      ) : null}

      {callbackHashPayload ? (
        <div className="mt-4 rounded-lg border bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700">
            Concatenated callback hash payload
          </p>
          <p className="mt-1 text-xs text-gray-500">
            All callback values except secureHash, ordered with capital-letter
            keys first and then alphabetical, without any separator.
          </p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all text-xs text-gray-700">
            {callbackHashPayload}
          </pre>
        </div>
      ) : null}

      {callbackErrorDetail ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            Callback error detail
          </p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all text-xs text-red-700">
            {callbackErrorDetail}
          </pre>
        </div>
      ) : null}

      {Object.keys(callbackPayload).length ? (
        <div className="mt-4 rounded-lg border bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-700">
            Callback URL response payload
          </p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all text-xs text-gray-700">
            {JSON.stringify(callbackPayload, null, 2)}
          </pre>
        </div>
      ) : null}

      {loading ? <p className="mt-6">Payment is processing...</p> : null}

      {error ? <p className="mt-6 text-red-600">{error}</p> : null}

      {status ? (
        <div className="mt-6 rounded-lg border p-4">
          <p>
            <strong>State:</strong> {status.state}
          </p>

          <p>
            <strong>Updated:</strong>{" "}
            {status.updatedAt
              ? new Date(status.updatedAt).toLocaleString()
              : "Not available"}
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
                popup.kind === "success"
                  ? "text-green-700"
                  : popup.kind === "info"
                  ? "text-amber-700"
                  : "text-red-700"
              }`}
            >
              {popup.kind === "success"
                ? "Payment Success"
                : popup.kind === "info"
                ? "Payment In Progress"
                : "Payment Error"}
            </h2>

            <p className="mt-3 text-sm text-gray-700">{popup.message}</p>

            <button
              type="button"
              className="mt-5 rounded bg-[#7b1fa2] px-4 py-2 text-white"
              onClick={() =>
                setPopup((current) => ({ ...current, open: false }))
              }
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
    <Suspense
      fallback={
        <main className="mx-auto max-w-xl p-8">Loading payment status...</main>
      }
    >
      <StatusInner />
    </Suspense>
  );
}
