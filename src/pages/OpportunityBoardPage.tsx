import { Bookmark, BookmarkCheck, Briefcase, Check, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CategoryFilter } from "@/components/CategoryFilter"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Header } from "@/components/Header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth"
import {
  fetchOpportunities,
  fetchSavedOpportunityIds,
  saveOpportunity,
  submitOpportunity,
  unsaveOpportunity,
  type NewOpportunity,
} from "@/lib/opportunitiesData"
import { cn, formatDate } from "@/lib/utils"
import {
  DEADLINE_URGENCIES,
  OPPORTUNITY_TYPES,
  type DeadlineUrgency,
  type Opportunity,
  type OpportunityType,
} from "@/types/opportunity"

const urgencyStyles: Record<DeadlineUrgency, string> = {
  urgent: "bg-red-500/10 text-red-600 dark:text-red-400",
  soon: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  open: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  ongoing: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

const urgencyLabels: Record<DeadlineUrgency, string> = {
  urgent: "Urgent",
  soon: "Due Soon",
  open: "Open",
  ongoing: "Ongoing",
}

export function OpportunityBoardPage() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOpportunities().then((data) => {
      setOpportunities(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (!session) {
      setSavedIds(new Set())
      return
    }
    let cancelled = false
    fetchSavedOpportunityIds(session.user.id).then((ids) => {
      if (!cancelled) setSavedIds(ids)
    })
    return () => {
      cancelled = true
    }
  }, [session])

  async function handleSaveToggle(id: string) {
    if (!session) {
      navigate("/login")
      return
    }

    if (savedIds.has(id)) {
      await unsaveOpportunity(session.user.id, id)
      setSavedIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    } else {
      await saveOpportunity(session.user.id, id)
      setSavedIds((prev) => new Set(prev).add(id))
    }
  }

  async function handleSubmit(values: NewOpportunity) {
    if (!session) return
    await submitOpportunity(session.user.id, values)
  }

  const filtered = typeFilter
    ? opportunities.filter((o) => o.type === typeFilter)
    : opportunities

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Opportunity Board
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Volunteer gigs, programs, internships, competitions, and
              scholarships.
            </p>
          </div>
          {session ? (
            <SubmitOpportunityDialog onSubmit={handleSubmit} />
          ) : (
            <Button onClick={() => navigate("/login")}>
              <Plus />
              Submit Opportunity
            </Button>
          )}
        </div>

        <div className="mb-6">
          <CategoryFilter
            categories={OPPORTUNITY_TYPES}
            selected={typeFilter}
            onSelect={setTypeFilter}
          />
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">
            Loading opportunities...
          </p>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                saved={savedIds.has(opportunity.id)}
                onToggleSave={() => handleSaveToggle(opportunity.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
            <Briefcase className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">No opportunities found</p>
            <p className="text-sm text-muted-foreground">
              Try a different filter, or be the first to submit one.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

function OpportunityCard({
  opportunity,
  saved,
  onToggleSave,
}: {
  opportunity: Opportunity
  saved: boolean
  onToggleSave: () => void
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-card-foreground">
            {opportunity.title}
          </h3>
          <p className="truncate text-sm text-muted-foreground">
            {opportunity.organization}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={saved ? "Unsave opportunity" : "Save opportunity"}
          onClick={onToggleSave}
        >
          {saved ? <BookmarkCheck className="fill-current" /> : <Bookmark />}
        </Button>
      </div>

      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {opportunity.description || "No description provided."}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{opportunity.type}</Badge>
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs font-medium",
            urgencyStyles[opportunity.deadlineUrgency]
          )}
        >
          {urgencyLabels[opportunity.deadlineUrgency]}
          {opportunity.deadline && ` · ${formatDate(opportunity.deadline)}`}
        </span>
      </div>

      {opportunity.contactName && (
        <p className="text-xs text-muted-foreground">
          Contact: {opportunity.contactName}
          {opportunity.contactRole && `, ${opportunity.contactRole}`}
        </p>
      )}
    </div>
  )
}

function SubmitOpportunityDialog({
  onSubmit,
}: {
  onSubmit: (values: NewOpportunity) => void | Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [organization, setOrganization] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState<OpportunityType>("Volunteer")
  const [deadline, setDeadline] = useState("")
  const [deadlineUrgency, setDeadlineUrgency] = useState<DeadlineUrgency>("open")
  const [contactName, setContactName] = useState("")
  const [contactRole, setContactRole] = useState("")
  const [saving, setSaving] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = title.trim() !== "" && organization.trim() !== ""

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setTimeout(() => {
        setTitle("")
        setOrganization("")
        setDescription("")
        setType("Volunteer")
        setDeadline("")
        setDeadlineUrgency("open")
        setContactName("")
        setContactRole("")
        setSubmitted(false)
      }, 150)
    }
  }

  async function handleSubmit() {
    if (!canSubmit) return
    setSaving(true)
    await onSubmit({
      title: title.trim(),
      organization: organization.trim(),
      description: description.trim(),
      type,
      deadline: deadline || null,
      deadlineUrgency,
      contactName: contactName.trim(),
      contactRole: contactRole.trim(),
    })
    setSaving(false)
    setSubmitted(true)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button>
            <Plus />
            Submit Opportunity
          </Button>
        }
      />
      <DialogContent>
        {submitted ? (
          <div className="flex flex-col items-center gap-2 py-4 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="size-5" />
            </div>
            <p className="text-sm font-medium">Submitted for review</p>
            <p className="text-sm text-muted-foreground">
              An admin will review it before it appears on the board.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Submit an opportunity</DialogTitle>
              <DialogDescription>
                It'll be reviewed by an admin before going live on the board.
              </DialogDescription>
            </DialogHeader>
            <div className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto pr-1">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="opp-title">Title</Label>
                <Input
                  id="opp-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Summer Research Internship"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="opp-org">Organization</Label>
                <Input
                  id="opp-org"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. City Science Museum"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="opp-description">Description</Label>
                <Textarea
                  id="opp-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="opp-type">Type</Label>
                <Select
                  value={type}
                  onValueChange={(value) => setType((value as OpportunityType) ?? "Volunteer")}
                >
                  <SelectTrigger id="opp-type" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {OPPORTUNITY_TYPES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="opp-deadline">Deadline (optional)</Label>
                  <Input
                    id="opp-deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="opp-urgency">Urgency</Label>
                  <Select
                    value={deadlineUrgency}
                    onValueChange={(value) =>
                      setDeadlineUrgency((value as DeadlineUrgency) ?? "open")
                    }
                  >
                    <SelectTrigger id="opp-urgency" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEADLINE_URGENCIES.map((option) => (
                        <SelectItem key={option} value={option}>
                          {urgencyLabels[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="opp-contact-name">Contact name (optional)</Label>
                  <Input
                    id="opp-contact-name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="opp-contact-role">Contact role (optional)</Label>
                  <Input
                    id="opp-contact-role"
                    value={contactRole}
                    onChange={(e) => setContactRole(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={!canSubmit || saving}>
                {saving ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
