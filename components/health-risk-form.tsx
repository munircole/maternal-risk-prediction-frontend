"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormData {
  age: string
  systolicBP: string
  diastolicBP: string
  bloodSugar: string
  bodyTemp: string
  bmi: string
  previousComplications: string
  preexistingDiabetes: string
  gestationalDiabetes: string
  mentalHealth: string
  heartRate: string
  highBP: string
  highBS: string
  obese: string
}

interface HealthRiskFormProps {
  onSubmit: (data: FormData) => Promise<void>
  isLoading?: boolean
}

export function HealthRiskForm({ onSubmit, isLoading = false }: HealthRiskFormProps) {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    systolicBP: "",
    diastolicBP: "",
    bloodSugar: "",
    bodyTemp: "",
    bmi: "",
    previousComplications: "",
    preexistingDiabetes: "",
    gestationalDiabetes: "",
    mentalHealth: "",
    heartRate: "",
    highBP: "",
    highBS: "",
    obese: "",
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const fields = [
    { key: "age", label: "Age (years)", type: "number", placeholder: "Enter age", min: "15", max: "50" },
    { key: "systolicBP", label: "Systolic BP (mmHg)", type: "number", placeholder: "e.g., 120", min: "60", max: "200" },
    {
      key: "diastolicBP",
      label: "Diastolic BP (mmHg)",
      type: "number",
      placeholder: "e.g., 80",
      min: "40",
      max: "130",
    },
    {
      key: "bloodSugar",
      label: "Blood Sugar (mg/dL)",
      type: "number",
      placeholder: "e.g., 100",
      min: "50",
      max: "500",
    },
    {
      key: "bodyTemp",
      label: "Body Temperature (°C)",
      type: "number",
      placeholder: "e.g., 37",
      min: "35",
      max: "42",
      step: "0.1",
    },
    { key: "bmi", label: "BMI", type: "number", placeholder: "e.g., 24.5", min: "10", max: "60", step: "0.1" },
    { key: "heartRate", label: "Heart Rate (bpm)", type: "number", placeholder: "e.g., 72", min: "40", max: "150" },
  ]

  const booleanFields = [
    { key: "previousComplications", label: "Previous Complications?" },
    { key: "preexistingDiabetes", label: "Preexisting Diabetes?" },
    { key: "gestationalDiabetes", label: "Gestational Diabetes?" },
    { key: "mentalHealth", label: "Mental Health Concerns?" },
    { key: "highBP", label: "High Blood Pressure?" },
    { key: "highBS", label: "High Blood Sugar?" },
    { key: "obese", label: "Obesity?" },
  ]

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormComplete()) {
      alert("Please fill in all fields before submitting.")
      return
    }
    await onSubmit(formData)
  }

  const totalPages = Math.ceil((fields.length + booleanFields.length) / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const endIdx = startIdx + itemsPerPage

  const currentFields = fields.slice(startIdx, endIdx)
  const remainingSlots = itemsPerPage - currentFields.length
  const currentBooleanFields = remainingSlots > 0 ? booleanFields.slice(0, remainingSlots) : []
  const booleanFieldsStart = Math.max(0, startIdx - fields.length)
  const displayBooleanFields = booleanFields.slice(
    booleanFieldsStart,
    booleanFieldsStart + itemsPerPage - currentFields.length,
  )

  const isCurrentPageValid = () => {
    const displayFields = [...currentFields, ...displayBooleanFields]
    return displayFields.every((field) => formData[field.key as keyof FormData] !== "")
  }

  const isFormComplete = () => {
    return Object.values(formData).every((value) => value !== "")
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Maternal Health Assessment Form</CardTitle>
        <CardDescription>
          Enter your health information ({currentPage} of {totalPages})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Numeric Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            {currentFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key} className="text-sm font-medium">
                  {field.label}
                </Label>
                <Input
                  id={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  step={field.step || "1"}
                  value={formData[field.key as keyof FormData]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="border-border focus:border-primary"
                  required
                />
              </div>
            ))}
          </div>

          {/* Boolean Fields */}
          {displayBooleanFields.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {displayBooleanFields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key} className="text-sm font-medium">
                    {field.label}
                  </Label>
                  <Select
                    value={formData[field.key as keyof FormData]}
                    onValueChange={(value) => handleChange(field.key, value)}
                  >
                    <SelectTrigger className="border-border focus:border-primary">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-primary text-primary hover:bg-primary/5"
            >
              Previous
            </Button>
            <div className="text-sm text-muted-foreground self-center">
              Page {currentPage} of {totalPages}
            </div>
            {currentPage < totalPages ? (
              <Button
                type="button"
                disabled={!isCurrentPageValid()}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !isFormComplete()}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Analyzing..." : "Get Assessment"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
