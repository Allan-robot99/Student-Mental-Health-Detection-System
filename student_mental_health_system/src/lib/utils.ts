import { calculateGAD7Score, calculatePHQ9Score } from "@/lib/scoring";
import {
  SurveyAnsweredState,
  SurveyAnswers,
  SurveyInputPayload,
  SurveySection,
} from "@/types/survey";

function parseRequiredNumber(answers: SurveyAnswers, key: string) {
  const value = Number(answers[key]);
  if (Number.isNaN(value)) {
    throw new Error(`Missing required survey value: ${key}`);
  }
  return value;
}

export function validateSection(
  answers: SurveyAnswers,
  answered: SurveyAnsweredState,
  section: SurveySection,
): string[] {
  const issues: string[] = [];
  for (const q of section.questions) {
    if (!answered[q.id]) {
      issues.push(`${q.id} is required.`);
      continue;
    }
    const val = Number(answers[q.id]);
    if (Number.isNaN(val)) {
      issues.push(`${q.id} is required.`);
      continue;
    }
    if (val < q.min || val > q.max) {
      issues.push(`${q.id} must be between ${q.min} and ${q.max}.`);
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
    SleepHours: parseRequiredNumber(answers, "SleepHours"),
    ExerciseFreq: parseRequiredNumber(answers, "ExerciseFreq"),
    SocialActivity: parseRequiredNumber(answers, "SocialActivity"),
    OnlineStress: parseRequiredNumber(answers, "OnlineStress"),
    GPA: parseRequiredNumber(answers, "GPA"),
    FamilySupport: parseRequiredNumber(answers, "FamilySupport"),
    ScreenTime: parseRequiredNumber(answers, "ScreenTime"),
    AcademicStress: parseRequiredNumber(answers, "AcademicStress"),
    DietQuality: parseRequiredNumber(answers, "DietQuality"),
    SelfEfficacy: parseRequiredNumber(answers, "SelfEfficacy"),
    PeerRelationship: parseRequiredNumber(answers, "PeerRelationship"),
    FinancialStress: parseRequiredNumber(answers, "FinancialStress"),
    SleepQuality: parseRequiredNumber(answers, "SleepQuality"),
  };
}
