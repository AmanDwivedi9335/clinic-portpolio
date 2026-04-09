"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

function StatusInner() {
  const searchParams = useSearchParams();

  const merchantTxnNo = searchParams.get("merchantTxnNo") || "";
  const callbackError = searchParams.get("error") || "";
  const callbackState = searchParams.get("paymentState") || "";
  const paymentStatus = searchParams.get("paymentStatus") || "";
  const callbackHashStatus = searchParams.get("callbackHashStatus") || "";

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({
    open: false,
    kind: "success",
    message: "",
  });
  const [failedRetryCount, setFailedRetryCount] = useState(0);
  const [isRetryingAfterFailure, setIsRetryingAfterFailure] = useState(false);

  const completionTriggeredRef = useRef(false);
  const failedRetryTimerRef = useRef(null);

  const MAX_FAILED_RETRIES = 2;

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
    return () => {
      if (failedRetryTimerRef.current) clearTimeout(failedRetryTimerRef.current);
    };
  }, []);
  useEffect(() => {
    if (callbackHashStatus === "matched") {
      setPopup({
        open: true,
        kind: "success",
        message: "Payment confirmation was validated successfully.",
      });
      return;
    }

    if (callbackError) {
      const callbackErrorMessages = {
        callback_hash_mismatch:
          "We could not verify the payment confirmation from the bank. Please contact support if amount was debited.",
        callback_unknown_transaction:
          "We could not find this transaction. Please try again or contact support.",
        callback_invalid_state_transition:
          "Payment update could not be completed right now. Please refresh after a few minutes.",
        callback_processing_failed:
          "We were unable to process the payment update. Please try again shortly.",
        callback_config_error:
          "The payment service is temporarily unavailable. Please try again later.",
        patient_register_api_failed:
          "Your payment was received, but we could not finish registration. Our team has been notified.",
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
      setIsRetryingAfterFailure(false);

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
              result.message || "Unable to complete registration after payment."
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
                : "Payment succeeded, but registration could not be completed right now.",
          });
        }
      };

      finalize();
      return;
    }

    if (["FAILED", "CANCELLED"].includes(status.state)) {
      if (failedRetryCount < MAX_FAILED_RETRIES) {
        setIsRetryingAfterFailure(true);

        setPopup({
          open: true,
          kind: "info",
          message: `Payment status is ${status.state.toLowerCase()}. Retrying verification (${failedRetryCount + 1}/${MAX_FAILED_RETRIES})...`,
        });

        if (failedRetryTimerRef.current) clearTimeout(failedRetryTimerRef.current);
        failedRetryTimerRef.current = setTimeout(async () => {
          setFailedRetryCount((count) => count + 1);

          try {
            const response = await fetch(`/api/txn/status/${merchantTxnNo}`);
            const result = await response.json();

            if (!response.ok || !result.success) return;

            setStatus(result.data);
          } catch (_error) {
            // non-blocking retry error
          }
        }, 3000);

        return;
      }

      completionTriggeredRef.current = true;
      setIsRetryingAfterFailure(false);

      setPopup({
        open: true,
        kind: "error",
        message: "Payment was not successful after 2 retries. Please retry from checkout.",
      });

      return;
    }

    if (
      ["PENDING", "RECONCILING", "INITIATED", "REDIRECTED"].includes(
        status.state
      )
    ) {
      setIsRetryingAfterFailure(false);
      setPopup({
        open: true,
        kind: "info",
        message:
          "Payment is still being processed by the gateway. We will keep checking automatically.",
      });
    }
  }, [failedRetryCount, merchantTxnNo, status]);

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

  const statusLabel = useMemo(() => {
    if (!status?.state) return "Awaiting update";
    if (isRetryingAfterFailure) return "Retrying payment verification";

    const labels = {
      SUCCESS: "Payment successful",
      FAILED: "Payment failed",
      CANCELLED: "Payment cancelled",
      PENDING: "Payment in progress",
      RECONCILING: "Payment in progress",
      INITIATED: "Payment initiated",
      REDIRECTED: "Payment in progress",
    };

    return labels[status.state] || status.state;
  }, [isRetryingAfterFailure, status]);

  const statusTone = useMemo(() => {
    if (!status?.state) return "text-gray-700 bg-gray-50 border-gray-200";
    if (isRetryingAfterFailure)
      return "text-amber-700 bg-amber-50 border-amber-200";
    if (status.state === "SUCCESS")
      return "text-green-700 bg-green-50 border-green-200";
    if (["FAILED", "CANCELLED"].includes(status.state))
      return "text-red-700 bg-red-50 border-red-200";
    return "text-amber-700 bg-amber-50 border-amber-200";
  }, [isRetryingAfterFailure, status]);

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-2xl font-semibold">Payment Status</h1>

      <p className="mt-2 text-sm text-gray-600">
        Transaction: {merchantTxnNo || "Not available"}
      </p>

      <div className={`mt-5 rounded-lg border px-4 py-3 ${statusTone}`}>
        <p className="text-sm font-semibold">{statusLabel}</p>
        <p className="mt-1 text-xs opacity-90">
          {status?.state === "SUCCESS"
            ? "Your payment was received. You can continue using your account."
            : ["FAILED", "CANCELLED"].includes(status?.state)
            ? isRetryingAfterFailure
              ? "We detected a failed response and are retrying verification automatically."
              : "No amount will be charged for this attempt. Please try again if needed."
            : "We are waiting for confirmation from the payment gateway. This page updates automatically."}
        </p>
      </div>

      {(paymentStatus || callbackState) && !status ? (
        <p className="mt-3 text-sm text-gray-600">
          Latest update from gateway: {paymentStatus || callbackState}
        </p>
      ) : null}

      {loading ? <p className="mt-6">Payment is processing...</p> : null}

      {error ? <p className="mt-6 text-red-600">{error}</p> : null}

      {status ? (
        <div className="mt-6 rounded-lg border p-4">
          <p>
            <strong>Status:</strong> {statusLabel}
          </p>

          <p>
            <strong>Last updated:</strong>{" "}
            {status.updatedAt
              ? new Date(status.updatedAt).toLocaleString()
              : "Not available"}
          </p>

          {failedRetryCount > 0 ? (
            <p>
              <strong>Retries used:</strong> {failedRetryCount}/{MAX_FAILED_RETRIES}
            </p>
          ) : null}

          {status.responseMessage ? (
            <p>
              <strong>Bank update:</strong> {status.responseMessage}
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
