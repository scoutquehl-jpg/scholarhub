import { Check, Copy, Plus, ShieldCheck, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { ADMIN_EMAIL } from "@/lib/admin"
import { useAuth } from "@/lib/auth"
import { createInviteCode, fetchInviteCodes } from "@/lib/clubsData"
import {
  approveOpportunity,
  fetchPendingOpportunities,
  rejectOpportunity,
} from "@/lib/opportunitiesData"
import { formatDate, formatTimestamp } from "@/lib/utils"
import type { InviteCode } from "@/types/club"
import type { PendingOpportunity } from "@/types/opportunity"

export function AdminPage() {
  const { session, loading: authLoading } = useAuth()
  const [codes, setCodes] = useState<InviteCode[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [pendingOpportunities, setPendingOpportunities] = useState<PendingOpportunity[]>([])
  const [opportunitiesLoading, setOpportunitiesLoading] = useState(true)

  const isAdmin = session?.user.email === ADMIN_EMAIL

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false)
      setOpportunitiesLoading(false)
      return
    }
    fetchInviteCodes()
      .then(setCodes)
      .finally(() => setLoading(false))
    fetchPendingOpportunities()
      .then(setPendingOpportunities)
      .finally(() => setOpportunitiesLoading(false))
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

  async function handleApproveOpportunity(pending: PendingOpportunity) {
    await approveOpportunity(pending)
    setPendingOpportunities((prev) => prev.filter((p) => p.id !== pending.id))
  }

  async function handleRejectOpportunity(id: string) {
    await rejectOpportunity(id)
    setPendingOpportunities((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-svh bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-6 py-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-5 text-muted-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        </div>

        <section className="mt-8">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Invite Codes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate single-use codes for club officers to claim their club page.
          </p>

          <div className="mt-4">
            <Button onClick={handleGenerate} disabled={generating}>
              <Plus />
              {generating ? "Generating..." : "Generate Invite Code"}
            </Button>
          </div>

          <div className="mt-4 flex flex-col gap-2">
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
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Pending Opportunities
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review student-submitted opportunities before they go live on the board.
          </p>

          <div className="mt-4 flex flex-col gap-2">
            {opportunitiesLoading ? (
              <p className="text-sm text-muted-foreground">Loading submissions...</p>
            ) : pendingOpportunities.length > 0 ? (
              pendingOpportunities.map((pending) => (
                <div
                  key={pending.id}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{pending.title}</p>
                        <Badge variant="secondary">{pending.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {pending.organization}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Approve"
                        onClick={() => handleApproveOpportunity(pending)}
                      >
                        <Check />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Reject"
                        onClick={() => handleRejectOpportunity(pending.id)}
                      >
                        <X />
                      </Button>
                    </div>
                  </div>
                  {pending.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {pending.description}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {pending.deadline && (
                      <span>Deadline: {formatDate(pending.deadline)}</span>
                    )}
                    {pending.contactName && (
                      <span>
                        Contact: {pending.contactName}
                        {pending.contactRole && `, ${pending.contactRole}`}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                No pending submissions.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
