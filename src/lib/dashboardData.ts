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

export async function getOrCreateProfile(
  userId: string,
  email: string
): Promise<StudentProfile> {
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
      avatarUrl: data.avatar_url,
      bannerUrl: data.banner_url,
      isPublic: data.is_public,
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
      email,
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
    avatarUrl: inserted.avatar_url,
    bannerUrl: inserted.banner_url,
    isPublic: inserted.is_public,
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
  if (patch.avatarUrl !== undefined) dbPatch.avatar_url = patch.avatarUrl
  if (patch.bannerUrl !== undefined) dbPatch.banner_url = patch.bannerUrl
  if (patch.isPublic !== undefined) dbPatch.is_public = patch.isPublic

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
    club: row.club,
  }))
}

export async function addVolunteerEntry(
  userId: string,
  entry: Omit<VolunteerEntry, "id">
): Promise<VolunteerEntry> {
  const { data, error } = await supabase
    .from("volunteer_entries")
    .insert({
      user_id: userId,
      date: entry.date,
      org_name: entry.orgName,
      hours: entry.hours,
      club: entry.club,
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: data.id,
    date: data.date,
    orgName: data.org_name,
    hours: Number(data.hours),
    club: data.club,
  }
}

export async function updateVolunteerEntry(id: string, patch: Omit<VolunteerEntry, "id">) {
  const { error } = await supabase
    .from("volunteer_entries")
    .update({ date: patch.date, org_name: patch.orgName, hours: patch.hours, club: patch.club })
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

async function uploadProfileImage(userId: string, kind: "avatar" | "banner", file: File) {
  const ext = file.name.split(".").pop() || "jpg"
  const path = `${userId}/${kind}.${ext}`

  const { error } = await supabase.storage
    .from("profile-media")
    .upload(path, file, { upsert: true, cacheControl: "3600" })

  if (error) throw error

  const { data } = supabase.storage.from("profile-media").getPublicUrl(path)
  return `${data.publicUrl}?t=${Date.now()}`
}

export function uploadAvatar(userId: string, file: File) {
  return uploadProfileImage(userId, "avatar", file)
}

export function uploadBanner(userId: string, file: File) {
  return uploadProfileImage(userId, "banner", file)
}
