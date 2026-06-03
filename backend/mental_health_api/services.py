from pathlib import Path
import joblib
import pandas as pd

ML_DIR = Path(__file__).resolve().parent.parent / "ml_model"
MODEL_PATH = ML_DIR / "student_mental_health_model.pkl"
FEATURE_PATH = ML_DIR / "feature_columns.pkl"

FEATURE_COLUMNS = [
    "PHQ9_score",
    "GAD7_score",
    "SleepHours",
    "ExerciseFreq",
    "SocialActivity",
    "OnlineStress",
    "GPA",
    "FamilySupport",
    "ScreenTime",
    "AcademicStress",
    "DietQuality",
    "SelfEfficacy",
    "PeerRelationship",
    "FinancialStress",
    "SleepQuality",
]


def _heuristic_predict(data):
    risk_points = 0
    risk_points += 1 if data["PHQ9_score"] >= 10 else 0
    risk_points += 1 if data["GAD7_score"] >= 10 else 0
    risk_points += 1 if data["AcademicStress"] >= 7 else 0
    risk_points += 1 if data["SleepQuality"] <= 4 else 0
    risk_points += 1 if data["FinancialStress"] >= 7 else 0
    prediction = 1 if risk_points >= 2 else 0
    confidence = min(0.95, 0.55 + (risk_points * 0.08))
    return prediction, confidence


def predict_student_risk(input_data):
    if MODEL_PATH.exists() and FEATURE_PATH.exists():
        model = joblib.load(MODEL_PATH)
        feature_columns = joblib.load(FEATURE_PATH)
        model_input = {key: input_data[key] for key in FEATURE_COLUMNS}
        df_input = pd.DataFrame([model_input])[feature_columns]
        prediction = int(model.predict(df_input)[0])
        confidence = None
        if hasattr(model, "predict_proba"):
            probability = model.predict_proba(df_input)[0]
            confidence = float(max(probability))
    else:
        prediction, confidence = _heuristic_predict(input_data)

    label = "High Risk" if prediction == 1 else "Low Risk"
    return {"prediction": prediction, "label": label, "confidence": confidence}
