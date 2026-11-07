export type Project = {
  id: 'neuraswe' | 'codecollab' | 'flashflow' | 'flux';
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
  demo?: string;
  note?: string;
};

export type Contribution = {
  repo: string;
  number: number;
  title: string;
  detail: string;
  lang: string;
  status: 'Merged' | 'Open';
  url: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  stack: string[];
};

export type Achievement = {
  title: string;
  detail: string;
  url?: string;
};

// Checked against the linked GitHub repositories. Status accurate as of November 2026.
export const projects: Project[] = [
  {
    id: 'neuraswe',
    number: '01',
    name: 'NeuraSWE',
    eyebrow: 'Autonomous AI software engineering agent',
    summary:
      'A framework-free ReAct agent with 10 tools that resolves GitHub issues and Jira tickets end-to-end: understanding the codebase, writing code, running tests in sandboxed Docker containers, and opening pull requests.',
    problem:
      'Software engineering agents need reliable code understanding, safe execution, and integration with the ticket workflows engineers already use — without coupling tightly to a single LLM provider.',
    solution:
      'A ReAct loop built from scratch (no LangChain or similar framework) drives 10 tools: RAG code search backed by ChromaDB with Python AST chunking, sandboxed Docker code execution with resource limits, file manipulation, test runners, and GitHub and Jira API integration. GitHub and Jira webhooks trigger job intake; Redis/arq queues execution; Socket.IO streams progress. Multi-provider LLM failover avoids single-vendor lock-in.',
    architecture: [
      'GitHub Issues / Jira webhooks → job intake → Redis/arq queue',
      'ReAct agent loop → 10 tools (search, execute, write, test, PR)',
      'RAG: Python AST chunking → ChromaDB vector search',
      'Sandboxed Docker containers → resource-limited code execution',
    ],
    decisions: [
      'Build the ReAct loop without an agent framework to keep the control flow explicit and testable.',
      'Use Python AST chunking for code indexing so that function and class boundaries are preserved in retrieval.',
      'Run all generated code in resource-limited Docker containers so agent errors cannot affect the host.',
      'Multi-provider LLM failover at the inference layer so a single-provider outage does not halt the pipeline.',
      'Socket.IO streaming gives callers live progress without polling.',
    ],
    tradeoff:
      'Building the agent loop from scratch requires more code than using a framework but yields full control over retry logic, tool dispatch, and error surfaces. Docker cold-start adds latency to execution tasks.',
    result:
      'The repository includes the ReAct engine, all 10 tools, RAG indexing pipeline, Docker execution harness, webhook handlers, job queue configuration, and CI test suite. Claims about autonomy are limited to what the repository source demonstrates.',
    stack: [
      'Python',
      'FastAPI',
      'React',
      'PostgreSQL',
      'Redis',
      'ChromaDB',
      'Docker',
      'Socket.IO',
      'GitHub Actions',
    ],
    repository: 'https://github.com/Gaurav598/NeuraSWE',
  },
  {
    id: 'codecollab',
    number: '02',
    name: 'CodeCollab',
    eyebrow: 'Real-time collaborative development environment',
    summary:
      'A multi-user coding workspace where Monaco Editor, Yjs CRDT synchronization, WebRTC audio/video, and a Spring Boot backend converge into a single collaborative environment.',
    problem:
      'Shared coding sessions need sub-100ms edit propagation without routing every keystroke through the application API. Coupling the synchronization channel to the room and file management API creates head-of-line blocking and mixed failure domains.',
    solution:
      'A Next.js workspace binds Monaco to Yjs (CRDT). A dedicated Node.js WebSocket service handles document updates and broadcasts via Redis Pub/Sub. Spring Boot owns rooms, file storage, chat via STOMP, OAuth2 authentication, JWT sessions, and role-based room authorization. WebRTC adds audio, video, and screen sharing. Multi-language code execution runs in isolated containers.',
    architecture: [
      'Monaco + Yjs CRDT in browser → dedicated Node.js sync service',
      'Node.js sync service ↔ Redis Pub/Sub (multi-instance fan-out)',
      'Spring Boot API: rooms, files, STOMP chat, OAuth2/JWT, RBAC',
      'WebRTC: audio, video, screen sharing',
    ],
    decisions: [
      'Separate the high-frequency edit channel from the application API — the sync service has a single responsibility and can be scaled independently.',
      'Use Yjs CRDT for concurrent edits; CRDT semantics eliminate merge conflicts without operational transformation.',
      'Redis Pub/Sub between sync instances enables horizontal scaling without shared in-memory state.',
      'Persist file content through the Spring Boot API, not through the sync service, so durability stays in the domain model.',
    ],
    tradeoff:
      'The architectural split between the sync service and Spring Boot API adds coordination overhead. File persistence is eventually consistent with live edits; the repository includes a persistence path but no measured latency claim is made here.',
    result:
      'The source includes a working Monaco + Yjs binding, remote cursors, presence indicators, room and file APIs, STOMP chat, WebRTC signalling, execution integration, and Docker-based deployment configuration.',
    stack: [
      'Next.js',
      'TypeScript',
      'Monaco',
      'Yjs',
      'Node.js',
      'Spring Boot',
      'Redis',
      'MongoDB',
      'WebRTC',
      'OAuth2',
    ],
    repository: 'https://github.com/Gaurav598/CodeCollab',
  },
  {
    id: 'flashflow',
    number: '03',
    name: 'FlashFlow',
    eyebrow: 'Distributed flash sale & inventory reservation engine',
    summary:
      'A four-microservice backend that makes stock contention, service boundaries, and failure modes visible — with Kubernetes manifests, NGINX Ingress, CPU-based HPA, and a k6 load-test scenario included.',
    problem:
      'Many concurrent requests race for a small stock pool while authentication and order writes place different demands on the system. A monolith cannot isolate these failure domains or scale individual bottlenecks independently.',
    solution:
      'An Express API Gateway validates JWTs and routes to Auth, Order, and Stock services. Redis holds the inventory counter; MongoDB stores users and orders. The Order service calls the Stock service, which uses Redis DECRBY for the reservation step and compensates a negative result. NGINX Ingress and CPU-based HPA handle routing and autoscaling. k6 load-test scripts exercise the reservation path.',
    architecture: [
      'NGINX Ingress → API Gateway (JWT verification) → Auth / Order',
      'Order → Stock service → Redis DECRBY reservation',
      'Order → MongoDB persistence (orders and users)',
      'Kubernetes: HPA, Ingress, Deployment manifests; k6 load tests',
    ],
    decisions: [
      'Isolate authentication, stock, and order workloads into separate services so each can scale and fail independently.',
      'Verify JWTs at the gateway layer so downstream services do not duplicate auth logic.',
      'Use Redis DECRBY for the inventory counter — atomicity within a single DECRBY call, compensate a negative result.',
      'Keep order persistence in its own MongoDB-backed service so the stock service has no write coupling.',
    ],
    tradeoff:
      'The stock decrement and order write are two operations in separate services, not a distributed transaction. A reservation can succeed while the MongoDB order write fails — the repository documents this limitation explicitly. No zero-overselling guarantee or specific throughput figure is claimed without a reproducible run.',
    result:
      'The source includes four services, gateway-level JWT verification, stock reservation code, container and Kubernetes definitions, NGINX Ingress configuration, CPU-based HPA, and k6 load-test scripts. The design intent is to make distributed system trade-offs visible and discussable.',
    stack: ['Node.js', 'Express', 'Redis', 'MongoDB', 'Docker', 'Kubernetes', 'NGINX', 'k6'],
    repository: 'https://github.com/Gaurav598/FlashFlow-Distributed-Engine',
  },
  {
    id: 'flux',
    number: '04',
    name: 'Flux',
    eyebrow: 'Ride-hailing app & real-time bidding platform',
    summary:
      'A production-structured ride-hailing platform with separate passenger and rider React Native apps, a Spring Boot backend with ~60 endpoints, transactional bid acceptance, real-time event delivery, and a CI/CD pipeline to AWS EC2.',
    problem:
      'A ride marketplace has to coordinate passenger requests, available riders, competing bids, concurrent bid acceptance, and a changing ride state — while delivering real-time events across mobile clients with different roles.',
    solution:
      'Spring Boot and PostgreSQL back approximately 60 endpoints across three roles (passenger, rider, admin). Firebase phone OTP handles authentication; JWT access and refresh tokens secure subsequent requests. Transactional bid acceptance uses PESSIMISTIC_WRITE row locking so competing acceptances serialize correctly. STOMP and Firebase Cloud Messaging deliver real-time events. Separate passenger and rider React Native apps and a React admin dashboard cover the full client surface. GitHub Actions builds Docker images, pushes to Docker Hub, and deploys to AWS EC2.',
    architecture: [
      'Passenger / Rider React Native apps + React admin → Spring Boot API',
      'Spring Boot: ~60 endpoints, 3 roles, JWT + Firebase OTP auth',
      'PESSIMISTIC_WRITE locking → serialized bid acceptance',
      'STOMP + Firebase Cloud Messaging → real-time events',
      'GitHub Actions → Docker Hub → AWS EC2',
    ],
    decisions: [
      'Keep passenger and rider journeys in separate mobile apps to avoid role-switching complexity.',
      'Use PESSIMISTIC_WRITE row locking for bid acceptance so competing acceptances are serialized at the database level.',
      'Separate authentication (Firebase OTP + JWT) from business logic so the auth flow is replaceable.',
      'Use STOMP for in-app real-time events and FCM for background notifications to cover both app states.',
    ],
    tradeoff:
      'This is a demo/learning project. The repository documents production gaps — it does not claim live payments, production-scale deployment, or commercial operation. PESSIMISTIC_WRITE locking is correct for the concurrency constraint but limits throughput under high contention.',
    result:
      'The repository contains passenger and rider screens, Spring Boot API source, bid acceptance logic with locking, STOMP event handling, FCM integration, location and map endpoints, the admin dashboard, and the GitHub Actions deployment pipeline. No production uptime or revenue claim is made.',
    stack: [
      'Spring Boot',
      'PostgreSQL',
      'React Native',
      'React',
      'Firebase',
      'Docker',
      'GitHub Actions',
      'AWS EC2',
    ],
    repository: 'https://github.com/Gaurav598/Flux',
    note: 'Demo / learning project',
  },
];

// Checked against the linked GitHub pull requests. Status accurate as of November 2026.
export const contributions: Contribution[] = [
  {
    repo: 'kubernetes/client-go',
    number: 143105,
    status: 'Merged',
    lang: 'Go',
    title: 'Fix nil dial-function handling in connection rotation',
    detail:
      'Fixed nil dial-function handling using the documented net.Dialer.DialContext fallback. Added regression tests covering both constructors and race testing to prevent silent nil-pointer paths.',
    url: 'https://github.com/kubernetes/kubernetes/pull/143105',
  },
  {
    repo: 'kubernetes-sigs/dra-example-driver',
    number: 259,
    status: 'Merged',
    lang: 'Go',
    title: 'Restore CDI specs after node or runtime restart',
    detail:
      'Fixed recovery of prepared DRA claims after node or runtime restarts by recreating missing CDI specification files. Added tests covering missing files, idempotent restore, and recreation failure.',
    url: 'https://github.com/kubernetes-sigs/dra-example-driver/pull/259',
  },
  {
    repo: 'apache/beam',
    number: 40496,
    status: 'Merged',
    lang: 'Python',
    title: 'Add opt-in lazy side-input streaming for Dask runner',
    detail:
      'Added opt-in lazy side-input streaming to the Dask runner. Bounded memory consumption by partition size and avoided worker deadlocks using worker_client(). Added nine unit and distributed LocalCluster tests.',
    url: 'https://github.com/apache/beam/pull/40496',
  },
  {
    repo: 'apache/beam',
    number: 40625,
    status: 'Merged',
    lang: 'Python',
    title: 'Fix string annotations and forward references in typehints',
    detail:
      'Fixed string annotations and forward references in the Python typehints module using typing.get_type_hints, resolving failures where annotations were evaluated before referenced types were defined.',
    url: 'https://github.com/apache/beam/pull/40625',
  },
  {
    repo: 'apache/beam',
    number: 40631,
    status: 'Merged',
    lang: 'Python',
    title: 'Fix quota-retry crash on non-JSON 403 in BigQuery I/O',
    detail:
      'Fixed quota-retry handling where non-JSON 403 responses could cause JSONDecodeError to mask the original HttpError, preventing silent swallowing of the root cause in BigQuery I/O retry utilities.',
    url: 'https://github.com/apache/beam/pull/40631',
  },
  {
    repo: 'kubernetes/perf-tests',
    number: 4182,
    status: 'Merged',
    lang: 'Go',
    title: 'Fix rollout status reporting during rolling updates',
    detail:
      'Clarified pod startup reporting when a rolling update temporarily exceeds desired replicas, with regression coverage.',
    url: 'https://github.com/kubernetes/perf-tests/pull/4182',
  },
  {
    repo: 'kubernetes/website',
    number: 57960,
    status: 'Merged',
    lang: 'Docs',
    title: 'Clarify reservedSystemCPUs and cgroup configuration',
    detail:
      'Corrected documentation for reservedSystemCPUs and incompatible cgroup settings to prevent misconfiguration.',
    url: 'https://github.com/kubernetes/website/pull/57960',
  },
];

export const experience: Experience[] = [
  {
    role: 'Software Engineer Intern',
    company: 'FamilyShell LLP',
    period: 'May 2026 – August 2026',
    location: 'Remote',
    highlights: [
      'Redesigned and built the Family Tree module end-to-end across Flutter, web UI, FastAPI, and MongoDB.',
      'Replaced a global shared graph with isolated per-tree workspaces and embedded adjacency lists, eliminating cross-tree data leakage.',
      'Reduced tree-load latency from 4.7 s to approximately 1 s (~79% reduction) by restructuring the data model and query path.',
      'Implemented MongoDB transactions for bilateral relationship synchronization, ensuring both sides of a relationship are written atomically.',
      'Added optimistic concurrency control using versioned documents to prevent lost-update conflicts under concurrent edits.',
      'Built validation for cycle detection, age-gap constraints, and marriage-rule enforcement at the service layer.',
      'Implemented three Redis cache layers, owner/viewer RBAC, invitation flows, real-time WebSocket events, and Flutter client views.',
    ],
    stack: ['Flutter', 'FastAPI', 'MongoDB', 'Redis', 'WebSockets', 'Python'],
  },
];

export const toolkit = [
  { title: 'Languages', items: ['Java', 'Python', 'JavaScript', 'Go', 'C++', 'SQL'] },
  {
    title: 'Backend & Systems',
    items: [
      'Spring Boot',
      'FastAPI',
      'Node.js',
      'Express.js',
      'Microservices',
      'Distributed Systems',
      'WebSockets',
      'OAuth2',
    ],
  },
  {
    title: 'Frontend & Databases',
    items: [
      'React',
      'Next.js',
      'React Native',
      'Flutter',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'ChromaDB',
    ],
  },
  {
    title: 'Cloud & DevOps',
    items: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Nginx', 'k6'],
  },
  {
    title: 'AI & Fundamentals',
    items: [
      'LLM Agents',
      'ReAct',
      'RAG',
      'Generative AI',
      'Data Structures & Algorithms',
      'OOP',
      'System Design',
    ],
  },
];

export const achievements: Achievement[] = [
  {
    title: 'LeetCode Knight',
    detail: 'Contest rating 1939 · 600+ problems solved',
    url: 'https://leetcode.com/u/gaurav598/',
  },
  {
    title: 'AWS Academy Cloud Foundations',
    detail: 'Amazon Web Services · 2024',
  },
  {
    title: 'Oracle Cloud Infrastructure Certified Architect Associate',
    detail: 'Oracle · OCI Architecture',
  },
  {
    title: 'Oracle OCI AI Foundations Associate',
    detail: 'Oracle · AI on OCI',
  },
  {
    title: 'Agentic AI Certified Foundations Associate',
    detail: 'Agentic AI · Foundations',
  },
];
