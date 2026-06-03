# Student Mental Health Self-Checking System

Frontend: Next.js (App Router)  
Backend: Django + DRF (in sibling folder `../backend`)

## Frontend setup

1. In this folder, install and run:
```bash
npm install
npm run dev
```
2. Create `.env.local` from `.env.example`:
```bash
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
```

## Backend setup

1. Go to backend folder:
```bash
cd ../backend
```
2. Create virtual env and install:
```bash
pip install -r requirements.txt
```
3. Run migrations and start server:
```bash
python manage.py migrate
python manage.py runserver
```

## Routes implemented

- `/` Landing
- `/consent`
- `/start`
- `/survey`
- `/analyzing`
- `/result/[id]`
- `/about`

## API contract

`POST /api/predict/`

Request includes:
- `user_name`
- `PHQ9_score`, `GAD7_score`
- `SleepHours`, `ExerciseFreq`, `SocialActivity`, `OnlineStress`
- `GPA`, `FamilySupport`, `ScreenTime`, `AcademicStress`
- `DietQuality`, `SelfEfficacy`, `PeerRelationship`, `FinancialStress`, `SleepQuality`

Response:
```json
{
  "id": 1,
  "prediction": 1,
  "label": "High Risk",
  "confidence": 0.81,
  "suggestions": {}
}
```
