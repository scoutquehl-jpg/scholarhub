import { NotebookPen, Plus, School } from "lucide-react"
import { useState } from "react"
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
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { EmptyState } from "@/components/dashboard/EmptyState"
import { SCHOOL_LABELS, SCHOOL_STATUSES } from "@/data/student"
import { cn } from "@/lib/utils"
import type {
  CollegeEntry,
  Essay,
  SchoolLabel,
  SchoolStatus,
} from "@/types/student"

const labelStyles: Record<SchoolLabel, string> = {
  Reach: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Match: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Safety: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

const statusStyles: Record<SchoolStatus, string> = {
  Researching: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Planning: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Drafting: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Submitted: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

interface CollegeTabProps {
  schools: CollegeEntry[]
  essays: Essay[]
  onAddSchool: (school: Omit<CollegeEntry, "id">) => void
  onAddEssay: (essay: Omit<Essay, "id">) => void
}

export function CollegeTab({
  schools,
  essays,
  onAddSchool,
  onAddEssay,
}: CollegeTabProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Schools
          </h2>
          <AddSchoolDialog onAdd={onAddSchool} />
        </div>

        {schools.length > 0 ? (
          <div className="flex flex-col gap-2">
            {schools.map((school) => (
              <div
                key={school.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card p-3.5"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-medium">{school.name}</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      labelStyles[school.label]
                    )}
                  >
                    {school.label}
                  </span>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    statusStyles[school.status]
                  )}
                >
                  {school.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={School}
            title="No schools yet"
            description="As you start researching colleges, add them here to track reach, match, and safety schools."
          />
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Essay Tracker
          </h2>
          <AddEssayDialog onAdd={onAddEssay} />
        </div>

        {essays.length > 0 ? (
          <div className="flex flex-col gap-3">
            {essays.map((essay) => (
              <div
                key={essay.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium">{essay.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {essay.school}
                    </p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">
                    {essay.progress}%
                  </span>
                </div>
                <Progress value={essay.progress} className="mt-3" />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={NotebookPen}
            title="No essays yet"
            description="Once you start drafting, add essays here to track your progress."
          />
        )}
      </div>
    </div>
  )
}

function AddSchoolDialog({
  onAdd,
}: {
  onAdd: (school: Omit<CollegeEntry, "id">) => void
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [label, setLabel] = useState<SchoolLabel>("Match")
  const [status, setStatus] = useState<SchoolStatus>("Researching")

  const canSubmit = name.trim() !== ""

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setName("")
      setLabel("Match")
      setStatus("Researching")
    }
  }

  function handleSubmit() {
    if (!canSubmit) return
    onAdd({ name: name.trim(), label, status })
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button size="sm">
            <Plus />
            Add School
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a school</DialogTitle>
          <DialogDescription>
            Track a college you're considering.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="school-name">School name</Label>
            <Input
              id="school-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. State University"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="school-label">Category</Label>
            <Select
              value={label}
              onValueChange={(value) => setLabel(value as SchoolLabel)}
            >
              <SelectTrigger id="school-label" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SCHOOL_LABELS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="school-status">Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as SchoolStatus)}
            >
              <SelectTrigger id="school-status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SCHOOL_STATUSES.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Add School
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AddEssayDialog({
  onAdd,
}: {
  onAdd: (essay: Omit<Essay, "id">) => void
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [school, setSchool] = useState("")
  const [progress, setProgress] = useState("0")

  const parsedProgress = Number(progress)
  const canSubmit =
    title.trim() !== "" &&
    parsedProgress >= 0 &&
    parsedProgress <= 100 &&
    progress !== ""

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setTitle("")
      setSchool("")
      setProgress("0")
    }
  }

  function handleSubmit() {
    if (!canSubmit) return
    onAdd({
      title: title.trim(),
      school: school.trim() || "All schools",
      progress: parsedProgress,
    })
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button size="sm">
            <Plus />
            Add Essay
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an essay</DialogTitle>
          <DialogDescription>
            Track progress on a college essay or supplement.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="essay-title">Essay title</Label>
            <Input
              id="essay-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Common App Personal Statement"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="essay-school">School (optional)</Label>
            <Input
              id="essay-school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="e.g. Tech Institute"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="essay-progress">Progress (%)</Label>
            <Input
              id="essay-progress"
              type="number"
              min="0"
              max="100"
              step="5"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Add Essay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
