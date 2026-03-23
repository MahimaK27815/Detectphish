import { useState, useCallback } from "react";

type AnalysisResult = {
  url: string;
  riskLevel: "safe" | "suspicious" | "dangerous";
  confidence: number;
  isPhishing: boolean;
  features: any;
  reasons: string[];
  threats: any[];
  whois: any;
  timestamp: Date;
};

const extractFeatures = (url: string) => {
  return {
    urlLength: url.length,
    hasHttps: url.startsWith("https"),
    hasAtSymbol: url.includes("@"),
    specialCharCount: (url.match(/[^a-zA-Z0-9]/g) || []).length,
    subdomainCount: url.split(".").length - 2,
    suspiciousKeywords: ["login", "verify", "bank", "secure"].filter(k =>
      url.toLowerCase().includes(k)
    ),
    hasRedirection: url.includes("//") && url.indexOf("//") !== 0,
    hasEncodedChars: url.includes("%"),
    hasIPAddress: /\d+\.\d+\.\d+\.\d+/.test(url),
  };
};

export function useUrlAnalysis() {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);
  const [scanPhase, setScanPhase] = useState("");

  const analyze = useCallback(async (url: string) => {
    if (!url.trim()) {
      alert("Enter a URL");
      return;
    }

    setIsAnalyzing(true);
    setCurrentResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/detect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      // ✅ 🔥 USE BACKEND RISK LEVEL (THIS FIXES YOUR ISSUE)
      const riskLevel =
        data.riskLevel ||
        (data.confidence > 70
          ? "dangerous"
          : data.confidence > 40
          ? "suspicious"
          : "safe");

      const result: AnalysisResult = {
        url: data.url || url,
        riskLevel: riskLevel,   // ✅ FIXED
        confidence: data.confidence || 0,
        isPhishing: data.phishing ?? false,

        // ✅ Features from frontend
        features: extractFeatures(url),

        // ✅ Reasons from backend
        reasons:
          data.reasons ||
          (riskLevel === "dangerous"
            ? ["🚨 High risk phishing indicators detected"]
            : riskLevel === "suspicious"
            ? ["⚠️ Some suspicious patterns found"]
            : ["✅ URL appears safe"]),

        threats: data.threats || [],

        // ✅ Safe WHOIS fallback
        whois:
          data.whois || {
            domainAge: "Unknown",
            trustScore: riskLevel === "safe" ? 80 : riskLevel === "suspicious" ? 50 : 20,
            registrationRisk:
              riskLevel === "safe"
                ? "low"
                : riskLevel === "suspicious"
                ? "medium"
                : "high",
            message: "WHOIS data not available (simulated)",
          },

        timestamp: new Date(),
      };

      setCurrentResult(result);
      setResults((prev) => [result, ...prev]);
    } catch (error) {
      console.error("Error:", error);
      alert("Backend error");
    }

    setIsAnalyzing(false);
    setScanPhase("");
  }, []);

  return {
    analyze,
    isAnalyzing,
    scanPhase,
    currentResult,
    results,
  };
}