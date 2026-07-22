import { GraduationCap, HeartHandshake, Pencil, School, UserRound } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GRADE_OPTIONS } from "@/data/student"
import { initials } from "@/lib/utils"
import type { StudentProfile } from "@/types/student"

interface ProfileHeaderProps {
  profile: StudentProfile
  totalVolunteerHours: number
  activityCount: number
  schoolCount: number
  onSave: (patch: Partial<Omit<StudentProfile, "id">>) => void | Promise<void>
}

export function ProfileHeader({
  profile,
  totalVolunteerHours,
  activityCount,
  schoolCount,
  onSave,
}: ProfileHeaderProps) {
  const hasName = profile.name.trim() !== ""
  const hasDetails = profile.grade !== "" || profile.school !== "" || profile.gradYear !== null

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="h-24 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 sm:h-32" />
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between gap-3">
          <div className="-mt-10 flex size-20 items-center justify-center rounded-full border-4 border-card bg-primary text-2xl font-semibold text-primary-foreground shadow-sm">
            {hasName ? initials(profile.name) : <UserRound className="size-8" />}
          </div>
          <EditProfileDialog profile={profile} onSave={onSave} />
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            {hasName ? profile.name : "Add your name"}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
            {hasDetails ? (
              <>
                {profile.grade && <span>{profile.grade}</span>}
                {profile.grade && profile.school && <span aria-hidden="true">·</span>}
                {profile.school && <span>{profile.school}</span>}
                {profile.gradYear && (profile.grade || profile.school) && (
                  <span aria-hidden="true">·</span>
                )}
                {profile.gradYear && <span>Class of {profile.gradYear}</span>}
              </>
            ) : (
              <span>Add your grade and school to complete your profile.</span>
            )}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-sm">
          <div className="flex items-center gap-1.5">
            <HeartHandshake className="size-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">
              {totalVolunteerHours}
            </span>
            <span className="text-muted-foreground">volunteer hours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="size-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">
              {activityCount}
            </span>
            <span className="text-muted-foreground">activities</span>
          </div>
          <div className="flex items-center gap-1.5">
            <School className="size-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">
              {schoolCount}
            </span>
            <span className="text-muted-foreground">schools tracked</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditProfileDialog({
  profile,
  onSave,
}: {
  profile: StudentProfile
  onSave: (patch: Partial<Omit<StudentProfile, "id">>) => void | Promise<void>
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(profile.name)
  const [grade, setGrade] = useState(profile.grade || GRADE_OPTIONS[0])
  const [school, setSchool] = useState(profile.school)
  const [gradYear, setGradYear] = useState(profile.gradYear ? String(profile.gradYear) : "")
  const [saving, setSaving] = useState(false)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (next) {
      setName(profile.name)
      setGrade(profile.grade || GRADE_OPTIONS[0])
      setSchool(profile.school)
      setGradYear(profile.gradYear ? String(profile.gradYear) : "")
    }
  }

  async function handleSubmit() {
    setSaving(true)
    await onSave({
      name: name.trim(),
      grade,
      school: school.trim(),
      gradYear: gradYear ? Number(gradYear) : null,
    })
    setSaving(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm">
            <Pencil />
            Edit Profile
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Update your basic info.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-name">Name</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-grade">Grade</Label>
            <Select value={grade} onValueChange={(value) => setGrade(value ?? GRADE_OPTIONS[0])}>
              <SelectTrigger id="profile-grade" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GRADE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-school">School</Label>
            <Input
              id="profile-school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Your school"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-gradyear">Graduation year</Label>
            <Input
              id="profile-gradyear"
              type="number"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              placeholder="2027"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
