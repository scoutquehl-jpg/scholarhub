import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
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
  addAnnouncement,
  deleteAnnouncement,
  fetchAnnouncements,
  fetchClubById,
  updateClub,
} from "@/lib/clubsData"
import { formatTimestamp } from "@/lib/utils"
import type { Club, ClubAnnouncement } from "@/types/club"

const COLOR_OPTIONS = [
  "bg-blue-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-slate-500",
  "bg-emerald-500",
  "bg-indigo-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-teal-500",
  "bg-orange-500",
  "bg-violet-500",
  "bg-lime-600",
]

export function EditClubPage() {
  const { clubId } = useParams<{ clubId: string }>()
  const { session, loading: authLoading } = useAuth()

  const [club, setClub] = useState<Club | null>(null)
  const [loading, setLoading] = useState(true)
  const [announcements, setAnnouncements] = useState<ClubAnnouncement[]>([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [longDescription, setLongDescription] = useState("")
  const [category, setCategory] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [meetingLocation, setMeetingLocation] = useState("")
  const [advisor, setAdvisor] = useState("")
  const [emoji, setEmoji] = useState("")
  const [color, setColor] = useState(COLOR_OPTIONS[0])
  const [founded, setFounded] = useState("")
  const [howToJoinText, setHowToJoinText] = useState("")
  const [leadershipText, setLeadershipText] = useState("")
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!clubId) return
    let cancelled = false
    setLoading(true)

    Promise.all([fetchClubById(clubId), fetchAnnouncements(clubId)]).then(
      ([clubResult, announcementsResult]) => {
        if (cancelled) return
        setClub(clubResult)
        setAnnouncements(announcementsResult)
        if (clubResult) {
          setName(clubResult.name)
          setDescription(clubResult.description)
          setLongDescription(clubResult.longDescription)
          setCategory(clubResult.category)
          setMeetingTime(clubResult.meetingTime)
          setMeetingLocation(clubResult.meetingLocation)
          setAdvisor(clubResult.advisor)
          setEmoji(clubResult.emoji || "🎓")
          setColor(clubResult.color || COLOR_OPTIONS[0])
          setFounded(clubResult.founded ? String(clubResult.founded) : "")
          setHowToJoinText(clubResult.howToJoin.join("\n"))
          setLeadershipText(
            clubResult.leadership.map((l) => `${l.name}, ${l.role}`).join("\n")
          )
        }
        setLoading(false)
      }
    )

    return () => {
      cancelled = true
    }
  }, [clubId])

  if (!authLoading && !session) {
    return <Navigate to="/login" replace />
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-svh bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </main>
      </div>
    )
  }

  if (!club) {
    return (
      <div className="min-h-svh bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-sm font-medium">Club not found</p>
        </main>
      </div>
    )
  }

  if (!session || session.user.id !== club.officerId) {
    return (
      <div className="min-h-svh bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-sm font-medium">You're not the officer for this club.</p>
          <Link
            to={`/club/${club.id}`}
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to club page
          </Link>
        </main>
      </div>
    )
  }

  async function handleSave() {
    if (!club) return
    setSaving(true)
    setSaved(false)

    const howToJoin = howToJoinText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)

    const leadership = leadershipText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [leaderName, ...rest] = line.split(",")
        return {
          name: leaderName.trim(),
          role: rest.join(",").trim() || "Member",
        }
      })

    await updateClub(club.id, {
      name: name.trim() || "New Club",
      description: description.trim(),
      longDescription: longDescription.trim(),
      category: category.trim(),
      meetingTime: meetingTime.trim(),
      meetingLocation: meetingLocation.trim(),
      advisor: advisor.trim(),
      emoji: emoji.trim() || "🎓",
      color,
      founded: founded ? Number(founded) : null,
      howToJoin,
      leadership,
    })

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleAddAnnouncement(values: { title: string; body: string; tag: string }) {
    const created = await addAnnouncement(club!.id, values)
    setAnnouncements((prev) => [created, ...prev])
  }

  async function handleDeleteAnnouncement(id: string) {
    if (!confirm("Delete this announcement?")) return
    await deleteAnnouncement(id)
    setAnnouncements((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-8">
        <Link
          to={`/club/${club.id}`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to club page
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight">Edit Club</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your club's page and post announcements.
        </p>

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="club-name">Club name</Label>
            <Input id="club-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="club-description">Short description</Label>
            <Textarea
              id="club-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="One or two sentences shown on the directory card"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="club-long-description">Full description</Label>
            <Textarea
              id="club-long-description"
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              rows={4}
              placeholder="The full description shown on your club page"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="club-category">Category</Label>
              <Input
                id="club-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. STEM, Arts, Service"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="club-advisor">Advisor</Label>
              <Input
                id="club-advisor"
                value={advisor}
                onChange={(e) => setAdvisor(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="club-meeting-time">Meeting time</Label>
              <Input
                id="club-meeting-time"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                placeholder="e.g. Tuesdays, 4:00 PM"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="club-room">Room</Label>
              <Input
                id="club-room"
                value={meetingLocation}
                onChange={(e) => setMeetingLocation(e.target.value)}
                placeholder="e.g. Room 204"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="club-emoji">Emoji</Label>
              <Input
                id="club-emoji"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                placeholder="🎓"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="club-founded">Founded (year)</Label>
              <Input
                id="club-founded"
                type="number"
                value={founded}
                onChange={(e) => setFounded(e.target.value)}
                placeholder="2024"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="club-color">Banner color</Label>
            <Select value={color} onValueChange={(value) => setColor(value ?? COLOR_OPTIONS[0])}>
              <SelectTrigger id="club-color" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    <span className={`inline-block size-3 rounded-full ${option}`} />
                    {option.replace("bg-", "").replace("-500", "").replace("-600", "")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="club-how-to-join">How to join (one step per line)</Label>
            <Textarea
              id="club-how-to-join"
              value={howToJoinText}
              onChange={(e) => setHowToJoinText(e.target.value)}
              rows={4}
              placeholder={"Attend a meeting\nFill out the interest form"}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="club-leadership">
              Officers (one per line, "Name, Role")
            </Label>
            <Textarea
              id="club-leadership"
              value={leadershipText}
              onChange={(e) => setLeadershipText(e.target.value)}
              rows={3}
              placeholder={"Maya Chen, President\nDevon Ortiz, Vice President"}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            {saved && <span className="text-sm text-muted-foreground">Saved!</span>}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              Announcements
            </h2>
            <AddAnnouncementDialog onSubmit={handleAddAnnouncement} />
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="rounded-xl border border-border bg-card p-3.5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{announcement.title}</p>
                        <Badge variant="outline">{announcement.tag}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {announcement.body}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatTimestamp(announcement.createdAt)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Delete announcement"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                No announcements yet — post your first one above.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

function AddAnnouncementDialog({
  onSubmit,
}: {
  onSubmit: (values: { title: string; body: string; tag: string }) => void | Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tag, setTag] = useState("Announcement")
  const [saving, setSaving] = useState(false)

  const canSubmit = title.trim() !== "" && body.trim() !== ""

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setTitle("")
      setBody("")
      setTag("Announcement")
    }
  }

  async function handleSubmit() {
    if (!canSubmit) return
    setSaving(true)
    await onSubmit({ title: title.trim(), body: body.trim(), tag })
    setSaving(false)
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button size="sm">
            <Plus />
            Post Announcement
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post an announcement</DialogTitle>
          <DialogDescription>
            This appears instantly on your club's page for anyone viewing it.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="announcement-title">Title</Label>
            <Input
              id="announcement-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Meeting moved to Friday"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="announcement-body">Details</Label>
            <Textarea
              id="announcement-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="announcement-tag">Tag</Label>
            <Select value={tag} onValueChange={(value) => setTag(value ?? "Announcement")}>
              <SelectTrigger id="announcement-tag" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Announcement", "Event", "Reminder", "Achievement"].map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!canSubmit || saving}>
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
