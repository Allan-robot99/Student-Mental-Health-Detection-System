import { SurveyAnswers } from "@/types/survey";

export function calculatePHQ9Score(answers: SurveyAnswers) {
  const keys = [
    "phq9_q1",
    "phq9_q2",
    "phq9_q3",
    "phq9_q4",
    "phq9_q5",
    "phq9_q6",
    "phq9_q7",
    "phq9_q8",
    "phq9_q9",
  ];
  return keys.reduce((total, key) => total + Number(answers[key] || 0), 0);
}

export function calculateGAD7Score(answers: SurveyAnswers) {
  const keys = [
    "gad7_q1",
    "gad7_q2",
    "gad7_q3",
    "gad7_q4",
    "gad7_q5",
    "gad7_q6",
    "gad7_q7",
  ];
  return keys.reduce((total, key) => total + Number(answers[key] || 0), 0);
}
