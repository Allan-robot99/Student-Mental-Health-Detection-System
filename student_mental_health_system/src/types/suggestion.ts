export type SuggestionFactor = {
  name: string;
  level: "High" | "Moderate" | "Mild" | "Low" | "Support";
  explanation: string;
  suggestion?: string;
};

export type SuggestionPayload = {
  supportive_message: string;
  possible_factors: SuggestionFactor[] | string[];
  activities: string[];
  study_suggestion: string;
  sleep_suggestion: string;
  support_suggestion: string;
  disclaimer: string;
};
