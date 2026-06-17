import Card from "@/components/common/Card";
import { mapPossibleFactors } from "@/lib/resultContent";
import { PredictionResponse } from "@/types/prediction";

export default function KeyFactors({
  factors,
}: {
  factors: PredictionResponse["suggestions"]["possible_factors"];
}) {
  const items = mapPossibleFactors(factors);

  return (
    <Card className="result-surface h-full">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">2. Possible contributing factors</h2>
        <div className="space-y-3">
          {items.map((factor) => (
            <div
              key={factor.name}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-900">{factor.name}</h3>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    factor.level === "High"
                      ? "bg-rose-100 text-rose-600"
                      : factor.level === "Moderate"
                        ? "bg-orange-100 text-orange-700"
                      : factor.level === "Mild"
                        ? "bg-amber-100 text-amber-700"
                        : factor.level === "Low"
                          ? "bg-emerald-100 text-emerald-700"
                        : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {factor.level}
                </span>
              </div>
              <p className="text-base leading-7 text-slate-700">{factor.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
