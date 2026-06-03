import { PredictionResponse } from "@/types/prediction";
import { SurveyInputPayload } from "@/types/survey";

export async function predictMentalHealthRisk(
  payload: SurveyInputPayload,
): Promise<PredictionResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
  }

  const response = await fetch(`${baseUrl}/api/predict/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Prediction failed: ${details || response.statusText}`);
  }

  return response.json();
}
