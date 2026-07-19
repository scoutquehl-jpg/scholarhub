import type { Club } from "@/types/club"

export const clubs: Club[] = [
  {
    id: "robotics-club",
    name: "Robotics Club",
    description:
      "Design, build, and program competitive robots for regional and national tournaments.",
    longDescription:
      "Robotics Club brings together builders, coders, and strategists to design and compete with autonomous and remote-operated robots. Members rotate through mechanical design, electronics, and software teams, culminating in regional and national FIRST Robotics tournaments each spring. No prior experience required — we pair new members with veteran mentors.",
    category: "STEM",
    meetingTime: "Tuesdays, 4:00 PM",
    meetingLocation: "Engineering Lab, Room 204",
    emoji: "🤖",
    color: "bg-blue-500",
    memberCount: 42,
    founded: 2014,
    leadership: [
      { name: "Maya Chen", role: "President" },
      { name: "Devon Ortiz", role: "Vice President" },
      { name: "Priya Nair", role: "Lead Engineer" },
    ],
  },
  {
    id: "debate-team",
    name: "Debate Team",
    description:
      "Sharpen your argumentation and public speaking skills through competitive debate.",
    longDescription:
      "The Debate Team competes in Lincoln-Douglas and Policy formats across the state circuit. Weekly practices cover research, rebuttal drills, and mock rounds, with experienced members coaching newcomers through their first tournaments. Alumni have gone on to state finals three years running.",
    category: "Academic",
    meetingTime: "Mondays, 3:30 PM",
    meetingLocation: "Library, Conference Room B",
    emoji: "🎙️",
    color: "bg-amber-500",
    memberCount: 28,
    founded: 2009,
    leadership: [
      { name: "Jordan Blake", role: "President" },
      { name: "Aisha Rahman", role: "Team Captain" },
    ],
  },
  {
    id: "art-collective",
    name: "Art Collective",
    description:
      "A creative space to explore painting, sculpture, and mixed media with fellow artists.",
    longDescription:
      "Art Collective is an open studio for students exploring painting, sculpture, printmaking, and mixed media. Sessions are self-directed with light guidance from student leads, and the group hosts a campus gallery show every semester to showcase member work.",
    category: "Arts",
    meetingTime: "Wednesdays, 3:00 PM",
    meetingLocation: "Art Building, Studio 3",
    emoji: "🎨",
    color: "bg-pink-500",
    memberCount: 35,
    founded: 2016,
    leadership: [
      { name: "Nina Popescu", role: "President" },
      { name: "Théo Laurent", role: "Gallery Director" },
    ],
  },
  {
    id: "chess-club",
    name: "Chess Club",
    description:
      "Learn strategy and compete in casual matches and tournaments for all skill levels.",
    longDescription:
      "Chess Club welcomes everyone from first-time players to rated competitors. Casual play runs alongside structured lessons on openings and endgames, with an internal ladder tournament each semester and occasional matches against neighboring schools.",
    category: "Games",
    meetingTime: "Thursdays, 4:30 PM",
    meetingLocation: "Student Center, Room 110",
    emoji: "♟️",
    color: "bg-slate-500",
    memberCount: 24,
    founded: 2011,
    leadership: [
      { name: "Marcus Webb", role: "President" },
      { name: "Elena Volkov", role: "Tournament Director" },
    ],
  },
  {
    id: "environmental-society",
    name: "Environmental Society",
    description:
      "Lead campus sustainability initiatives and volunteer for local conservation projects.",
    longDescription:
      "Environmental Society runs campus sustainability campaigns — composting, energy audits, and waste reduction — while organizing off-campus volunteer days with local conservation groups. Members also advocate for green policy changes with school administration.",
    category: "Service",
    meetingTime: "Fridays, 3:00 PM",
    meetingLocation: "Science Building, Room 118",
    emoji: "🌱",
    color: "bg-emerald-500",
    memberCount: 31,
    founded: 2018,
    leadership: [
      { name: "Sofia Martinez", role: "President" },
      { name: "Liam O'Connor", role: "Volunteer Coordinator" },
    ],
  },
  {
    id: "coding-club",
    name: "Coding Club",
    description:
      "Build projects, learn new languages, and prepare for hackathons together.",
    longDescription:
      "Coding Club is a project-driven group for students at any experience level. Weekly sessions mix short workshops on new languages and tools with open build time on member projects, and the club sends teams to regional hackathons each year.",
    category: "STEM",
    meetingTime: "Mondays, 4:00 PM",
    meetingLocation: "Computer Lab, Room 302",
    emoji: "💻",
    color: "bg-indigo-500",
    memberCount: 51,
    founded: 2015,
    leadership: [
      { name: "Ryan Kim", role: "President" },
      { name: "Fatima Al-Sayed", role: "Vice President" },
      { name: "Owen Brooks", role: "Hackathon Lead" },
    ],
  },
  {
    id: "drama-society",
    name: "Drama Society",
    description:
      "Rehearse and perform in student-run theater productions throughout the year.",
    longDescription:
      "Drama Society writes, directs, and performs original and classic works in two full productions each year, plus a spring one-act festival. Roles exist both on stage and behind the scenes — set design, lighting, and stage management are all student-run.",
    category: "Arts",
    meetingTime: "Tuesdays, 5:00 PM",
    meetingLocation: "Auditorium",
    emoji: "🎭",
    color: "bg-rose-500",
    memberCount: 38,
    founded: 2008,
    leadership: [
      { name: "Isabella Ferreira", role: "President" },
      { name: "Noah Fitzgerald", role: "Artistic Director" },
    ],
  },
  {
    id: "model-un",
    name: "Model UN",
    description:
      "Simulate international diplomacy and represent nations in mock UN committees.",
    longDescription:
      "Model UN prepares delegates to represent assigned nations in mock committee sessions, blending research, public speaking, and negotiation. The club attends several regional conferences per year and has brought home multiple Best Delegate awards.",
    category: "Academic",
    meetingTime: "Wednesdays, 4:00 PM",
    meetingLocation: "Library, Conference Room A",
    emoji: "🌐",
    color: "bg-cyan-500",
    memberCount: 33,
    founded: 2012,
    leadership: [
      { name: "Grace Lindqvist", role: "President" },
      { name: "Samuel Adeyemi", role: "Head Delegate" },
    ],
  },
  {
    id: "volunteer-corps",
    name: "Volunteer Corps",
    description:
      "Organize community service events and partner with local nonprofits.",
    longDescription:
      "Volunteer Corps coordinates service opportunities with local nonprofits — food banks, shelters, and tutoring programs — and tracks member service hours toward graduation and scholarship requirements. New partner organizations are added every semester.",
    category: "Service",
    meetingTime: "Thursdays, 3:30 PM",
    meetingLocation: "Student Center, Room 105",
    emoji: "🤝",
    color: "bg-teal-500",
    memberCount: 47,
    founded: 2010,
    leadership: [
      { name: "Chloe Bennett", role: "President" },
      { name: "Marcus Webb", role: "Outreach Director" },
    ],
  },
  {
    id: "board-game-guild",
    name: "Board Game Guild",
    description:
      "Weekly game nights featuring strategy games, trivia, and tabletop RPGs.",
    longDescription:
      "Board Game Guild hosts weekly drop-in game nights with a rotating library of strategy games, party games, and tabletop RPG campaigns. No commitment required — come for one round or stay for a full campaign session.",
    category: "Games",
    meetingTime: "Fridays, 4:00 PM",
    meetingLocation: "Student Center, Room 112",
    emoji: "🎲",
    color: "bg-orange-500",
    memberCount: 29,
    founded: 2017,
    leadership: [
      { name: "Dylan Foster", role: "President" },
      { name: "Hana Kobayashi", role: "Game Master" },
    ],
  },
  {
    id: "music-ensemble",
    name: "Music Ensemble",
    description:
      "Rehearse and perform as part of a student band, orchestra, or a cappella group.",
    longDescription:
      "Music Ensemble spans a student band, chamber orchestra, and a cappella group, each rehearsing independently and joining forces for the winter and spring concerts. Auditions are held each fall, but rehearsals are open to auditors year-round.",
    category: "Arts",
    meetingTime: "Mondays, 5:00 PM",
    meetingLocation: "Music Hall",
    emoji: "🎵",
    color: "bg-violet-500",
    memberCount: 44,
    founded: 2007,
    leadership: [
      { name: "Amara Johnson", role: "President" },
      { name: "Théo Laurent", role: "Music Director" },
    ],
  },
  {
    id: "science-olympiad",
    name: "Science Olympiad",
    description:
      "Train and compete in a wide range of science and engineering events.",
    longDescription:
      "Science Olympiad trains teams across dozens of events spanning biology, chemistry, physics, and engineering design. Members specialize in two or three events, with dedicated study sessions and build days ahead of regional and state competitions.",
    category: "STEM",
    meetingTime: "Thursdays, 4:00 PM",
    meetingLocation: "Science Building, Room 210",
    emoji: "🔬",
    color: "bg-lime-600",
    memberCount: 39,
    founded: 2013,
    leadership: [
      { name: "Priya Nair", role: "President" },
      { name: "Ethan Muller", role: "Events Coordinator" },
    ],
  },
]

export const categories = Array.from(
  new Set(clubs.map((club) => club.category))
).sort()
