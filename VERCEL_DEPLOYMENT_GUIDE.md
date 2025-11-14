# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier works)
- Your Fly.io backend URL: `https://my-portfolio-dawn-glade-2810.fly.dev`

## Option 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Push to GitHub
```bash
cd /Users/sashabemotoff/Coding/MYPORTFOLIO/MY_PORTFOLIO
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Import to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Set **Root Directory** to: `frontend`
4. Framework Preset: **Next.js** (should auto-detect)
5. Click **Environment Variables** and add:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://my-portfolio-dawn-glade-2810.fly.dev
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=<your-value>
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=<your-value>
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=<your-value>
   NEXT_PUBLIC_GTM=<your-value>
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your-value>
   NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=<your-value>
   ```
6. Click **Deploy**

### Step 3: Update Backend CORS
After deployment, update your Fly.io backend CORS settings:

```bash
cd /Users/sashabemotoff/Coding/MYPORTFOLIO/MY_PORTFOLIO/backend
flyctl secrets set FRONTEND_URL=https://your-vercel-domain.vercel.app
```

---

## Option 2: Deploy via CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Configure Environment
Edit `frontend/.env`:
```bash
NEXT_PUBLIC_STRAPI_URL=https://my-portfolio-dawn-glade-2810.fly.dev
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
# Add other variables...
```

### Step 4: Deploy
```bash
cd frontend
./deploy-vercel.sh
```

Or manually:
```bash
cd frontend
vercel          # Preview deployment
vercel --prod   # Production deployment
```

---

## Important Configuration

### Update vercel.json
The `vercel.json` should include NEXT_PUBLIC_STRAPI_URL:
```json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_STRAPI_URL": "@next_public_strapi_url"
  }
}
```

### Set Environment Variables in Vercel Dashboard
1. Go to Project Settings → Environment Variables
2. Add all NEXT_PUBLIC_* variables
3. Make sure they're available for **Production**, **Preview**, and **Development**

---

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Verify NEXT_PUBLIC_STRAPI_URL is correct
- Check build logs in Vercel dashboard

### CORS Errors
- Update FRONTEND_URL in Fly.io backend
- Check `config/middlewares.js` in backend for CORS settings

### API Not Working
- Verify backend is running: https://my-portfolio-dawn-glade-2810.fly.dev
- Check NEXT_PUBLIC_STRAPI_URL in Vercel env vars
- Look at browser console for errors

---

## Post-Deployment

1. **Test the site**: Visit your Vercel URL
2. **Update backend**: Set FRONTEND_URL secret in Fly.io
3. **Custom domain** (optional): Add in Vercel project settings
4. **Set up Git integration**: Auto-deploy on push

---

## Quick Deploy Command

```bash
cd /Users/sashabemotoff/Coding/MYPORTFOLIO/MY_PORTFOLIO/frontend
./deploy-vercel.sh
```
