# Project Overview
Use this guide to build a web app that advertises my work in film, web development, podcast editing and more.

# Feature Requirements
- The main page of the website should be one long scrolling page that advertises my work in film, web development, podcast editing and more.
- There should be a contact form at the bottom of the page that allows users to contact me.
- The website will be hosted at geoffvrijmoet.com.
- The website will be deployed on Vercel.
- The website will have links to my other subdomains (podcasts.geoffvrijmoet.com, dev.geoffvrijmoet.com, etc.).
- The website should have lightning-fast performance.
- The entire site should be extremely mobile-friendly.
- We will use Next.js, Shadcn, Lucid, Tailwind CSS, and potentially Clerk and MongoDB (if necessary) to build the app.

# Relevant Docs
This is the reference documentation for Clerk: https://clerk.com/docs/references/nextjs/

# Current File Structure
GEOFF-VRIJMOET-COM/
├── .next/
├── app/
│   ├── fonts/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── textarea.tsx
├── guidelines/
│   └── feature-doc-guideline.md
├── lib/
├── node_modules/
├── .cursorrules
├── .env.local
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Rules
- All new components should go in /components and be named like example-component.tsx unless otherwise specified.
- All new pages go in /app.