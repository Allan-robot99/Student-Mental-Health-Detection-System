from rest_framework import serializers


class PredictionInputSerializer(serializers.Serializer):
    user_name = serializers.CharField(max_length=100)
    PHQ9_score = serializers.FloatField()
    GAD7_score = serializers.FloatField()
    SleepHours = serializers.FloatField()
    ExerciseFreq = serializers.FloatField()
    SocialActivity = serializers.FloatField()
    OnlineStress = serializers.FloatField()
    GPA = serializers.FloatField()
    FamilySupport = serializers.FloatField()
    ScreenTime = serializers.FloatField()
    AcademicStress = serializers.FloatField()
    DietQuality = serializers.FloatField()
    SelfEfficacy = serializers.FloatField()
    PeerRelationship = serializers.FloatField()
    FinancialStress = serializers.FloatField()
    SleepQuality = serializers.FloatField()
