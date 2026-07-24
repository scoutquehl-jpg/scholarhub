import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { ProfileHeader } from "@/components/dashboard/ProfileHeader"
import { VolunteerTab } from "@/components/dashboard/VolunteerTab"
import { ExtracurricularsTab } from "@/components/dashboard/ExtracurricularsTab"
import { CollegeTab } from "@/components/dashboard/CollegeTab"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth"
import * as dashboardData from "@/lib/dashboardData"
import {
  fetchClubs,
  fetchMyMemberships,
  subscribeToMyMemberships,
  type MyMembership,
} from "@/lib/clubsData"
import type { Club } from "@/types/club"
import type {
  CollegeEntry,
  Essay,
  Extracurricular,
  StudentProfile,
  VolunteerEntry,
} from "@/types/student"

export function DashboardPage() {
  const { session, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<StudentProfile | null>(null)
  const [volunteerEntries, setVolunteerEntries] = useState<VolunteerEntry[]>([])
  const [activities, setActivities] = useState<Extracurricular[]>([])
  const [schools, setSchools] = useState<CollegeEntry[]>([])
  const [essays, setEssays] = useState<Essay[]>([])
  const [clubs, setClubs] = useState<Club[]>([])
  const [memberships, setMemberships] = useState<MyMembership[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) return

    let cancelled = false
    setLoading(true)

    Promise.all([
      dashboardData.getOrCreateProfile(session.user.id, session.user.email ?? ""),
      dashboardData.fetchVolunteerEntries(session.user.id),
      dashboardData.fetchExtracurriculars(session.user.id),
      dashboardData.fetchSchools(session.user.id),
      dashboardData.fetchEssays(session.user.id),
      fetchClubs(),
      fetchMyMemberships(session.user.id),
    ]).then(([p, v, a, s, e, c, m]) => {
      if (cancelled) return
      setProfile(p)
      setVolunteerEntries(v)
      setActivities(a)
      setSchools(s)
      setEssays(e)
      setClubs(c)
      setMemberships(m)
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [session])

  useEffect(() => {
    if (!session) return

    const unsubscribe = subscribeToMyMemberships(session.user.id, () => {
      fetchMyMemberships(session.user.id).then(setMemberships)
    })

    return unsubscribe
  }, [session])

  if (!authLoading && !session) {
    return <Navigate to="/login" replace />
  }

  if (authLoading || loading || !profile || !session) {
    return (
      <div className="min-h-svh bg-background">
        <Header />
        <main className="mx-auto max-w-4xl px-6 py-8">
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </main>
      </div>
    )
  }

  const totalVolunteerHours = volunteerEntries.reduce((sum, entry) => sum + entry.hours, 0)
  const userId = session.user.id

  async function handleProfileSave(patch: Partial<Omit<StudentProfile, "id">>) {
    await dashboardData.updateProfile(userId, patch)
    setProfile((prev) => (prev ? { ...prev, ...patch } : prev))
  }

  async function handleGoalChange(goal: number) {
    await dashboardData.updateProfile(userId, { volunteerGoalHours: goal })
    setProfile((prev) => (prev ? { ...prev, volunteerGoalHours: goal } : prev))
  }

  async function handleAvatarUpload(file: File) {
    const avatarUrl = await dashboardData.uploadAvatar(userId, file)
    await handleProfileSave({ avatarUrl })
  }

  async function handleBannerUpload(file: File) {
    const bannerUrl = await dashboardData.uploadBanner(userId, file)
    await handleProfileSave({ bannerUrl })
  }

  async function handleAddVolunteerEntry(entry: Omit<VolunteerEntry, "id">) {
    const created = await dashboardData.addVolunteerEntry(userId, entry)
    setVolunteerEntries((prev) => [...prev, created])
  }

  async function handleEditVolunteerEntry(id: string, patch: Omit<VolunteerEntry, "id">) {
    await dashboardData.updateVolunteerEntry(id, patch)
    setVolunteerEntries((prev) => prev.map((e) => (e.id === id ? { id, ...patch } : e)))
  }

  async function handleDeleteVolunteerEntry(id: string) {
    await dashboardData.deleteVolunteerEntry(id)
    setVolunteerEntries((prev) => prev.filter((e) => e.id !== id))
  }

  async function handleAddActivity(activity: Omit<Extracurricular, "id">) {
    const created = await dashboardData.addExtracurricular(userId, activity)
    setActivities((prev) => [...prev, created])
  }

  async function handleEditActivity(id: string, patch: Omit<Extracurricular, "id">) {
    await dashboardData.updateExtracurricular(id, patch)
    setActivities((prev) => prev.map((a) => (a.id === id ? { id, ...patch } : a)))
  }

  async function handleDeleteActivity(id: string) {
    await dashboardData.deleteExtracurricular(id)
    setActivities((prev) => prev.filter((a) => a.id !== id))
  }

  async function handleAddSchool(school: Omit<CollegeEntry, "id">) {
    const created = await dashboardData.addSchool(userId, school)
    setSchools((prev) => [...prev, created])
  }

  async function handleEditSchool(id: string, patch: Omit<CollegeEntry, "id">) {
    await dashboardData.updateSchool(id, patch)
    setSchools((prev) => prev.map((s) => (s.id === id ? { id, ...patch } : s)))
  }

  async function handleDeleteSchool(id: string) {
    await dashboardData.deleteSchool(id)
    setSchools((prev) => prev.filter((s) => s.id !== id))
  }

  async function handleAddEssay(essay: Omit<Essay, "id">) {
    const created = await dashboardData.addEssay(userId, essay)
    setEssays((prev) => [...prev, created])
  }

  async function handleEditEssay(id: string, patch: Omit<Essay, "id">) {
    await dashboardData.updateEssay(id, patch)
    setEssays((prev) => prev.map((e) => (e.id === id ? { id, ...patch } : e)))
  }

  async function handleDeleteEssay(id: string) {
    await dashboardData.deleteEssay(id)
    setEssays((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-8">
        <ProfileHeader
          profile={profile}
          totalVolunteerHours={totalVolunteerHours}
          activityCount={activities.length}
          schoolCount={schools.length}
          memberships={memberships}
          onSave={handleProfileSave}
          onAvatarUpload={handleAvatarUpload}
          onBannerUpload={handleBannerUpload}
        />

        <Tabs defaultValue="volunteer" className="mt-6">
          <TabsList variant="line" className="w-full justify-start">
            <TabsTrigger value="volunteer">Volunteer Hours</TabsTrigger>
            <TabsTrigger value="extracurriculars">Extracurriculars</TabsTrigger>
            <TabsTrigger value="college">College Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="volunteer" className="mt-4">
            <VolunteerTab
              entries={volunteerEntries}
              goal={profile.volunteerGoalHours}
              clubs={clubs}
              onAddEntry={handleAddVolunteerEntry}
              onEditEntry={handleEditVolunteerEntry}
              onDeleteEntry={handleDeleteVolunteerEntry}
              onGoalChange={handleGoalChange}
            />
          </TabsContent>

          <TabsContent value="extracurriculars" className="mt-4">
            <ExtracurricularsTab
              activities={activities}
              onAdd={handleAddActivity}
              onEdit={handleEditActivity}
              onDelete={handleDeleteActivity}
            />
          </TabsContent>

          <TabsContent value="college" className="mt-4">
            <CollegeTab
              schools={schools}
              essays={essays}
              onAddSchool={handleAddSchool}
              onEditSchool={handleEditSchool}
              onDeleteSchool={handleDeleteSchool}
              onAddEssay={handleAddEssay}
              onEditEssay={handleEditEssay}
              onDeleteEssay={handleDeleteEssay}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
