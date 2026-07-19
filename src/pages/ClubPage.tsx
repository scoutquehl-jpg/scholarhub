import { ArrowLeft, Clock, MapPin, Users } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Header } from "@/components/Header"
import { clubs } from "@/data/clubs"
import { cn, initials } from "@/lib/utils"

export function ClubPage() {
  const { clubId } = useParams<{ clubId: string }>()
  const club = clubs.find((c) => c.id === clubId)

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

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-8">
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
            <div
              className={cn(
                "-mt-10 flex size-20 items-center justify-center rounded-2xl border-4 border-card text-4xl shadow-sm",
                club.color
              )}
            >
              {club.emoji}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                {club.name}
              </h1>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                {club.category}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {club.meetingTime}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {club.meetingLocation}
              </span>
            </div>

            <div className="mt-4 flex gap-6 border-t border-border pt-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Users className="size-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">
                  {club.memberCount}
                </span>
                <span className="text-muted-foreground">members</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  {club.founded}
                </span>{" "}
                <span className="text-muted-foreground">founded</span>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            About
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {club.longDescription}
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Leadership
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {club.leadership.map((leader) => (
              <div
                key={leader.name}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
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
        </section>
      </main>
    </div>
  )
}
