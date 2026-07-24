export type OpportunityType =
  | "Volunteer"
  | "Program"
  | "Internship"
  | "Competition"
  | "Scholarship"

export type DeadlineUrgency = "urgent" | "soon" | "open" | "ongoing"

export interface Opportunity {
  id: string
  title: string
  organization: string
  description: string
  type: OpportunityType
  deadline: string | null
  deadlineUrgency: DeadlineUrgency
  contactName: string
  contactRole: string
  createdAt: string
}

export type PendingStatus = "pending" | "approved" | "rejected"

export interface PendingOpportunity extends Opportunity {
  submittedBy: string
  status: PendingStatus
  reviewedAt: string | null
}

export const OPPORTUNITY_TYPES: OpportunityType[] = [
  "Volunteer",
  "Program",
  "Internship",
  "Competition",
  "Scholarship",
]

export const DEADLINE_URGENCIES: DeadlineUrgency[] = [
  "urgent",
  "soon",
  "open",
  "ongoing",
]
