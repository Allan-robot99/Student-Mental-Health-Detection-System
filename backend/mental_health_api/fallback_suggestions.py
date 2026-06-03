def generate_fallback_suggestions(name, risk_label, scores):
    factors = []
    activities = []

    if scores["AcademicStress"] >= 7:
        factors.append("High academic stress")
        activities.append("Break large assignments into smaller tasks and focus on one at a time.")
    if scores["SleepHours"] < 6 or scores["SleepQuality"] <= 4:
        factors.append("Limited sleep recovery")
        activities.append("Reduce screen exposure before bed and keep a consistent sleep schedule.")
    if scores["FinancialStress"] >= 7:
        factors.append("High financial stress")
        activities.append("Reach out to student support for financial guidance or available aid.")
    if scores["ExerciseFreq"] <= 2:
        activities.append("Add a short walk or light physical activity to your weekly routine.")
    if scores["FamilySupport"] <= 4 or scores["PeerRelationship"] <= 4:
        factors.append("Lower support connection")
        activities.append("Talk to a trusted friend, family member, lecturer, or counselor.")

    if not factors:
        factors = ["Study load balance", "Sleep routine", "Daily stress level"]
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
