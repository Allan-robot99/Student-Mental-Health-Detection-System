"use client";

import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import ProgressBar from "@/components/common/ProgressBar";
import QuestionGroup from "@/components/survey/QuestionGroup";
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
      className="space-y-4"
    >
      <ProgressBar current={step + 1} total={surveySections.length} />
      {showUrgent && (
        <div className="rounded-md border border-orange-300 bg-orange-50 p-3 text-sm text-orange-700">
          Your response suggests that you may be feeling unsafe. This app cannot provide emergency
          support. Please contact your university counselor, a trusted person, or local emergency
          support immediately.
        </div>
      )}
      <Card>
        <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
        <div className="space-y-4">
          {section.questions.map((question) => (
            <div key={question.id}>
              <label className="font-medium block mb-2">{question.text}</label>
              <QuestionGroup
                question={question}
                value={answers[question.id]}
                onChange={(value) => {
                  setAnswers((prev) => ({ ...prev, [question.id]: value }));
                  setAnswered((prev) => ({ ...prev, [question.id]: true }));
                }}
              />
            </div>
          ))}
        </div>
      </Card>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-between">
        <Button type="button" variant="outline" disabled={step === 0} onClick={() => setStep((v) => v - 1)}>
          Previous
        </Button>
        {!isLast ? (
          <Button
            type="button"
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
    </form>
  );
}
