import Card from "@/components/common/Card";
import { PredictionResponse } from "@/types/prediction";

const RESOURCES = [
  {
    title: "University Counselling Service",
    description: "Book an appointment or chat online.",
  },
  {
    title: "Student Support Office",
    description: "Financial aid and wellbeing support.",
  },
  {
    title: "Talk to Someone You Trust",
    description: "Friends, family, or a mentor.",
  },
  {
    title: "Emergency Support",
    description: "If urgent, seek immediate help.",
  },
];

export default function SupportResources({ label }: { label: PredictionResponse["label"] }) {
  return (
    <Card
      className={`result-surface h-full scroll-mt-24 ${
        label === "High Risk" ? "border-orange-200 bg-orange-50/50" : ""
      }`}
    >
      <div id="support-resources" className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">4. Support resources</h2>
        {label === "High Risk" ? (
          <p className="rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm leading-6 text-orange-800">
            You do not have to manage this alone. Consider contacting university counselling or a
            trusted person for support.
          </p>
        ) : null}
        <div className="divide-y divide-slate-200">
          {RESOURCES.map((resource) => (
            <div key={resource.title} className="flex items-center justify-between gap-4 py-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
                <p className="text-base text-slate-600">{resource.description}</p>
              </div>
              <span className="text-xl text-slate-400">›</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
