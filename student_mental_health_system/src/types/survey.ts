export type SurveyAnswerValue = string | number;

export type SurveyAnswers = Record<string, SurveyAnswerValue>;
export type SurveyAnsweredState = Record<string, boolean>;

export type SurveyInputPayload = {
  user_name: string;
  PHQ9_score: number;
  GAD7_score: number;
  SleepHours: number;
  ExerciseFreq: number;
  SocialActivity: number;
  OnlineStress: number;
  GPA: number;
  FamilySupport: number;
  ScreenTime: number;
  AcademicStress: number;
  DietQuality: number;
  SelfEfficacy: number;
  PeerRelationship: number;
  FinancialStress: number;
  SleepQuality: number;
};

export type QuestionType = "scale" | "number" | "slider";

export type SurveyQuestion = {
  id: string;
  text: string;
  type: QuestionType;
  min: number;
  max: number;
  step?: number;
};

export type SurveySection = {
  id: string;
  title: string;
  questions: SurveyQuestion[];
};
