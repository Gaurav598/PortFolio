export type Project = {
  id: 'codecollab' | 'flux' | 'flashflow';
  number: string;
  name: string;
  eyebrow: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  decisions: string[];
  tradeoff: string;
  result: string;
  stack: string[];
  repository: string;
  note?: string;
};

export type Contribution = {
  repo: string;
  number: number;
  title: string;
  detail: string;
  status: 'Merged' | 'Open';
  url: string;
};

export const projects: Project[] = [
  {
    id: 'codecollab',
    number: '01',
    name: 'CodeCollab',
    eyebrow: 'Real-time developer collaboration',
    summary:
      'A multi-file coding workspace where editing, conversation, and execution meet in one product.',
    problem:
      'Shared coding sessions need low-latency edits without coupling every keystroke to the application API.',
    solution:
      'A Next.js workspace binds Monaco to Yjs, while a dedicated Node WebSocket service handles document updates. Spring Boot owns rooms, files, chat, authorization, and execution requests.',
    architecture: [
      'Monaco + Yjs in the browser',
      'Node sync service + Redis Pub/Sub',
      'Spring Boot API + MongoDB persistence',
    ],
    decisions: [
      'Separate the high-frequency edit channel from the application API.',
      'Use Yjs document updates for concurrent edits and Redis Pub/Sub between sync instances.',
      'Persist file content through an authenticated internal backend endpoint.',
    ],
    tradeoff:
      'The split adds coordination between sync state and durable file storage; the repository includes a persistence path, but no measured latency claim is made here.',
    result:
      'The source includes a working editor binding, remote cursors, room and file APIs, STOMP chat, and an execution integration.',
    stack: ['Next.js', 'TypeScript', 'Monaco', 'Yjs', 'Node.js', 'Spring Boot', 'Redis', 'MongoDB'],
    repository: 'https://github.com/Gaurav598/CodeCollab',
  },
  {
    id: 'flux',
    number: '02',
    name: 'Flux',
    eyebrow: 'Ride booking + bidding ecosystem',
    summary: 'Two mobile experiences and a shared backend for the full request-to-ride flow.',
    problem:
      'A ride marketplace has to coordinate passenger requests, available riders, competing bids, and a changing ride state.',
    solution:
      'Separate React Native passenger and rider apps use Spring Boot APIs for bookings, bidding, authentication, and lifecycle updates. WebSocket topics deliver bid and notification events.',
    architecture: [
      'Passenger app → booking request',
      'Spring Boot → nearby riders + bids',
      'Bid selection → OTP + ride tracking',
    ],
    decisions: [
      'Keep passenger and rider journeys in separate mobile apps.',
      'Lock booking selection in the bidding service so competing bid acceptance is serialized.',
      'Use PostgreSQL for booking data and WebSocket messaging for live bid updates.',
    ],
    tradeoff:
      'This is a demo/test project. Its repository documents production gaps; the portfolio does not present it as a live commercial service or claim live payments.',
    result:
      'The repository contains passenger and rider screens, a bidding service, ride status transitions, location endpoints, and an admin dashboard.',
    stack: ['React Native', 'Java', 'Spring Boot', 'PostgreSQL', 'WebSockets'],
    repository: 'https://github.com/Gaurav598/Flux',
    note: 'Demo / test project',
  },
  {
    id: 'flashflow',
    number: '03',
    name: 'FlashFlow',
    eyebrow: 'Distributed inventory reservation',
    summary:
      'A flash-sale backend that makes contention, service boundaries, and failure modes visible.',
    problem:
      'Many requests can race for a small stock pool, while authentication and order writes place different demands on the system.',
    solution:
      'An Express API gateway routes to auth, stock, and order services. Redis holds the inventory counter; MongoDB stores users and orders. Docker Compose and Kubernetes manifests define the runtime.',
    architecture: [
      'API Gateway → Auth / Order',
      'Order → Stock service → Redis',
      'Order → MongoDB; Kubernetes manifests + HPA',
    ],
    decisions: [
      'Isolate authentication, stock, and order workloads.',
      'Use Redis DECRBY for the stock counter and compensate a negative result.',
      'Keep order persistence in its own MongoDB-backed service.',
    ],
    tradeoff:
      'The decrement and compensation are two operations, and a stock reservation is not transactionally coupled to the MongoDB order write. The repository documents both limitations.',
    result:
      'The source includes four services, stock reservation code, container and Kubernetes definitions, and load-test scripts. No throughput or zero-overselling figure is claimed without a reproducible run here.',
    stack: ['Node.js', 'Express', 'Redis', 'MongoDB', 'Docker', 'Kubernetes'],
    repository: 'https://github.com/Gaurav598/FlashFlow-Distributed-Engine',
  },
];

// Checked against the linked GitHub pull requests on 9 October 2026.
export const contributions: Contribution[] = [
  {
    repo: 'kubernetes/perf-tests',
    number: 4182,
    status: 'Merged',
    title: 'Make rollout status tell the truth',
    detail:
      'Clarified pod startup reporting when a rolling update temporarily exceeds desired replicas, with regression coverage.',
    url: 'https://github.com/kubernetes/perf-tests/pull/4182',
  },
  {
    repo: 'kubernetes-sigs/dra-example-driver',
    number: 259,
    status: 'Merged',
    title: 'Restore CDI specs after restart',
    detail:
      'Recreated transient CDI specs when prepared DRA claims are recovered from a checkpoint, with tests for missing and existing specs.',
    url: 'https://github.com/kubernetes-sigs/dra-example-driver/pull/259',
  },
  {
    repo: 'kubernetes/kubernetes',
    number: 141568,
    status: 'Open',
    title: 'Retry failed pod deletions',
    detail:
      'Proposes a durable, rate-limited retry path for taint-driven eviction, with checks for stale work and pod identity.',
    url: 'https://github.com/kubernetes/kubernetes/pull/141568',
  },
  {
    repo: 'kubernetes/perf-tests',
    number: 4358,
    status: 'Open',
    title: 'Measure ResourceClaim latency precisely',
    detail:
      'Proposes informer receive timestamps to preserve sub-second precision in claim and pod timing.',
    url: 'https://github.com/kubernetes/perf-tests/pull/4358',
  },
  {
    repo: 'kubernetes/perf-tests',
    number: 4183,
    status: 'Open',
    title: 'Expose Go runtime metrics',
    detail: 'Proposes heap, GC, and allocation measurements alongside benchmark-list results.',
    url: 'https://github.com/kubernetes/perf-tests/pull/4183',
  },
  {
    repo: 'kubernetes/website',
    number: 57960,
    status: 'Open',
    title: 'Clarify reserved CPU configuration',
    detail:
      'Proposes corrected documentation for reservedSystemCPUs and incompatible cgroup settings.',
    url: 'https://github.com/kubernetes/website/pull/57960',
  },
];

export const toolkit = [
  { title: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'SQL'] },
  {
    title: 'Backend + real time',
    items: ['Spring Boot', 'Node.js', 'Express', 'REST APIs', 'WebSockets', 'Yjs'],
  },
  { title: 'Product surfaces', items: ['React', 'Next.js', 'React Native', 'Tailwind CSS'] },
  {
    title: 'Data + infrastructure',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    title: 'Foundations',
    items: ['Data structures', 'OOP', 'DBMS', 'Operating systems', 'Networks', 'System design'],
  },
];
