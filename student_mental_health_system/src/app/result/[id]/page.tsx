"use client";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import DisclaimerBox from "@/components/result/DisclaimerBox";
import InputSummaryAccordion from "@/components/result/InputSummaryAccordion";
import KeyFactors from "@/components/result/KeyFactors";
import RecommendationChecklist from "@/components/result/RecommendationChecklist";
import ResultActionButtons from "@/components/result/ResultActionButtons";
import ResultIllustration from "@/components/result/ResultIllustration";
import ResultSummaryCard from "@/components/result/ResultSummaryCard";
import SupportResources from "@/components/result/SupportResources";
import WhyThisResult from "@/components/result/WhyThisResult";
import { STORAGE_KEYS } from "@/lib/constants";
import { PredictionResponse } from "@/types/prediction";
import { StoredSurveyPayload } from "@/types/result";
import { useParams } from "next/navigation";
import { useSyncExternalStore } from "react";

type ResultPageState = {
  loaded: boolean;
  result: PredictionResponse | null;
  payload: StoredSurveyPayload | null;
  userName: string;
  urgent: boolean;
};

const SERVER_SNAPSHOT: ResultPageState = {
  loaded: false,
  result: null,
  payload: null,
  userName: "Student",
  urgent: false,
};

let cachedSnapshot: ResultPageState = SERVER_SNAPSHOT;
let cachedSignature = "";

function getClientSnapshot(): ResultPageState {
  const raw = window.sessionStorage.getItem(STORAGE_KEYS.latestResult);
  const payloadRaw = window.sessionStorage.getItem(STORAGE_KEYS.pendingPayload);
  const userName = window.sessionStorage.getItem(STORAGE_KEYS.userName) || "Student";
  const urgent = window.sessionStorage.getItem(STORAGE_KEYS.urgentFlag) === "true";
  const signature = [raw ?? "", payloadRaw ?? "", userName, urgent ? "1" : "0"].join("|");

  if (signature === cachedSignature) {
    return cachedSnapshot;
  }

  cachedSignature = signature;
  cachedSnapshot = {
    loaded: true,
    result: raw ? (JSON.parse(raw) as PredictionResponse) : null,
    payload: payloadRaw ? (JSON.parse(payloadRaw) as StoredSurveyPayload) : null,
    userName,
    urgent,
  };

  return cachedSnapshot;
}

export default function ResultPage() {
  const params = useParams<{ id: string }>();
  const pageState = useSyncExternalStore<ResultPageState>(
    () => () => {},
    getClientSnapshot,
    () => SERVER_SNAPSHOT,
  );

  if (!pageState.loaded) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container-page py-12 flex-1">Loading result...</main>
        <Footer />
      </div>
    );
  }

  const { result, payload, userName, urgent } = pageState;

  if (!result || String(result.id) !== params.id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container-page py-12 flex-1">Result not found.</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container-page result-page flex-1 py-10">
        <section className="result-hero-grid">
          <ResultSummaryCard
            userName={userName}
            label={result.label}
            confidence={result.confidence}
            urgent={urgent}
          />
          <ResultIllustration label={result.label} />
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <WhyThisResult label={result.label} />
          <KeyFactors factors={result.suggestions.possible_factors} />
          <RecommendationChecklist result={result} />
          <SupportResources label={result.label} />
        </section>

        <section className="mt-6">
          <InputSummaryAccordion payload={payload} />
        </section>

        <section className="mt-5">
          <DisclaimerBox />
        </section>

        <section className="mt-5">
          <ResultActionButtons />
        </section>
      </main>
      <Footer />
    </div>
  );
}
