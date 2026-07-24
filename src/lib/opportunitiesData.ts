import { supabase } from "@/lib/supabase"
import type { Opportunity, PendingOpportunity } from "@/types/opportunity"

function mapOpportunityRow(row: Record<string, unknown>): Opportunity {
  return {
    id: row.id as string,
    title: row.title as string,
    organization: row.organization as string,
    description: row.description as string,
    type: row.type as Opportunity["type"],
    deadline: (row.deadline as string | null) ?? null,
    deadlineUrgency: row.deadline_urgency as Opportunity["deadlineUrgency"],
    contactName: row.contact_name as string,
    contactRole: row.contact_role as string,
    createdAt: row.created_at as string,
  }
}

function mapPendingRow(row: Record<string, unknown>): PendingOpportunity {
  return {
    ...mapOpportunityRow(row),
    submittedBy: row.submitted_by as string,
    status: row.status as PendingOpportunity["status"],
    reviewedAt: (row.reviewed_at as string | null) ?? null,
  }
}

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const { data, error } = await supabase
    .from("opportunities")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data.map(mapOpportunityRow)
}

export type NewOpportunity = Omit<Opportunity, "id" | "createdAt">

export async function submitOpportunity(
  userId: string,
  opportunity: NewOpportunity
): Promise<void> {
  const { error } = await supabase.from("pending_opportunities").insert({
    submitted_by: userId,
    title: opportunity.title,
    organization: opportunity.organization,
    description: opportunity.description,
    type: opportunity.type,
    deadline: opportunity.deadline,
    deadline_urgency: opportunity.deadlineUrgency,
    contact_name: opportunity.contactName,
    contact_role: opportunity.contactRole,
  })

  if (error) throw error
}

export async function fetchPendingOpportunities(): Promise<PendingOpportunity[]> {
  const { data, error } = await supabase
    .from("pending_opportunities")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: true })

  if (error) throw error
  return data.map(mapPendingRow)
}

export async function approveOpportunity(pending: PendingOpportunity): Promise<void> {
  const { error: insertError } = await supabase.from("opportunities").insert({
    title: pending.title,
    organization: pending.organization,
    description: pending.description,
    type: pending.type,
    deadline: pending.deadline,
    deadline_urgency: pending.deadlineUrgency,
    contact_name: pending.contactName,
    contact_role: pending.contactRole,
  })

  if (insertError) throw insertError

  const { error: updateError } = await supabase
    .from("pending_opportunities")
    .update({ status: "approved", reviewed_at: new Date().toISOString() })
    .eq("id", pending.id)

  if (updateError) throw updateError
}

export async function rejectOpportunity(id: string): Promise<void> {
  const { error } = await supabase
    .from("pending_opportunities")
    .update({ status: "rejected", reviewed_at: new Date().toISOString() })
    .eq("id", id)

  if (error) throw error
}

export async function fetchSavedOpportunityIds(userId: string): Promise<Set<string>> {
  const { data, error } = await supabase
    .from("saved_opportunities")
    .select("opportunity_id")
    .eq("user_id", userId)

  if (error) throw error
  return new Set(data.map((row) => row.opportunity_id as string))
}

export async function saveOpportunity(userId: string, opportunityId: string): Promise<void> {
  const { error } = await supabase
    .from("saved_opportunities")
    .insert({ user_id: userId, opportunity_id: opportunityId })

  if (error) throw error
}

export async function unsaveOpportunity(
  userId: string,
  opportunityId: string
): Promise<void> {
  const { error } = await supabase
    .from("saved_opportunities")
    .delete()
    .eq("user_id", userId)
    .eq("opportunity_id", opportunityId)

  if (error) throw error
}
