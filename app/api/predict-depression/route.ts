import { type NextRequest, NextResponse } from "next/server"
import { convertDepressionFormToAPI } from "@/lib/type-converters"

const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    const convertedData = convertDepressionFormToAPI(formData)

    // Call FastAPI backend
    const response = await fetch(`${FASTAPI_URL}/predict/depression-risk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convertedData),
    })

    if (!response.ok) {
      throw new Error(`FastAPI error: ${response.statusText}`)
    }

    const prediction = await response.json()
    console.log("[v0] Depression prediction result:", prediction)

    const numericPrediction = prediction.prediction || prediction.depression_status || 0
    const riskLevel = numericPrediction === 1 ? "Depressed" : "Not Depressed"
    const message =
      numericPrediction === 1
        ? "Your depression screening indicates signs of depression. Please reach out to a mental health professional for support and guidance."
        : "Your depression screening indicates no significant signs of depression. Maintain your mental health with regular self-care practices."

    return NextResponse.json({
      riskLevel,
      message,
      raw: prediction,
    })
  } catch (error) {
    console.error("Error in depression prediction:", error)
    return NextResponse.json({ error: "Failed to process depression screening" }, { status: 500 })
  }
}
