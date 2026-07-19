import { useState } from "react"
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
import {
  initialEssays,
  initialExtracurriculars,
  initialSchools,
  initialVolunteerEntries,
  student,
  volunteerGoalDefault,
} from "@/data/student"
import type {
  CollegeEntry,
  Essay,
  Extracurricular,
  VolunteerEntry,
} from "@/types/student"

export function DashboardPage() {
  const [volunteerEntries, setVolunteerEntries] = useState<VolunteerEntry[]>(
    initialVolunteerEntries
  )
  const [volunteerGoal, setVolunteerGoal] = useState(volunteerGoalDefault)
  const [activities, setActivities] = useState<Extracurricular[]>(
    initialExtracurriculars
  )
  const [schools, setSchools] = useState<CollegeEntry[]>(initialSchools)
  const [essays, setEssays] = useState<Essay[]>(initialEssays)

  const totalVolunteerHours = volunteerEntries.reduce(
    (sum, entry) => sum + entry.hours,
    0
  )

  function addVolunteerEntry(entry: Omit<VolunteerEntry, "id">) {
    setVolunteerEntries((prev) => [
      ...prev,
      { ...entry, id: crypto.randomUUID() },
    ])
  }

  function addActivity(activity: Omit<Extracurricular, "id">) {
    setActivities((prev) => [...prev, { ...activity, id: crypto.randomUUID() }])
  }

  function addSchool(school: Omit<CollegeEntry, "id">) {
    setSchools((prev) => [...prev, { ...school, id: crypto.randomUUID() }])
  }

  function addEssay(essay: Omit<Essay, "id">) {
    setEssays((prev) => [...prev, { ...essay, id: crypto.randomUUID() }])
  }

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-8">
        <ProfileHeader
          profile={student}
          totalVolunteerHours={totalVolunteerHours}
          activityCount={activities.length}
          schoolCount={schools.length}
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
              goal={volunteerGoal}
              onAddEntry={addVolunteerEntry}
              onGoalChange={setVolunteerGoal}
            />
          </TabsContent>

          <TabsContent value="extracurriculars" className="mt-4">
            <ExtracurricularsTab activities={activities} onAdd={addActivity} />
          </TabsContent>

          <TabsContent value="college" className="mt-4">
            <CollegeTab
              schools={schools}
              essays={essays}
              onAddSchool={addSchool}
              onAddEssay={addEssay}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
