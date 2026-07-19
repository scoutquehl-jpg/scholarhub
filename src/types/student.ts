export interface StudentProfile {
  name: string
  grade: string
  school: string
  gradYear: number
}

export interface VolunteerEntry {
  id: string
  date: string
  orgName: string
  hours: number
}

export interface Extracurricular {
  id: string
  name: string
  role: string
  hoursPerWeek: number
  gradeStarted: string
}

export type SchoolLabel = "Reach" | "Match" | "Safety"
export type SchoolStatus = "Researching" | "Planning" | "Drafting" | "Submitted"

export interface CollegeEntry {
  id: string
  name: string
  label: SchoolLabel
  status: SchoolStatus
}

export interface Essay {
  id: string
  title: string
  school: string
  progress: number
}
