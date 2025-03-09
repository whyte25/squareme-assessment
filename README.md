# Frontend Developer Assessment - Squareme

A technical assessment I implemented for the Frontend Developer position at Squareme, focusing on building the dashboard using Next.js.

## Tech Stack

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tanstack Query](https://tanstack.com/query/latest)
- [Tanstack Table](https://tanstack.com/table/v8)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Reusables](https://reusables.vercel.app/) - [Toast](https://reusables.vercel.app/docs/components/notify)
- [Framer Motion](https://www.framer.com/motion/)
- [Vitest](https://vitest.dev/)
- [Nuqs](https://nuqs.47ng.com/)

## Features

- Mock Authentication with protected routes
- dashboard page with data visualization
- Transaction management and filtering
- Responsive design with mobile-first approach
- Unit testing with Vitest and React Testing Library
- State management with Tanstack Query
- Modern UI components with Shadcn UI

## Project Structure

```
├── app/                # Next.js app directory
│   ├── (main)/         # Main layout routes
│   ├── api/            # API routes
│   └── login/          # Authentication pages
├── assets/             # Static assets
├── components/         # React components
│   ├── ui/             # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── transactions/   # Transaction related components
│   └── skeleton/       # Loading skeleton components
├── constants/          # Configuration and constants
├── data/               # Mock data
├── hooks/              # Custom React hooks
│   ├── mutations/      # Tanstack Query mutations
│   └── queries/        # Tanstack Query queries
├── lib/                # Utility functions
├── services/           # API services
│   ├── api/            # API implementations
│   └── endpoints/      # API endpoints
├── __tests__/         # Unit tests
└── middleware/        # Authentication middleware
```

## Setup

### Prerequisites

- Node.js 18+
- Package manager (npm/yarn/pnpm/bun)

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Environment Variables

Required environment variable ias listed in `.env.example`.

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Access the application at [http://localhost:3000](http://localhost:3000)

### Testing

```bash
npm test
# or
yarn test
# or
pnpm test
# or
bun run test
```

### Deployment

Deployed to Netlify: [https://fas-Squareme-fe-assessment.netlify.app](https://fas-squareme-fe-assessment.netlify.app)

## Note

This is a technical assessment project for Squareme. It must not be copied or used until my assessment has been reviewed. I will update the README once that is done.
