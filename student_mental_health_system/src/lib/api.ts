import { PredictionResponse } from "@/types/prediction";
import { SurveyInputPayload } from "@/types/survey";

export async function predictMentalHealthRisk(
  payload: SurveyInputPayload,
): Promise<PredictionResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!baseUrl) {
    throw new Error("Missing NEXT_PUBLIC_BACKEND_URL");
  }

  const endpoint = `${baseUrl}/api/predict/`;
  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown network error";
    throw new Error(`Failed to fetch ${endpoint}. ${reason}`);
  }

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Prediction failed at ${endpoint}: ${details || response.statusText}`);
  }

  return response.json();
}
