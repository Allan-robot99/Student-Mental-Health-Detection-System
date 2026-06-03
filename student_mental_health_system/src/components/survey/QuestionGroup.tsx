import { SurveyAnswerValue, SurveyQuestion } from "@/types/survey";

type Props = {
  question: SurveyQuestion;
  value: SurveyAnswerValue | undefined;
  onChange: (value: number) => void;
};

export default function QuestionGroup({ question, value, onChange }: Props) {
  const numericValue = Number(value ?? question.min);
  if (question.type === "number") {
    return (
      <input
        type="number"
        min={question.min}
        max={question.max}
        step={question.step ?? 1}
        className="w-full border border-slate-300 rounded-md px-3 py-2"
        value={Number.isNaN(numericValue) ? "" : numericValue}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    );
  }
  return (
    <div>
      <input
        type="range"
        min={question.min}
        max={question.max}
        step={question.step ?? 1}
        value={numericValue}
        className="w-full"
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="text-sm text-slate-600 mt-1">Value: {numericValue}</div>
    </div>
  );
}
