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
