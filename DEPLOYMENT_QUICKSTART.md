# Quick Deployment Instructions

## 🚀 Quick Start

### Option 1: Use the Deployment Script (Easiest)
```bash
./deploy.sh
```

### Option 2: Manual Deployment

#### Backend (Fly.io)
```bash
cd backend
flyctl auth login
flyctl launch
flyctl secrets set APP_KEYS="$(openssl rand -base64 32),$(openssl rand -base64 32)" \
  API_TOKEN_SALT="$(openssl rand -base64 32)" \
  ADMIN_JWT_SECRET="$(openssl rand -base64 32)" \
  TRANSFER_TOKEN_SALT="$(openssl rand -base64 32)" \
  JWT_SECRET="$(openssl rand -base64 32)" \
  NODE_ENV="production"
flyctl deploy
```

#### Frontend (Vercel)
```bash
cd frontend
vercel login
vercel
```

## 📚 Full Documentation
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions.

## 📝 Files Created
- `backend/Dockerfile` - Docker configuration for Strapi
- `backend/fly.toml` - Fly.io configuration
- `backend/.dockerignore` - Docker ignore file
- `frontend/vercel.json` - Vercel configuration
- `deploy.sh` - Interactive deployment script
- `.github/workflows/deploy-backend.yml` - CI/CD for backend
- `DEPLOYMENT_GUIDE.md` - Complete deployment guide

## ⚙️ Important Configuration Updates
- Updated `backend/config/middlewares.js` with CORS configuration
- Updated `backend/config/server.js` with public URL support
- Updated environment variable examples in both frontend and backend

## 🔑 Required Environment Variables

### Backend (Fly.io Secrets)
- `APP_KEYS` (2 random keys)
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`
- `FRONTEND_URL` (your Vercel URL)
- `PUBLIC_URL` (your Fly.io URL)

### Frontend (Vercel Environment Variables)
- `NEXT_PUBLIC_STRAPI_URL` (your Fly.io backend URL)
- `NEXT_PUBLIC_APP_URL` (your Vercel URL)
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- `NEXT_PUBLIC_GTM`
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- `NEXT_PUBLIC_RECAPTCHA_SECRET_KEY`

## 🔄 Continuous Deployment

### Frontend (Vercel)
Connect your Git repository to Vercel for automatic deployments on push.

### Backend (Fly.io)
1. Get your Fly.io API token: `flyctl auth token`
2. Add `FLY_API_TOKEN` to GitHub Secrets
3. Push to main branch - backend will auto-deploy via GitHub Actions

## 💰 Estimated Costs
- **Vercel**: Free tier available (Hobby plan)
- **Fly.io**: Free tier includes 3 shared-cpu VMs with 256MB RAM

## 🆘 Need Help?
Check the [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for troubleshooting and detailed instructions.
