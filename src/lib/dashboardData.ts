import { supabase } from "@/lib/supabase"
import type {
  CollegeEntry,
  Essay,
  Extracurricular,
  SchoolLabel,
  SchoolStatus,
  StudentProfile,
  VolunteerEntry,
} from "@/types/student"

export async function getOrCreateProfile(userId: string): Promise<StudentProfile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle()

  if (error) throw error

  if (data) {
    return {
      id: data.id,
      name: data.name,
      grade: data.grade,
      school: data.school,
      gradYear: data.grad_year,
      volunteerGoalHours: data.volunteer_goal_hours,
    }
  }

  const { data: inserted, error: insertError } = await supabase
    .from("profiles")
    .insert({
      id: userId,
      name: "",
      grade: "",
      school: "",
      grad_year: null,
      volunteer_goal_hours: 50,
    })
    .select()
    .single()

  if (insertError) throw insertError

  return {
    id: inserted.id,
    name: inserted.name,
    grade: inserted.grade,
    school: inserted.school,
    gradYear: inserted.grad_year,
    volunteerGoalHours: inserted.volunteer_goal_hours,
  }
}

export async function updateProfile(
  userId: string,
  patch: Partial<Omit<StudentProfile, "id">>
) {
  const dbPatch: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (patch.name !== undefined) dbPatch.name = patch.name
  if (patch.grade !== undefined) dbPatch.grade = patch.grade
  if (patch.school !== undefined) dbPatch.school = patch.school
  if (patch.gradYear !== undefined) dbPatch.grad_year = patch.gradYear
  if (patch.volunteerGoalHours !== undefined) {
    dbPatch.volunteer_goal_hours = patch.volunteerGoalHours
  }

  const { error } = await supabase.from("profiles").update(dbPatch).eq("id", userId)
  if (error) throw error
}

export async function fetchVolunteerEntries(userId: string): Promise<VolunteerEntry[]> {
  const { data, error } = await supabase
    .from("volunteer_entries")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })

  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    date: row.date,
    orgName: row.org_name,
    hours: Number(row.hours),
  }))
}

export async function addVolunteerEntry(
  userId: string,
  entry: Omit<VolunteerEntry, "id">
): Promise<VolunteerEntry> {
  const { data, error } = await supabase
    .from("volunteer_entries")
    .insert({ user_id: userId, date: entry.date, org_name: entry.orgName, hours: entry.hours })
    .select()
    .single()

  if (error) throw error

  return { id: data.id, date: data.date, orgName: data.org_name, hours: Number(data.hours) }
}

export async function updateVolunteerEntry(id: string, patch: Omit<VolunteerEntry, "id">) {
  const { error } = await supabase
    .from("volunteer_entries")
    .update({ date: patch.date, org_name: patch.orgName, hours: patch.hours })
    .eq("id", id)

  if (error) throw error
}

export async function deleteVolunteerEntry(id: string) {
  const { error } = await supabase.from("volunteer_entries").delete().eq("id", id)
  if (error) throw error
}

export async function fetchExtracurriculars(userId: string): Promise<Extracurricular[]> {
  const { data, error } = await supabase
    .from("extracurriculars")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })

  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    role: row.role,
    hoursPerWeek: Number(row.hours_per_week),
    gradeStarted: row.grade_started,
  }))
}

export async function addExtracurricular(
  userId: string,
  activity: Omit<Extracurricular, "id">
): Promise<Extracurricular> {
  const { data, error } = await supabase
    .from("extracurriculars")
    .insert({
      user_id: userId,
      name: activity.name,
      role: activity.role,
      hours_per_week: activity.hoursPerWeek,
      grade_started: activity.gradeStarted,
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    name: data.name,
    role: data.role,
    hoursPerWeek: Number(data.hours_per_week),
    gradeStarted: data.grade_started,
  }
}

export async function updateExtracurricular(id: string, patch: Omit<Extracurricular, "id">) {
  const { error } = await supabase
    .from("extracurriculars")
    .update({
      name: patch.name,
      role: patch.role,
      hours_per_week: patch.hoursPerWeek,
      grade_started: patch.gradeStarted,
    })
    .eq("id", id)

  if (error) throw error
}

export async function deleteExtracurricular(id: string) {
  const { error } = await supabase.from("extracurriculars").delete().eq("id", id)
  if (error) throw error
}

export async function fetchSchools(userId: string): Promise<CollegeEntry[]> {
  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })

  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    label: row.label as SchoolLabel,
    status: row.status as SchoolStatus,
  }))
}

export async function addSchool(
  userId: string,
  school: Omit<CollegeEntry, "id">
): Promise<CollegeEntry> {
  const { data, error } = await supabase
    .from("schools")
    .insert({ user_id: userId, name: school.name, label: school.label, status: school.status })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    name: data.name,
    label: data.label as SchoolLabel,
    status: data.status as SchoolStatus,
  }
}

export async function updateSchool(id: string, patch: Omit<CollegeEntry, "id">) {
  const { error } = await supabase
    .from("schools")
    .update({ name: patch.name, label: patch.label, status: patch.status })
    .eq("id", id)

  if (error) throw error
}

export async function deleteSchool(id: string) {
  const { error } = await supabase.from("schools").delete().eq("id", id)
  if (error) throw error
}

export async function fetchEssays(userId: string): Promise<Essay[]> {
  const { data, error } = await supabase
    .from("essays")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })

  if (error) throw error

  return data.map((row) => ({
    id: row.id,
    title: row.title,
    school: row.school,
    progress: row.progress,
  }))
}

export async function addEssay(userId: string, essay: Omit<Essay, "id">): Promise<Essay> {
  const { data, error } = await supabase
    .from("essays")
    .insert({ user_id: userId, title: essay.title, school: essay.school, progress: essay.progress })
    .select()
    .single()

  if (error) throw error

  return { id: data.id, title: data.title, school: data.school, progress: data.progress }
}

export async function updateEssay(id: string, patch: Omit<Essay, "id">) {
  const { error } = await supabase
    .from("essays")
    .update({ title: patch.title, school: patch.school, progress: patch.progress })
    .eq("id", id)

  if (error) throw error
}

export async function deleteEssay(id: string) {
  const { error } = await supabase.from("essays").delete().eq("id", id)
  if (error) throw error
}
