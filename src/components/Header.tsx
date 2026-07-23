import { GraduationCap } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { AuthStatus } from "@/components/AuthStatus"
import { useAuth } from "@/lib/auth"
import { fetchOwnedClub } from "@/lib/clubsData"
import { cn } from "@/lib/utils"

export function Header({ children }: { children?: React.ReactNode }) {
  const { session } = useAuth()
  const [ownedClubId, setOwnedClubId] = useState<string | null>(null)

  useEffect(() => {
    if (!session) {
      setOwnedClubId(null)
      return
    }

    let cancelled = false
    fetchOwnedClub(session.user.id).then((club) => {
      if (!cancelled) setOwnedClubId(club?.id ?? null)
    })

    return () => {
      cancelled = true
    }
  }, [session])

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                ScholarHub
              </span>
            </Link>

            <nav className="flex items-center gap-1">
              <HeaderNavLink to="/" end>
                Clubs
              </HeaderNavLink>
              <HeaderNavLink to="/dashboard">My Dashboard</HeaderNavLink>
              {ownedClubId ? (
                <HeaderNavLink to={`/clubs/${ownedClubId}/edit`}>
                  My Club
                </HeaderNavLink>
              ) : (
                session && (
                  <HeaderNavLink to="/claim">Claim Club</HeaderNavLink>
                )
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {children}
            <AuthStatus />
          </div>
        </div>
      </div>
    </header>
  )
}

function HeaderNavLink({
  to,
  end,
  children,
}: {
  to: string
  end?: boolean
  children: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )
      }
    >
      {children}
    </NavLink>
  )
}
