from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .fallback_suggestions import generate_fallback_suggestions
from .models import SurveyResponse
from .serializers import PredictionInputSerializer
from .services import predict_student_risk


@api_view(["POST"])
def predict_risk(request):
    serializer = PredictionInputSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.validated_data

    prediction_result = predict_student_risk(data)
    suggestions = generate_fallback_suggestions(
        name=data.get("user_name", "Student"),
        risk_label=prediction_result["label"],
        scores=data,
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
        ai_suggestion=suggestions,
    )

    return Response(
        {
            "id": survey.id,
            "prediction": prediction_result["prediction"],
            "label": prediction_result["label"],
            "confidence": prediction_result["confidence"],
            "suggestions": suggestions,
        },
        status=status.HTTP_200_OK,
    )
