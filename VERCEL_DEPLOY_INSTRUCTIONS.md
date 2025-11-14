# Deploy to Vercel - Step by Step

## Your Repository: portfolio (on GitHub)

## 🚀 Quick Deploy Steps

### 1. Go to Vercel
Visit: **https://vercel.com/new**

### 2. Import Your Repository
- Click "Import Git Repository"
- Find and select: **portfolio**
- Click "Import"

### 3. Configure Project Settings

**Root Directory:** `frontend`

**Framework Preset:** Next.js (should auto-detect)

**Build Command:** `npm run build` (default, leave as is)

**Output Directory:** `.next` (default, leave as is)

### 4. Add Environment Variables

Click "Environment Variables" and add these one by one:

```
NEXT_PUBLIC_STRAPI_API_URL
https://my-portfolio-dawn-glade-2810.fly.dev

NEXT_PUBLIC_IMAGE_URL
https://my-portfolio-dawn-glade-2810.fly.dev

NEXT_PUBLIC_STRAPI_API_TOKEN
60f9b741330e3db9ab3daca8a1ed7b2655074ab70ad45c4294ff0f84e0e553be195e64b82e908ac5eba345a31c0e16a3557de19e7d7d1957bf56c84805bea9312d57f69381f9dbb494a8532800305164ed9cca7df96686b7c288d6740e440d5a8cdf10257de1d8f36e5f519e10e02070915873ae37cccdc0a5cff0580ecf17f7

NEXT_PUBLIC_PAGE_LIMIT
97fa5d804a0ecb874b956e84411843e0e9b8b2f5a7d54b0d43039706abacf481f1ccc3273b80f70bb3eab60d54b3749fc86826402a2ce43536260ed9e24d4a98eadc48598fa12aa5e2f8c1a5e75e598254460e86780af43341f44070cef7f0292653e908ee7d8cc816b6ce7113158c4f651ff059d57c42a7889ec9959ae1a9be

NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN
4bee1310e1cf9086ae9f46cf52a00c4683d330950f405ae050f5f70d6f55ce1bdaf8446ff8c1719c9ab385027d6632bb79ea501491ca3b6276c86acd8b904750c0e8ed9036068df18dcbc93f1c3b6e266a5b41eb8754ef2d837538f00ce8a2885ef5d317c70c0ea6f9edcabccaa8479d6231cf144288a108d47d5618345495b4
```

**Optional (if you have values):**
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID
(your value)

NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
(your value)

NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
(your value)

NEXT_PUBLIC_GTM
(your value)

NEXT_PUBLIC_RECAPTCHA_SITE_KEY
(your value)

NEXT_PUBLIC_RECAPTCHA_SECRET_KEY
(your value)

NEXT_PUBLIC_APP_URL
(will be auto-filled after first deploy, or use your custom domain)
```

### 5. Deploy!
Click the **"Deploy"** button and wait 2-3 minutes.

---

## ✅ After Deployment

### 1. Get Your URL
After deployment completes, you'll get a URL like:
- `https://portfolio-xxxxx.vercel.app`

### 2. Update Backend CORS
Run this command to allow your frontend to access the backend:

```bash
cd /Users/sashabemotoff/Coding/MYPORTFOLIO/MY_PORTFOLIO/backend
flyctl secrets set FRONTEND_URL=https://your-vercel-url.vercel.app
```

### 3. Update NEXT_PUBLIC_APP_URL
Go back to Vercel:
- Project Settings → Environment Variables
- Add or update: `NEXT_PUBLIC_APP_URL` with your Vercel URL
- Redeploy (Deployments → ... → Redeploy)

---

## 🎉 Done!

Your portfolio is now live:
- **Frontend:** https://your-vercel-url.vercel.app
- **Backend:** https://my-portfolio-dawn-glade-2810.fly.dev

---

## 🔧 Troubleshooting

**Build fails?**
- Check all environment variables are set correctly
- Look at build logs in Vercel dashboard

**Can't fetch data from backend?**
- Verify NEXT_PUBLIC_STRAPI_API_URL is correct
- Check CORS is configured (FRONTEND_URL secret in Fly.io)
- Open browser console for errors

**Need to redeploy?**
- Go to Deployments tab
- Click "..." → "Redeploy"
- Or push new commit to GitHub (auto-deploys)

