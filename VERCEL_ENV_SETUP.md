# Setting Up Environment Variables in Vercel

## Method 1: Using Vercel Dashboard (Recommended)

### Step 1: Go to your project settings
1. Visit: https://vercel.com/dashboard
2. Select your portfolio project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add these variables one by one

Click **Add New** for each variable and set the **Environment** to **Production**, **Preview**, and **Development**:

#### Required Variables:

```
Name: NEXT_PUBLIC_STRAPI_API_URL
Value: https://my-portfolio-dawn-glade-2810.fly.dev
```

```
Name: NEXT_PUBLIC_IMAGE_URL
Value: https://my-portfolio-dawn-glade-2810.fly.dev
```

```
Name: NEXT_PUBLIC_STRAPI_API_TOKEN
Value: 60f9b741330e3db9ab3daca8a1ed7b2655074ab70ad45c4294ff0f84e0e553be195e64b82e908ac5eba345a31c0e16a3557de19e7d7d1957bf56c84805bea9312d57f69381f9dbb494a8532800305164ed9cca7df96686b7c288d6740e440d5a8cdf10257de1d8f36e5f519e10e02070915873ae37cccdc0a5cff0580ecf17f7
```

```
Name: NEXT_PUBLIC_PAGE_LIMIT
Value: 97fa5d804a0ecb874b956e84411843e0e9b8b2f5a7d54b0d43039706abacf481f1ccc3273b80f70bb3eab60d54b3749fc86826402a2ce43536260ed9e24d4a98eadc48598fa12aa5e2f8c1a5e75e598254460e86780af43341f44070cef7f0292653e908ee7d8cc816b6ce7113158c4f651ff059d57c42a7889ec9959ae1a9be
```

```
Name: NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN
Value: 4bee1310e1cf9086ae9f46cf52a00c4683d330950f405ae050f5f70d6f55ce1bdaf8446ff8c1719c9ab385027d6632bb79ea501491ca3b6276c86acd8b904750c0e8ed9036068df18dcbc93f1c3b6e266a5b41eb8754ef2d837538f00ce8a2885ef5d317c70c0ea6f9edcabccaa8479d6231cf144288a108d47d5618345495b4
```

```
Name: NEXT_PUBLIC_APP_URL
Value: https://portfolio-omega-khaki-64.vercel.app
```

### Step 3: Redeploy
After adding all variables, trigger a new deployment:
- Go to **Deployments** tab
- Click the three dots (...) on the latest deployment
- Click **Redeploy**

---

## Method 2: Using Vercel CLI

If you prefer using the CLI:

### Step 1: Login to Vercel
```bash
cd /Users/sashabemotoff/Coding/MYPORTFOLIO/MY_PORTFOLIO/frontend
vercel login
```

### Step 2: Add environment variables
```bash
# Add API URL
echo "https://my-portfolio-dawn-glade-2810.fly.dev" | vercel env add NEXT_PUBLIC_STRAPI_API_URL production

# Add Image URL
echo "https://my-portfolio-dawn-glade-2810.fly.dev" | vercel env add NEXT_PUBLIC_IMAGE_URL production

# Add API Token
echo "60f9b741330e3db9ab3daca8a1ed7b2655074ab70ad45c4294ff0f84e0e553be195e64b82e908ac5eba345a31c0e16a3557de19e7d7d1957bf56c84805bea9312d57f69381f9dbb494a8532800305164ed9cca7df96686b7c288d6740e440d5a8cdf10257de1d8f36e5f519e10e02070915873ae37cccdc0a5cff0580ecf17f7" | vercel env add NEXT_PUBLIC_STRAPI_API_TOKEN production

# Add Page Limit
echo "97fa5d804a0ecb874b956e84411843e0e9b8b2f5a7d54b0d43039706abacf481f1ccc3273b80f70bb3eab60d54b3749fc86826402a2ce43536260ed9e24d4a98eadc48598fa12aa5e2f8c1a5e75e598254460e86780af43341f44070cef7f0292653e908ee7d8cc816b6ce7113158c4f651ff059d57c42a7889ec9959ae1a9be" | vercel env add NEXT_PUBLIC_PAGE_LIMIT production

# Add Form Submission Token
echo "4bee1310e1cf9086ae9f46cf52a00c4683d330950f405ae050f5f70d6f55ce1bdaf8446ff8c1719c9ab385027d6632bb79ea501491ca3b6276c86acd8b904750c0e8ed9036068df18dcbc93f1c3b6e266a5b41eb8754ef2d837538f00ce8a2885ef5d317c70c0ea6f9edcabccaa8479d6231cf144288a108d47d5618345495b4" | vercel env add NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN production

# Add App URL
echo "https://portfolio-omega-khaki-64.vercel.app" | vercel env add NEXT_PUBLIC_APP_URL production
```

### Step 3: Redeploy
```bash
vercel --prod
```

---

## Important Notes

1. **API Token**: The `NEXT_PUBLIC_STRAPI_API_TOKEN` is used by your frontend to authenticate with Strapi API
2. **Security**: Even though these tokens are prefixed with `NEXT_PUBLIC_` (meaning they're exposed in the browser), Strapi should still have proper permissions configured
3. **After adding variables**: You MUST redeploy for the changes to take effect
4. **Verify**: After redeployment, check your browser console to ensure the API calls use the correct URL and token

---

## How to Verify It's Working

After redeployment:

1. Open your Vercel site: https://portfolio-omega-khaki-64.vercel.app
2. Open browser DevTools (F12)
3. Check the **Network** tab
4. Look for API calls to `https://my-portfolio-dawn-glade-2810.fly.dev/api/...`
5. Check if they include the Authorization header with your token
6. They should return 200 OK (not 401 Unauthorized)

---

## Troubleshooting

If you still get 401 errors after adding the token:
- Make sure you've enabled public permissions in Strapi admin panel
- Verify the token is correct in Vercel environment variables
- Check that you've redeployed after adding variables
