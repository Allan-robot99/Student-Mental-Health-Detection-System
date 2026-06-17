import { SurveySection } from "@/types/survey";

type Props = {
  currentStep: number;
  sections: SurveySection[];
  answeredCount: number;
  totalQuestions: number;
};

export default function SurveyStepProgress({
  currentStep,
  sections,
  answeredCount,
  totalQuestions,
}: Props) {
  const percent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
          Mental Health Self-Check Survey
        </h1>
        <p className="text-2xl font-medium text-slate-700">
          Step {currentStep + 1} of {sections.length}:{" "}
          <span className="text-[var(--primary)]">{sections[currentStep].displayTitle}</span>
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-5">
        {sections.map((section, index) => {
          const isPast = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={section.id} className="flex items-center gap-3 md:block">
              <div className="flex items-center gap-3 md:mb-2">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full border text-lg font-semibold ${
                    isPast
                      ? "border-teal-600 bg-teal-600 text-white"
                      : isCurrent
                        ? "border-[var(--secondary)] bg-[var(--secondary)] text-white"
                        : "border-slate-300 bg-white text-slate-500"
                  }`}
                >
                  {isPast ? "✓" : index + 1}
                </div>
                {index < sections.length - 1 ? (
                  <div
                    className={`hidden h-px flex-1 md:block ${
                      isPast ? "bg-teal-500" : "bg-slate-200"
                    }`}
                  />
                ) : null}
              </div>
              <div
                className={`text-lg ${
                  isCurrent ? "font-semibold text-[var(--secondary)]" : "text-slate-600"
                }`}
              >
                {section.stepLabel}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[var(--secondary)] transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="text-lg font-medium text-teal-700">
          {answeredCount} / {totalQuestions} {sections[currentStep].completionNoun} answered
        </div>
      </div>
    </div>
  );
}
