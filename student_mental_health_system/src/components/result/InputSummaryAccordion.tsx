import Card from "@/components/common/Card";
import { buildInputSummary } from "@/lib/resultContent";
import { StoredSurveyPayload } from "@/types/result";

type Props = {
  payload: StoredSurveyPayload | null;
};

export default function InputSummaryAccordion({ payload }: Props) {
  if (!payload) {
    return null;
  }

  const items = buildInputSummary(payload);
  const previewItems = items.slice(0, 5);

  return (
    <Card className="result-surface p-0">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
          <div className="text-xl font-semibold text-slate-900">
            5. Input summary (what you submitted)
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
            <span>Show all</span>
            <span className="transition group-open:rotate-180">v</span>
          </div>
        </summary>
        <div className="border-t border-slate-200 px-6 py-5">
          <div className="grid gap-4 md:grid-cols-5">
            {previewItems.map((item, index) => (
              <div
                key={item.label}
                className={`min-w-0 ${index < previewItems.length - 1 ? "md:border-r md:border-slate-200 md:pr-4" : ""}`}
              >
                <div className="text-sm text-slate-500">{item.label}</div>
                <div className="mt-1 text-lg font-medium text-slate-900">{item.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.slice(5).map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div className="text-sm text-slate-500">{item.label}</div>
                <div className="mt-1 text-base font-medium text-slate-900">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </details>
    </Card>
  );
}
