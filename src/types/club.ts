export interface ClubLeader {
  name: string
  role: string
}

export interface ClubAnnouncement {
  id: string
  clubId: string
  title: string
  body: string
  tag: string
  createdAt: string
}

export interface Club {
  id: string
  officerId: string | null
  name: string
  description: string
  longDescription: string
  category: string
  meetingTime: string
  meetingLocation: string
  advisor: string
  emoji: string
  color: string
  founded: number | null
  leadership: ClubLeader[]
  howToJoin: string[]
}

export interface InviteCode {
  id: string
  code: string
  redeemedBy: string | null
  redeemedAt: string | null
  createdAt: string
}
