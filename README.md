# Gaurav Thakur — software engineering portfolio

A static React and TypeScript portfolio focused on backend systems, complete products, and Kubernetes open-source contributions.

## Run locally

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

The site uses Vite, React, Framer Motion, and handwritten CSS. All project, contribution, and toolkit copy is centralized in `src/data/portfolio.ts`. Visual system diagrams are in `src/components/SystemVisuals.tsx`. There is no backend, contact form, or client-side router.

## Content sources

- [GitHub profile README](https://github.com/Gaurav598/Gaurav598) for the stated student focus and self-reported practice counts.
- [CodeCollab](https://github.com/Gaurav598/CodeCollab) for Monaco/Yjs, its sync service, Spring Boot APIs, Redis, and MongoDB.
- [Flux](https://github.com/Gaurav598/Flux) for passenger/rider apps, bidding, ride lifecycle, PostgreSQL, and WebSocket messaging. Its Redis configuration is present, but the portfolio does not claim Redis-powered application behavior.
- [FlashFlow](https://github.com/Gaurav598/FlashFlow-Distributed-Engine) for the gateway, auth, order, and stock services, Redis counter, MongoDB, Docker, and Kubernetes manifests. The case study explicitly states the current reservation and persistence trade-offs.
- The six upstream pull requests linked in `src/data/portfolio.ts`; their statuses were checked on **9 October 2026**. Review them again when updating the site.
- Education, FamilyShell internship, certificate, recommendation letter, and LinkedIn profile were supplied directly by Gaurav on **9 October 2026**. No exact internship dates or outcome metrics are claimed.

No résumé file or preferred professional email was supplied. The old portfolio's `/resume.pdf` link pointed to a file that was not in the repository.

## Deployment

The site is published at [gaurav598.github.io/PortFolio](https://gaurav598.github.io/PortFolio/). GitHub Pages is enabled with GitHub Actions as its build source. The workflow builds and uploads a Pages artifact on pushes to `main`. It sets `GITHUB_PAGES=true`, which makes Vite emit the `/PortFolio/` base path.

For deployment on a root domain instead, build without `GITHUB_PAGES=true` and update the canonical URL and social metadata. The current metadata points to the verified GitHub Pages URL.
