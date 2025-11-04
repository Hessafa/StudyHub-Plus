from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="ADHD Survey API")

# Allow React frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production, set ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SurveyData(BaseModel):
    answers: list[int]

@app.post("/api/adhd-survey")
def adhd_survey(data: SurveyData):
    """Handle survey submission and return ADHD assessment result."""
    if len(data.answers) < 5:
        return {"error": "Incomplete survey"}

    score = sum(data.answers)

    if score >= 13:
        message = "You reported many experiences consistent with ADHD symptoms. Consider talking to a professional for further evaluation."
    elif score >= 9:
        message = "You reported some ADHD-like experiences. You might benefit from exploring focus and organization strategies."
    else:
        message = "You reported few ADHD-like experiences. You may not show strong indicators of ADHD."

    return {"score": score, "message": message}

@app.get("/")
def root():
    return {"message": "ADHD Survey API running"}
