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
    announcements: [
      {
        id: "robotics-1",
        title: "Regional qualifier this Saturday",
        body: "Bring your student ID for pit access. Bus leaves the east lot at 7:00 AM sharp — we're competing in three events this year.",
        date: "2026-07-15",
        tag: "Event",
      },
      {
        id: "robotics-2",
        title: "New CNC mill arrived",
        body: "The lab now has a benchtop CNC mill for chassis parts. Training session required before use — sign up on the shop whiteboard.",
        date: "2026-07-08",
        tag: "Announcement",
      },
      {
        id: "robotics-3",
        title: "Placed 2nd at the fall invitational",
        body: "Huge congrats to the drive team and build crew for a second-place finish out of 34 teams. Recap photos are up in the lab.",
        date: "2026-06-20",
        tag: "Achievement",
      },
    ],
    howToJoin: [
      "Stop by any Tuesday meeting in Engineering Lab, Room 204",
      "Fill out the interest form linked on the lab whiteboard",
      "Pick a subteam: mechanical, electrical, or software",
      "Attend the new-member orientation the following week",
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
    announcements: [
      {
        id: "debate-1",
        title: "State-circuit resolution released",
        body: "This month's Lincoln-Douglas topic is posted on the shared drive. Case-writing workshop Monday before practice.",
        date: "2026-07-13",
        tag: "Announcement",
      },
      {
        id: "debate-2",
        title: "Novice tournament signups open",
        body: "First-year debaters: the novice-only tournament is a great low-pressure start. Sign up with Aisha by Friday.",
        date: "2026-07-02",
        tag: "Event",
      },
    ],
    howToJoin: [
      "Attend a Monday practice in Library Conference Room B",
      "No experience needed — novice track starts every fall",
      "Get paired with a mentor for your first three practices",
      "Register for your first tournament through the team captain",
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
    announcements: [
      {
        id: "art-1",
        title: "Fall gallery show call for submissions",
        body: "Submit up to three pieces by August 1st for the studio show. Any medium welcome, framing supplies available in Studio 3.",
        date: "2026-07-14",
        tag: "Event",
      },
      {
        id: "art-2",
        title: "New printmaking press installed",
        body: "Studio 3 now has a tabletop etching press. Quick orientation this Wednesday before open studio time.",
        date: "2026-06-28",
        tag: "Announcement",
      },
    ],
    howToJoin: [
      "Drop into open studio hours, Wednesdays at 3:00 PM",
      "No portfolio or experience required",
      "Grab a locker from Nina for storing in-progress work",
      "Join the group chat for supply swaps and show updates",
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
    announcements: [
      {
        id: "chess-1",
        title: "Ladder tournament round 3 pairings posted",
        body: "Check the board outside Room 110 for your next matchup. Games must be completed by next Thursday.",
        date: "2026-07-16",
        tag: "Reminder",
      },
      {
        id: "chess-2",
        title: "Friendly match vs. Lincoln High",
        body: "We're hosting Lincoln High's chess club for a casual inter-school match. All members welcome to play or spectate.",
        date: "2026-07-05",
        tag: "Event",
      },
    ],
    howToJoin: [
      "Show up to any Thursday meeting, boards are provided",
      "Tell Elena your rating (or that you don't have one)",
      "Get slotted into the next ladder tournament round",
      "Optional: bring your own set for home practice",
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
    announcements: [
      {
        id: "env-1",
        title: "Beach cleanup this weekend",
        body: "Meet at the north lot Saturday at 9 AM. Gloves and bags provided, service hours will be logged.",
        date: "2026-07-17",
        tag: "Event",
      },
      {
        id: "env-2",
        title: "Composting bins now in the cafeteria",
        body: "Our proposal to admin was approved — compost bins are live in the main cafeteria. Look for the green signage.",
        date: "2026-06-30",
        tag: "Achievement",
      },
    ],
    howToJoin: [
      "Come to a Friday meeting in Science Building, Room 118",
      "Sign up for the volunteer email list with Liam",
      "Pick a project team: campus, community, or advocacy",
      "Log your hours through the shared volunteer tracker",
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
    announcements: [
      {
        id: "code-1",
        title: "Hackathon team signups close Friday",
        body: "We're sending four teams to RegionHacks this year. Fill out the team-matching form before Friday at 5 PM.",
        date: "2026-07-15",
        tag: "Reminder",
      },
      {
        id: "code-2",
        title: "Workshop: intro to React",
        body: "Owen is leading a hands-on React workshop this Monday. Laptops required, no prior JS experience needed.",
        date: "2026-07-06",
        tag: "Event",
      },
      {
        id: "code-3",
        title: "Two teams placed at RegionHacks",
        body: "Congrats to Team Byte and Team Null for placing in the top 5 at last month's hackathon!",
        date: "2026-06-15",
        tag: "Achievement",
      },
    ],
    howToJoin: [
      "Join a Monday session in Computer Lab, Room 302",
      "Introduce yourself in the club Discord (linked at check-in)",
      "Pick a project or join an existing team",
      "Opt into the hackathon mailing list if you want to compete",
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
    announcements: [
      {
        id: "drama-1",
        title: "Auditions for the winter production",
        body: "We're staging \"Twelfth Night\" this winter. Auditions run Tuesday and Wednesday — sign up for a slot outside the auditorium.",
        date: "2026-07-14",
        tag: "Event",
      },
      {
        id: "drama-2",
        title: "Backstage crew needed",
        body: "Looking for students interested in lighting, set build, and stage management — no audition required.",
        date: "2026-07-01",
        tag: "Announcement",
      },
    ],
    howToJoin: [
      "Come to a Tuesday meeting in the Auditorium",
      "Audition for a role, or sign up for a crew position",
      "Attend the read-through and rehearsal schedule kickoff",
      "No experience necessary for crew roles",
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
    announcements: [
      {
        id: "mun-1",
        title: "Country assignments for regional conference",
        body: "Delegation assignments for next month's conference are posted on the drive. Position papers due two weeks before.",
        date: "2026-07-12",
        tag: "Announcement",
      },
      {
        id: "mun-2",
        title: "Best Delegate at the fall conference",
        body: "Samuel earned Best Delegate in the Security Council committee — first for our chapter in three years.",
        date: "2026-06-22",
        tag: "Achievement",
      },
    ],
    howToJoin: [
      "Attend a Wednesday meeting in Library Conference Room A",
      "No prior MUN experience required",
      "Practice parliamentary procedure in weekly mock sessions",
      "Request a conference assignment from the head delegate",
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
    announcements: [
      {
        id: "vol-1",
        title: "Food bank shift signups open",
        body: "Saturday shifts at Riverside Food Bank are open for signup. Service hours count toward the graduation requirement.",
        date: "2026-07-16",
        tag: "Event",
      },
      {
        id: "vol-2",
        title: "New tutoring partnership with Lincoln Elementary",
        body: "We've added weekly after-school tutoring at Lincoln Elementary. Reach out to Chloe if you're interested in a recurring slot.",
        date: "2026-07-04",
        tag: "Announcement",
      },
    ],
    howToJoin: [
      "Attend a Thursday meeting in Student Center, Room 105",
      "Pick a partner organization from the current roster",
      "Sign the volunteer waiver with Chloe",
      "Log hours after each shift through the shared tracker",
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
    announcements: [
      {
        id: "board-1",
        title: "New RPG campaign starting",
        body: "Hana is running a new tabletop campaign starting this Friday. Session zero for character creation — no experience needed.",
        date: "2026-07-11",
        tag: "Event",
      },
      {
        id: "board-2",
        title: "Game library additions",
        body: "Three new strategy games added to the shelf this week, including a couple of member donations. Thanks all!",
        date: "2026-06-27",
        tag: "Announcement",
      },
    ],
    howToJoin: [
      "Drop into game night, Fridays at 4:00 PM",
      "No RSVP needed for casual play",
      "Ask Hana about joining an ongoing RPG campaign",
      "Bring a game to share if you have a favorite",
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
    announcements: [
      {
        id: "music-1",
        title: "Winter concert rehearsal schedule",
        body: "Combined rehearsals for the winter concert start next week — full ensemble call is Monday at 5 PM sharp.",
        date: "2026-07-13",
        tag: "Reminder",
      },
      {
        id: "music-2",
        title: "A cappella group seeking new members",
        body: "Our a cappella group has two open spots for the spring semester. Informal auditions this Monday after rehearsal.",
        date: "2026-06-29",
        tag: "Event",
      },
    ],
    howToJoin: [
      "Attend a Monday rehearsal in the Music Hall",
      "Sit in as an auditor before committing to a group",
      "Audition each fall for band, orchestra, or a cappella",
      "Rehearsal attendance is required ahead of concerts",
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
    announcements: [
      {
        id: "sci-1",
        title: "Event sign-ups for regionals",
        body: "Pick your top three events by Friday — Ethan will finalize the roster this weekend ahead of regionals.",
        date: "2026-07-17",
        tag: "Reminder",
      },
      {
        id: "sci-2",
        title: "Build day for the mousetrap vehicle event",
        body: "Saturday build day in Room 210, 10 AM to 2 PM. Materials provided, bring safety glasses if you have them.",
        date: "2026-07-03",
        tag: "Event",
      },
    ],
    howToJoin: [
      "Come to a Thursday meeting in Science Building, Room 210",
      "Try a few events during the first month before specializing",
      "Pair up with a partner for two-person events",
      "Commit to a study or build schedule ahead of regionals",
    ],
  },
]

export const categories = Array.from(
  new Set(clubs.map((club) => club.category))
).sort()
