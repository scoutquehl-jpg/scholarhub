import { GraduationCap } from "lucide-react"
import { Link } from "react-router-dom"

export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              ScholarHub
            </span>
          </Link>

          {children}
        </div>
      </div>
    </header>
  )
}
