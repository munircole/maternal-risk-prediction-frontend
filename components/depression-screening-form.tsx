"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FormData {
  age: string
  numberOfSons: string
  numberOfDaughters: string
  gravida: string
  femaleEducation: string
  husbandEducation: string
  workingStatus: string
  physicalHealth: string
  previousMiscarriage: string
  sufficientMoney: string
  appearanceAcceptance: string
  familySystem: string
  maleGenderPreference: string
  relationshipWithMotherInLaw: string
  littleInterest: string
  feelingDown: string
  troubleSleeping: string
  feelingTired: string
  poorAppetite: string
  feelingBadAboutSelf: string
  troubleConcentrating: string
  movingOrSpeaking: string
  thoughtsOfHurt: string
}

interface DepressionScreeningFormProps {
  onSubmit: (data: FormData) => Promise<void>
  isLoading?: boolean
}

const gravidaOptions = ["Primigravida", "Multigravida"]
const educationOptions = ["Graduation", "Intermediate", "Middle", "Matric", "Primary", "Uneducated"]
const phq9Scale = ["Not at all", "Several days", "More than half the days", "Nearly every day"]

export function DepressionScreeningForm({ onSubmit, isLoading = false }: DepressionScreeningFormProps) {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    numberOfSons: "",
    numberOfDaughters: "",
    gravida: "",
    femaleEducation: "",
    husbandEducation: "",
    workingStatus: "",
    physicalHealth: "",
    previousMiscarriage: "",
    sufficientMoney: "",
    appearanceAcceptance: "",
    familySystem: "",
    maleGenderPreference: "",
    relationshipWithMotherInLaw: "",
    littleInterest: "",
    feelingDown: "",
    troubleSleeping: "",
    feelingTired: "",
    poorAppetite: "",
    feelingBadAboutSelf: "",
    troubleConcentrating: "",
    movingOrSpeaking: "",
    thoughtsOfHurt: "",
  })

  const [currentSection, setCurrentSection] = useState(1)

  const isSectionValid = (section: number): boolean => {
    if (section === 1) {
      return (
        formData.age.trim() !== "" &&
        formData.numberOfSons.trim() !== "" &&
        formData.numberOfDaughters.trim() !== "" &&
        formData.gravida.trim() !== "" &&
        formData.femaleEducation.trim() !== "" &&
        formData.husbandEducation.trim() !== ""
      )
    }
    if (section === 2) {
      return (
        formData.workingStatus.trim() !== "" &&
        formData.physicalHealth.trim() !== "" &&
        formData.previousMiscarriage.trim() !== "" &&
        formData.sufficientMoney.trim() !== "" &&
        formData.appearanceAcceptance.trim() !== "" &&
        formData.familySystem.trim() !== "" &&
        formData.maleGenderPreference.trim() !== "" &&
        formData.relationshipWithMotherInLaw.trim() !== ""
      )
    }
    if (section === 3) {
      return (
        formData.littleInterest.trim() !== "" &&
        formData.feelingDown.trim() !== "" &&
        formData.troubleSleeping.trim() !== "" &&
        formData.feelingTired.trim() !== "" &&
        formData.poorAppetite.trim() !== "" &&
        formData.feelingBadAboutSelf.trim() !== "" &&
        formData.troubleConcentrating.trim() !== "" &&
        formData.movingOrSpeaking.trim() !== "" &&
        formData.thoughtsOfHurt.trim() !== ""
      )
    }
    return false
  }

  const isFormComplete = (): boolean => {
    return isSectionValid(1) && isSectionValid(2) && isSectionValid(3)
  }

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormComplete()) {
      return
    }
    await onSubmit(formData)
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Maternal Depression Screening</CardTitle>
        <CardDescription>Section {currentSection} of 3 - Complete the assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentSection === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Demographic Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium">
                    Age (years)
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    min="15"
                    max="50"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numberOfSons" className="text-sm font-medium">
                    Number of Sons
                  </Label>
                  <Input
                    id="numberOfSons"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.numberOfSons}
                    onChange={(e) => handleChange("numberOfSons", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numberOfDaughters" className="text-sm font-medium">
                    Number of Daughters
                  </Label>
                  <Input
                    id="numberOfDaughters"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={formData.numberOfDaughters}
                    onChange={(e) => handleChange("numberOfDaughters", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gravida" className="text-sm font-medium">
                    Gravida (pregnancies)
                  </Label>
                  <Select value={formData.gravida} onValueChange={(value) => handleChange("gravida", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {gravidaOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="femaleEducation" className="text-sm font-medium">
                    Your Education
                  </Label>
                  <Select
                    value={formData.femaleEducation}
                    onValueChange={(value) => handleChange("femaleEducation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="husbandEducation" className="text-sm font-medium">
                    Husband/Partner Education
                  </Label>
                  <Select
                    value={formData.husbandEducation}
                    onValueChange={(value) => handleChange("husbandEducation", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {educationOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Social and Health Background</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workingStatus" className="text-sm font-medium">
                    Working Status
                  </Label>
                  <Select
                    value={formData.workingStatus}
                    onValueChange={(value) => handleChange("workingStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="working">Working Lady</SelectItem>
                      <SelectItem value="housewife">Housewife</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="physicalHealth" className="text-sm font-medium">
                    Physical Health
                  </Label>
                  <Select
                    value={formData.physicalHealth}
                    onValueChange={(value) => handleChange("physicalHealth", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthy">Healthy</SelectItem>
                      <SelectItem value="disability">Disability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousMiscarriage" className="text-sm font-medium">
                    Previous Miscarriage?
                  </Label>
                  <Select
                    value={formData.previousMiscarriage}
                    onValueChange={(value) => handleChange("previousMiscarriage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sufficientMoney" className="text-sm font-medium">
                    Sufficient Money for Basic Needs?
                  </Label>
                  <Select
                    value={formData.sufficientMoney}
                    onValueChange={(value) => handleChange("sufficientMoney", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="appearanceAcceptance" className="text-sm font-medium">
                    Acceptance of Current Appearance?
                  </Label>
                  <Select
                    value={formData.appearanceAcceptance}
                    onValueChange={(value) => handleChange("appearanceAcceptance", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familySystem" className="text-sm font-medium">
                    Family System
                  </Label>
                  <Select value={formData.familySystem} onValueChange={(value) => handleChange("familySystem", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nuclear">Nuclear</SelectItem>
                      <SelectItem value="joint">Joint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maleGenderPreference" className="text-sm font-medium">
                    Preference for Male Child?
                  </Label>
                  <Select
                    value={formData.maleGenderPreference}
                    onValueChange={(value) => handleChange("maleGenderPreference", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="relationshipWithMotherInLaw" className="text-sm font-medium">
                    Relationship with Mother-in-Law
                  </Label>
                  <Select
                    value={formData.relationshipWithMotherInLaw}
                    onValueChange={(value) => handleChange("relationshipWithMotherInLaw", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentSection === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">PHQ-9 Depression Screening (Past 2 Weeks)</h3>
              <p className="text-sm text-muted-foreground">Rate how often you have felt or behaved this way:</p>
              <div className="space-y-4">
                {[
                  { key: "littleInterest", label: "Little interest or pleasure in doing things" },
                  { key: "feelingDown", label: "Feeling down, depressed, or hopeless" },
                  { key: "troubleSleeping", label: "Trouble falling or staying asleep, or sleeping too much" },
                  { key: "feelingTired", label: "Feeling tired or having little energy" },
                  { key: "poorAppetite", label: "Poor appetite or overeating" },
                  { key: "feelingBadAboutSelf", label: "Feeling bad about yourself or that you are a failure" },
                  { key: "troubleConcentrating", label: "Trouble concentrating on things" },
                  { key: "movingOrSpeaking", label: "Moving or speaking so slowly (or the opposite - being restless)" },
                  { key: "thoughtsOfHurt", label: "Thoughts that you would be better off dead" },
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <Label className="text-sm font-medium">{item.label}</Label>
                    <Select
                      value={formData[item.key as keyof FormData]}
                      onValueChange={(value) => handleChange(item.key, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        {phq9Scale.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentSection((s) => Math.max(1, s - 1))}
              disabled={currentSection === 1}
              className="border-primary text-primary hover:bg-primary/5"
            >
              Previous
            </Button>
            <div className="text-sm text-muted-foreground self-center">Section {currentSection} of 3</div>
            {currentSection < 3 ? (
              <Button
                type="button"
                onClick={() => {
                  if (isSectionValid(currentSection)) {
                    setCurrentSection((s) => Math.min(3, s + 1))
                  }
                }}
                disabled={!isSectionValid(currentSection)}
                className="bg-primary hover:bg-primary/90"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !isFormComplete()}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Analyzing..." : "Complete Screening"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
