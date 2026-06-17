import { PredictionResponse } from "@/types/prediction";
import { ResultFactorDetail, ResultSummaryItem, StoredSurveyPayload } from "@/types/result";
import { SuggestionFactor } from "@/types/suggestion";

type FactorConfig = {
  name: string;
  defaultLevel: ResultFactorDetail["level"];
  defaultExplanation: string;
  explanationByLevel?: Partial<Record<ResultFactorDetail["level"], string>>;
  suggestion?: string;
};

const FACTOR_LOOKUP: Record<string, FactorConfig> = {
  "financial stress": {
    name: "Financial Stress",
    defaultLevel: "High",
    defaultExplanation: "Financial pressure can contribute to worry, stress, and reduced wellbeing.",
    explanationByLevel: {
      High: "Financial pressure appears to be a strong contributor to stress and reduced wellbeing.",
      Moderate: "Financial concerns may be adding noticeable pressure to your daily wellbeing.",
      Mild: "Some financial pressure may still be contributing to day-to-day stress.",
      Low: "Financial stress does not appear to be one of the strongest concerns in your current pattern.",
    },
    suggestion: "Reach out to student support for financial guidance or available aid.",
  },
  "academic stress": {
    name: "Academic Stress",
    defaultLevel: "Mild",
    defaultExplanation: "Academic workload or deadlines may be affecting your focus and energy.",
    explanationByLevel: {
      High: "Academic workload or deadlines appear to be strongly affecting your focus and wellbeing.",
      Moderate: "Academic demands may be putting noticeable pressure on your energy and concentration.",
      Mild: "Some academic pressure may be affecting your focus and energy.",
      Low: "Academic stress does not appear to be a major concern right now.",
    },
    suggestion: "Break study tasks into smaller steps and use short work blocks with breaks.",
  },
  "online stress": {
    name: "Online Stress",
    defaultLevel: "Mild",
    defaultExplanation: "Digital workload or constant online communication may be adding stress.",
    explanationByLevel: {
      High: "Digital workload or constant online communication may be strongly increasing stress.",
      Moderate: "Online demands may be adding noticeable strain to your routine.",
      Mild: "Some digital workload or online communication may be adding stress.",
      Low: "Online stress does not appear to be a main contributor right now.",
    },
    suggestion: "Take short screen breaks and reduce non-essential notifications.",
  },
  "sleep quality": {
    name: "Sleep Quality",
    defaultLevel: "Mild",
    defaultExplanation: "Lower sleep quality can affect mood, concentration, and emotional balance.",
    explanationByLevel: {
      High: "Poor sleep quality may be strongly affecting your mood, concentration, and emotional balance.",
      Moderate: "Sleep quality may be affecting your daily energy and emotional balance.",
      Mild: "Some sleep quality issues may be affecting your mood and concentration.",
      Low: "Sleep quality does not appear to be a major issue in your current pattern.",
    },
    suggestion: "Aim for a calming bedtime routine and reduce screens before sleep.",
  },
  "sleep pattern": {
    name: "Sleep Pattern",
    defaultLevel: "Mild",
    defaultExplanation: "Irregular or insufficient sleep may be affecting your daily wellbeing.",
    explanationByLevel: {
      High: "Irregular or insufficient sleep appears to be strongly affecting your daily wellbeing.",
      Moderate: "Your sleep pattern may be adding noticeable strain to daily functioning.",
      Mild: "Some sleep-pattern issues may be affecting your daily wellbeing.",
      Low: "Sleep pattern does not appear to be a major concern right now.",
    },
    suggestion: "Keep a more consistent sleep and wake time over the next few days.",
  },
  "sleep hours": {
    name: "Sleep Hours",
    defaultLevel: "Mild",
    defaultExplanation: "Short sleep duration can reduce energy, concentration, and stress recovery.",
    explanationByLevel: {
      High: "Low sleep duration may be strongly affecting energy, concentration, and stress recovery.",
      Moderate: "Sleep duration may be putting noticeable pressure on your recovery and focus.",
      Mild: "Short sleep duration may be affecting your energy and concentration.",
      Low: "Sleep duration does not appear to be a major concern in this result.",
    },
    suggestion: "Try to protect enough rest time during busy study periods.",
  },
  "social activity": {
    name: "Social Activity",
    defaultLevel: "Support",
    defaultExplanation: "Limited social activity can make it harder to feel connected and supported.",
    explanationByLevel: {
      High: "Very limited social activity may be making it harder to feel supported right now.",
      Mild: "Some reduction in social activity may be affecting emotional support and balance.",
      Low: "Lower social activity may reduce opportunities to feel connected and supported.",
    },
    suggestion: "Check in with a friend, classmate, or someone you trust this week.",
  },
  "family support": {
    name: "Family Support",
    defaultLevel: "Support",
    defaultExplanation: "Lower perceived family support can make stress feel harder to manage alone.",
    explanationByLevel: {
      High: "Stronger family support may be acting as a protective factor in your current pattern.",
      Mild: "Family support may be present but could still matter during stressful periods.",
      Low: "Lower family support may make current stress feel harder to manage alone.",
    },
    suggestion: "Consider reaching out to a trusted person or campus support contact.",
  },
  "peer relationship": {
    name: "Peer Relationship",
    defaultLevel: "Support",
    defaultExplanation: "Peer support and positive relationships can make daily stress easier to handle.",
    explanationByLevel: {
      High: "Strong peer support may help buffer day-to-day stress.",
      Mild: "Peer relationships may still influence how supported you feel.",
      Low: "Weaker peer connection may reduce the support available during stressful periods.",
    },
    suggestion: "Spend time with supportive friends or reconnect with someone you trust.",
  },
  "exercise frequency": {
    name: "Exercise Frequency",
    defaultLevel: "Support",
    defaultExplanation: "Lower exercise frequency may reduce opportunities for stress relief and recovery.",
    explanationByLevel: {
      High: "Regular exercise may be a helpful protective habit in your current pattern.",
      Mild: "Exercise habits may have some effect on how well you recover from stress.",
      Low: "Lower exercise frequency may reduce opportunities for stress relief and recovery.",
    },
    suggestion: "Try a short walk, stretch, or light movement session a few times this week.",
  },
  "emotional load": {
    name: "Emotional Load",
    defaultLevel: "Mild",
    defaultExplanation: "Your responses suggest you may be carrying a noticeable amount of emotional strain.",
    explanationByLevel: {
      High: "Your responses suggest a strong level of emotional strain right now.",
      Moderate: "Your responses suggest a noticeable level of emotional strain.",
      Mild: "Your responses suggest some emotional strain that may still deserve attention.",
      Low: "Emotional strain does not appear to be one of the strongest concerns in this result.",
    },
    suggestion: "Use a small daily reset such as breathing, journaling, or talking with someone.",
  },
};

const LEVEL_PREFIXES: Array<{
  pattern: RegExp;
  level: ResultFactorDetail["level"];
}> = [
  { pattern: /^(high)\s+/i, level: "High" },
  { pattern: /^(moderate|medium)\s+/i, level: "Moderate" },
  { pattern: /^(mild)\s+/i, level: "Mild" },
  { pattern: /^(low|poor|limited)\s+/i, level: "Low" },
];

function normalizeFactorKey(value: string) {
  return value.trim().toLowerCase();
}

function titleCase(value: string) {
  return value.replace(/\w\S*/g, (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
}

function parseFactor(value: string) {
  const trimmed = value.trim();

  for (const { pattern, level } of LEVEL_PREFIXES) {
    if (pattern.test(trimmed)) {
      return {
        baseName: trimmed.replace(pattern, "").trim(),
        level,
      };
    }
  }

  return {
    baseName: trimmed,
    level: null as ResultFactorDetail["level"] | null,
  };
}

function getExplanation(config: FactorConfig, level: ResultFactorDetail["level"]) {
  return config.explanationByLevel?.[level] ?? config.defaultExplanation;
}

export function getResultInterpretation(label: PredictionResponse["label"]) {
  if (label === "High Risk") {
    return "Your responses match a higher-risk pattern. This does not confirm a diagnosis, but it suggests you may benefit from extra support, rest, and self-care attention.";
  }

  return "Your responses match a lower-risk pattern. Keep up the healthy habits that support your wellbeing, while still paying attention to areas that may need care.";
}

export function getWhyThisResultCopy(label: PredictionResponse["label"]) {
  if (label === "High Risk") {
    return "This result is based on your responses about mood, anxiety, sleep, academic stress, online stress, financial stress, social activity, family support, and lifestyle patterns. Your overall pattern is closer to the higher-risk category, which suggests some areas may need more attention and support.";
  }

  return "This result is based on your responses about mood, anxiety, sleep, academic stress, online stress, financial stress, social activity, family support, and lifestyle patterns. Your overall pattern is closer to the lower-risk category, though some individual factors may still deserve attention.";
}

export function mapPossibleFactors(
  factors: PredictionResponse["suggestions"]["possible_factors"],
): ResultFactorDetail[] {
  if (factors.length > 0 && typeof factors[0] === "object") {
    return (factors as SuggestionFactor[]).map((factor) => ({
      name: factor.name,
      level: factor.level,
      explanation: factor.explanation,
      suggestion: factor.suggestion,
    }));
  }

  return factors.map((factor) => {
    const parsed = parseFactor(factor);
    const config = FACTOR_LOOKUP[normalizeFactorKey(parsed.baseName)];

    if (config) {
      const level = parsed.level ?? config.defaultLevel;

      return {
        name: config.name,
        level,
        explanation: getExplanation(config, level),
        suggestion: config.suggestion,
      };
    }

    return {
      name: titleCase(parsed.baseName),
      level: parsed.level ?? "Support",
      explanation:
        parsed.level === "High"
          ? "This appears to be a stronger contributing factor in your current wellbeing pattern."
          : parsed.level === "Moderate"
            ? "This may be contributing noticeably to your current wellbeing pattern."
            : parsed.level === "Mild"
              ? "This may be playing a smaller but still meaningful role in your current wellbeing pattern."
              : parsed.level === "Low"
                ? "This area looks less severe overall, but it may still be worth monitoring."
                : "This area may be contributing to your current wellbeing pattern and is worth keeping an eye on.",
      suggestion: "Use the recommended activities below as small next steps this week.",
    };
  });
}

function getPhqSeverity(score: number) {
  if (score <= 4) return "Minimal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  if (score <= 19) return "Moderately Severe";
  return "Severe";
}

function getGadSeverity(score: number) {
  if (score <= 4) return "Minimal";
  if (score <= 9) return "Mild";
  if (score <= 14) return "Moderate";
  return "Severe";
}

function getStressLabel(value: number) {
  if (value >= 7) return "High";
  if (value >= 4) return "Medium";
  return "Low";
}

function getSupportLabel(value: number) {
  if (value >= 7) return "Strong";
  if (value >= 4) return "Medium";
  return "Low";
}

export function buildInputSummary(payload: StoredSurveyPayload): ResultSummaryItem[] {
  return [
    {
      label: "PHQ-9 Score",
      value: `${payload.PHQ9_score} (${getPhqSeverity(payload.PHQ9_score)})`,
    },
    {
      label: "GAD-7 Score",
      value: `${payload.GAD7_score} (${getGadSeverity(payload.GAD7_score)})`,
    },
    {
      label: "Sleep Hours",
      value: `${payload.SleepHours} hours`,
    },
    {
      label: "Financial Stress",
      value: getStressLabel(payload.FinancialStress),
    },
    {
      label: "Family Support",
      value: getSupportLabel(payload.FamilySupport),
    },
    {
      label: "Academic Stress",
      value: getStressLabel(payload.AcademicStress),
    },
    {
      label: "Sleep Quality",
      value: getStressLabel(payload.SleepQuality),
    },
    {
      label: "Exercise Frequency",
      value: `${payload.ExerciseFreq} day${payload.ExerciseFreq === 1 ? "" : "s"} / week`,
    },
  ];
}

export function buildRecommendationItems(result: PredictionResponse) {
  const activities = result.suggestions.activities.map((activity) => activity.trim()).filter(Boolean);
  const extras = [
    result.suggestions.study_suggestion,
    result.suggestions.sleep_suggestion,
    result.suggestions.support_suggestion,
  ]
    .map((item) => item.trim())
    .filter(Boolean);

  return [...activities, ...extras];
}
