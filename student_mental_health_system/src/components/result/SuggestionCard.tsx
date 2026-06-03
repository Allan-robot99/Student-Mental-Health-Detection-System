import Card from "@/components/common/Card";
import { SuggestionPayload } from "@/types/suggestion";

export default function SuggestionCard({ suggestion }: { suggestion: SuggestionPayload }) {
  return (
    <Card>
      <p className="mb-3">{suggestion.supportive_message}</p>
      <h3 className="font-semibold mb-1">Activities this week</h3>
      <ul className="list-disc list-inside text-slate-700 mb-2">
        {suggestion.activities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="text-slate-700">{suggestion.study_suggestion}</p>
      <p className="text-slate-700">{suggestion.sleep_suggestion}</p>
      <p className="text-slate-700">{suggestion.support_suggestion}</p>
    </Card>
  );
}
