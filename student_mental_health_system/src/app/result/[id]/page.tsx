"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import DisclaimerBox from "@/components/result/DisclaimerBox";
import KeyFactors from "@/components/result/KeyFactors";
import RiskBadge from "@/components/result/RiskBadge";
import ScoreSummary from "@/components/result/ScoreSummary";
import SuggestionCard from "@/components/result/SuggestionCard";
import { STORAGE_KEYS } from "@/lib/constants";
import { PredictionResponse } from "@/types/prediction";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ResultPage() {
  const params = useParams<{ id: string }>();
  const isBrowser = typeof window !== "undefined";
  const raw = isBrowser ? window.sessionStorage.getItem(STORAGE_KEYS.latestResult) : null;
  const result = raw ? (JSON.parse(raw) as PredictionResponse) : null;
  const userName =
    (isBrowser ? window.sessionStorage.getItem(STORAGE_KEYS.userName) : null) || "Student";
  const urgent =
    (isBrowser ? window.sessionStorage.getItem(STORAGE_KEYS.urgentFlag) : null) === "true";

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
      <main className="container-page py-10 space-y-4 flex-1">
        <h1 className="text-2xl font-semibold">Hi {userName}, your result is ready.</h1>
        <RiskBadge label={result.label} />
        <ScoreSummary confidence={result.confidence} />
        <Image
          src={result.label === "High Risk" ? "/images/High_Risk_Result.png" : "/images/Low_Risk_Result.png"}
          alt="Risk result illustration"
          width={1000}
          height={500}
          className="rounded-lg w-full h-auto"
        />
        {urgent && (
          <Card>
            <p className="text-orange-700">
              Your response suggests that you may be feeling unsafe. Please contact your university
              counselor, a trusted person, or emergency support immediately.
            </p>
          </Card>
        )}
        <KeyFactors factors={result.suggestions.possible_factors} />
        <SuggestionCard suggestion={result.suggestions} />
        <DisclaimerBox />
        <Link href="/survey">
          <Button>Retake Survey</Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
