import { SurveyAnswerValue, SurveyQuestion } from "@/types/survey";

type Props = {
  question: SurveyQuestion;
  value: SurveyAnswerValue | undefined;
  answered: boolean;
  onChange: (value: number) => void;
  onInteract: () => void;
};

function getValueMeaning(question: SurveyQuestion, numericValue: number) {
  const matched = question.valueLabels?.find(
    (valueLabel) => numericValue >= valueLabel.min && numericValue <= valueLabel.max,
  );
  return matched?.label;
}

export default function QuestionGroup({ question, value, answered, onChange, onInteract }: Props) {
  const numericValue = Number(value ?? question.min);
  const valueMeaning = getValueMeaning(question, numericValue);

  if (question.type === "scale") {
    return (
      <div className="space-y-3">
        {question.options?.map((option) => {
          const selected = answered && numericValue === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                selected
                  ? "border-teal-500 bg-teal-50 font-semibold text-teal-800"
                  : "border-slate-200 bg-white text-slate-700 hover:border-teal-200"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={selected}
                onChange={() => {
                  onInteract();
                  onChange(option.value);
                }}
                className="h-4 w-4 accent-teal-600"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    );
  }

  if (question.type === "number") {
    return (
      <div className="space-y-2">
        <input
          type="number"
          min={question.min}
          max={question.max}
          step={question.step ?? 1}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-lg"
          value={answered && !Number.isNaN(numericValue) ? numericValue : ""}
          onChange={(e) => {
            onInteract();
            onChange(Number(e.target.value));
          }}
        />
        {question.helperText ? <p className="text-sm text-slate-500">{question.helperText}</p> : null}
      </div>
    );
  }

  const selectedText =
    question.max === 7
      ? `${numericValue} / ${question.max} days`
      : `${numericValue} / ${question.max}${valueMeaning ? ` - ${valueMeaning}` : ""}`;

  return (
    <div className="space-y-3">
      <input
        type="range"
        min={question.min}
        max={question.max}
        step={question.step ?? 1}
        value={numericValue}
        className="w-full accent-[var(--secondary)]"
        onChange={(e) => {
          onInteract();
          onChange(Number(e.target.value));
        }}
        onMouseUp={onInteract}
        onTouchEnd={onInteract}
        onKeyUp={onInteract}
      />
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>{question.leftLabel}</span>
        <span>{question.rightLabel}</span>
      </div>
      <div className="text-lg text-slate-700">
        <span className="font-medium">{question.selectedPrefix ?? "Selected"}:</span>{" "}
        <span className="font-semibold text-[var(--secondary)]">{selectedText}</span>
      </div>
    </div>
  );
}
