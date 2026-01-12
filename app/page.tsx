"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-white to-accent/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">Maternal Health Assessment</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive AI-powered risk prediction for maternal wellbeing
          </p>
        </div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Maternal Health Risk Card */}
          <Card className="border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <CardTitle>Maternal Health Risk</CardTitle>
              <CardDescription>Assess pregnancy complications and health status</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm text-muted-foreground mb-4">
                Evaluate vital signs, medical history, and physical indicators to predict maternal health risks.
              </p>
              <Link href="/health-risk" className="w-full block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Start Assessment
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Depression Risk Card */}
          <Card className="border-2 border-secondary/40 hover:border-secondary/70 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <CardHeader className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <CardTitle>Depression Risk Screening</CardTitle>
              <CardDescription>Screen for perinatal and maternal depression</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm text-muted-foreground mb-4">
                Complete mental health screening based on comprehensive behavioral and emotional assessment.
              </p>
              <Link href="/depression-status" className="w-full block">
                <Button
                  variant="outline"
                  className="w-full border-secondary/40 text-secondary hover:bg-secondary/5 bg-transparent"
                >
                  Start Screening
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="bg-accent/30 border-secondary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground text-center">
              This assessment tool uses advanced machine learning models to provide health risk predictions. Results
              should be reviewed by qualified healthcare professionals.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
