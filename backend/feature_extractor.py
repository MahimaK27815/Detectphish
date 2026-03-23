import re
from urllib.parse import urlparse

def extract_features(url):
    features = []

    parsed = urlparse(url)

    # URL length
    features.append(len(url))

    # Number of dots
    features.append(url.count("."))

    # Number of hyphens
    features.append(url.count("-"))

    # Presence of @ symbol
    features.append(1 if "@" in url else 0)

    # Presence of IP address
    features.append(1 if re.search(r'\d+\.\d+\.\d+\.\d+', url) else 0)

    # HTTPS usage
    features.append(1 if parsed.scheme == "https" else 0)

    # Suspicious words
    suspicious_words = ["login", "secure", "update", "account", "bank", "verify", "paypal"]
    features.append(1 if any(word in url.lower() for word in suspicious_words) else 0)

    return features