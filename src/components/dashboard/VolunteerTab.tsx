import { HeartHandshake, Pencil, Plus } from "lucide-react"
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
import { EmptyState } from "@/components/dashboard/EmptyState"
import { formatDate } from "@/lib/utils"
import type { VolunteerEntry } from "@/types/student"

interface VolunteerTabProps {
  entries: VolunteerEntry[]
  goal: number
  onAddEntry: (entry: Omit<VolunteerEntry, "id">) => void
  onGoalChange: (goal: number) => void
}

export function VolunteerTab({
  entries,
  goal,
  onAddEntry,
  onGoalChange,
}: VolunteerTabProps) {
  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0)
  const percent = Math.min(100, Math.round((totalHours / goal) * 100))
  const sortedEntries = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium">Goal progress</p>
            <p className="text-xs text-muted-foreground">
              {totalHours} of {goal} hours logged
            </p>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg font-semibold tabular-nums">
              {percent}%
            </span>
            <EditGoalDialog goal={goal} onSave={onGoalChange} />
          </div>
        </div>
        <Progress value={percent} className="mt-3" />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Entries
        </h2>
        <AddVolunteerEntryDialog onAdd={onAddEntry} />
      </div>

      {sortedEntries.length > 0 ? (
        <div className="flex flex-col gap-2">
          {sortedEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-3.5"
            >
              <div>
                <p className="text-sm font-medium">{entry.orgName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(entry.date)}
                </p>
              </div>
              <span className="text-sm font-semibold tabular-nums">
                {entry.hours} hrs
              </span>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={HeartHandshake}
          title="No volunteer hours yet"
          description="Add your first entry above to start tracking toward your goal."
        />
      )}
    </div>
  )
}

function AddVolunteerEntryDialog({
  onAdd,
}: {
  onAdd: (entry: Omit<VolunteerEntry, "id">) => void
}) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState("")
  const [orgName, setOrgName] = useState("")
  const [hours, setHours] = useState("")

  const parsedHours = Number(hours)
  const canSubmit = date !== "" && orgName.trim() !== "" && parsedHours > 0

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setDate("")
      setOrgName("")
      setHours("")
    }
  }

  function handleSubmit() {
    if (!canSubmit) return
    onAdd({ date, orgName: orgName.trim(), hours: parsedHours })
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button size="sm">
            <Plus />
            Add Entry
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log volunteer hours</DialogTitle>
          <DialogDescription>
            Add a new entry to your volunteer log.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="volunteer-date">Date</Label>
            <Input
              id="volunteer-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="volunteer-org">Organization</Label>
            <Input
              id="volunteer-org"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="e.g. Riverside Food Bank"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="volunteer-hours">Hours</Label>
            <Input
              id="volunteer-hours"
              type="number"
              min="0.5"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="2.5"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Add Entry
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EditGoalDialog({
  goal,
  onSave,
}: {
  goal: number
  onSave: (goal: number) => void
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(String(goal))

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (next) setValue(String(goal))
  }

  function handleSubmit() {
    const parsed = Number(value)
    if (!parsed || parsed <= 0) return
    onSave(parsed)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="Edit goal">
            <Pencil />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set your goal</DialogTitle>
          <DialogDescription>
            Total volunteer hours you're aiming for.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="goal-hours">Goal hours</Label>
          <Input
            id="goal-hours"
            type="number"
            min="1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
