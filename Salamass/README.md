# Salamass Landing Page - React + Vite + Tailwind + PHP Backend

## Quick Start (Development)

```bash
cd Salamass
npm install
npm run dev  # http://localhost:5173
```

## Build for Production

```bash
npm run build  # Outputs to /dist
npm run preview  # Local preview
```

## Deployment Guide

### 1. Frontend (Static Hosting - Netlify/Vercel recommended)
- Build: `npm run build`
- Deploy `dist/` folder.
- Custom domain: Configure DNS.

### 2. Backend (PHP - Shared Hosting like Hostinger, InfinityFree)
- Upload `public/api.php` and `public/send_mail.php` to server root or /api/.
- Update CORS in api.php for production domain.
- Enable PHP mail or use SMTP.

### 3. Environment Variables
Copy `.env.example` to `.env` (git ignore it):
```
VITE_API_URL=https://yourdomain.com/api.php
SMTP_HOST=smtp.gmail.com
...
```

### 4. Admin Dashboard
See `../admin/README.md`

### 5. Update PHP for SMTP (Production)
Install PHPMailer via Composer (if supported) or use native:
See updated `public/send_mail.php`.

### Common Issues
- PHP mail fails: Switch to SMTP.
- CORS: Update allowed origins in api.php.

