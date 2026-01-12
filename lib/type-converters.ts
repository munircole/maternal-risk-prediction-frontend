interface HealthRiskFormData {
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

interface DepressionFormData {
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

// yes/no → 1/0
const stringToBoolean = (value: string): number =>
  value.toLowerCase() === "yes" ? 1 : 0


// PHQ-9 mapping
const phq9ResponseToNumber = (response: string): number => {
  if (response.includes("Not at all")) return 0
  if (response.includes("Several days")) return 1
  if (response.includes("More than half the days")) return 2
  if (response.includes("Nearly every day")) return 3
  return 0
}

// ---------------- MATERNAL ----------------
export function convertHealthRiskFormToAPI(data: HealthRiskFormData) {
  return {
    age: Number.parseFloat(data.age),
    systolic_bp: Number.parseFloat(data.systolicBP),
    diastolic: Number.parseFloat(data.diastolicBP),
    bs: Number.parseFloat(data.bloodSugar),
    body_temp: Number.parseFloat(data.bodyTemp),
    bmi: Number.parseFloat(data.bmi),
    previous_complications: stringToBoolean(data.previousComplications),
    preexisting_diabetes: stringToBoolean(data.preexistingDiabetes),
    gestational_diabetes: stringToBoolean(data.gestationalDiabetes),
    mental_health: stringToBoolean(data.mentalHealth),
    heart_rate: Number.parseFloat(data.heartRate),
    high_bp: stringToBoolean(data.highBP),
    high_bs: stringToBoolean(data.highBS),
    obese: stringToBoolean(data.obese),
  }
}

// ---------------- DEPRESSION ----------------
export function convertDepressionFormToAPI(data: DepressionFormData) {
  return {
    age: Number.parseFloat(data.age),
    number_of_sons: Number.parseInt(data.numberOfSons),
    number_of_daughters: Number.parseInt(data.numberOfDaughters),
    gravida: data.gravida,
    female_education: data.femaleEducation,
    husband_education: data.husbandEducation,
    working_status: data.workingStatus,
    physical_health: data.physicalHealth,
    previous_miscarriage: data.previousMiscarriage,
    sufficient_money: data.sufficientMoney,
    appearance_acceptance: data.appearanceAcceptance,
    family_system: data.familySystem,
    male_gender_preference: data.maleGenderPreference,
    relationship_with_mother_in_law: data.relationshipWithMotherInLaw,

    // PHQ-9 (0–3)
    little_interest: phq9ResponseToNumber(data.littleInterest),
    feeling_down: phq9ResponseToNumber(data.feelingDown),
    trouble_sleeping: phq9ResponseToNumber(data.troubleSleeping),
    feeling_tired: phq9ResponseToNumber(data.feelingTired),
    poor_appetite: phq9ResponseToNumber(data.poorAppetite),
    feeling_bad_about_self: phq9ResponseToNumber(data.feelingBadAboutSelf),
    trouble_concentrating: phq9ResponseToNumber(data.troubleConcentrating),
    moving_or_speaking: phq9ResponseToNumber(data.movingOrSpeaking),
    thoughts_of_hurt: phq9ResponseToNumber(data.thoughtsOfHurt),
  }
}
