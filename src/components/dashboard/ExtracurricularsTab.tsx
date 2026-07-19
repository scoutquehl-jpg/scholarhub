import { GraduationCap, Plus } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { GRADE_OPTIONS } from "@/data/student"
import type { Extracurricular } from "@/types/student"

interface ExtracurricularsTabProps {
  activities: Extracurricular[]
  onAdd: (activity: Omit<Extracurricular, "id">) => void
}

export function ExtracurricularsTab({
  activities,
  onAdd,
}: ExtracurricularsTabProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Activities
        </h2>
        <AddActivityDialog onAdd={onAdd} />
      </div>

      {activities.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-card-foreground">
                    {activity.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.role}
                  </p>
                </div>
                <Badge variant="secondary">{activity.gradeStarted}</Badge>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {activity.hoursPerWeek} hrs/week
              </p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={GraduationCap}
          title="No activities yet"
          description="Add your clubs, sports, or other extracurriculars above."
        />
      )}
    </div>
  )
}

function AddActivityDialog({
  onAdd,
}: {
  onAdd: (activity: Omit<Extracurricular, "id">) => void
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [hoursPerWeek, setHoursPerWeek] = useState("")
  const [gradeStarted, setGradeStarted] = useState(GRADE_OPTIONS[0])

  const parsedHours = Number(hoursPerWeek)
  const canSubmit =
    name.trim() !== "" && role.trim() !== "" && parsedHours > 0

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setName("")
      setRole("")
      setHoursPerWeek("")
      setGradeStarted(GRADE_OPTIONS[0])
    }
  }

  function handleSubmit() {
    if (!canSubmit) return
    onAdd({
      name: name.trim(),
      role: role.trim(),
      hoursPerWeek: parsedHours,
      gradeStarted,
    })
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button size="sm">
            <Plus />
            Add Activity
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an activity</DialogTitle>
          <DialogDescription>
            Track a club, sport, or other extracurricular.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="activity-name">Activity name</Label>
            <Input
              id="activity-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Robotics Club"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="activity-role">Role</Label>
            <Input
              id="activity-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Member, Captain"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="activity-hours">Hours per week</Label>
            <Input
              id="activity-hours"
              type="number"
              min="0.5"
              step="0.5"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              placeholder="3"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="activity-grade">Grade started</Label>
            <Select
              value={gradeStarted}
              onValueChange={(value) => setGradeStarted(value ?? GRADE_OPTIONS[0])}
            >
              <SelectTrigger id="activity-grade" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GRADE_OPTIONS.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Add Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
