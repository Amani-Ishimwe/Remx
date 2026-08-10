import { Deck, FlashcardItem, QuizQuestionItem } from "./types";

export type GenerationResult = {
  title: string;
  summary: string;
  keyTakeaways: string[];
  category: string;
  tags: string[];
  flashcards: FlashcardItem[];
  quiz: QuizQuestionItem[];
};

export const SAMPLE_ARTICLES = [
  {
    title: "Kubernetes CNI & eBPF Networking Internals",
    url: "https://cilium.io/blog/2023/ebpf-kubernetes-networking",
    preview: "How Cilium and eBPF bypass iptables/ipvs connection tracking to route cluster packets directly in the kernel space with sub-millisecond latencies.",
    content: `In standard Kubernetes clusters, networking was traditionally handled by kube-proxy using iptables or IPVS. As cluster density grew to thousands of services and endpoints, iptables rule evaluation scaled with O(N) linear degradation, leading to significant CPU overhead and packet processing delays.

eBPF (Extended Berkeley Packet Filter) fundamentally redefines this model. By attaching sandboxed bytecode programs directly to network sockets and XDP (eXpress Data Path) hooks within the Linux kernel, eBPF allows the networking layer to bypass standard connection tracking tables entirely. Packets are evaluated against BPF hash maps in O(1) constant time, eliminating the overhead of user-space/kernel context switches.

Key implications for production engineering:
1. Micro-segmentation and L3/L4/L7 security policies can be evaluated at line rate without degrading network throughput.
2. Direct Server Return (DSR) avoids ingress/egress double-hops on pod-to-pod and cluster-external ingress traffic.
3. Socket-level load balancing rewrites destination socket addresses during the connect() syscall, preventing TCP packet re-routing.`,
  },
  {
    title: "Raft Consensus: Log Replication and Election Safety",
    url: "https://raft.github.io/raft.pdf",
    preview: "Understanding leader elections, log matching invariants, commit indices, and joint consensus reconfiguration in distributed state machines.",
    content: `The Raft consensus algorithm decomposes replicated state machine consensus into three independent subproblems: Leader Election, Log Replication, and Safety. Raft guarantees that each state machine executes the exact same sequence of state commands in the same order.

Leader Election operates using randomized election timeouts (typically 150-300ms) to avoid split-vote livelocks. Nodes transition between three states: Follower, Candidate, and Leader. A Candidate only becomes Leader when it wins a strict majority (quorum: N/2 + 1) of cluster votes.

Log Matching Property:
If two entries in different logs have the same index and term, they store the exact same command, and their logs are identical in all preceding entries.

Election Safety Invariant:
A leader never overwrites or truncates its own log entries. When a candidate requests a vote, voters reject the vote if the candidate's log is less up-to-date than the voter's own log (measured by highest term first, then log length).`,
  },
  {
    title: "PostgreSQL B-Tree vs LSM Tree Indexing & Amplification",
    url: "https://postgres.org/internals/btree-index-mechanics",
    preview: "Write amplification vs read latency tradeoffs between B+Tree storage engines and Log-Structured Merge Trees for OLTP workloads.",
    content: `Modern database storage engines balance three competing engineering constraints known as the RUM Conjecture: Read amplification, Update (write) amplification, and Memory overhead.

PostgreSQL uses traditional B-Tree (B+Tree variant) indices. Data pages and index pages are organized hierarchically with high fan-out (typically 100-500 keys per 8KB page). B-Trees offer deterministic O(log N) point lookups and sequential range scan performance because leaf nodes maintain bidirectional sibling pointers. However, random updates cause in-place page writes, leading to high write amplification and fragmentation that requires autovacuum maintenance.

In contrast, LSM Trees (used in RocksDB and CockroachDB) append all modifications sequentially to an in-memory MemTable and commit log, flushing immutable SSTables to disk in sorted layers. While LSM Trees achieve superior write throughput and zero write fragmentation, they suffer from higher read amplification and periodic compaction spikes when merging overlapping key ranges.`,
  },
  {
    title: "Rust Ownership, Lifetimes & Non-Lexical Scopes",
    url: "https://doc.rust-lang.org/nomicon/ownership.html",
    preview: "How the Rust borrow checker enforces compile-time memory safety, eliminates data races, and utilizes NLL borrow analysis.",
    content: `Rust achieves memory safety without a garbage collector through its ownership model. Every value in Rust has exactly one owner at any given time. When the owner goes out of scope, the memory is immediately deallocated via the Drop trait.

The Borrow Checker enforces two inviolable rules for references:
1. You may have any number of immutable references (&T) to a resource, OR
2. You may have exactly one mutable reference (&mut T) to a resource, but never both simultaneously.

Non-Lexical Lifetimes (NLL):
Older Rust compilers bound reference lifetimes strictly to lexical block scopes ({ ... }). Modern Rust uses a control-flow graph (CFG) analysis where reference lifetimes end at the exact point of last use rather than the end of the enclosing block, enabling ergonomic re-borrowing without compromising memory safety.`,
  },
];

export async function generateRetentionArtifacts(
  input: string,
  sourceUrl?: string
): Promise<GenerationResult> {
  // Simulate AI extraction and synthesis latency
  await new Promise((resolve) => setTimeout(resolve, 1800));

  const lower = input.toLowerCase();

  if (lower.includes("kubernetes") || lower.includes("ebpf") || lower.includes("cni") || lower.includes("network")) {
    return {
      title: "Kubernetes CNI & eBPF Networking Internals",
      category: "Cloud Infrastructure",
      tags: ["Kubernetes", "eBPF", "Networking", "Linux Kernel", "Cilium"],
      summary:
        "Standard Kubernetes iptables/IPVS networking suffers from linear O(N) rule evaluation overhead at high cluster density. Cilium and eBPF attach sandboxed bytecode to kernel socket hooks and XDP, enabling O(1) hash map routing, socket-level load balancing, and line-rate micro-segmentation without user/kernel context switches.",
      keyTakeaways: [
        "eBPF bypasses iptables connection tracking, reducing packet evaluation latency to constant O(1) time.",
        "Socket-level load balancing rewrites destination addresses during connect() syscalls to prevent TCP packet re-routing overhead.",
        "Direct Server Return (DSR) eliminates double-hops on pod-to-pod and external ingress routing.",
        "L3/L4/L7 security policies are enforced at kernel line rate without throughput degradation.",
      ],
      flashcards: [
        {
          id: "fc-1",
          front: "Why does standard iptables routing degrade in large-scale Kubernetes clusters?",
          back: "iptables evaluates rules sequentially in O(N) linear time per packet. With thousands of services and endpoints, this causes substantial CPU overhead and packet processing latency.",
        },
        {
          id: "fc-2",
          front: "How does eBPF achieve O(1) packet routing in Kubernetes?",
          back: "eBPF attaches sandboxed bytecode to XDP and socket hooks, querying BPF hash maps in constant O(1) time and bypassing Linux connection tracking tables.",
        },
        {
          id: "fc-3",
          front: "What is Socket-Level Load Balancing in Cilium?",
          back: "It intercepts and rewrites the destination IP/port directly within the client pod's connect() syscall, avoiding network device traversal for load-balanced traffic.",
        },
        {
          id: "fc-4",
          front: "What benefit does Direct Server Return (DSR) provide?",
          back: "DSR routes response traffic directly from backend pods back to the client, eliminating the round-trip bottle-neck through the ingress load balancer node.",
        },
      ],
      quiz: [
        {
          id: "qz-1",
          question: "What is the algorithmic time complexity of eBPF packet lookup in Cilium compared to iptables?",
          options: [
            "O(1) constant time vs O(N) linear evaluation",
            "O(log N) tree search vs O(1) array access",
            "O(N^2) quadratic vs O(N) linear",
            "Both operate in identical O(log N) lookup time",
          ],
          answer: "O(1) constant time vs O(N) linear evaluation",
          explanation: "eBPF uses BPF hash maps for instant O(1) lookups regardless of how many services exist in the cluster.",
        },
        {
          id: "qz-2",
          question: "At which stage does socket-level load balancing translate service IPs?",
          options: [
            "During the connect() syscall inside socket buffer",
            "After the packet reaches the physical NIC driver",
            "In user-space proxy daemon before serialization",
            "During IP packet fragmentation in the router",
          ],
          answer: "During the connect() syscall inside socket buffer",
          explanation: "Intercepting during connect() translates the socket address before packets are even emitted.",
        },
      ],
    };
  }

  if (lower.includes("raft") || lower.includes("consensus") || lower.includes("paxos") || lower.includes("election")) {
    return {
      title: "Raft Consensus: Log Replication and Election Safety",
      category: "Distributed Systems",
      tags: ["Distributed Systems", "Consensus", "Fault Tolerance", "Raft"],
      summary:
        "Raft achieves distributed state machine consensus by decomposing it into Leader Election, Log Replication, and Safety invariants. Leaders maintain authority via randomized heartbeat timeouts and commit log entries only after a strict quorum (N/2 + 1) replication.",
      keyTakeaways: [
        "Randomized election timeouts (150-300ms) prevent split-vote livelocks among candidates.",
        "Log entries are committed only when safely replicated across a strict majority (quorum) of nodes.",
        "Election safety ensures candidates with outdated logs are rejected by voters.",
        "Leaders never overwrite or truncate their own logs; they only append entries.",
      ],
      flashcards: [
        {
          id: "fc-r1",
          front: "How does Raft avoid split-vote livelocks during leader election?",
          back: "Nodes use randomized election timeouts (e.g. 150–300ms) so one node's timer expires first, allowing it to collect votes before peers timeout.",
        },
        {
          id: "fc-r2",
          front: "What is the Log Matching Property in Raft?",
          back: "If two log entries in different nodes share the same index and term, they contain the same command, and all previous entries in their logs are identical.",
        },
        {
          id: "fc-r3",
          front: "Under what condition will a voter reject a Candidate's RequestVote RPC?",
          back: "If the candidate's log is less up-to-date than the voter's own log (comparing highest term first, then longest log index).",
        },
      ],
      quiz: [
        {
          id: "qz-r1",
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
        {
          id: "qz-r2",
          question: "Can a Raft leader overwrite or delete entries in its own log?",
          options: [
            "No, leader logs are strictly append-only",
            "Yes, if a follower reports a conflict",
            "Yes, during heartbeat rebalancing",
            "Only when resetting term numbers",
          ],
          answer: "No, leader logs are strictly append-only",
          explanation: "Leader Append-Only is a fundamental Raft safety invariant: a leader never overwrites or truncates its own log.",
        },
      ],
    };
  }

  // Default synthetic generation for any arbitrary text/URL
  const titleWords = input
    .replace(/https?:\/\/[^\s]+/g, "")
    .replace(/[^\w\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 5)
    .join(" ");

  const cleanTitle = titleWords.length > 5
    ? titleWords.replace(/\b\w/g, (c) => c.toUpperCase())
    : "System Architecture & Core Mechanics";

  return {
    title: cleanTitle,
    category: "Technical Architecture",
    tags: ["Engineering", "Architecture", "Deep Dive", "Core Concepts"],
    summary:
      input.length > 120
        ? input.slice(0, 260) + "..."
        : "A foundational technical exploration examining core mechanisms, architectural trade-offs, and critical implementation patterns for resilient engineering systems.",
    keyTakeaways: [
      "Core operational constraints dictate the balance between read latency, write overhead, and memory footprint.",
      "Invariants must be enforced at compile-time or protocol boundaries to prevent runtime state divergence.",
      "Decoupled components communicate through explicit interface contracts to ensure deterministic behavior under load.",
      "Continuous review cycles solidify mental models and prevent architectural drift.",
    ],
    flashcards: [
      {
        id: "fc-g1",
        front: `What is the primary architectural principle highlighted in ${cleanTitle}?`,
        back: "Enforcing rigorous system invariants and minimizing operational overhead through deterministic state transitions and well-defined interface contracts.",
      },
      {
        id: "fc-g2",
        front: "What is the key performance trade-off to consider in this design?",
        back: "Balancing immediate execution throughput against state consistency and memory amplification under high concurrency.",
      },
      {
        id: "fc-g3",
        front: "How does this concept improve long-term system maintainability?",
        back: "By making edge cases explicit, isolating failure domains, and ensuring predictable behavior during degradation.",
      },
    ],
    quiz: [
      {
        id: "qz-g1",
        question: `What is the primary objective established in ${cleanTitle}?`,
        options: [
          "Enforce deterministic consistency and optimize resource utilization",
          "Maximize unconstrained throughput without validation checks",
          "Rely on implicit runtime assumptions across module boundaries",
          "Eliminate state persistence to simplify node lifecycles",
        ],
        answer: "Enforce deterministic consistency and optimize resource utilization",
        explanation: "Robust technical systems prioritize deterministic behavior and explicit boundary contracts.",
      },
      {
        id: "qz-g2",
        question: "How should state transitions be validated according to this pattern?",
        options: [
          "Through explicit protocol invariants and verified consensus gates",
          "By ignoring intermittent error returns during bursts",
          "Via manual inspection after system deployment",
          "By bypassing intermediate boundary layers entirely",
        ],
        answer: "Through explicit protocol invariants and verified consensus gates",
        explanation: "Invariant validation at each stage prevents cascading corruptions and invalid state divergence.",
      },
    ],
  };
}
