import Card from "@/components/common/Card";
import RiskBadge from "@/components/result/RiskBadge";
import { getResultInterpretation } from "@/lib/resultContent";
import { PredictionResponse } from "@/types/prediction";

type Props = {
  userName: string;
  label: PredictionResponse["label"];
  confidence: number | null;
  urgent: boolean;
};

export default function ResultSummaryCard({ userName, label, confidence, urgent }: Props) {
  const percent = confidence === null ? null : Math.round(confidence * 100);

  return (
    <Card className="result-surface p-8">
      <div className="space-y-5">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Hi {userName}, your result is ready
          </h1>
          <RiskBadge label={label} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3 text-lg text-slate-700">
            <span>Model confidence</span>
            <span className={label === "High Risk" ? "font-semibold text-orange-600" : "font-semibold text-emerald-600"}>
              {percent === null ? "N/A" : `${percent}%`}
            </span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-slate-200">
            <div
              className={`h-full rounded-full transition-all ${
                label === "High Risk" ? "bg-orange-500" : "bg-emerald-500"
              }`}
              style={{ width: `${percent ?? 0}%` }}
            />
          </div>
          <p className="text-sm text-slate-600">
            Model confidence shows how strongly the machine learning model matched your responses
            to this risk category. It is not medical certainty.
          </p>
        </div>

        <p className="text-xl leading-8 text-slate-700">{getResultInterpretation(label)}</p>

        {urgent ? (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800">
            Your responses suggest you may be feeling unsafe. Please contact your university
            counsellor, a trusted person, or emergency support as soon as possible.
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
          This result is not a medical diagnosis. It provides general information and should not
          replace professional advice.
        </div>
      </div>
    </Card>
  );
}
