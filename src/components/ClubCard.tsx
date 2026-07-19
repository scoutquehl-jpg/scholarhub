import { Clock } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import type { Club } from "@/types/club"

export function ClubCard({ club }: { club: Club }) {
  return (
    <Link
      to={`/club/${club.id}`}
      className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-ring/50 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-lg text-lg",
              club.color
            )}
          >
            {club.emoji}
          </div>
          <h3 className="truncate font-semibold text-card-foreground">
            {club.name}
          </h3>
        </div>
        <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
          {club.category}
        </span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
        {club.description}
      </p>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="size-3.5" />
        <span>{club.meetingTime}</span>
      </div>
    </Link>
  )
}
