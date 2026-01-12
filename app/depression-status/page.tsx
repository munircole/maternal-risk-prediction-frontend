"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DepressionScreeningForm } from "@/components/depression-screening-form"
import { Card, CardContent } from "@/components/ui/card"

export default function DepressionRiskPage() {
  const [result, setResult] = useState<{ riskLevel: string; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/predict-depression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("API request failed")

      const prediction = await response.json()
      setResult({
        riskLevel: prediction.riskLevel,
        message: prediction.message,
      })
    } catch (error) {
      console.error("Error processing form:", error)
      alert("Error processing screening. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (result) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-white to-accent/20 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-primary">Screening Result</h2>
                <div className="bg-secondary/10 rounded-lg p-6 space-y-3">
                  <p className="text-lg font-semibold text-primary">Risk Level: {result.riskLevel}</p>
                  <p className="text-muted-foreground">{result.message}</p>
                </div>
                <div className="flex gap-3 justify-center pt-4">
                  <Button onClick={() => setResult(null)} variant="outline" className="border-primary text-primary">
                    New Screening
                  </Button>
                  <Link href="/">
                    <Button className="bg-primary hover:bg-primary/90">Go Home</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-white to-accent/20 py-12 px-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-primary hover:underline flex items-center gap-2">
            <span>←</span> Back to Home
          </Link>
        </div>
        <DepressionScreeningForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      </div>
    </main>
  )
}
