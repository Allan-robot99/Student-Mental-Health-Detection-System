import { SuggestionPayload } from "./suggestion";

export type PredictionResponse = {
  id: string | number;
  prediction: number;
  label: "High Risk" | "Low Risk";
  confidence: number | null;
  suggestions: SuggestionPayload;
};
