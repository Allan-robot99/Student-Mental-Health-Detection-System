import { calculateGAD7Score, calculatePHQ9Score } from "@/lib/scoring";
import {
  SurveyAnsweredState,
  SurveyAnswers,
  SurveyInputPayload,
  SurveyQuestion,
  SurveySection,
} from "@/types/survey";

function parseRequiredNumber(answers: SurveyAnswers, key: string) {
  const value = Number(answers[key]);
  if (Number.isNaN(value)) {
    throw new Error(`Missing required survey value: ${key}`);
  }
  return value;
}

function assertRange(label: string, value: number, min: number, max: number) {
  if (value < min || value > max) {
    throw new Error(`${label} must be between ${min} and ${max}.`);
  }
  return value;
}

function getSectionFallbackMessage(section: SurveySection) {
  return `Please complete all required ${section.completionNoun} in this section before continuing.`;
}

function getRangeMessage(question: SurveyQuestion) {
  if (question.helperText) {
    return question.helperText;
  }

  return `Please enter a value between ${question.min} and ${question.max}.`;
}

export function validateSection(
  answers: SurveyAnswers,
  answered: SurveyAnsweredState,
  section: SurveySection,
): string[] {
  const issues: string[] = [];
  for (const q of section.questions) {
    if (!answered[q.id]) {
      issues.push(q.requiredMessage ?? getSectionFallbackMessage(section));
      continue;
    }
    const val = Number(answers[q.id]);
    if (Number.isNaN(val)) {
      issues.push(q.requiredMessage ?? getSectionFallbackMessage(section));
      continue;
    }
    if (val < q.min || val > q.max) {
      issues.push(getRangeMessage(q));
    }
  }
  return issues;
}

export function validateAllSections(
  answers: SurveyAnswers,
  answered: SurveyAnsweredState,
  sections: SurveySection[],
) {
  return sections.flatMap((section) => validateSection(answers, answered, section));
}

export function createInitialAnswers(sections: SurveySection[]): SurveyAnswers {
  return sections.reduce<SurveyAnswers>((acc, section) => {
    for (const question of section.questions) {
      acc[question.id] = question.min;
    }
    return acc;
  }, {});
}

export function createInitialAnsweredState(sections: SurveySection[]): SurveyAnsweredState {
  return sections.reduce<SurveyAnsweredState>((acc, section) => {
    for (const question of section.questions) {
      acc[question.id] = false;
    }
    return acc;
  }, {});
}

export function buildPayload(userName: string, answers: SurveyAnswers): SurveyInputPayload {
  return {
    user_name: userName,
    PHQ9_score: calculatePHQ9Score(answers),
    GAD7_score: calculateGAD7Score(answers),
    SleepHours: assertRange("SleepHours", parseRequiredNumber(answers, "SleepHours"), 3, 10),
    ExerciseFreq: assertRange("ExerciseFreq", parseRequiredNumber(answers, "ExerciseFreq"), 0, 7),
    SocialActivity: assertRange("SocialActivity", parseRequiredNumber(answers, "SocialActivity"), 0, 10),
    OnlineStress: assertRange("OnlineStress", parseRequiredNumber(answers, "OnlineStress"), 0, 10),
    GPA: assertRange("GPA", parseRequiredNumber(answers, "GPA"), 0, 4),
    FamilySupport: assertRange("FamilySupport", parseRequiredNumber(answers, "FamilySupport"), 0, 10),
    ScreenTime: assertRange("ScreenTime", parseRequiredNumber(answers, "ScreenTime"), 1, 12),
    AcademicStress: assertRange("AcademicStress", parseRequiredNumber(answers, "AcademicStress"), 0, 10),
    DietQuality: assertRange("DietQuality", parseRequiredNumber(answers, "DietQuality"), 1, 10),
    SelfEfficacy: assertRange("SelfEfficacy", parseRequiredNumber(answers, "SelfEfficacy"), 0, 10),
    PeerRelationship: assertRange("PeerRelationship", parseRequiredNumber(answers, "PeerRelationship"), 0, 10),
    FinancialStress: assertRange("FinancialStress", parseRequiredNumber(answers, "FinancialStress"), 0, 10),
    SleepQuality: assertRange("SleepQuality", parseRequiredNumber(answers, "SleepQuality"), 0, 10),
  };
}
