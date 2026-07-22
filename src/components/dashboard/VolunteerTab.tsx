import { HeartHandshake, Pencil, Plus, Trash2 } from "lucide-react"
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
import { clubs } from "@/data/clubs"
import { formatDate } from "@/lib/utils"
import type { VolunteerEntry } from "@/types/student"

interface VolunteerTabProps {
  entries: VolunteerEntry[]
  goal: number
  onAddEntry: (entry: Omit<VolunteerEntry, "id">) => void | Promise<void>
  onEditEntry: (id: string, entry: Omit<VolunteerEntry, "id">) => void | Promise<void>
  onDeleteEntry: (id: string) => void | Promise<void>
  onGoalChange: (goal: number) => void | Promise<void>
}

export function VolunteerTab({
  entries,
  goal,
  onAddEntry,
  onEditEntry,
  onDeleteEntry,
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
        <VolunteerEntryDialog
          onSubmit={onAddEntry}
          trigger={
            <Button size="sm">
              <Plus />
              Add Entry
            </Button>
          }
        />
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
                  {entry.club && <> · {entry.club}</>}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold tabular-nums">
                  {entry.hours} hrs
                </span>
                <div className="flex items-center gap-1">
                  <VolunteerEntryDialog
                    entry={entry}
                    onSubmit={(values) => onEditEntry(entry.id, values)}
                    trigger={
                      <Button variant="ghost" size="icon-sm" aria-label="Edit entry">
                        <Pencil />
                      </Button>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Delete entry"
                    onClick={() => {
                      if (confirm(`Delete this entry for ${entry.orgName}?`)) {
                        onDeleteEntry(entry.id)
                      }
                    }}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
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

function VolunteerEntryDialog({
  entry,
  onSubmit,
  trigger,
}: {
  entry?: VolunteerEntry
  onSubmit: (values: Omit<VolunteerEntry, "id">) => void | Promise<void>
  trigger: React.ReactElement
}) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(entry?.date ?? "")
  const [orgName, setOrgName] = useState(entry?.orgName ?? "")
  const [hours, setHours] = useState(entry ? String(entry.hours) : "")
  const [club, setClub] = useState(entry?.club ?? "none")
  const [saving, setSaving] = useState(false)

  const parsedHours = Number(hours)
  const canSubmit = date !== "" && orgName.trim() !== "" && parsedHours > 0

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (next) {
      setDate(entry?.date ?? "")
      setOrgName(entry?.orgName ?? "")
      setHours(entry ? String(entry.hours) : "")
      setClub(entry?.club ?? "none")
    }
  }

  async function handleSubmit() {
    if (!canSubmit) return
    setSaving(true)
    await onSubmit({
      date,
      orgName: orgName.trim(),
      hours: parsedHours,
      club: club === "none" ? null : club,
    })
    setSaving(false)
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{entry ? "Edit entry" : "Log volunteer hours"}</DialogTitle>
          <DialogDescription>
            {entry
              ? "Update this volunteer log entry."
              : "Add a new entry to your volunteer log."}
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
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="volunteer-club">Club (optional)</Label>
            <Select value={club} onValueChange={(value) => setClub(value ?? "none")}>
              <SelectTrigger id="volunteer-club" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {clubs.map((c) => (
                  <SelectItem key={c.id} value={c.name}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!canSubmit || saving}>
            {entry ? "Save Changes" : "Add Entry"}
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
  onSave: (goal: number) => void | Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(String(goal))
  const [saving, setSaving] = useState(false)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (next) setValue(String(goal))
  }

  async function handleSubmit() {
    const parsed = Number(value)
    if (!parsed || parsed <= 0) return
    setSaving(true)
    await onSave(parsed)
    setSaving(false)
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
          <Button onClick={handleSubmit} disabled={saving}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
