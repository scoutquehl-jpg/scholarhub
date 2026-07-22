import { Copy, Plus, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { ADMIN_EMAIL } from "@/lib/admin"
import { useAuth } from "@/lib/auth"
import { createInviteCode, fetchInviteCodes } from "@/lib/clubsData"
import { formatTimestamp } from "@/lib/utils"
import type { InviteCode } from "@/types/club"

export function AdminPage() {
  const { session, loading: authLoading } = useAuth()
  const [codes, setCodes] = useState<InviteCode[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const isAdmin = session?.user.email === ADMIN_EMAIL

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false)
      return
    }
    fetchInviteCodes()
      .then(setCodes)
      .finally(() => setLoading(false))
  }, [isAdmin])

  if (!authLoading && !session) {
    return <Navigate to="/login" replace />
  }

  if (!authLoading && session && !isAdmin) {
    return <Navigate to="/" replace />
  }

  async function handleGenerate() {
    if (!session) return
    setGenerating(true)
    const created = await createInviteCode(session.user.id)
    setCodes((prev) => [created, ...prev])
    setGenerating(false)
  }

  function handleCopy(code: InviteCode) {
    navigator.clipboard.writeText(code.code)
    setCopiedId(code.id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-muted-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Invite Codes
          </h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate single-use codes for club officers to claim their club page.
        </p>

        <div className="mt-6">
          <Button onClick={handleGenerate} disabled={generating}>
            <Plus />
            {generating ? "Generating..." : "Generate Invite Code"}
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading codes...</p>
          ) : codes.length > 0 ? (
            codes.map((code) => (
              <div
                key={code.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium">
                    {code.code}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Copy code"
                    onClick={() => handleCopy(code)}
                  >
                    <Copy />
                  </Button>
                  {copiedId === code.id && (
                    <span className="text-xs text-muted-foreground">Copied!</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {code.redeemedAt ? (
                    <span className="text-xs text-muted-foreground">
                      Redeemed {formatTimestamp(code.redeemedAt)}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Created {formatTimestamp(code.createdAt)}
                    </span>
                  )}
                  <Badge variant={code.redeemedAt ? "secondary" : "outline"}>
                    {code.redeemedAt ? "Redeemed" : "Unused"}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              No invite codes yet.
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
