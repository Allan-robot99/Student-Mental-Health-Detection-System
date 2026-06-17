def _add_factor(factors, name, level, explanation, suggestion):
    factors.append(
        {
            "name": name,
            "level": level,
            "explanation": explanation,
            "suggestion": suggestion,
        }
    )


def generate_fallback_suggestions(name, risk_label, scores):
    factors = []
    activities = []

    if scores["AcademicStress"] >= 7:
        suggestion = "Break large assignments into smaller tasks and focus on one at a time."
        _add_factor(
            factors,
            "Academic Stress",
            "High",
            "Academic workload or deadlines appear to be strongly affecting your focus and wellbeing.",
            suggestion,
        )
        activities.append(suggestion)
    elif scores["AcademicStress"] >= 4:
        _add_factor(
            factors,
            "Academic Stress",
            "Moderate",
            "Academic demands may be putting noticeable pressure on your energy and concentration.",
            "Use short work blocks and set one small study goal at a time.",
        )
    if scores["SleepHours"] < 6 or scores["SleepQuality"] <= 4:
        suggestion = "Reduce screen exposure before bed and keep a consistent sleep schedule."
        sleep_level = "High" if scores["SleepHours"] < 5 or scores["SleepQuality"] <= 3 else "Moderate"
        sleep_explanation = (
            "Sleep recovery appears to be strongly affecting your mood, concentration, and stress recovery."
            if sleep_level == "High"
            else "Sleep recovery may be affecting your daily energy and emotional balance."
        )
        _add_factor(
            factors,
            "Sleep Recovery",
            sleep_level,
            sleep_explanation,
            suggestion,
        )
        activities.append(suggestion)
    if scores["FinancialStress"] >= 7:
        suggestion = "Reach out to student support for financial guidance or available aid."
        _add_factor(
            factors,
            "Financial Stress",
            "High",
            "Financial pressure appears to be a strong contributor to stress and reduced wellbeing.",
            suggestion,
        )
        activities.append(suggestion)
    elif scores["FinancialStress"] >= 4:
        _add_factor(
            factors,
            "Financial Stress",
            "Moderate",
            "Financial concerns may be adding noticeable pressure to your daily wellbeing.",
            "Review available campus support or plan one small financial next step this week.",
        )
    if scores["ExerciseFreq"] <= 2:
        activities.append("Add a short walk or light physical activity to your weekly routine.")
    if scores["FamilySupport"] <= 4 or scores["PeerRelationship"] <= 4:
        suggestion = "Talk to a trusted friend, family member, lecturer, or counselor."
        _add_factor(
            factors,
            "Support Connection",
            "Low",
            "Lower support connection may make current stress feel harder to manage alone.",
            suggestion,
        )
        activities.append(suggestion)
    elif scores["FamilySupport"] >= 7 and scores["PeerRelationship"] >= 7:
        _add_factor(
            factors,
            "Support Connection",
            "High",
            "Strong family or peer support may be acting as a helpful protective factor.",
            "Keep making time for the people who help you feel supported.",
        )

    if not factors:
        factors = [
            {
                "name": "Study Load Balance",
                "level": "Mild",
                "explanation": "Your current pattern appears relatively balanced, though day-to-day study pressure may still need attention.",
                "suggestion": "Keep using small, consistent study steps and regular breaks.",
            },
            {
                "name": "Sleep Routine",
                "level": "Mild",
                "explanation": "Your sleep pattern does not appear to be a major concern, but healthy routines still support wellbeing.",
                "suggestion": "Keep a steady sleep and wake schedule when possible.",
            },
            {
                "name": "Daily Stress Level",
                "level": "Mild",
                "explanation": "Your overall stress pattern appears manageable, though small stressors can still build over time.",
                "suggestion": "Use short reset moments during the week to stay balanced.",
            },
        ]
    if len(activities) < 5:
        activities.extend(
            [
                "Try a 5-minute breathing exercise before studying.",
                "Use short work blocks with small breaks.",
                "Check in with someone you trust this week.",
            ]
        )
    activities = activities[:5]

    support = "If stress feels difficult to manage, consider contacting your university counseling service."
    if risk_label == "High Risk":
        support = "Because your result is high risk, please consider speaking to a counselor or trusted person soon."

    return {
        "supportive_message": f"Hi {name}, thank you for completing the self-check.",
        "possible_factors": factors[:3],
        "activities": activities,
        "study_suggestion": "Use a simple priority list and complete one small task at a time.",
        "sleep_suggestion": "Try a consistent sleep and wake-up time over the next few days.",
        "support_suggestion": support,
        "disclaimer": "This result is not a medical diagnosis.",
    }
