"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import QuestionGroup from "@/components/survey/QuestionGroup";
import SurveyStepProgress from "@/components/survey/SurveyStepProgress";
import { surveySections } from "@/lib/surveyQuestions";
import {
  buildPayload,
  createInitialAnsweredState,
  createInitialAnswers,
  validateAllSections,
  validateSection,
} from "@/lib/utils";
import { STORAGE_KEYS } from "@/lib/constants";
import { SurveyAnsweredState, SurveyAnswers } from "@/types/survey";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

export default function SurveyForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<SurveyAnswers>(() => createInitialAnswers(surveySections));
  const [answered, setAnswered] = useState<SurveyAnsweredState>(() =>
    createInitialAnsweredState(surveySections),
  );
  const [error, setError] = useState<string>("");

  const section = surveySections[step];
  const isLast = step === surveySections.length - 1;
  const showUrgent = Number(answers.phq9_q9 || 0) > 0;
  const answeredCount = section.questions.filter((question) => answered[question.id]).length;
  const totalQuestions = section.questions.length;
  const completionLabel = `${answeredCount} / ${totalQuestions} ${section.completionNoun} answered`;

  const issues = useMemo(
    () => validateSection(answers, answered, section),
    [answers, answered, section],
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLast) {
      if (issues.length > 0) {
        setError(issues[0]);
        return;
      }
      setError("");
      setStep((v) => v + 1);
      return;
    }

    const allIssues = validateAllSections(answers, answered, surveySections);
    if (allIssues.length > 0) {
      setError(allIssues[0]);
      return;
    }

    const userName = window.sessionStorage.getItem(STORAGE_KEYS.userName) || "Student";
    try {
      const payload = buildPayload(userName, answers);
      window.sessionStorage.setItem(STORAGE_KEYS.pendingPayload, JSON.stringify(payload));
      window.sessionStorage.setItem(
        STORAGE_KEYS.urgentFlag,
        Number(answers.phq9_q9 || 0) > 0 ? "true" : "false",
      );
      setError("");
      router.push("/analyzing");
    } catch (buildError) {
      setError(buildError instanceof Error ? buildError.message : "Failed to prepare survey data.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
        }
      }}
      className="space-y-6"
    >
      <SurveyStepProgress
        currentStep={step}
        sections={surveySections}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
      />

      {showUrgent && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 text-base text-orange-800">
          Your response suggests that you may be feeling unsafe. This app cannot provide emergency
          support. Please contact your university counselor, a trusted person, or local emergency
          support immediately.
        </div>
      )}

      <div className="rounded-[24px] border border-blue-100 bg-blue-50 px-6 py-5">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-900">{section.description}</h2>
          {section.instruction ? (
            <p className="text-base leading-7 text-slate-700">{section.instruction}</p>
          ) : null}
        </div>
      </div>

      <Card className="landing-card p-0">
        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-3xl font-semibold text-slate-900">{section.title}</h2>
          {section.id === "phq9" || section.id === "gad7" ? (
            <p className="mt-2 text-lg text-slate-600">
              Over the past two weeks, how often have you experienced the following?
            </p>
          ) : null}
        </div>
        <div className="space-y-6 px-6 py-6">
          {section.questions.map((question, index) => (
            <div
              key={question.id}
              className="space-y-3 border-b border-slate-100 pb-6 last:border-b-0"
            >
              <label className="block text-xl font-semibold text-slate-900">
                {index + 1}. {question.text}
              </label>
              <QuestionGroup
                question={question}
                value={answers[question.id]}
                answered={answered[question.id]}
                onInteract={() => setAnswered((prev) => ({ ...prev, [question.id]: true }))}
                onChange={(value) => {
                  setAnswers((prev) => ({ ...prev, [question.id]: value }));
                }}
              />
            </div>
          ))}
        </div>
      </Card>

      {error ? <p className="text-center text-base text-red-600">{error}</p> : null}

      <div className="sticky bottom-4 z-10 rounded-[24px] border border-slate-200 bg-white/95 px-6 py-4 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0}
            className="md:min-w-44"
            onClick={() => setStep((v) => v - 1)}
          >
            Previous
          </Button>

          <div className="text-center text-xl font-medium text-teal-700">{completionLabel}</div>

          {!isLast ? (
            <Button
              type="button"
              className="md:min-w-44"
              onClick={() => {
                if (issues.length > 0) {
                  setError(issues[0]);
                  return;
                }
                setError("");
                setStep((v) => v + 1);
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="md:min-w-44"
              onClick={() => {
                if (issues.length > 0) {
                  setError(issues[0]);
                } else {
                  setError("");
                }
              }}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
