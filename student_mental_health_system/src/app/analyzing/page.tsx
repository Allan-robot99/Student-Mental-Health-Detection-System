"use client";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { predictMentalHealthRisk } from "@/lib/api";
import { STORAGE_KEYS } from "@/lib/constants";
import { PredictionResponse } from "@/types/prediction";
import { SurveyInputPayload } from "@/types/survey";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MIN_ANALYZING_MS = 1500;

export default function AnalyzingPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [fallbackResult, setFallbackResult] = useState<PredictionResponse | null>(null);
  const [debugDetails, setDebugDetails] = useState("");

  useEffect(() => {
    async function run() {
      const startTime = Date.now();
      const payloadRaw = window.sessionStorage.getItem(STORAGE_KEYS.pendingPayload);
      if (!payloadRaw) {
        router.replace("/survey");
        return;
      }
      const payload = JSON.parse(payloadRaw) as SurveyInputPayload;
      try {
        const result = await predictMentalHealthRisk(payload);
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_ANALYZING_MS - elapsed);
        if (remaining > 0) {
          await new Promise((resolve) => window.setTimeout(resolve, remaining));
        }
        window.sessionStorage.setItem(STORAGE_KEYS.latestResult, JSON.stringify(result));
        router.replace(`/result/${result.id}`);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Prediction failed";
        const debugPayload = {
          message,
          backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
          payload,
          rawError:
            e instanceof Error
              ? { name: e.name, message: e.message, stack: e.stack }
              : String(e),
        };
        console.warn("Prediction request failed", debugPayload);
        setError(message);
        setDebugDetails(JSON.stringify(debugPayload, null, 2));
        const fallback: PredictionResponse = {
          id: `local-${Date.now()}`,
          prediction: payload.PHQ9_score + payload.GAD7_score > 20 ? 1 : 0,
          label: payload.PHQ9_score + payload.GAD7_score > 20 ? "High Risk" : "Low Risk",
          confidence: null,
          suggestions: {
            supportive_message:
              "Thanks for completing the self-check. We could not reach the server, so this is a temporary local result.",
            possible_factors: [
              {
                name: "Academic Stress",
                level: "Moderate",
                explanation:
                  "Academic demands may be putting noticeable pressure on your energy and concentration.",
                suggestion: "Use short work blocks and set one small study goal at a time.",
              },
              {
                name: "Sleep Pattern",
                level: "Mild",
                explanation:
                  "Some sleep-pattern issues may be affecting your daily wellbeing.",
                suggestion: "Keep a more consistent sleep and wake time over the next few days.",
              },
              {
                name: "Emotional Load",
                level: "Mild",
                explanation:
                  "Your responses suggest some emotional strain that may still deserve attention.",
                suggestion: "Use a small daily reset such as breathing, journaling, or talking with someone.",
              },
            ],
            activities: [
                "Break assignments into small tasks.",
                "Take a short walk or stretch break.",
              "Pause screen time before sleep.",
              "Try a 5-minute breathing exercise.",
              "Reach out to a trusted friend.",
            ],
            study_suggestion: "Use a short priority list and finish one small task at a time.",
            sleep_suggestion: "Keep a consistent sleep and wake time this week.",
            support_suggestion: "If stress feels hard to manage, contact your university counselor.",
            disclaimer: "This result is not a medical diagnosis.",
          },
        };
        setFallbackResult(fallback);
      }
    }
    run();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-page py-16 flex-1">
        <h1 className="text-2xl font-semibold mb-3">Analyzing your response...</h1>
        <p className="text-slate-700">Generating your mental health risk result...</p>
        <p className="text-slate-700">Preparing personalized suggestions...</p>
        {error ? (
          <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">Prediction request failed.</p>
            <p className="mt-2 text-sm text-red-600">Exact error: {error}</p>
            <p className="mt-2 text-sm text-slate-700">
              Open the browser console on this device to inspect the logged failure details.
            </p>
            {debugDetails ? (
              <pre className="mt-3 overflow-x-auto rounded bg-white/70 p-3 text-xs text-slate-700">
                {debugDetails}
              </pre>
            ) : null}
            {fallbackResult ? (
              <button
                type="button"
                onClick={() => {
                  window.sessionStorage.setItem(
                    STORAGE_KEYS.latestResult,
                    JSON.stringify(fallbackResult),
                  );
                  router.replace(`/result/${fallbackResult.id}`);
                }}
                className="mt-4 rounded-md bg-[var(--high-risk)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Continue with temporary local result
              </button>
            ) : null}
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
