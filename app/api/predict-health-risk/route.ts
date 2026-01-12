import { type NextRequest, NextResponse } from "next/server"
import { convertHealthRiskFormToAPI } from "@/lib/type-converters"

const FASTAPI_URL = process.env.FASTAPI_URL || "https://web-production-25eef.up.railway.app"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()
    console.log("[v0] Received form data:", formData)

    const convertedData = convertHealthRiskFormToAPI(formData)
    console.log("[v0] Converted data:", convertedData)

    const response = await fetch(`${FASTAPI_URL}/predict/maternal-risk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convertedData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] FastAPI error response:", errorText)
      throw new Error(`FastAPI error: ${response.statusText}`)
    }

    const prediction = await response.json()
    console.log("[v0] Prediction result:", prediction)

    const numericPrediction = prediction.prediction || prediction.risk_level || 0
    const riskLevel = numericPrediction === 1 ? "High Risk" : "Low Risk"
    const message =
      numericPrediction === 1
        ? "Your maternal health risk assessment indicates a HIGH RISK status. Please consult with your healthcare provider for further evaluation and guidance."
        : "Your maternal health risk assessment indicates a LOW RISK status. Continue with regular prenatal care and monitoring."

    return NextResponse.json({
      riskLevel,
      message,
      raw: prediction,
    })
  } catch (error) {
    console.error("Error in health risk prediction:", error)
    return NextResponse.json({ error: "Failed to process health risk assessment" }, { status: 500 })
  }
}
