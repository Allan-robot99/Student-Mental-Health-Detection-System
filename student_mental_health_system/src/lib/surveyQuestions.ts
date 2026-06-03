import { SurveySection } from "@/types/survey";

export const surveySections: SurveySection[] = [
  {
    id: "phq9",
    title: "PHQ-9 Mood Self-Check (0-3)",
    questions: [
      { id: "phq9_q1", text: "Little interest or motivation to do daily activities.", type: "scale", min: 0, max: 3 },
      { id: "phq9_q2", text: "Felt down, sad, or emotionally low.", type: "scale", min: 0, max: 3 },
      { id: "phq9_q3", text: "Difficulty sleeping or slept too much.", type: "scale", min: 0, max: 3 },
      { id: "phq9_q4", text: "Felt tired or had low energy.", type: "scale", min: 0, max: 3 },
      { id: "phq9_q5", text: "Eating habits changed due to stress or mood.", type: "scale", min: 0, max: 3 },
      { id: "phq9_q6", text: "Felt disappointed with yourself.", type: "scale", min: 0, max: 3 },
      { id: "phq9_q7", text: "Trouble focusing on study or tasks.", type: "scale", min: 0, max: 3 },
      { id: "phq9_q8", text: "Felt slowed down or unusually restless.", type: "scale", min: 0, max: 3 },
      { id: "phq9_q9", text: "Had thoughts that made you feel unsafe.", type: "scale", min: 0, max: 3 },
    ],
  },
  {
    id: "gad7",
    title: "GAD-7 Anxiety Self-Check (0-3)",
    questions: [
      { id: "gad7_q1", text: "Felt nervous, anxious, or tense.", type: "scale", min: 0, max: 3 },
      { id: "gad7_q2", text: "Found it hard to control worrying.", type: "scale", min: 0, max: 3 },
      { id: "gad7_q3", text: "Worried too much about different things.", type: "scale", min: 0, max: 3 },
      { id: "gad7_q4", text: "Had difficulty relaxing.", type: "scale", min: 0, max: 3 },
      { id: "gad7_q5", text: "Felt restless or unable to stay calm.", type: "scale", min: 0, max: 3 },
      { id: "gad7_q6", text: "Became easily annoyed or irritated.", type: "scale", min: 0, max: 3 },
      { id: "gad7_q7", text: "Felt afraid something bad might happen.", type: "scale", min: 0, max: 3 },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle and Daily Routine",
    questions: [
      { id: "SleepHours", text: "Average sleep hours per day.", type: "number", min: 3, max: 10, step: 0.5 },
      { id: "ExerciseFreq", text: "Exercise days per week.", type: "slider", min: 0, max: 7 },
      { id: "SocialActivity", text: "Social activity level.", type: "slider", min: 1, max: 10 },
      { id: "ScreenTime", text: "Screen hours per day.", type: "number", min: 0, max: 16, step: 0.5 },
      { id: "SleepQuality", text: "Sleep quality recently.", type: "slider", min: 1, max: 10 },
      { id: "DietQuality", text: "Diet quality recently.", type: "slider", min: 1, max: 10 },
    ],
  },
  {
    id: "academic",
    title: "Academic and Campus Stress",
    questions: [
      { id: "GPA", text: "Current GPA or CGPA.", type: "number", min: 0, max: 4, step: 0.01 },
      { id: "AcademicStress", text: "Academic workload stress.", type: "slider", min: 1, max: 10 },
      { id: "OnlineStress", text: "Online learning and digital stress.", type: "slider", min: 1, max: 10 },
      { id: "SelfEfficacy", text: "Confidence in managing study tasks.", type: "slider", min: 1, max: 10 },
    ],
  },
  {
    id: "support",
    title: "Support and Relationships",
    questions: [
      { id: "FamilySupport", text: "Support from family or guardians.", type: "slider", min: 1, max: 10 },
      { id: "PeerRelationship", text: "Relationship quality with peers.", type: "slider", min: 1, max: 10 },
      { id: "FinancialStress", text: "Financial stress level.", type: "slider", min: 1, max: 10 },
    ],
  },
];
