import { Link } from "react-router-dom"
import { Button, buttonVariants } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"

export function AuthStatus() {
  const { session, loading, signOut } = useAuth()

  if (loading) {
    return <div className="h-8 w-20" />
  }

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Log In
        </Link>
        <Link to="/signup" className={buttonVariants({ size: "sm" })}>
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-muted-foreground sm:inline">
        {session.user.email}
      </span>
      <Button variant="outline" size="sm" onClick={signOut}>
        Log Out
      </Button>
    </div>
  )
}
