from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="SurveyResponse",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("user_name", models.CharField(max_length=100)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("phq9_score", models.FloatField()),
                ("gad7_score", models.FloatField()),
                ("sleep_hours", models.FloatField()),
                ("exercise_freq", models.FloatField()),
                ("social_activity", models.FloatField()),
                ("online_stress", models.FloatField()),
                ("gpa", models.FloatField()),
                ("family_support", models.FloatField()),
                ("screen_time", models.FloatField()),
                ("academic_stress", models.FloatField()),
                ("diet_quality", models.FloatField()),
                ("self_efficacy", models.FloatField()),
                ("peer_relationship", models.FloatField()),
                ("financial_stress", models.FloatField()),
                ("sleep_quality", models.FloatField()),
                ("prediction_value", models.IntegerField()),
                ("prediction_label", models.CharField(max_length=50)),
                ("confidence_score", models.FloatField(blank=True, null=True)),
                ("ai_suggestion", models.JSONField(blank=True, null=True)),
            ],
        ),
    ]
