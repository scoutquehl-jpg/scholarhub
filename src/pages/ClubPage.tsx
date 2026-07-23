import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  ListChecks,
  MapPin,
  Megaphone,
  Pencil,
  Send,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { MessagePresidentDialog } from "@/components/MessagePresidentDialog"
import { useAuth } from "@/lib/auth"
import {
  cancelMembership,
  fetchAnnouncements,
  fetchApprovedMembers,
  fetchClubById,
  fetchFollowerCount,
  fetchMemberCount,
  fetchMembershipStatus,
  followClub,
  isFollowingClub,
  requestToJoin,
  subscribeToAnnouncements,
  unfollowClub,
  type ClubMember,
  type MembershipStatus,
} from "@/lib/clubsData"
import { cn, formatTimestamp, initials } from "@/lib/utils"
import type { Club, ClubAnnouncement } from "@/types/club"

export function ClubPage() {
  const { clubId } = useParams<{ clubId: string }>()
  const { session } = useAuth()
  const navigate = useNavigate()

  const [club, setClub] = useState<Club | null>(null)
  const [loading, setLoading] = useState(true)
  const [announcements, setAnnouncements] = useState<ClubAnnouncement[]>([])
  const [followerCount, setFollowerCount] = useState(0)
  const [following, setFollowing] = useState(false)
  const [followBusy, setFollowBusy] = useState(false)
  const [memberCount, setMemberCount] = useState(0)
  const [approvedMembers, setApprovedMembers] = useState<ClubMember[]>([])
  const [membershipStatus, setMembershipStatus] = useState<MembershipStatus>("none")
  const [joinBusy, setJoinBusy] = useState(false)

  useEffect(() => {
    if (!clubId) return
    let cancelled = false
    setLoading(true)
    fetchClubById(clubId).then((result) => {
      if (!cancelled) {
        setClub(result)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [clubId])

  useEffect(() => {
    if (!club) return
    let cancelled = false

    fetchAnnouncements(club.id).then((result) => {
      if (!cancelled) setAnnouncements(result)
    })

    const unsubscribe = subscribeToAnnouncements(
      club.id,
      (announcement) => {
        setAnnouncements((prev) => [announcement, ...prev])
      },
      (id) => {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id))
      }
    )

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [club])

  useEffect(() => {
    if (!club) return
    let cancelled = false

    fetchFollowerCount(club.id).then((count) => {
      if (!cancelled) setFollowerCount(count)
    })

    if (session) {
      isFollowingClub(session.user.id, club.id).then((result) => {
        if (!cancelled) setFollowing(result)
      })
    }

    return () => {
      cancelled = true
    }
  }, [club, session])

  useEffect(() => {
    if (!club) return
    let cancelled = false

    fetchMemberCount(club.id).then((count) => {
      if (!cancelled) setMemberCount(count)
    })

    fetchApprovedMembers(club.id).then((members) => {
      if (!cancelled) setApprovedMembers(members)
    })

    if (session) {
      fetchMembershipStatus(session.user.id, club.id).then((status) => {
        if (!cancelled) setMembershipStatus(status)
      })
    }

    return () => {
      cancelled = true
    }
  }, [club, session])

  async function handleFollowToggle() {
    if (!club) return
    if (!session) {
      navigate("/login")
      return
    }

    setFollowBusy(true)
    try {
      if (following) {
        await unfollowClub(session.user.id, club.id)
        setFollowing(false)
        setFollowerCount((prev) => Math.max(0, prev - 1))
      } else {
        await followClub(session.user.id, club.id)
        setFollowing(true)
        setFollowerCount((prev) => prev + 1)
      }
    } finally {
      setFollowBusy(false)
    }
  }

  async function handleJoinClick() {
    if (!club) return
    if (!session) {
      navigate("/login")
      return
    }

    if (membershipStatus === "approved") {
      if (!confirm("Leave this club?")) return
      setJoinBusy(true)
      try {
        await cancelMembership(session.user.id, club.id)
        setMembershipStatus("none")
        setMemberCount((prev) => Math.max(0, prev - 1))
        setApprovedMembers((prev) => prev.filter((m) => m.userId !== session.user.id))
      } finally {
        setJoinBusy(false)
      }
      return
    }

    setJoinBusy(true)
    try {
      if (membershipStatus === "none") {
        await requestToJoin(session.user.id, club.id)
        setMembershipStatus("pending")
      } else if (membershipStatus === "pending") {
        await cancelMembership(session.user.id, club.id)
        setMembershipStatus("none")
      }
    } finally {
      setJoinBusy(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-svh bg-background">
        <Header />
        <main className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">Loading club...</p>
        </main>
      </div>
    )
  }

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
  const isOfficer = session?.user.id === club.officerId

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
              <div className="flex flex-wrap gap-2">
                {isOfficer && (
                  <Link
                    to={`/clubs/${club.id}/edit`}
                    className={cn(buttonVariants({ variant: "outline" }), "gap-1.5")}
                  >
                    <Pencil />
                    Edit Club
                  </Link>
                )}
                {president && (
                  <MessagePresidentDialog president={president} clubName={club.name} />
                )}
                <Button
                  variant={
                    membershipStatus === "approved"
                      ? "secondary"
                      : membershipStatus === "pending"
                        ? "secondary"
                        : "outline"
                  }
                  onClick={handleJoinClick}
                  disabled={joinBusy}
                >
                  {membershipStatus === "approved" ? (
                    <UserCheck />
                  ) : membershipStatus === "pending" ? (
                    <Clock />
                  ) : (
                    <Send />
                  )}
                  {membershipStatus === "approved"
                    ? "Member"
                    : membershipStatus === "pending"
                      ? "Request Pending"
                      : "Request to Join"}
                </Button>
                <Button
                  variant={following ? "secondary" : "default"}
                  onClick={handleFollowToggle}
                  disabled={followBusy}
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
              <Badge variant="secondary">{club.category || "Uncategorized"}</Badge>
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground">
              {club.longDescription || "This club hasn't added a description yet."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-border pt-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Users className="size-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">
                  {followerCount}
                </span>
                <span className="text-muted-foreground">followers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="size-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">
                  {memberCount}
                </span>
                <span className="text-muted-foreground">members</span>
              </div>
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
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
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
                      {formatTimestamp(announcement.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                  No announcements yet.
                </div>
              )}
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
                  <span>{club.meetingTime || "Meeting time not set"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-muted-foreground" />
                  <span>{club.meetingLocation || "Room not set"}</span>
                </div>
                {club.founded && (
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 shrink-0 text-muted-foreground" />
                    <span>Founded {club.founded}</span>
                  </div>
                )}
              </div>
            </div>

            {club.howToJoin.length > 0 && (
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
            )}

            {club.leadership.length > 0 && (
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
            )}

            {approvedMembers.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4">
                <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  Members
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {approvedMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                        {member.avatarUrl ? (
                          <img
                            src={member.avatarUrl}
                            alt=""
                            className="size-full object-cover"
                          />
                        ) : (
                          initials(member.name)
                        )}
                      </div>
                      <p className="truncate text-sm font-medium">
                        {member.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  )
}
