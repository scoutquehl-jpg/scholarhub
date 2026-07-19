import type {
  CollegeEntry,
  Essay,
  Extracurricular,
  SchoolLabel,
  SchoolStatus,
  StudentProfile,
  VolunteerEntry,
} from "@/types/student"

export const student: StudentProfile = {
  name: "Jordan Avery",
  grade: "11th Grade",
  school: "Lincoln High School",
  gradYear: 2027,
}

export const volunteerGoalDefault = 50

export const initialVolunteerEntries: VolunteerEntry[] = [
  {
    id: "v1",
    date: "2026-06-10",
    orgName: "Riverside Food Bank",
    hours: 4,
  },
  {
    id: "v2",
    date: "2026-05-22",
    orgName: "Lincoln Elementary Tutoring",
    hours: 3,
  },
  {
    id: "v3",
    date: "2026-04-15",
    orgName: "Beach Cleanup Crew",
    hours: 5,
  },
  {
    id: "v4",
    date: "2026-03-02",
    orgName: "Riverside Food Bank",
    hours: 4,
  },
]

export const initialExtracurriculars: Extracurricular[] = [
  {
    id: "e1",
    name: "Robotics Club",
    role: "Lead Engineer",
    hoursPerWeek: 6,
    gradeStarted: "9th Grade",
  },
  {
    id: "e2",
    name: "Debate Team",
    role: "Team Captain",
    hoursPerWeek: 4,
    gradeStarted: "10th Grade",
  },
  {
    id: "e3",
    name: "Volunteer Corps",
    role: "Member",
    hoursPerWeek: 2,
    gradeStarted: "9th Grade",
  },
  {
    id: "e4",
    name: "Varsity Track",
    role: "Sprinter",
    hoursPerWeek: 8,
    gradeStarted: "11th Grade",
  },
]

export const initialSchools: CollegeEntry[] = [
  { id: "s1", name: "State University", label: "Match", status: "Researching" },
  { id: "s2", name: "Tech Institute", label: "Reach", status: "Planning" },
  { id: "s3", name: "Riverside Community College", label: "Safety", status: "Submitted" },
  { id: "s4", name: "Ivy Dream University", label: "Reach", status: "Drafting" },
]

export const initialEssays: Essay[] = [
  {
    id: "es1",
    title: "Common App Personal Statement",
    school: "All schools",
    progress: 65,
  },
  {
    id: "es2",
    title: "Why This Program?",
    school: "Tech Institute",
    progress: 30,
  },
  {
    id: "es3",
    title: '"Why Us" Essay',
    school: "Ivy Dream University",
    progress: 10,
  },
]

export const GRADE_OPTIONS = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"]

export const SCHOOL_LABELS: SchoolLabel[] = ["Reach", "Match", "Safety"]

export const SCHOOL_STATUSES: SchoolStatus[] = [
  "Researching",
  "Planning",
  "Drafting",
  "Submitted",
]
