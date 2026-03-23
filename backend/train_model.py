import pandas as pd
import joblib
import os
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from feature_extractor import extract_features

# ✅ Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "phishing_dataset.csv")
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

# ✅ Load dataset
data = pd.read_csv(DATA_PATH)

# ✅ Check required columns
if "url" not in data.columns or "label" not in data.columns:
    raise ValueError("Dataset must contain 'url' and 'label' columns")

# ✅ Extract features properly
features = data["url"].apply(lambda url: extract_features(url))

# Convert to NumPy array (VERY IMPORTANT)
X = np.array(features.tolist())
y = data["label"].values

# ✅ Train-test split (optional but recommended)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ✅ Train model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# ✅ Save model (clean version)
joblib.dump(model, MODEL_PATH)

print("✅ Model retrained and saved successfully!")