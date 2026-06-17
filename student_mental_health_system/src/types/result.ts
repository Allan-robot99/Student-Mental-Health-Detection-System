import { SurveyInputPayload } from "./survey";
import { SuggestionFactor } from "./suggestion";

export type ResultFactorDetail = SuggestionFactor;

export type ResultSummaryItem = {
  label: string;
  value: string;
};

export type StoredSurveyPayload = SurveyInputPayload;
