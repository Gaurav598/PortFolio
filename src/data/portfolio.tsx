// ═══════════════════════════════════════════
// Portfolio Data — Single Source of Truth
// All personal data from P1/P2. Never from P3.
// ═══════════════════════════════════════════

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  featured: boolean;
  category: string;
}

export interface TechCategory {
  title: string;
  items: string[];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail';
}

// ─── Identity ───────────────────────────────

export const PERSONAL = {
  name: 'Gaurav',
  tagline: 'building the future, one commit at a time.',
  description:
    'I craft cinematic web experiences, scalable backends, and AI-powered products. MERN · Spring Boot · React Native · GenAI · Cloud. Obsessed with shipping work that feels next-generation.',
  email: 'gaurav598895@gmail.com',
  location: 'India',
  avatar: '/profile_portrait.jpg',
  resumeUrl: '/resume.pdf',
} as const;

// ─── Roles (typewriter) ─────────────────────

export const ROLES = [
  'Full Stack Developer',
  'AI Engineer',
  'MERN + Spring Boot',
  'Cloud & DevOps Learner',
  'React Native Developer',
  'GenAI Explorer',
  'Creative Technologist',
  'Problem Solver',
];

// ─── Social Links ───────────────────────────

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', href: 'https://github.com/Gaurav598', icon: 'github' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/gaurav-thakur-193619321/', icon: 'linkedin' },
  { name: 'Email', href: 'mailto:gaurav598895@gmail.com', icon: 'mail' },
];

// ─── Stats ──────────────────────────────────

export const STATS: Stat[] = [
  { value: 435, suffix: '+', label: 'DSA Problems Solved' },
  { value: 20, suffix: '+', label: 'Projects Built' },
  { value: 25, suffix: '+', label: 'Technologies Learned' },
  { value: 2500, suffix: '+', label: 'Hours Invested' },
];

// ─── Technologies (from P1 + P2 merged) ────

export const TECH_CATEGORIES: TechCategory[] = [
  {
    title: 'Languages',
    items: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Frontend',
    items: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML', 'CSS', 'Bootstrap'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'Spring Boot', 'FastAPI'],
  },
  {
    title: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'SQL', 'Redis'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'CI/CD'],
  },
  {
    title: 'AI / ML',
    items: ['NumPy', 'Pandas', 'Matplotlib', 'GenAI', 'LLM APIs'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Postman', 'Figma', 'Canva', 'Photoshop'],
  },
];

export const MARQUEE_TAGS = [
  'React', 'Next.js', 'TypeScript', 'Spring Boot', 'Node.js', 'MongoDB', 'PostgreSQL',
  'Docker', 'AWS', 'Kubernetes', 'GenAI', 'FastAPI', 'Tailwind', 'Redis', 'Framer Motion',
  'React Native', 'Express.js', 'Python', 'Java', 'Linux',
];

// ─── Projects (all 10 from P1, enriched with P2) ───

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Smart Contact Manager',
    description: 'Full-featured contact management with OAuth, search, cloud uploads, and advanced categorization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tags: ['Spring Boot', 'Java', 'MySQL', 'Thymeleaf'],
    github: 'https://github.com/Gaurav598',
    live: '#',
    featured: true,
    category: 'Full Stack',
  },
  {
    id: 2,
    title: 'AI Resume Analyzer',
    description: 'Upload your resume, get instant LLM-powered insights, scoring & rewrites using GenAI.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
    github: 'https://github.com/Gaurav598',
    live: '#',
    featured: true,
    category: 'MERN + GenAI',
  },
  {
    id: 3,
    title: 'Rapido-style Bike Booking',
    description: 'Real-time bike booking with driver matching, live GPS tracking & dynamic pricing.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    tags: ['React', 'Socket.io', 'Maps API', 'Express'],
    github: 'https://github.com/Gaurav598',
    live: '#',
    featured: false,
    category: 'MERN',
  },
  {
    id: 4,
    title: 'E-Commerce Mobile App',
    description: 'Cross-platform shopping app with cart, auth, and seamless Stripe checkout.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    tags: ['React Native', 'Redux', 'Stripe', 'Firebase'],
    github: 'https://github.com/Gaurav598',
    live: '#',
    featured: false,
    category: 'Mobile',
  },
  {
    id: 5,
    title: 'Study App + Video Calling',
    description: 'Live tutoring app with HD video calls, notes sharing, scheduling and collaborative whiteboard.',
    image: 'https://images.unsplash.com/photo-1606761568498-22fc33406da4?w=800&h=600&fit=crop',
    tags: ['React Native', 'WebRTC', 'Firebase', 'Canvas'],
    github: 'https://github.com/Gaurav598',
    live: '#',
    featured: true,
    category: 'Mobile',
  },
  {
    id: 6,
    title: 'Vehicle Booking Platform',
    description: 'Modern car rental platform with server components, edge-fast UX & booking system.',
    image: 'https://images.unsplash.com/photo-1449965408869-ebd3feece9b8?w=800&h=600&fit=crop',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/Gaurav598',
    live: '#',
    featured: false,
    category: 'Full Stack',
  },
  {
    id: 7,
    title: 'Reels App',
    description: 'TikTok-style short video feed with smooth scrolling, recording, filters & uploads.',
    image: 'https://images.unsplash.com/photo-1611162617474-35b969f08815?w=800&h=600&fit=crop',
    tags: ['React Native', 'FFmpeg', 'AWS S3', 'Redis'],
    github: 'https://github.com/Gaurav598',
    live: '#',
    featured: false,
    category: 'Mobile',
  },
  {
    id: 8,
    title: 'Job Portal Platform',
    description: 'Two-sided marketplace connecting candidates with recruiters at scale.',
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&h=600&fit=crop',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/Gaurav598',
    live: '#',
    featured: false,
    category: 'MERN',
  },
  {
    id: 9,
    title: 'Coding Collaborator',
    description: 'Real-time collaborative code editor with rooms, syntax highlighting & live cursors.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba670e2fd?w=800&h=600&fit=crop',
    tags: ['React', 'Socket.io', 'Monaco Editor', 'Docker'],
    github: 'https://github.com/Gaurav598',
    live: '#',
    featured: true,
    category: 'Realtime',
  },
  {
    id: 10,
    title: 'AI/ML Mini Projects',
    description: 'Collection of ML projects: image classification, sentiment analysis, recommendation systems.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    tags: ['Python', 'TensorFlow', 'Scikit-learn', 'NumPy'],
    github: 'https://github.com/Gaurav598',
    live: '#',
    featured: false,
    category: 'AI/ML',
  },
];

// ─── Journey Timeline (from P2) ─────────────

export const MILESTONES: Milestone[] = [
  {
    year: '2022',
    title: 'First Lines of Code',
    description: 'Started with C/C++, fell in love with logic, structures, and the craft of programming.',
    icon: '🚀',
  },
  {
    year: '2023',
    title: 'DSA Obsession',
    description: 'Locked in on Data Structures & Algorithms. Built strong fundamentals in DP, Linked Lists, Graphs.',
    icon: '🧩',
  },
  {
    year: '2024',
    title: 'Full Stack Era',
    description: 'Mastered the MERN stack, shipped real projects, started exploring Spring Boot & React Native.',
    icon: '💻',
  },
  {
    year: '2025',
    title: 'AI + Cloud',
    description: 'Dove into GenAI, LLM APIs, AWS, Docker, Kubernetes. Building intelligent, scalable systems.',
    icon: '🤖',
  },
  {
    year: '2026',
    title: 'Elite Engineer',
    description: 'Hardcore consistency, daily building, hackathons, and shipping work that goes viral.',
    icon: '✨',
  },
];

// ─── About Bio (from P2) ────────────────────

export const ABOUT_PARAGRAPHS = [
  <>I'm <span className="text-foreground font-semibold">Gaurav</span> — a Full Stack Developer and AI Engineer obsessed with shipping work that feels next-generation. I don't believe in shortcuts. I believe in <span className="text-gradient font-semibold">relentless, daily, deliberate practice.</span></>,
  <>Every day I'm pushing commits, solving DSA problems, breaking down distributed systems, and prototyping with LLMs. The MERN stack, Spring Boot, React Native, Cloud — they're not buzzwords on a CV. They're the tools I use to bring ideas to life.</>,
  <>I want to be in the top 1% of engineers — not because of titles, but because of <span className="font-serif italic text-foreground">craft</span>. I read source code for fun. I refactor things twice. I take ownership end-to-end.</>,
  <>If you're building something ambitious — an AI product, a SaaS, a startup that doesn't exist yet — let's talk. I move fast, I care deeply, and I never stop learning.</>,
];

// ─── Nav Items ──────────────────────────────

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];
