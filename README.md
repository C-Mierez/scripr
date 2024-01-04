# Scripr

A side-project to learn as many different technologies as possible as well as potentially satisfying a need for a tool I would use on my day to day life.

## What is Scripr?

Scripr is a finance management application focused on not only managing may different kinds of financial movements, but also provide the user with the ability to link those records together, regardless of their nature. The purpose of Scripr is to provide rich analytics on top of the user's records. 

## Technical

This is a monolithic project built primarily within Next.js 14, though extensions may come in the future.

### Technologies used:
#### Backend
- Next.js 14
  - Server Actions
  - Client and Server Components
  - App Router
  - Middleware
- TypeScript (ofc)
- Drizzle ORM
  - Very new library that offers the least abstraction from the database, allowing for more control over the queries.
- Auth.js v5 (NextAuth)
  - Highly experimental and in-development.
- [Neon](https://neon.tech/) 
  - Serverless PostgresSQL provider
  - (Originally using [CockroachDB](https://www.cockroachlabs.com/) but migrated to Neon for better tooling with Auth.js v5)
- tRPC
  - Procedure definitions to be run on the server, with great client-side hooks to call them as well as full type-safety and protection.
  - Primary server interactions. Server Actions are used for simpler tasks.
- Resend
  - Email provider.

#### Frontend
- zod
  - Schema creation and validation, primarily for client-side though some server-side use exists as well. 
- react-hook-form
  - Most seamless form library with great support for zod
- Framer Motion
  - Scroll-triggered Animations
  - Scroll-driven Animations
  - Layout Animations
- SASS
  - Primary source of styling and simple animations
- TailwindCSS
  - Minimal use, and dependency for [shadcn/ui](https://ui.shadcn.com/)
- Studio-Frieght's [Lenis](https://github.com/studio-freight/lenis)
- [shadcn/ui](https://ui.shadcn.com/)
  - Popular library with reusable and editable components
- Next-Themes

### Key Milestones so far:
- Session management using Auth.js v5. Built upon the current authentication system, the app counts with:
  - [x] **Middleware**-protected routing **server-side**.
    - Public and Protected routes.
    - Redirects to login page when not authenticated.
    - Redirects to dashboard when authenticated.
  - [x] Access to user session and data on the client-side.

- Full-fledged authentication system using Auth.js v5. It includes:
  - [x] SignIn / LogIn / LogOut functionality
    - Using OAuth providers. (Google, Github)
    - Using self-managed credentials. (Email, Password)
  - [x] Email verification.
    - Using Resend as email provider.
    - OAuth users do not require email verification.
      - Event-driven verification of OAuth users after signing up.
  - [ ] Password Reset.
  - [x] Input validation, both on client and server.
  - [x] Error handling, including server-side errors and Auth.js-specific behaviour.  

- Designed and implemented an extensive landing page, making use of many different animations and transitions, applied Framer Motion scroll animations and made sure the page was responsive.