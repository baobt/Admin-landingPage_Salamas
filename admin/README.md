# Salamass Admin Dashboard - React + Vite + Tailwind + Shadcn UI

## Quick Start

```bash
cd admin
npm install
npm run dev  # http://localhost:5174 (or check terminal)
```

## Build & Deploy

```bash
npm run build  # /dist
npm run preview
```

Deploy `dist/` to Vercel/Netlify subdomain (admin.salamass.com).

## Environment

Copy `.env.example` to `.env`:
```
VITE_API_URL=https://salamass.com/api/leads.php  # For lead data fetch
```

## Features
- Leads management table with filters, file uploads.
- Shadcn UI components.

## Backend Integration
Admin fetches leads from main site's PHP API (add /api/leads.php to return JSON leads from DB/email log).
