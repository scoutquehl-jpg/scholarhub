import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  ListChecks,
  MapPin,
  Megaphone,
  UserPlus,
  Users,
} from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { MessagePresidentDialog } from "@/components/MessagePresidentDialog"
import { clubs } from "@/data/clubs"
import { cn, formatDate, initials } from "@/lib/utils"

export function ClubPage() {
  const { clubId } = useParams<{ clubId: string }>()
  const club = clubs.find((c) => c.id === clubId)
  const [following, setFollowing] = useState(false)

  if (!club) {
    return (
      <div className="min-h-svh bg-background">
        <Header />
        <main className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-sm font-medium">Club not found</p>
          <Link
            to="/"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="size-4" />
            Back to directory
          </Link>
        </main>
      </div>
    )
  }

  const president =
    club.leadership.find((leader) => leader.role === "President") ??
    club.leadership[0]
  const displayedMemberCount = club.memberCount + (following ? 1 : 0)

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to directory
        </Link>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className={cn("h-28 sm:h-36", club.color)} />
          <div className="px-6 pb-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div
                className={cn(
                  "-mt-10 flex size-20 items-center justify-center rounded-2xl border-4 border-card text-4xl shadow-sm",
                  club.color
                )}
              >
                {club.emoji}
              </div>
              <div className="flex gap-2">
                <MessagePresidentDialog
                  president={president}
                  clubName={club.name}
                />
                <Button
                  variant={following ? "secondary" : "default"}
                  onClick={() => setFollowing((f) => !f)}
                >
                  {following ? <Check /> : <UserPlus />}
                  {following ? "Following" : "Follow"}
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                {club.name}
              </h1>
              <Badge variant="secondary">{club.category}</Badge>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground">
              {club.longDescription}
            </p>

            <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-4 text-sm">
              <Users className="size-4 text-muted-foreground" />
              <span className="font-semibold text-foreground">
                {displayedMemberCount}
              </span>
              <span className="text-muted-foreground">members</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
              <Megaphone className="size-4" />
              Announcements
            </h2>
            <div className="mt-3 flex flex-col gap-3">
              {club.announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-medium text-card-foreground">
                      {announcement.title}
                    </h3>
                    <Badge variant="outline">{announcement.tag}</Badge>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {announcement.body}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDate(announcement.date)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-4">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                Club Info
              </h2>
              <div className="mt-3 flex flex-col gap-2.5 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 shrink-0 text-muted-foreground" />
                  <span>{club.meetingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-muted-foreground" />
                  <span>{club.meetingLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 shrink-0 text-muted-foreground" />
                  <span>Founded {club.founded}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h2 className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                <ListChecks className="size-4" />
                How to Join
              </h2>
              <ol className="mt-3 flex flex-col gap-3 text-sm">
                {club.howToJoin.map((step, index) => (
                  <li key={step} className="flex gap-2.5">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-xl border border-border bg-card p-4">
              <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                Officer Roster
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {club.leadership.map((leader) => (
                  <div key={leader.name} className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                      {initials(leader.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {leader.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
