export interface ClubLeader {
  name: string
  role: string
}

export interface Club {
  id: string
  name: string
  description: string
  longDescription: string
  category: string
  meetingTime: string
  meetingLocation: string
  emoji: string
  color: string
  memberCount: number
  founded: number
  leadership: ClubLeader[]
}
