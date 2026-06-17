import { SurveySection, SurveyValueLabel } from "@/types/survey";

const mentalHealthScale = [
  { value: 0, label: "0 - Not at all" },
  { value: 1, label: "1 - Several days" },
  { value: 2, label: "2 - More than half the days" },
  { value: 3, label: "3 - Nearly every day" },
];

const stressLabels: SurveyValueLabel[] = [
  { min: 0, max: 2, label: "Low" },
  { min: 3, max: 4, label: "Mild" },
  { min: 5, max: 6, label: "Moderate" },
  { min: 7, max: 8, label: "High" },
  { min: 9, max: 10, label: "Very high" },
];

const positiveLabels: SurveyValueLabel[] = [
  { min: 0, max: 2, label: "Very low" },
  { min: 3, max: 4, label: "Low" },
  { min: 5, max: 6, label: "Moderate" },
  { min: 7, max: 8, label: "Good" },
  { min: 9, max: 10, label: "Very good" },
];

const confidenceLabels: SurveyValueLabel[] = [
  { min: 0, max: 2, label: "Low confidence" },
  { min: 3, max: 4, label: "Growing confidence" },
  { min: 5, max: 6, label: "Moderate confidence" },
  { min: 7, max: 8, label: "High confidence" },
  { min: 9, max: 10, label: "Very confident" },
];

export const surveySections: SurveySection[] = [
  {
    id: "phq9",
    title: "PHQ-9 Mood Self-Check (0-3)",
    stepLabel: "Mood",
    displayTitle: "Mood Self-Check",
    description:
      "These questions ask about mood-related experiences over the past two weeks.",
    completionNoun: "questions",
    instruction:
      "Select one answer for each question. There is no right or wrong answer. Your answers are used only to generate your self-check result. This tool is not a medical diagnosis.",
    questions: [
      { id: "phq9_q1", text: "How often have you had little interest or enjoyment in your usual activities?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all PHQ-9 questions before continuing." },
      { id: "phq9_q2", text: "How often have you felt low, sad, down, or hopeless?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all PHQ-9 questions before continuing." },
      { id: "phq9_q3", text: "How often have you had difficulty sleeping, stayed asleep poorly, or slept too much?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all PHQ-9 questions before continuing." },
      { id: "phq9_q4", text: "How often have you felt tired or had low energy?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all PHQ-9 questions before continuing." },
      { id: "phq9_q5", text: "How often have you experienced poor appetite or overeating?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all PHQ-9 questions before continuing." },
      { id: "phq9_q6", text: "How often have you felt bad about yourself or felt that you have disappointed yourself or others?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all PHQ-9 questions before continuing." },
      { id: "phq9_q7", text: "How often have you had difficulty concentrating on tasks such as studying, reading, or attending class?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all PHQ-9 questions before continuing." },
      { id: "phq9_q8", text: "How often have you moved or spoken noticeably slowly, or felt so restless that you moved around more than usual?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all PHQ-9 questions before continuing." },
      { id: "phq9_q9", text: "How often have you had thoughts that life is not worth living or thoughts of harming yourself?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all PHQ-9 questions before continuing." },
    ],
  },
  {
    id: "gad7",
    title: "GAD-7 Anxiety Self-Check (0-3)",
    stepLabel: "Anxiety",
    displayTitle: "Anxiety Self-Check",
    description:
      "These questions ask about worry, nervousness, restlessness, and anxiety-related experiences over the past two weeks.",
    completionNoun: "questions",
    instruction:
      "Select one answer for each question. There is no right or wrong answer. Your answers are used only to generate your self-check result. This tool is not a medical diagnosis.",
    questions: [
      { id: "gad7_q1", text: "How often have you felt nervous, anxious, or on edge?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all GAD-7 questions before continuing." },
      { id: "gad7_q2", text: "How often have you found it difficult to stop or control worrying?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all GAD-7 questions before continuing." },
      { id: "gad7_q3", text: "How often have you worried too much about different things?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all GAD-7 questions before continuing." },
      { id: "gad7_q4", text: "How often have you had trouble relaxing?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all GAD-7 questions before continuing." },
      { id: "gad7_q5", text: "How often have you felt so restless that it was hard to sit still?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all GAD-7 questions before continuing." },
      { id: "gad7_q6", text: "How often have you become easily annoyed or irritable?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all GAD-7 questions before continuing." },
      { id: "gad7_q7", text: "How often have you felt afraid that something bad might happen?", type: "scale", min: 0, max: 3, options: mentalHealthScale, requiredMessage: "Please answer all GAD-7 questions before continuing." },
    ],
  },
  {
    id: "lifestyle",
    title: "Lifestyle and Daily Routine",
    stepLabel: "Lifestyle",
    displayTitle: "Lifestyle and Daily Routine",
    description:
      "These questions help us understand your daily routine, sleep pattern, screen time, physical activity, and lifestyle habits.",
    completionNoun: "fields",
    instruction:
      "Your answers are used only to generate your self-check result. This tool is not a medical diagnosis.",
    questions: [
      { id: "SleepHours", text: "Average sleep hours per day", type: "number", min: 3, max: 10, step: 0.5, helperText: "Enter a value between 3 and 10, e.g. 6.5", requiredMessage: "Please enter your average sleep hours." },
      { id: "ExerciseFreq", text: "Exercise days per week", type: "slider", min: 0, max: 7, leftLabel: "0 days", rightLabel: "7 days", selectedPrefix: "Selected", valueLabels: [{ min: 0, max: 0, label: "0 days" }, { min: 1, max: 7, label: "days" }], requiredMessage: "Please select your exercise days per week.", iconToken: "EX" },
      { id: "SocialActivity", text: "Social activity level", type: "slider", min: 0, max: 10, leftLabel: "Very low", rightLabel: "Very active", valueLabels: positiveLabels, selectedPrefix: "Selected", requiredMessage: "Please select your social activity level.", iconToken: "SA" },
      { id: "ScreenTime", text: "Screen hours per day", type: "number", min: 1, max: 12, step: 0.5, helperText: "Enter a value between 1 and 12, e.g. 7.5", requiredMessage: "Please enter your screen hours per day." },
      { id: "SleepQuality", text: "Sleep quality recently", type: "slider", min: 0, max: 10, leftLabel: "Very poor", rightLabel: "Very good", valueLabels: positiveLabels, selectedPrefix: "Selected", requiredMessage: "Please select your sleep quality level.", iconToken: "SQ" },
      { id: "DietQuality", text: "Diet quality recently", type: "slider", min: 1, max: 10, leftLabel: "Poor", rightLabel: "Excellent", valueLabels: positiveLabels, selectedPrefix: "Selected", requiredMessage: "Please select your diet quality level.", iconToken: "DQ" },
    ],
  },
  {
    id: "academic",
    title: "Academic and Campus Stress",
    stepLabel: "Academic Stress",
    displayTitle: "Academic and Campus Stress",
    description:
      "These questions focus on academic pressure, online learning stress, and your confidence in managing study tasks.",
    completionNoun: "fields",
    instruction:
      "Your answers are used only to generate your self-check result. This tool is not a medical diagnosis.",
    questions: [
      { id: "GPA", text: "Current GPA or CGPA", type: "number", min: 0, max: 4, step: 0.01, helperText: "Enter your current GPA between 0.00 and 4.00", requiredMessage: "Please enter your current GPA or CGPA." },
      { id: "AcademicStress", text: "Academic workload stress", type: "slider", min: 0, max: 10, leftLabel: "No stress", rightLabel: "Extremely high stress", valueLabels: stressLabels, selectedPrefix: "Selected", requiredMessage: "Please select your academic workload stress level.", iconToken: "AC" },
      { id: "OnlineStress", text: "Online learning and digital stress", type: "slider", min: 0, max: 10, leftLabel: "Not stressful", rightLabel: "Extremely stressful", valueLabels: stressLabels, selectedPrefix: "Selected", requiredMessage: "Please select your online stress level.", iconToken: "ON" },
      { id: "SelfEfficacy", text: "Confidence in managing study tasks", type: "slider", min: 0, max: 10, leftLabel: "Not confident", rightLabel: "Very confident", valueLabels: confidenceLabels, selectedPrefix: "Selected", requiredMessage: "Please select your confidence in managing study tasks.", iconToken: "SE" },
    ],
  },
  {
    id: "support",
    title: "Support and Relationships",
    stepLabel: "Support",
    displayTitle: "Support and Relationships",
    description:
      "These questions help us understand your support system, peer relationships, and financial stress level.",
    completionNoun: "fields",
    instruction:
      "Your answers are used only to generate your self-check result. This tool is not a medical diagnosis.",
    questions: [
      { id: "FamilySupport", text: "Support from family or guardians", type: "slider", min: 0, max: 10, leftLabel: "No support", rightLabel: "Very strong support", valueLabels: positiveLabels, selectedPrefix: "Selected", requiredMessage: "Please select your family support level before submitting.", iconToken: "FS" },
      { id: "PeerRelationship", text: "Relationship quality with peers", type: "slider", min: 0, max: 10, leftLabel: "Very poor", rightLabel: "Very good", valueLabels: positiveLabels, selectedPrefix: "Selected", requiredMessage: "Please select your peer relationship level before submitting.", iconToken: "PR" },
      { id: "FinancialStress", text: "Financial stress level", type: "slider", min: 0, max: 10, leftLabel: "No financial stress", rightLabel: "Extremely high financial stress", valueLabels: stressLabels, selectedPrefix: "Selected", requiredMessage: "Please select your financial stress level before submitting.", iconToken: "FI" },
    ],
  },
];
