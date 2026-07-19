import { GraduationCap, HeartHandshake, School } from "lucide-react"
import { initials } from "@/lib/utils"
import type { StudentProfile } from "@/types/student"

interface ProfileHeaderProps {
  profile: StudentProfile
  totalVolunteerHours: number
  activityCount: number
  schoolCount: number
}

export function ProfileHeader({
  profile,
  totalVolunteerHours,
  activityCount,
  schoolCount,
}: ProfileHeaderProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="h-24 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 sm:h-32" />
      <div className="px-6 pb-6">
        <div className="-mt-10 flex size-20 items-center justify-center rounded-full border-4 border-card bg-primary text-2xl font-semibold text-primary-foreground shadow-sm">
          {initials(profile.name)}
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            {profile.name}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
            <span>{profile.grade}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.school}</span>
            <span aria-hidden="true">·</span>
            <span>Class of {profile.gradYear}</span>
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
