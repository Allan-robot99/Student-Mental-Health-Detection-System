import Card from "@/components/common/Card";
import { buildRecommendationItems } from "@/lib/resultContent";
import { PredictionResponse } from "@/types/prediction";

export default function RecommendationChecklist({ result }: { result: PredictionResponse }) {
  const items = buildRecommendationItems(result);

  return (
    <Card className="result-surface h-full">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">
          3. Recommended activities this week
        </h2>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-7 text-slate-700">
              <span className="mt-1 h-5 w-5 rounded-md border border-slate-300 bg-white" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="pt-1 text-sm font-medium text-blue-700">
          View tips for building healthy habits
        </div>
      </div>
    </Card>
  );
}
