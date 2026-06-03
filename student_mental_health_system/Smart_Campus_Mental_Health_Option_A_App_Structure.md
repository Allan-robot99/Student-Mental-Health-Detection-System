# Smart Campus Student Mental Health Risk Detection System Using Machine Learning

## 1. Selected Application Option

This project uses **Option A** as the final application architecture:

```text
Frontend: Next.js + React
Backend: Django REST API
Database: Django ORM with SQLite for development / PostgreSQL for deployment
Machine Learning: Scikit-learn model saved using Joblib
Deployment: Render or Railway
```

This option is recommended because it is cleaner, easier to explain, and easier to deploy for the final assessment. Django will handle the backend API, database, and machine learning prediction service, while Next.js and React will provide the responsive web interface.

---

## 2. Application Name

**Student Mental Health Self-Checking System**

Alternative academic title for report:

**Smart Campus Student Mental Health Risk Detection System Using Machine Learning**

---

## 3. Project Objective

The objective of this project is to develop a smart campus machine learning application that allows university students to complete a self-check survey and receive an early mental health risk prediction.

The system predicts whether a student is likely to be in:

```text
High Risk
Low Risk
```

The prediction is based on psychological, academic, lifestyle, and support-related indicators such as depression score, anxiety score, sleep hours, academic stress, financial stress, exercise frequency, and social support.

The application also provides safe, non-clinical suggestions to help students manage stress and improve well-being.

> This system is not a medical diagnosis tool. It is a self-awareness and early decision-support system.

---

## 4. Main User Flow

```text
Landing Page
→ Consent / Disclaimer Page
→ Enter Name or Nickname
→ Start Survey
→ Complete Mental Health Self-Check Survey
→ Submit Survey
→ Backend API processes input
→ ML model predicts risk level
→ Result Page displays prediction
→ AI suggestion module generates stress-reduction activities
→ User can retake survey or save result
```

---

## 5. System Architecture

```text
User Browser / Mobile Browser
        ↓
Next.js + React Frontend
        ↓
Django REST API
        ↓
Input Validation and Preprocessing
        ↓
Scikit-learn ML Model
        ↓
Prediction Result
        ↓
AI Suggestion Generator
        ↓
Result Display
        ↓
Django Database
SQLite / PostgreSQL
```

---

## 6. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js | Web application framework |
| Frontend UI | React | Component-based interface |
| Backend | Django | Backend server |
| API | Django REST Framework | REST API for prediction and survey result |
| Database | SQLite | Local development database |
| Database | PostgreSQL | Deployment database |
| Machine Learning | Scikit-learn | Model training and prediction |
| Model Storage | Joblib | Save and load trained model |
| Data Handling | Pandas, NumPy | Data processing |
| Visualization | Matplotlib, Seaborn | EDA and reporting |
| Deployment | Render / Railway | Cloud hosting |

---

## 7. Dataset Features

The machine learning model uses the following features:

| Feature | Description |
|---|---|
| `PHQ9_score` | Depression-related self-check score |
| `GAD7_score` | Anxiety-related self-check score |
| `SleepHours` | Average daily sleep hours |
| `ExerciseFreq` | Weekly exercise frequency |
| `SocialActivity` | Level of social activity |
| `OnlineStress` | Stress caused by online platforms, notifications, or digital learning |
| `GPA` | Student academic performance |
| `FamilySupport` | Support level from family or guardian |
| `ScreenTime` | Average daily screen time |
| `AcademicStress` | Academic workload stress level |
| `DietQuality` | Quality of eating habits |
| `SelfEfficacy` | Confidence in managing tasks and responsibilities |
| `PeerRelationship` | Relationship quality with friends/classmates |
| `FinancialStress` | Financial pressure level |
| `SleepQuality` | Sleep quality level |

Target variable:

```text
RiskStatus = 1 → High Risk
RiskStatus = 0 → Low Risk
```

---

## 8. Database Design Using Django ORM

### 8.1 Django Model: SurveyResponse

```python
from django.db import models

class SurveyResponse(models.Model):
    user_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    phq9_score = models.FloatField()
    gad7_score = models.FloatField()
    sleep_hours = models.FloatField()
    exercise_freq = models.FloatField()
    social_activity = models.FloatField()
    online_stress = models.FloatField()
    gpa = models.FloatField()
    family_support = models.FloatField()
    screen_time = models.FloatField()
    academic_stress = models.FloatField()
    diet_quality = models.FloatField()
    self_efficacy = models.FloatField()
    peer_relationship = models.FloatField()
    financial_stress = models.FloatField()
    sleep_quality = models.FloatField()

    prediction_value = models.IntegerField()
    prediction_label = models.CharField(max_length=50)
    confidence_score = models.FloatField(null=True, blank=True)

    ai_suggestion = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.user_name} - {self.prediction_label}"
```

### 8.2 Database Choice

For development:

```text
SQLite
```

For deployment:

```text
PostgreSQL
```

SQLite is simple for local testing, while PostgreSQL is more suitable for cloud deployment using Render or Railway.

---

## 9. Full Application Folder Structure

```text
student-mental-health-system/
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── consent/
│   │   │   └── page.tsx
│   │   ├── start/
│   │   │   └── page.tsx
│   │   ├── survey/
│   │   │   └── page.tsx
│   │   ├── analyzing/
│   │   │   └── page.tsx
│   │   ├── result/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── ProgressBar.tsx
│   │   │
│   │   ├── survey/
│   │   │   ├── SurveyForm.tsx
│   │   │   ├── SurveyStep.tsx
│   │   │   ├── ScaleQuestion.tsx
│   │   │   ├── NumberQuestion.tsx
│   │   │   └── QuestionGroup.tsx
│   │   │
│   │   ├── result/
│   │   │   ├── RiskBadge.tsx
│   │   │   ├── ScoreSummary.tsx
│   │   │   ├── SuggestionCard.tsx
│   │   │   ├── KeyFactors.tsx
│   │   │   └── DisclaimerBox.tsx
│   │   │
│   │   └── landing/
│   │       ├── HeroSection.tsx
│   │       ├── FeatureSection.tsx
│   │       └── HowItWorks.tsx
│   │
│   ├── lib/
│   │   ├── api.ts
│   │   ├── constants.ts
│   │   ├── scoring.ts
│   │   ├── surveyQuestions.ts
│   │   └── utils.ts
│   │
│   ├── types/
│   │   ├── survey.ts
│   │   ├── prediction.ts
│   │   └── suggestion.ts
│   │
│   ├── public/
│   │   ├── images/
│   │   │   ├── logo.png
│   │   │   ├── hero-illustration.png
│   │   │   ├── survey-illustration.png
│   │   │   ├── result-high-risk.png
│   │   │   └── result-low-risk.png
│   │   └── icons/
│   │       ├── sleep.png
│   │       ├── stress.png
│   │       ├── exercise.png
│   │       ├── support.png
│   │       └── study.png
│   │
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   └── .env.local
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── .env
│   │
│   ├── config/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   │
│   ├── mental_health_api/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   ├── validators.py
│   │   └── services.py
│   │
│   ├── ml_model/
│   │   ├── student_mental_health_model.pkl
│   │   ├── scaler.pkl
│   │   ├── feature_columns.pkl
│   │   └── model_info.json
│   │
│   └── ai_suggestion/
│       ├── __init__.py
│       ├── prompt_builder.py
│       ├── suggestion_service.py
│       └── fallback_suggestions.py
│
├── notebook/
│   ├── Final_Assessment_ML_Model.ipynb
│   └── Cleaned_Student_Mental_Health_Data.csv
│
└── README.md
```

---

## 10. Page Structure

### 10.1 Landing Page

**Route:**

```text
/
```

**Purpose:**  
Introduce the system and encourage the student to start the self-check.

**Content:**

```text
Student Mental Health Self-Checking System

A smart campus self-checking tool that helps students understand their current mental health risk level using machine learning.

This system is not a medical diagnosis. It is designed to support early awareness and encourage healthy actions.
```

**Buttons:**

```text
Start Self-Check
Learn More
```

---

### 10.2 Consent Page

**Route:**

```text
/consent
```

**Purpose:**  
Show disclaimer and user consent.

**Content:**

```text
Before you begin:
- This self-check is for awareness only.
- It does not provide a medical diagnosis.
- You do not need to create an account.
- Please avoid entering sensitive personal information.
- If you feel unsafe or overwhelmed, contact a counselor, trusted person, or emergency support immediately.
```

**Checkbox:**

```text
I understand that this tool is for self-awareness and not a medical diagnosis.
```

---

### 10.3 Start Page

**Route:**

```text
/start
```

**Purpose:**  
Collect user name or nickname.

**Question:**

```text
What name or nickname should we use for your result?
```

**Input type:**

```text
Text field
```

**Variable:**

```text
user_name
```

---

### 10.4 Survey Page

**Route:**

```text
/survey
```

**Purpose:**  
Collect all survey answers needed by the machine learning model.

**Features:**

```text
Multi-step form
Progress bar
Previous and Next buttons
Submit button
Input validation
```

---

### 10.5 Analyzing Page

**Route:**

```text
/analyzing
```

**Purpose:**  
Show loading status while the backend returns prediction and suggestions.

**Text:**

```text
Analyzing your response...
Generating your mental health risk result...
Preparing personalized suggestions...
```

---

### 10.6 Result Page

**Route:**

```text
/result/[id]
```

**Purpose:**  
Display prediction and suggestions.

**Content:**

```text
Student name
Prediction result
Confidence score
Key indicator summary
AI-generated suggestions
Support reminder
Retake survey button
```

---

### 10.7 About Page

**Route:**

```text
/about
```

**Purpose:**  
Explain the project background, dataset, machine learning model, and system limitation.

---

## 11. Complete Survey Questions

The survey should collect the same features used by the trained machine learning model.

---

### Section A: User Information

| No. | Question | Input Type | Variable |
|---|---|---|---|
| A1 | What name or nickname should we use for your result? | Text input | `user_name` |

---

### Section B: PHQ9-Based Mood Self-Check

Use the following scale:

```text
0 = Not at all
1 = Several days
2 = More than half the days
3 = Nearly every day
```

| No. | Question | Variable |
|---|---|---|
| B1 | Over the past two weeks, how often have you felt little interest or motivation to do daily activities? | `phq9_q1` |
| B2 | Over the past two weeks, how often have you felt down, sad, or emotionally low? | `phq9_q2` |
| B3 | Over the past two weeks, how often have you had difficulty sleeping or slept too much? | `phq9_q3` |
| B4 | Over the past two weeks, how often have you felt tired or had low energy? | `phq9_q4` |
| B5 | Over the past two weeks, how often have your eating habits changed due to stress or mood? | `phq9_q5` |
| B6 | Over the past two weeks, how often have you felt disappointed with yourself or felt like you were not doing well enough? | `phq9_q6` |
| B7 | Over the past two weeks, how often have you had trouble focusing on study, assignments, or daily tasks? | `phq9_q7` |
| B8 | Over the past two weeks, how often have you felt physically slowed down or unusually restless? | `phq9_q8` |
| B9 | Over the past two weeks, how often have you had thoughts that made you feel unsafe or that you might hurt yourself? | `phq9_q9` |

Generated feature:

```text
PHQ9_score = phq9_q1 + phq9_q2 + phq9_q3 + phq9_q4 + phq9_q5 + phq9_q6 + phq9_q7 + phq9_q8 + phq9_q9
```

Safety condition:

```text
If phq9_q9 > 0, show urgent support message.
```

Urgent support message:

```text
Your response suggests that you may be feeling unsafe. This app cannot provide emergency support. Please contact your university counselor, a trusted person, or local emergency support immediately.
```

---

### Section C: GAD7-Based Anxiety Self-Check

Use the following scale:

```text
0 = Not at all
1 = Several days
2 = More than half the days
3 = Nearly every day
```

| No. | Question | Variable |
|---|---|---|
| C1 | Over the past two weeks, how often have you felt nervous, anxious, or tense? | `gad7_q1` |
| C2 | Over the past two weeks, how often have you found it hard to control your worrying? | `gad7_q2` |
| C3 | Over the past two weeks, how often have you worried too much about different things? | `gad7_q3` |
| C4 | Over the past two weeks, how often have you had difficulty relaxing? | `gad7_q4` |
| C5 | Over the past two weeks, how often have you felt restless or unable to stay calm? | `gad7_q5` |
| C6 | Over the past two weeks, how often have you become easily annoyed or irritated? | `gad7_q6` |
| C7 | Over the past two weeks, how often have you felt afraid that something bad might happen? | `gad7_q7` |

Generated feature:

```text
GAD7_score = gad7_q1 + gad7_q2 + gad7_q3 + gad7_q4 + gad7_q5 + gad7_q6 + gad7_q7
```

---

### Section D: Lifestyle and Daily Routine

| No. | Question | Input Type | Variable | Suggested Range |
|---|---|---|---|---|
| D1 | On average, how many hours do you sleep per day? | Number input | `SleepHours` | 3–10 |
| D2 | How many days per week do you exercise or do physical activity? | Slider | `ExerciseFreq` | 0–7 |
| D3 | How active are you socially with friends, classmates, or campus groups? | Slider | `SocialActivity` | 1–10 |
| D4 | How many hours do you spend on screens per day for study, entertainment, or social media? | Number input | `ScreenTime` | 0–16 |
| D5 | How would you rate your sleep quality recently? | Slider | `SleepQuality` | 1–10 |
| D6 | How would you rate your diet quality recently? | Slider | `DietQuality` | 1–10 |

---

### Section E: Academic and Campus Stress

| No. | Question | Input Type | Variable | Suggested Range |
|---|---|---|---|---|
| E1 | What is your current GPA or CGPA? | Number input | `GPA` | 0.00–4.00 |
| E2 | How stressful do you find your academic workload right now? | Slider | `AcademicStress` | 1–10 |
| E3 | How stressful do you find online learning, digital tools, notifications, or online communication? | Slider | `OnlineStress` | 1–10 |
| E4 | How confident are you in managing your study tasks and responsibilities? | Slider | `SelfEfficacy` | 1–10 |

---

### Section F: Support and Relationships

| No. | Question | Input Type | Variable | Suggested Range |
|---|---|---|---|---|
| F1 | How supported do you feel by your family or guardians? | Slider | `FamilySupport` | 1–10 |
| F2 | How positive is your relationship with friends, classmates, or peers? | Slider | `PeerRelationship` | 1–10 |
| F3 | How stressful is your current financial situation? | Slider | `FinancialStress` | 1–10 |

---

## 12. Final Input Sent to Backend

The frontend should send this JSON object to the Django REST API:

```json
{
  "user_name": "Allan",
  "PHQ9_score": 12,
  "GAD7_score": 9,
  "SleepHours": 6.5,
  "ExerciseFreq": 2,
  "SocialActivity": 5,
  "OnlineStress": 7,
  "GPA": 3.2,
  "FamilySupport": 6,
  "ScreenTime": 8,
  "AcademicStress": 8,
  "DietQuality": 5,
  "SelfEfficacy": 4,
  "PeerRelationship": 6,
  "FinancialStress": 7,
  "SleepQuality": 5
}
```

The ML model should only use these feature columns:

```text
PHQ9_score
GAD7_score
SleepHours
ExerciseFreq
SocialActivity
OnlineStress
GPA
FamilySupport
ScreenTime
AcademicStress
DietQuality
SelfEfficacy
PeerRelationship
FinancialStress
SleepQuality
```

---

## 13. Django REST API Design

### 13.1 Prediction Endpoint

```text
POST /api/predict/
```

### Request Body

```json
{
  "user_name": "Allan",
  "PHQ9_score": 12,
  "GAD7_score": 9,
  "SleepHours": 6.5,
  "ExerciseFreq": 2,
  "SocialActivity": 5,
  "OnlineStress": 7,
  "GPA": 3.2,
  "FamilySupport": 6,
  "ScreenTime": 8,
  "AcademicStress": 8,
  "DietQuality": 5,
  "SelfEfficacy": 4,
  "PeerRelationship": 6,
  "FinancialStress": 7,
  "SleepQuality": 5
}
```

### Response Body

```json
{
  "id": 1,
  "prediction": 1,
  "label": "High Risk",
  "confidence": 0.86,
  "key_factors": [
    "PHQ9_score",
    "GAD7_score",
    "AcademicStress",
    "FinancialStress"
  ],
  "suggestions": [
    "Try a short breathing exercise before studying.",
    "Break assignments into smaller tasks.",
    "Take a short walk or light exercise.",
    "Reduce screen time before sleep.",
    "Reach out to a trusted friend, lecturer, or counselor."
  ]
}
```

---

## 14. Django Serializer Example

```python
from rest_framework import serializers
from .models import SurveyResponse

class SurveyResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyResponse
        fields = "__all__"
```

---

## 15. Django Prediction Service Example

```python
import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "ml_model" / "student_mental_health_model.pkl"
FEATURE_PATH = BASE_DIR / "ml_model" / "feature_columns.pkl"

model = joblib.load(MODEL_PATH)
feature_columns = joblib.load(FEATURE_PATH)

def predict_student_risk(input_data):
    model_input = {
        "PHQ9_score": input_data["PHQ9_score"],
        "GAD7_score": input_data["GAD7_score"],
        "SleepHours": input_data["SleepHours"],
        "ExerciseFreq": input_data["ExerciseFreq"],
        "SocialActivity": input_data["SocialActivity"],
        "OnlineStress": input_data["OnlineStress"],
        "GPA": input_data["GPA"],
        "FamilySupport": input_data["FamilySupport"],
        "ScreenTime": input_data["ScreenTime"],
        "AcademicStress": input_data["AcademicStress"],
        "DietQuality": input_data["DietQuality"],
        "SelfEfficacy": input_data["SelfEfficacy"],
        "PeerRelationship": input_data["PeerRelationship"],
        "FinancialStress": input_data["FinancialStress"],
        "SleepQuality": input_data["SleepQuality"]
    }

    df_input = pd.DataFrame([model_input])
    df_input = df_input[feature_columns]

    prediction = int(model.predict(df_input)[0])

    if hasattr(model, "predict_proba"):
        probability = model.predict_proba(df_input)[0]
        confidence = float(max(probability))
    else:
        confidence = None

    label = "High Risk" if prediction == 1 else "Low Risk"

    return {
        "prediction": prediction,
        "label": label,
        "confidence": confidence
    }
```

---

## 16. Django View Example

```python
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import predict_student_risk
from .models import SurveyResponse
from ai_suggestion.suggestion_service import generate_suggestions

@api_view(["POST"])
def predict_risk(request):
    data = request.data

    prediction_result = predict_student_risk(data)

    suggestions = generate_suggestions(
        name=data.get("user_name", "Student"),
        risk_label=prediction_result["label"],
        scores=data
    )

    survey = SurveyResponse.objects.create(
        user_name=data["user_name"],
        phq9_score=data["PHQ9_score"],
        gad7_score=data["GAD7_score"],
        sleep_hours=data["SleepHours"],
        exercise_freq=data["ExerciseFreq"],
        social_activity=data["SocialActivity"],
        online_stress=data["OnlineStress"],
        gpa=data["GPA"],
        family_support=data["FamilySupport"],
        screen_time=data["ScreenTime"],
        academic_stress=data["AcademicStress"],
        diet_quality=data["DietQuality"],
        self_efficacy=data["SelfEfficacy"],
        peer_relationship=data["PeerRelationship"],
        financial_stress=data["FinancialStress"],
        sleep_quality=data["SleepQuality"],
        prediction_value=prediction_result["prediction"],
        prediction_label=prediction_result["label"],
        confidence_score=prediction_result["confidence"],
        ai_suggestion=suggestions
    )

    return Response({
        "id": survey.id,
        "prediction": prediction_result["prediction"],
        "label": prediction_result["label"],
        "confidence": prediction_result["confidence"],
        "suggestions": suggestions
    })
```

---

## 17. AI Suggestion Module

### 17.1 Purpose

The AI suggestion feature provides practical stress-reduction activities based on the student’s survey result.

It should not diagnose the student. It should only give supportive and safe suggestions.

---

### 17.2 AI Safety Rules

The AI must:

```text
- Avoid diagnosis.
- Avoid saying the student has depression, anxiety disorder, or any medical condition.
- Avoid medication advice.
- Avoid replacing counseling or professional support.
- Encourage professional support if the result is High Risk.
- Use warm and supportive language.
- Keep suggestions realistic for university students.
```

---

### 17.3 AI Prompt

```text
You are a supportive smart campus well-being assistant.

Generate safe, practical, non-medical self-care suggestions for a university student based on their mental health self-check result.

Important safety rules:
- Do not diagnose the student.
- Do not mention that the student has depression, anxiety disorder, or any medical condition.
- Do not recommend medication.
- Do not replace professional counseling.
- If the risk level is High Risk, encourage the student to contact a university counselor, trusted lecturer, family member, or local support service.
- Keep the tone warm, calm, and encouraging.

Student profile:
Name or nickname: {name}
Risk level: {risk_label}
PHQ9 score: {PHQ9_score}
GAD7 score: {GAD7_score}
Sleep hours: {SleepHours}
Exercise frequency: {ExerciseFreq}
Social activity: {SocialActivity}
Online stress: {OnlineStress}
Screen time: {ScreenTime}
Academic stress: {AcademicStress}
Family support: {FamilySupport}
Financial stress: {FinancialStress}
Sleep quality: {SleepQuality}
Diet quality: {DietQuality}
Self-efficacy: {SelfEfficacy}
Peer relationship: {PeerRelationship}
GPA: {GPA}

Generate the response in this structure:
1. Short supportive message using the student's name.
2. Three possible factors affecting the result.
3. Five practical activities the student can try this week.
4. One study-related suggestion.
5. One sleep-related suggestion.
6. One social/support-related suggestion.
7. A gentle reminder to seek professional support if the student feels overwhelmed or unsafe.
```

---

### 17.4 AI Output Example

```json
{
  "supportive_message": "Hi Allan, thank you for completing the self-check. Your result suggests that you may be experiencing a higher level of stress right now.",
  "possible_factors": [
    "High academic stress",
    "High anxiety-related score",
    "Low sleep quality"
  ],
  "activities": [
    "Try a 10-minute breathing exercise before studying.",
    "Break your assignments into smaller tasks.",
    "Take a 20-minute walk or light exercise session.",
    "Reduce screen time 30 minutes before sleeping.",
    "Talk to a trusted friend, lecturer, or family member."
  ],
  "study_suggestion": "Use a simple priority list and complete one small task at a time.",
  "sleep_suggestion": "Try to keep a consistent sleep and wake-up time for the next few days.",
  "support_suggestion": "If the stress feels difficult to manage, consider contacting your university counseling service.",
  "disclaimer": "This result is not a medical diagnosis."
}
```

---

## 18. Rule-Based Fallback Suggestions

If the AI API is unavailable, use rule-based fallback suggestions.

### Example Logic

```python
def generate_fallback_suggestions(risk_label, scores):
    suggestions = []

    if scores["AcademicStress"] >= 7:
        suggestions.append("Break large assignments into smaller tasks and focus on one task at a time.")

    if scores["SleepHours"] < 6 or scores["SleepQuality"] <= 4:
        suggestions.append("Try to improve your sleep routine by reducing screen time before bed.")

    if scores["FinancialStress"] >= 7:
        suggestions.append("Consider speaking with the student support office about financial guidance or available aid.")

    if scores["ExerciseFreq"] <= 2:
        suggestions.append("Add light physical activity such as a 15-minute walk into your weekly routine.")

    if scores["FamilySupport"] <= 4 or scores["PeerRelationship"] <= 4:
        suggestions.append("Try reaching out to a trusted friend, family member, lecturer, or counselor.")

    if risk_label == "High Risk":
        suggestions.append("If you feel overwhelmed, consider contacting your university counselor for support.")

    return suggestions
```

---

## 19. Frontend Survey Question File

Create:

```text
frontend/lib/surveyQuestions.ts
```

```typescript
export const surveyQuestions = [
  {
    section: "Mood and Emotional Well-Being",
    questions: [
      {
        id: "phq9_q1",
        text: "Over the past two weeks, how often have you felt little interest or motivation to do daily activities?",
        type: "scale",
        min: 0,
        max: 3
      },
      {
        id: "phq9_q2",
        text: "Over the past two weeks, how often have you felt down, sad, or emotionally low?",
        type: "scale",
        min: 0,
        max: 3
      }
    ]
  },
  {
    section: "Lifestyle and Daily Routine",
    questions: [
      {
        id: "SleepHours",
        text: "On average, how many hours do you sleep per day?",
        type: "number",
        min: 3,
        max: 10
      },
      {
        id: "ExerciseFreq",
        text: "How many days per week do you exercise or do physical activity?",
        type: "slider",
        min: 0,
        max: 7
      }
    ]
  }
];
```

---

## 20. Frontend Scoring Logic

Create:

```text
frontend/lib/scoring.ts
```

```typescript
export function calculatePHQ9Score(answers: Record<string, number>) {
  const keys = [
    "phq9_q1",
    "phq9_q2",
    "phq9_q3",
    "phq9_q4",
    "phq9_q5",
    "phq9_q6",
    "phq9_q7",
    "phq9_q8",
    "phq9_q9"
  ];

  return keys.reduce((total, key) => total + Number(answers[key] || 0), 0);
}

export function calculateGAD7Score(answers: Record<string, number>) {
  const keys = [
    "gad7_q1",
    "gad7_q2",
    "gad7_q3",
    "gad7_q4",
    "gad7_q5",
    "gad7_q6",
    "gad7_q7"
  ];

  return keys.reduce((total, key) => total + Number(answers[key] || 0), 0);
}
```

---

## 21. Frontend API Utility

Create:

```text
frontend/lib/api.ts
```

```typescript
export async function predictMentalHealthRisk(payload: any) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/predict/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("Failed to get prediction result");
  }

  return response.json();
}
```

---

## 22. Result Page Content

### High Risk Result Example

```text
Hi Allan,

Your self-check result indicates: High Mental Health Risk.

This does not mean you have a medical condition. It means your current responses show signs that may require attention, reflection, and support.

Possible contributing factors:
- Higher PHQ9 score
- Higher GAD7 score
- High academic stress
- Low sleep quality
- High financial stress

Recommended actions:
- Take short breaks between study sessions.
- Try breathing exercises or light physical activity.
- Talk to a trusted friend, lecturer, or family member.
- Consider contacting the university counseling service.
```

---

### Low Risk Result Example

```text
Hi Allan,

Your self-check result indicates: Low Mental Health Risk.

Your current responses suggest that your overall mental well-being indicators are within a lower-risk range.

Recommended actions:
- Continue maintaining healthy sleep habits.
- Keep a balanced study schedule.
- Stay connected with friends and family.
- Continue regular physical activity.
```

---

## 23. Image Resource Prompts

Use these prompts to generate image resources for the web application.

---

### 23.1 App Logo

```text
Create a clean modern logo for a smart campus student mental health self-checking system. The logo should combine a simple brain icon, a heart shape, and a university campus element. Style should be minimal, friendly, professional, and suitable for a web application. Use soft blue, teal, and light green colors. White background. No text in the image.
```

---

### 23.2 Hero Illustration

```text
Create a modern flat illustration for a university student mental health self-check web application. Show a diverse group of students using laptops and phones in a calm campus environment, with soft icons representing sleep, study, exercise, social support, and well-being. The mood should be supportive, safe, and positive. Use a clean blue, teal, and pastel color palette. White background. No text.
```

---

### 23.3 Survey Page Illustration

```text
Create a clean 2D illustration of a student completing a mental health self-check survey on a laptop. Include abstract survey cards, sliders, checkboxes, and a progress bar. The design should feel private, calm, and student-friendly. Use soft blue and teal colors with rounded shapes. No text.
```

---

### 23.4 High Risk Result Illustration

```text
Create a supportive and non-alarming illustration for a high mental health risk result page. Show a student sitting calmly with a phone or laptop, surrounded by gentle support icons such as a counselor chat bubble, breathing exercise icon, sleep icon, and friend support icon. The mood should be caring and hopeful, not scary. Use soft blue, teal, and warm pastel colors. No text.
```

---

### 23.5 Low Risk Result Illustration

```text
Create a positive illustration for a low mental health risk result page. Show a relaxed university student walking on campus with books, headphones, and a calm smile. Include subtle icons for healthy sleep, exercise, study balance, and social connection. Use bright but soft blue, green, and pastel colors. No text.
```

---

### 23.6 Stress Management Icon Set

```text
Create a set of five simple rounded icons for a student well-being app: breathing exercise, sleep routine, study planning, physical exercise, and peer support. Use a consistent flat design style, soft blue and teal palette, transparent background, no text.
```

---

### 23.7 Dashboard Illustration

```text
Create a modern dashboard illustration for a smart campus mental health risk detection system. Show clean cards with abstract charts, risk indicators, student well-being icons, and a recommendation panel. Use a professional flat UI style with blue, teal, and light gray colors. No readable text.
```

---

### 23.8 Empty State Illustration

```text
Create a friendly empty state illustration for a student self-check app before the user starts the survey. Show a clipboard, small plant, calm face icon, and soft campus background. Minimal flat design, soft pastel colors, white background, no text.
```

---

### 23.9 Background Pattern

```text
Create a subtle seamless background pattern for a student wellness web application. Include tiny abstract icons of books, hearts, leaves, stars, chat bubbles, and campus buildings. Use very light blue and teal tones on a white background. Minimal and non-distracting. No text.
```

---

### 23.10 Presentation Cover Image

```text
Create a professional presentation cover illustration for a project titled smart campus student mental health risk detection using machine learning. Show a university campus, students, a digital dashboard, and abstract AI/ML elements such as connected nodes and prediction charts. Use modern flat design, blue and teal color palette, clean white background, high-quality academic style. No text.
```

---

## 24. UI Design Recommendation

### Color Palette

| Purpose | Color |
|---|---|
| Primary | `#008080` |
| Secondary | `#2563EB` |
| Low Risk | `#16A34A` |
| High Risk | `#F97316` |
| Background | `#F8FAFC` |
| Text | `#1E293B` |

### UI Style

```text
- Mobile-first layout
- Rounded cards
- Soft shadows
- Simple progress indicator
- Clear question spacing
- Calm and friendly visual tone
- Avoid scary medical visuals
- Avoid too much red color for High Risk
```

---

## 25. Deployment Plan

### 25.1 Frontend Deployment

Platform:

```text
Vercel
```

Steps:

```text
1. Push frontend folder to GitHub.
2. Import project into Vercel.
3. Add environment variable NEXT_PUBLIC_BACKEND_URL.
4. Deploy the Next.js app.
```

---

### 25.2 Backend Deployment

Platform:

```text
Render or Railway
```

Steps:

```text
1. Push backend folder to GitHub.
2. Create new web service on Render or Railway.
3. Set build command.
4. Set start command.
5. Add environment variables.
6. Upload or include model files in ml_model folder.
7. Connect PostgreSQL database if needed.
8. Run migrations.
9. Deploy backend API.
```

---

### 25.3 Backend Requirements File

```text
django
djangorestframework
django-cors-headers
gunicorn
pandas
numpy
scikit-learn
joblib
python-dotenv
psycopg2-binary
```

---

### 25.4 Backend Environment Variables

```text
SECRET_KEY=your_django_secret_key
DEBUG=False
ALLOWED_HOSTS=your-backend-domain.onrender.com
DATABASE_URL=postgresql://username:password@host:port/database
```

---

### 25.5 Frontend Environment Variables

```text
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.onrender.com
```

---

## 26. Machine Learning Model Files Needed for Deployment

Place these files inside the Django backend:

```text
backend/ml_model/student_mental_health_model.pkl
backend/ml_model/feature_columns.pkl
backend/ml_model/model_info.json
```

If using Logistic Regression, also include:

```text
backend/ml_model/scaler.pkl
```

If using Random Forest, scaler is usually not required.

---

## 27. Recommended Algorithms for Final Report

Use two algorithms:

```text
Algorithm 1: Logistic Regression
Algorithm 2: Random Forest Classifier
```

### Logistic Regression Justification

Logistic Regression is suitable because it is simple, interpretable, and effective for binary classification problems. It can show how each mental health indicator contributes to the probability of a student being classified as high risk or low risk.

### Random Forest Justification

Random Forest is suitable because it can capture non-linear relationships between features such as PHQ9 score, GAD7 score, academic stress, sleep quality, and financial stress. It also provides feature importance, which helps explain important predictors.

---

## 28. Feature Selection Recommendation

Use two feature selection approaches:

| Algorithm | Feature Selection Method |
|---|---|
| Logistic Regression | Mutual Information / SelectKBest |
| Random Forest | Random Forest Feature Importance |

### Most Expected Important Features

```text
PHQ9_score
GAD7_score
OnlineStress
AcademicStress
FinancialStress
SleepHours
ExerciseFreq
SocialActivity
SleepQuality
FamilySupport
```

---

## 29. Model Evaluation Recommendation

For both algorithms, include:

```text
Confusion Matrix
Accuracy
Precision
Recall
F1-score
Manual TP, FP, FN, TN calculation
```

For this project, **False Negative** is very important because it means:

```text
A truly High Risk student was predicted as Low Risk.
```

This should be minimized because missing a high-risk student is more serious than giving extra support suggestions to a low-risk student.

---

## 30. Report Alignment with Final Assessment

| Assessment Requirement | Project Implementation |
|---|---|
| Smart campus domain | Student Mental Health and Burnout Detection |
| Dataset above 1000 rows | University student mental health dataset with 1800 rows |
| Descriptive analysis | Summary statistics, distribution plots, boxplots, heatmap |
| Missing value handling | Missing value check and justification |
| Two ML algorithms | Logistic Regression and Random Forest |
| Confusion matrix | Applied to both models with TP, FP, FN, TN |
| Feature selection | Mutual Information and Random Forest importance |
| Deployment | Next.js frontend and Django API backend |
| Device accessibility | Responsive web app accessible through mobile and PC |
| Cloud platform | Render or Railway backend deployment |
| Tools/libraries | Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Django, Next.js |

---

## 31. Final Development Checklist

### Machine Learning

```text
[ ] Clean dataset
[ ] Rename PHQ9 and GAD7 columns
[ ] Create RiskStatus target
[ ] Perform EDA
[ ] Train Logistic Regression
[ ] Train Random Forest
[ ] Evaluate both models
[ ] Perform feature selection
[ ] Choose final model
[ ] Save model using Joblib
[ ] Save feature columns
```

### Backend

```text
[ ] Create Django project
[ ] Install Django REST Framework
[ ] Create SurveyResponse model
[ ] Create prediction API
[ ] Load ML model
[ ] Validate API input
[ ] Generate AI suggestions
[ ] Save survey result to database
[ ] Enable CORS
[ ] Test API using Postman or frontend
```

### Frontend

```text
[ ] Create Next.js app
[ ] Create landing page
[ ] Create consent page
[ ] Create name input page
[ ] Create survey form
[ ] Calculate PHQ9_score and GAD7_score
[ ] Send data to Django API
[ ] Create analyzing page
[ ] Create result page
[ ] Display prediction and suggestions
[ ] Make responsive design
```

### Deployment

```text
[ ] Push frontend and backend to GitHub
[ ] Deploy backend to Render or Railway
[ ] Deploy frontend to Vercel
[ ] Add environment variables
[ ] Test mobile and laptop access
[ ] Add URL to final report
```

---

## 32. Final Recommendation

This Option A architecture is the best fit for your project:

```text
Next.js + React frontend
Django REST API backend
Django ORM with SQLite/PostgreSQL
Scikit-learn ML model
Render or Railway deployment
```

It is easier to implement, easier to explain during presentation, and clearly satisfies the final assessment requirement for a complete deployed machine learning application.
