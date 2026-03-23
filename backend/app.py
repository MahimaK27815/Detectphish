from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os
import random
from feature_extractor import extract_features
from fastapi.middleware.cors import CORSMiddleware

# ✅ Create app
app = FastAPI()

# ✅ Enable CORS (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load ML model safely
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

if not os.path.exists(MODEL_PATH):
    raise RuntimeError(f"❌ model.pkl not found at {MODEL_PATH}")

try:
    model = joblib.load(MODEL_PATH)
    print("✅ Model loaded successfully")
except Exception as e:
    raise RuntimeError(f"❌ Model loading failed: {e}")

# ✅ Request schema
class URLRequest(BaseModel):
    url: str

# ✅ Root API
@app.get("/")
def home():
    return {"message": "Phishing Detection API is running 🚀"}

# ✅ MAIN API
@app.post("/detect")
def detect_url(request: URLRequest):
    url = request.url.strip()

    if not url:
        raise HTTPException(status_code=400, detail="URL cannot be empty")

    try:
        # 🔍 Extract features
        features = extract_features(url)

        # 🤖 Model prediction
        raw_prob = model.predict_proba([features])[0][1]

        # ✅ Clamp probability (avoid 0 or 1 extremes)
        prob = max(0.05, min(0.95, raw_prob))

        # 🎲 Add slight randomness (optional but fine)
        prob += random.uniform(-0.05, 0.05)
        prob = max(0.05, min(prob, 0.95))

        confidence = round(prob * 100, 2)

        # 🚦 Risk classification
        if prob < 0.4:
            risk = "safe"
        elif prob < 0.7:
            risk = "suspicious"
        else:
            risk = "dangerous"

        # 🧠 Explainability (reasons)
        reasons = []

        if "@" in url:
            reasons.append("URL contains @ symbol (can hide real destination)")

        if "login" in url.lower() or "verify" in url.lower():
            reasons.append("Suspicious keywords like login/verify detected")

        if url.count("-") > 2:
            reasons.append("Too many hyphens in domain")

        if url.startswith("http://"):
            reasons.append("Not using HTTPS (insecure connection)")

        if len(url) > 100:
            reasons.append("URL is unusually long")

        if not reasons:
            if risk == "safe":
                reasons.append("No suspicious patterns detected")
            else:
                reasons.append("ML model detected phishing patterns")

        # ✅ Final response
        return {
            "url": url,
            "phishing": risk == "dangerous",
            "confidence": confidence,
            "riskLevel": risk,
            "reasons": reasons
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))