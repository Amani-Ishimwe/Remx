import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Deck, FeedItem, Goal, Group, ReviewGrade, UserProfile } from "./types";
import { calculateNextReview, isDeckDue } from "./srs";

interface RemxState {
  decks: Deck[];
  groups: Group[];
  goals: Goal[];
  feedItems: FeedItem[];
  user: UserProfile;
  activeReviewDeckId: string | null;

  // Deck actions
  addDeck: (deckData: Partial<Deck> & { title: string; summary: string; flashcards: Deck["flashcards"]; quiz: Deck["quiz"] }) => Deck;
  updateDeck: (id: string, updates: Partial<Deck>) => void;
  deleteDeck: (id: string) => void;
  gradeDeckReview: (deckId: string, grade: ReviewGrade) => { nextDueAt: string; intervalIndex: number; streak: number };
  setActiveReviewDeckId: (id: string | null) => void;

  // Group actions
  createGroup: (name: string, description: string) => Group;
  joinGroup: (inviteCode: string) => { success: boolean; group?: Group; message: string };
  shareDeckToGroup: (deckId: string, groupId: string) => void;
  addGroupActivity: (groupId: string, message: string, type: "deck_added" | "review_completed" | "streak_milestone" | "member_joined") => void;

  // Goal actions
  addGoal: (label: string, category?: string) => Goal;
  removeGoal: (id: string) => void;

  // Settings & Reset
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  resetToDefaults: () => void;
}

const INITIAL_GOALS: Goal[] = [
  {
    id: "goal-1",
    label: "Understand Kubernetes networking & eBPF",
    category: "Cloud Infrastructure",
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    progressPercent: 68,
  },
  {
    id: "goal-2",
    label: "Master Distributed Consensus & Raft Invariants",
    category: "Distributed Systems",
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    progressPercent: 45,
  },
  {
    id: "goal-3",
    label: "Database Storage Engines (B-Tree vs LSM)",
    category: "Database Internals",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    progressPercent: 82,
  },
];

const INITIAL_DECKS: Deck[] = [
  {
    id: "deck-1",
    title: "Kubernetes CNI & eBPF Networking Internals",
    sourceUrl: "https://cilium.io/blog/2023/ebpf-kubernetes-networking",
    category: "Cloud Infrastructure",
    tags: ["Kubernetes", "eBPF", "Networking"],
    summary:
      "Standard Kubernetes iptables/IPVS networking suffers from linear O(N) rule evaluation overhead at high cluster density. Cilium and eBPF attach sandboxed bytecode to kernel socket hooks and XDP, enabling O(1) hash map routing, socket-level load balancing, and line-rate micro-segmentation without user/kernel context switches.",
    keyTakeaways: [
      "eBPF bypasses iptables connection tracking, reducing packet evaluation latency to constant O(1) time.",
      "Socket-level load balancing rewrites destination addresses during connect() syscalls to prevent TCP packet re-routing overhead.",
      "Direct Server Return (DSR) eliminates double-hops on pod-to-pod and external ingress routing.",
    ],
    ownerId: "user-me",
    groupId: "group-1",
    groupName: "Kernel & Infrastructure Cohort",
    flashcards: [
      {
        id: "fc-1-1",
        front: "Why does standard iptables routing degrade in large-scale Kubernetes clusters?",
        back: "iptables evaluates rules sequentially in O(N) linear time per packet. With thousands of services and endpoints, this causes substantial CPU overhead and packet processing latency.",
        mastered: false,
      },
      {
        id: "fc-1-2",
        front: "How does eBPF achieve O(1) packet routing in Kubernetes?",
        back: "eBPF attaches sandboxed bytecode to XDP and socket hooks, querying BPF hash maps in constant O(1) time and bypassing Linux connection tracking tables.",
        mastered: false,
      },
      {
        id: "fc-1-3",
        front: "What is Socket-Level Load Balancing in Cilium?",
        back: "It intercepts and rewrites the destination IP/port directly within the client pod's connect() syscall, avoiding network device traversal for load-balanced traffic.",
        mastered: false,
      },
    ],
    quiz: [
      {
        id: "qz-1-1",
        question: "What is the algorithmic time complexity of eBPF packet lookup in Cilium compared to iptables?",
        options: [
          "O(1) constant time vs O(N) linear evaluation",
          "O(log N) tree search vs O(1) array access",
          "O(N^2) quadratic vs O(N) linear",
          "Both operate in identical O(log N) lookup time",
        ],
        answer: "O(1) constant time vs O(N) linear evaluation",
        explanation: "eBPF uses BPF hash maps for instant O(1) lookups regardless of cluster service count.",
      },
    ],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    intervalIndex: 1, // Day 3 interval
    nextDueAt: new Date(Date.now() - 2 * 3600000).toISOString(), // DUE NOW!
    reviewCount: 2,
    lastReviewedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    masteredCount: 1,
  },
  {
    id: "deck-2",
    title: "Raft Consensus: Log Replication and Election Safety",
    sourceUrl: "https://raft.github.io/raft.pdf",
    category: "Distributed Systems",
    tags: ["Distributed Systems", "Consensus", "Raft"],
    summary:
      "Raft achieves distributed state machine consensus by decomposing it into Leader Election, Log Replication, and Safety invariants. Leaders maintain authority via randomized heartbeat timeouts and commit log entries only after a strict quorum (N/2 + 1) replication.",
    keyTakeaways: [
      "Randomized election timeouts (150-300ms) prevent split-vote livelocks among candidates.",
      "Log entries are committed only when safely replicated across a strict majority (quorum) of nodes.",
      "Election safety ensures candidates with outdated logs are rejected by voters.",
    ],
    ownerId: "user-me",
    groupId: "group-1",
    groupName: "Kernel & Infrastructure Cohort",
    flashcards: [
      {
        id: "fc-2-1",
        front: "How does Raft avoid split-vote livelocks during leader election?",
        back: "Nodes use randomized election timeouts (e.g. 150–300ms) so one node's timer expires first, allowing it to collect votes before peers timeout.",
        mastered: false,
      },
      {
        id: "fc-2-2",
        front: "What is the Log Matching Property in Raft?",
        back: "If two log entries in different nodes share the same index and term, they contain the same command, and all previous entries in their logs are identical.",
        mastered: false,
      },
      {
        id: "fc-2-3",
        front: "Under what condition will a voter reject a Candidate's RequestVote RPC?",
        back: "If the candidate's log is less up-to-date than the voter's own log (comparing highest term first, then longest log index).",
        mastered: false,
      },
    ],
    quiz: [
      {
        id: "qz-2-1",
        question: "What constitutes a valid quorum for a 5-node Raft cluster?",
        options: [
          "At least 3 nodes (majority: N/2 + 1)",
          "All 5 nodes (unanimous consensus)",
          "At least 2 nodes (minority leader)",
          "Any 4 nodes (fault tolerance threshold)",
        ],
        answer: "At least 3 nodes (majority: N/2 + 1)",
        explanation: "Quorum requires a strict majority (5 / 2 + 1 = 3 nodes) to prevent split-brain partitions.",
      },
    ],
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    intervalIndex: 2, // Day 7 interval
    nextDueAt: new Date(Date.now() + 2 * 86400000).toISOString(), // Due in 2 days
    reviewCount: 3,
    lastReviewedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    masteredCount: 2,
  },
  {
    id: "deck-3",
    title: "PostgreSQL B-Tree vs LSM Tree Indexing & Amplification",
    sourceUrl: "https://postgres.org/internals/btree-index-mechanics",
    category: "Database Internals",
    tags: ["Database", "PostgreSQL", "LSM Tree", "B-Tree"],
    summary:
      "Modern database storage engines balance Read amplification, Update (write) amplification, and Memory overhead. PostgreSQL uses B+Trees for deterministic point lookups and range scans at the expense of random write amplification, whereas LSM trees prioritize sequential writes and zero fragmentation at the cost of compaction overhead.",
    keyTakeaways: [
      "B-Trees offer deterministic O(log N) point lookups with high fan-out leaf pointers.",
      "LSM Trees eliminate random write fragmentation via in-memory MemTables and append-only SSTables.",
      "Autovacuum maintenance in Postgres is necessary to clean dead tuples produced by in-place page updates.",
    ],
    ownerId: "user-me",
    flashcards: [
      {
        id: "fc-3-1",
        front: "What is the primary write bottleneck with PostgreSQL B-Tree indices?",
        back: "Random updates cause in-place 8KB page rewrites, resulting in write amplification and table bloat that requires autovacuum cleanup.",
        mastered: true,
      },
      {
        id: "fc-3-2",
        front: "How do LSM trees achieve high write throughput?",
        back: "All writes are sequentially appended to an in-memory MemTable and write-ahead log, then flushed to disk as immutable sorted SSTables.",
        mastered: true,
      },
    ],
    quiz: [
      {
        id: "qz-3-1",
        question: "Which tradeoff characterizes Log-Structured Merge (LSM) trees compared to B-Trees?",
        options: [
          "Higher write throughput with higher read/compaction amplification",
          "Lower write throughput with zero read amplification",
          "Identical disk access patterns for all operations",
          "Complete elimination of memory buffering",
        ],
        answer: "Higher write throughput with higher read/compaction amplification",
      },
    ],
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    intervalIndex: 4, // Day 30 (Mastered)
    nextDueAt: new Date(Date.now() + 18 * 86400000).toISOString(),
    reviewCount: 5,
    lastReviewedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    masteredCount: 2,
  },
];

const INITIAL_GROUPS: Group[] = [
  {
    id: "group-1",
    name: "Kernel & Infrastructure Cohort",
    description: "Systems engineers, SREs, and platform developers mastering Linux kernel internals, eBPF, distributed consensus, and storage engines.",
    inviteCode: "KERNEL-2026",
    members: [
      {
        userId: "user-me",
        name: "Alex Rivera (You)",
        avatar: "AR",
        role: "owner",
        streak: 5,
        cardsMastered: 18,
        decksReviewed: 14,
      },
      {
        userId: "user-2",
        name: "Elena Rostova",
        avatar: "ER",
        role: "member",
        streak: 7,
        cardsMastered: 24,
        decksReviewed: 19,
      },
      {
        userId: "user-3",
        name: "Marcus Vance",
        avatar: "MV",
        role: "member",
        streak: 4,
        cardsMastered: 12,
        decksReviewed: 11,
      },
      {
        userId: "user-4",
        name: "Priya Sharma",
        avatar: "PS",
        role: "member",
        streak: 9,
        cardsMastered: 31,
        decksReviewed: 23,
      },
    ],
    deckIds: ["deck-1", "deck-2"],
    activity: [
      {
        id: "act-1",
        type: "streak_milestone",
        message: "Cohort collective review streak reached 7 consecutive days!",
        at: "2 hours ago",
        user: "Cohort Momentum",
      },
      {
        id: "act-2",
        type: "deck_added",
        message: "Elena added a new deck: Linux Memory Subsystem & Page Faults",
        at: "5 hours ago",
        user: "Elena Rostova",
      },
      {
        id: "act-3",
        type: "review_completed",
        message: "Marcus completed review on Kubernetes CNI & eBPF Networking",
        at: "Yesterday",
        user: "Marcus Vance",
      },
      {
        id: "act-4",
        type: "member_joined",
        message: "Priya Sharma joined Kernel & Infrastructure Cohort",
        at: "3 days ago",
        user: "Priya Sharma",
      },
    ],
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
  {
    id: "group-2",
    name: "Distributed Systems Reading Club",
    description: "Deep readings of landmark papers: Raft, Paxos, Spanner, Dynamo, and Kafka stream processing.",
    inviteCode: "DISTRIB-88",
    members: [
      {
        userId: "user-me",
        name: "Alex Rivera (You)",
        avatar: "AR",
        role: "member",
        streak: 5,
        cardsMastered: 18,
        decksReviewed: 14,
      },
      {
        userId: "user-5",
        name: "David Chen",
        avatar: "DC",
        role: "owner",
        streak: 12,
        cardsMastered: 42,
        decksReviewed: 29,
      },
    ],
    deckIds: ["deck-2"],
    activity: [
      {
        id: "act-5",
        type: "deck_added",
        message: "David shared Raft Consensus: Log Replication and Election Safety",
        at: "2 days ago",
        user: "David Chen",
      },
    ],
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
];

const INITIAL_FEED_ITEMS: FeedItem[] = [
  {
    id: "feed-1",
    title: "eBPF Socket Maps and Kernel Packet Steering in Cilium",
    source: "Cilium Engineering",
    sourceUrl: "https://cilium.io/blog/ebpf-sockmap-packet-steering",
    readTimeMins: 9,
    relatedGoalId: "goal-1",
    relevanceNote: "fills a gap in: Kubernetes networking & eBPF",
    category: "Cloud Infrastructure",
    difficulty: "Advanced",
    sampleContent:
      "A deep dive into sockmap programs in the Linux kernel. How Cilium uses BPF_MAP_TYPE_SOCKMAP to inspect TCP socket streams directly and route packets between local container sockets without passing through the IP stack.",
  },
  {
    id: "feed-2",
    title: "Formal Verification of Raft Safety Invariants in TLA+",
    source: "ACM Distributed Systems",
    sourceUrl: "https://acm.org/papers/raft-tla-formal-verification",
    readTimeMins: 14,
    relatedGoalId: "goal-2",
    relevanceNote: "fills a gap in: Master Distributed Consensus & Raft Invariants",
    category: "Distributed Systems",
    difficulty: "Advanced",
    sampleContent:
      "How TLA+ specifications expose subtle edge cases during joint consensus cluster membership changes in Raft. An analysis of state space exploration and induction proofs for the Leader Completeness property.",
  },
  {
    id: "feed-3",
    title: "Write Amplification and Compaction Strategies in RocksDB",
    source: "Meta Engineering",
    sourceUrl: "https://engineering.fb.com/core-data/rocksdb-compaction-mechanisms",
    readTimeMins: 11,
    relatedGoalId: "goal-3",
    relevanceNote: "fills a gap in: Database Storage Engines (B-Tree vs LSM)",
    category: "Database Internals",
    difficulty: "Intermediate",
    sampleContent:
      "Leveled Compaction vs Universal Compaction. How tiered SSTable structures balance write amplification against disk space amplification, and how Bloom filters minimize useless disk reads on negative point queries.",
  },
  {
    id: "feed-4",
    title: "Kubernetes Service Mesh without Sidecars: Ambient Mesh Architecture",
    source: "Istio Project",
    sourceUrl: "https://istio.io/latest/blog/2022/ambient-mesh-intro/",
    readTimeMins: 8,
    relatedGoalId: "goal-1",
    relevanceNote: "fills a gap in: Kubernetes networking & eBPF",
    category: "Cloud Infrastructure",
    difficulty: "Intermediate",
    sampleContent:
      "Splitting L4 ztunnel (zero-trust node tunnel) from L7 waypoint proxies. Why removing sidecar containers reduces per-pod memory overhead by 90% and eliminates container injection race conditions.",
  },
  {
    id: "feed-5",
    title: "Vector Clocks, CRDTs, and State Synchronization in Dynamo Architectures",
    source: "AWS Architecture Deep Dives",
    sourceUrl: "https://aws.amazon.com/builders-library/crdts-state-sync",
    readTimeMins: 12,
    relatedGoalId: "goal-2",
    relevanceNote: "fills a gap in: Master Distributed Consensus & Raft Invariants",
    category: "Distributed Systems",
    difficulty: "Intermediate",
    sampleContent:
      "Conflict-free Replicated Data Types (CvRDT and CmRDT) enable concurrent state updates without global consensus locks. Learn how convergent semi-lattices ensure eventual consistency across network partitions.",
  },
];

const INITIAL_USER: UserProfile = {
  id: "user-me",
  name: "Alex Rivera",
  email: "alex.rivera@engineer.io",
  streak: 5,
  lastReviewDate: new Date().toISOString(),
  totalReviewsCompleted: 42,
  cardsMastered: 18,
  activeGoalIds: ["goal-1", "goal-2", "goal-3"],
  notificationIntervals: [1, 3, 7, 14, 30],
  emailDigest: true,
};

export const useRemxStore = create<RemxState>()(
  persist(
    (set, get) => ({
      decks: INITIAL_DECKS,
      groups: INITIAL_GROUPS,
      goals: INITIAL_GOALS,
      feedItems: INITIAL_FEED_ITEMS,
      user: INITIAL_USER,
      activeReviewDeckId: null,

      addDeck: (deckData) => {
        const id = `deck-${Date.now()}`;
        const newDeck: Deck = {
          id,
          title: deckData.title,
          sourceUrl: deckData.sourceUrl || "",
          sourceText: deckData.sourceText || "",
          category: deckData.category || "Technical Notes",
          tags: deckData.tags || ["Article"],
          summary: deckData.summary,
          keyTakeaways: deckData.keyTakeaways || [],
          ownerId: get().user.id,
          groupId: deckData.groupId,
          groupName: deckData.groupName,
          flashcards: deckData.flashcards,
          quiz: deckData.quiz,
          createdAt: new Date().toISOString(),
          intervalIndex: 0, // Day 1
          nextDueAt: new Date(Date.now() + 86400000).toISOString(),
          reviewCount: 0,
          lastReviewedAt: null,
          masteredCount: 0,
        };

        set((state) => ({
          decks: [newDeck, ...state.decks],
        }));

        // If shared with a group, update group activity and deckIds
        if (deckData.groupId) {
          get().shareDeckToGroup(id, deckData.groupId);
        }

        return newDeck;
      },

      updateDeck: (id, updates) => {
        set((state) => ({
          decks: state.decks.map((d) => (d.id === id ? { ...d, ...updates } : d)),
        }));
      },

      deleteDeck: (id) => {
        set((state) => ({
          decks: state.decks.filter((d) => d.id !== id),
          groups: state.groups.map((g) => ({
            ...g,
            deckIds: g.deckIds.filter((dId) => dId !== id),
          })),
        }));
      },

      gradeDeckReview: (deckId, grade) => {
        const state = get();
        const deck = state.decks.find((d) => d.id === deckId);
        if (!deck) {
          return { nextDueAt: new Date().toISOString(), intervalIndex: 0, streak: state.user.streak };
        }

        const { nextIntervalIndex, nextDueAt } = calculateNextReview(deck.intervalIndex, grade);

        const newReviewCount = deck.reviewCount + 1;
        const newMastered = nextIntervalIndex === 4 ? deck.flashcards.length : deck.masteredCount || 0;

        const updatedDeck: Deck = {
          ...deck,
          intervalIndex: nextIntervalIndex,
          nextDueAt,
          reviewCount: newReviewCount,
          lastReviewedAt: new Date().toISOString(),
          masteredCount: newMastered,
        };

        const newStreak = state.user.streak + (grade === "got_it" ? 1 : 0);
        const newTotalReviews = state.user.totalReviewsCompleted + 1;
        const newCardsMastered = state.user.cardsMastered + (nextIntervalIndex === 4 ? deck.flashcards.length : 0);

        set((s) => ({
          decks: s.decks.map((d) => (d.id === deckId ? updatedDeck : d)),
          user: {
            ...s.user,
            streak: newStreak,
            totalReviewsCompleted: newTotalReviews,
            cardsMastered: newCardsMastered,
            lastReviewDate: new Date().toISOString(),
          },
        }));

        if (deck.groupId) {
          get().addGroupActivity(
            deck.groupId,
            `${state.user.name} reviewed "${deck.title}" (Retention: ${nextIntervalIndex + 1}/5)`,
            "review_completed"
          );
        }

        return { nextDueAt, intervalIndex: nextIntervalIndex, streak: newStreak };
      },

      setActiveReviewDeckId: (id) => {
        set({ activeReviewDeckId: id });
      },

      createGroup: (name, description) => {
        const id = `group-${Date.now()}`;
        const inviteCode = `${name.slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const newGroup: Group = {
          id,
          name,
          description,
          inviteCode,
          members: [
            {
              userId: get().user.id,
              name: `${get().user.name} (You)`,
              avatar: get().user.name.slice(0, 2).toUpperCase(),
              role: "owner",
              streak: get().user.streak,
              cardsMastered: get().user.cardsMastered,
              decksReviewed: get().user.totalReviewsCompleted,
            },
          ],
          deckIds: [],
          activity: [
            {
              id: `act-${Date.now()}`,
              type: "member_joined",
              message: `${get().user.name} created the cohort`,
              at: "Just now",
              user: get().user.name,
            },
          ],
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          groups: [newGroup, ...state.groups],
        }));

        return newGroup;
      },

      joinGroup: (inviteCode) => {
        const state = get();
        const codeClean = inviteCode.trim().toUpperCase();
        const targetGroup = state.groups.find((g) => g.inviteCode.toUpperCase() === codeClean);

        if (!targetGroup) {
          return { success: false, message: "No cohort found with that invite code." };
        }

        const isAlreadyMember = targetGroup.members.some((m) => m.userId === state.user.id);
        if (isAlreadyMember) {
          return { success: true, group: targetGroup, message: "You are already a member of this cohort." };
        }

        const updatedGroup: Group = {
          ...targetGroup,
          members: [
            ...targetGroup.members,
            {
              userId: state.user.id,
              name: `${state.user.name} (You)`,
              avatar: state.user.name.slice(0, 2).toUpperCase(),
              role: "member",
              streak: state.user.streak,
              cardsMastered: state.user.cardsMastered,
              decksReviewed: state.user.totalReviewsCompleted,
            },
          ],
          activity: [
            {
              id: `act-${Date.now()}`,
              type: "member_joined",
              message: `${state.user.name} joined the cohort`,
              at: "Just now",
              user: state.user.name,
            },
            ...targetGroup.activity,
          ],
        };

        set((s) => ({
          groups: s.groups.map((g) => (g.id === targetGroup.id ? updatedGroup : g)),
        }));

        return { success: true, group: updatedGroup, message: `Successfully joined ${targetGroup.name}!` };
      },

      shareDeckToGroup: (deckId, groupId) => {
        const state = get();
        const group = state.groups.find((g) => g.id === groupId);
        const deck = state.decks.find((d) => d.id === deckId);
        if (!group || !deck) return;

        const updatedDeck: Deck = {
          ...deck,
          groupId,
          groupName: group.name,
        };

        const updatedDeckIds = Array.from(new Set([...group.deckIds, deckId]));
        const updatedActivity: Group["activity"] = [
          {
            id: `act-${Date.now()}`,
            type: "deck_added",
            message: `${state.user.name} shared "${deck.title}" with the cohort`,
            at: "Just now",
            user: state.user.name,
          },
          ...group.activity,
        ];

        set((s) => ({
          decks: s.decks.map((d) => (d.id === deckId ? updatedDeck : d)),
          groups: s.groups.map((g) =>
            g.id === groupId ? { ...g, deckIds: updatedDeckIds, activity: updatedActivity } : g
          ),
        }));
      },

      addGroupActivity: (groupId, message, type) => {
        const state = get();
        set((s) => ({
          groups: s.groups.map((g) =>
            g.id === groupId
              ? {
                  ...g,
                  activity: [
                    {
                      id: `act-${Date.now()}`,
                      type,
                      message,
                      at: "Just now",
                      user: state.user.name,
                    },
                    ...g.activity,
                  ],
                }
              : g
          ),
        }));
      },

      addGoal: (label, category = "General") => {
        const newGoal: Goal = {
          id: `goal-${Date.now()}`,
          label,
          category,
          createdAt: new Date().toISOString(),
          progressPercent: 0,
        };

        set((state) => ({
          goals: [...state.goals, newGoal],
          user: {
            ...state.user,
            activeGoalIds: [...state.user.activeGoalIds, newGoal.id],
          },
        }));

        return newGoal;
      },

      removeGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
          user: {
            ...state.user,
            activeGoalIds: state.user.activeGoalIds.filter((gId) => gId !== id),
          },
        }));
      },

      updateUserProfile: (updates) => {
        set((state) => ({
          user: { ...state.user, ...updates },
        }));
      },

      resetToDefaults: () => {
        set({
          decks: INITIAL_DECKS,
          groups: INITIAL_GROUPS,
          goals: INITIAL_GOALS,
          feedItems: INITIAL_FEED_ITEMS,
          user: INITIAL_USER,
          activeReviewDeckId: null,
        });
      },
    }),
    {
      name: "remx-storage-v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
