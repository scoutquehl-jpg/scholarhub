import { supabase } from "@/lib/supabase"
import type { Club, ClubAnnouncement, InviteCode } from "@/types/club"

function mapClubRow(row: Record<string, unknown>): Club {
  return {
    id: row.id as string,
    officerId: (row.officer_id as string | null) ?? null,
    name: row.name as string,
    description: row.description as string,
    longDescription: row.long_description as string,
    category: row.category as string,
    meetingTime: row.meeting_time as string,
    meetingLocation: row.room as string,
    advisor: row.advisor as string,
    emoji: row.emoji as string,
    color: row.color as string,
    founded: (row.founded as number | null) ?? null,
    leadership: (row.leadership as Club["leadership"]) ?? [],
    howToJoin: (row.how_to_join as string[]) ?? [],
  }
}

function mapAnnouncementRow(row: Record<string, unknown>): ClubAnnouncement {
  return {
    id: row.id as string,
    clubId: row.club_id as string,
    title: row.title as string,
    body: row.body as string,
    tag: row.tag as string,
    createdAt: row.created_at as string,
  }
}

function mapInviteCodeRow(row: Record<string, unknown>): InviteCode {
  return {
    id: row.id as string,
    code: row.code as string,
    redeemedBy: (row.redeemed_by as string | null) ?? null,
    redeemedAt: (row.redeemed_at as string | null) ?? null,
    createdAt: row.created_at as string,
  }
}

export async function fetchClubs(): Promise<Club[]> {
  const { data, error } = await supabase.from("clubs").select("*").order("name")
  if (error) throw error
  return data.map(mapClubRow)
}

export async function fetchClubById(id: string): Promise<Club | null> {
  const { data, error } = await supabase
    .from("clubs")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  return data ? mapClubRow(data) : null
}

export async function updateClub(
  id: string,
  patch: Partial<Omit<Club, "id" | "officerId">>
): Promise<void> {
  const dbPatch: Record<string, unknown> = { updated_at: new Date().toISOString() }
  if (patch.name !== undefined) dbPatch.name = patch.name
  if (patch.description !== undefined) dbPatch.description = patch.description
  if (patch.longDescription !== undefined) dbPatch.long_description = patch.longDescription
  if (patch.category !== undefined) dbPatch.category = patch.category
  if (patch.meetingTime !== undefined) dbPatch.meeting_time = patch.meetingTime
  if (patch.meetingLocation !== undefined) dbPatch.room = patch.meetingLocation
  if (patch.advisor !== undefined) dbPatch.advisor = patch.advisor
  if (patch.emoji !== undefined) dbPatch.emoji = patch.emoji
  if (patch.color !== undefined) dbPatch.color = patch.color
  if (patch.founded !== undefined) dbPatch.founded = patch.founded
  if (patch.leadership !== undefined) dbPatch.leadership = patch.leadership
  if (patch.howToJoin !== undefined) dbPatch.how_to_join = patch.howToJoin

  const { error } = await supabase.from("clubs").update(dbPatch).eq("id", id)
  if (error) throw error
}

export async function redeemInviteCode(code: string): Promise<string> {
  const { data, error } = await supabase.rpc("redeem_invite_code", { p_code: code })
  if (error) throw error
  return data as string
}

export async function fetchAnnouncements(clubId: string): Promise<ClubAnnouncement[]> {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("club_id", clubId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data.map(mapAnnouncementRow)
}

export async function addAnnouncement(
  clubId: string,
  announcement: { title: string; body: string; tag: string }
): Promise<ClubAnnouncement> {
  const { data, error } = await supabase
    .from("announcements")
    .insert({
      club_id: clubId,
      title: announcement.title,
      body: announcement.body,
      tag: announcement.tag,
    })
    .select()
    .single()

  if (error) throw error
  return mapAnnouncementRow(data)
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const { error } = await supabase.from("announcements").delete().eq("id", id)
  if (error) throw error
}

export function subscribeToAnnouncements(
  clubId: string,
  onInsert: (announcement: ClubAnnouncement) => void,
  onDelete: (id: string) => void
) {
  const channel = supabase
    .channel(`announcements-${clubId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "announcements",
        filter: `club_id=eq.${clubId}`,
      },
      (payload) => onInsert(mapAnnouncementRow(payload.new))
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "announcements",
        filter: `club_id=eq.${clubId}`,
      },
      (payload) => onDelete((payload.old as { id: string }).id)
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

export async function fetchFollowerCount(clubId: string): Promise<number> {
  const { count, error } = await supabase
    .from("club_follows")
    .select("*", { count: "exact", head: true })
    .eq("club_id", clubId)

  if (error) throw error
  return count ?? 0
}

export async function isFollowingClub(userId: string, clubId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("club_follows")
    .select("id")
    .eq("user_id", userId)
    .eq("club_id", clubId)
    .maybeSingle()

  if (error) throw error
  return data !== null
}

export async function followClub(userId: string, clubId: string): Promise<void> {
  const { error } = await supabase
    .from("club_follows")
    .insert({ user_id: userId, club_id: clubId })

  if (error) throw error
}

export async function unfollowClub(userId: string, clubId: string): Promise<void> {
  const { error } = await supabase
    .from("club_follows")
    .delete()
    .eq("user_id", userId)
    .eq("club_id", clubId)

  if (error) throw error
}

export async function fetchInviteCodes(): Promise<InviteCode[]> {
  const { data, error } = await supabase
    .from("invite_codes")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data.map(mapInviteCodeRow)
}

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
    if (i === 3) code += "-"
  }
  return code
}

export async function createInviteCode(adminUserId: string): Promise<InviteCode> {
  const code = generateCode()
  const { data, error } = await supabase
    .from("invite_codes")
    .insert({ code, created_by: adminUserId })
    .select()
    .single()

  if (error) throw error
  return mapInviteCodeRow(data)
}
