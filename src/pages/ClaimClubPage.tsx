import { KeyRound } from "lucide-react"
import { type FormEvent, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { redeemInviteCode } from "@/lib/clubsData"

export function ClaimClubPage() {
  const { session, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (!authLoading && !session) {
    return <Navigate to="/login" replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const clubId = await redeemInviteCode(code.trim())
      navigate(`/clubs/${clubId}/edit`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-svh bg-background">
      <Header />
      <main className="mx-auto flex max-w-sm flex-col items-center px-6 py-16">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <KeyRound className="size-5" />
        </div>
        <h1 className="mt-3 text-xl font-semibold tracking-tight">
          Claim a club page
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Enter the invite code your advisor or admin gave you to create and
          manage your club's page.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full flex-col gap-3 rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="invite-code">Invite code</Label>
            <Input
              id="invite-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="XXXX-XXXX"
              autoFocus
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" disabled={loading || code.trim() === ""}>
            {loading ? "Checking..." : "Claim Club"}
          </Button>
        </form>
      </main>
    </div>
  )
}
