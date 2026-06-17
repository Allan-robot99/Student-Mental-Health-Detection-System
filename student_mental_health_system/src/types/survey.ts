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

export type SurveyOption = {
  label: string;
  value: number;
};

export type SurveyValueLabel = {
  min: number;
  max: number;
  label: string;
};

export type SurveyQuestion = {
  id: string;
  text: string;
  type: QuestionType;
  min: number;
  max: number;
  step?: number;
  options?: SurveyOption[];
  helperText?: string;
  requiredMessage?: string;
  leftLabel?: string;
  rightLabel?: string;
  valueLabels?: SurveyValueLabel[];
  selectedPrefix?: string;
  iconToken?: string;
};

export type SurveySection = {
  id: string;
  title: string;
  stepLabel: string;
  displayTitle: string;
  description: string;
  completionNoun: "questions" | "fields";
  instruction?: string;
  questions: SurveyQuestion[];
};
