import Card from "@/components/common/Card";
import { getWhyThisResultCopy } from "@/lib/resultContent";
import { PredictionResponse } from "@/types/prediction";

export default function WhyThisResult({ label }: { label: PredictionResponse["label"] }) {
  return (
    <Card className="result-surface h-full">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">1. Why this result?</h2>
        <p className="text-lg leading-8 text-slate-700">{getWhyThisResultCopy(label)}</p>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800">
          Many students fluctuate over time. Small steps can make a big difference.
        </div>
      </div>
    </Card>
  );
}
