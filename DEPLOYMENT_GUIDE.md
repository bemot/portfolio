# Deployment Guide

This guide will help you deploy your portfolio application with:
- **Frontend (Next.js)** on Vercel
- **Backend (Strapi)** on Fly.io

## Prerequisites

1. Install required CLI tools:
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Install Fly.io CLI
   curl -L https://fly.io/install.sh | sh
   ```

2. Create accounts:
   - Vercel: https://vercel.com/signup
   - Fly.io: https://fly.io/app/sign-up

## Backend Deployment (Fly.io + Strapi)

### Step 1: Configure Fly.io App

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Login to Fly.io:
   ```bash
   flyctl auth login
   ```

3. Launch your app (this will create the app):
   ```bash
   flyctl launch
   ```
   - Choose a unique app name (update `fly.toml` with this name)
   - Select a region close to your users
   - Don't deploy yet when prompted

4. Create a persistent volume for your database:
   ```bash
   flyctl volumes create strapi_data --region iad --size 1
   ```

### Step 2: Set Environment Variables

Set all required environment variables on Fly.io:

```bash
flyctl secrets set \
  APP_KEYS="$(openssl rand -base64 32),$(openssl rand -base64 32)" \
  API_TOKEN_SALT="$(openssl rand -base64 32)" \
  ADMIN_JWT_SECRET="$(openssl rand -base64 32)" \
  TRANSFER_TOKEN_SALT="$(openssl rand -base64 32)" \
  JWT_SECRET="$(openssl rand -base64 32)" \
  NODE_ENV="production"
```

### Step 3: Optional - Configure PostgreSQL Database

For production, it's recommended to use PostgreSQL instead of SQLite:

```bash
# Create a Postgres database
flyctl postgres create

# Attach it to your app
flyctl postgres attach <postgres-app-name>
```

If using PostgreSQL, update your `.env` or set secrets:
```bash
flyctl secrets set DATABASE_CLIENT=postgres
```

### Step 4: Deploy

```bash
flyctl deploy
```

Your Strapi backend will be available at: `https://your-app-name.fly.dev`

### Step 5: Configure Strapi Admin

1. Visit `https://your-app-name.fly.dev/admin`
2. Create your admin account
3. Configure your content types and data

## Frontend Deployment (Vercel + Next.js)

### Step 1: Update Backend URL

Update `frontend/next.config.js` to include your Fly.io backend domain:

```javascript
images: {
  domains: [
    // ... existing domains
    "your-app-name.fly.dev",  // Add your Fly.io domain
  ],
},
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the frontend directory or set them in Vercel UI:

```bash
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_STRAPI_URL=https://your-app-name.fly.dev
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_GTM=your_gtm_id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

### Step 3: Deploy to Vercel

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Connect to your Git repository (recommended for auto-deployments)

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Step 4: Set Environment Variables in Vercel

You can also set environment variables via Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all the `NEXT_PUBLIC_*` variables

## Post-Deployment Steps

### 1. Configure CORS in Strapi

Update `backend/config/middlewares.js` to allow your Vercel domain:

```javascript
module.exports = [
  // ... other middlewares
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:3000',
        'https://your-domain.vercel.app'
      ],
    },
  },
];
```

Redeploy backend:
```bash
cd backend
flyctl deploy
```

### 2. Update Strapi Settings

In Strapi admin panel (`https://your-app-name.fly.dev/admin`):
1. Go to Settings → API Tokens
2. Create tokens if needed for frontend to access Strapi
3. Configure public permissions for content types

### 3. Custom Domain (Optional)

**For Vercel:**
1. Go to your project settings
2. Add your custom domain
3. Update DNS records as instructed

**For Fly.io:**
1. Add custom domain:
   ```bash
   flyctl certs create your-backend-domain.com
   ```
2. Update DNS records as instructed

## Continuous Deployment

### Vercel (Auto-deploy on Git push)
Connect your GitHub/GitLab repository to Vercel for automatic deployments on push.

### Fly.io (GitHub Actions)
Create `.github/workflows/fly-deploy.yml`:

```yaml
name: Deploy to Fly.io
on:
  push:
    branches:
      - main
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        working-directory: ./backend
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

Add `FLY_API_TOKEN` to your GitHub repository secrets.

## Monitoring and Logs

### Fly.io Logs
```bash
flyctl logs
```

### Vercel Logs
View logs in Vercel dashboard or use:
```bash
vercel logs
```

## Troubleshooting

### Backend Issues
- Check logs: `flyctl logs`
- Verify environment variables: `flyctl secrets list`
- Check app status: `flyctl status`

### Frontend Issues
- Check build logs in Vercel dashboard
- Verify environment variables in Vercel settings
- Test API connections to backend

### Database Issues
- For SQLite: Ensure volume is properly mounted
- For PostgreSQL: Check connection settings and ensure database is attached

## Scaling

### Fly.io
```bash
# Scale up
flyctl scale count 2

# Scale memory
flyctl scale memory 2048
```

### Vercel
Vercel scales automatically based on your plan.

## Costs

- **Vercel**: Free tier available, paid plans start at $20/month
- **Fly.io**: Free tier includes 3 shared-cpu VMs with 256MB RAM, paid plans based on resources used

## Support

- Vercel Docs: https://vercel.com/docs
- Fly.io Docs: https://fly.io/docs/
- Strapi Docs: https://docs.strapi.io/
