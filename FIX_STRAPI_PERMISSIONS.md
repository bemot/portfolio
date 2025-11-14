# Fix Strapi 401 Unauthorized Errors

Your site is deployed successfully but getting 401 errors because Strapi content is not publicly accessible.

## Quick Fix - Set Public Permissions in Strapi Admin

### 1. Login to Strapi Admin
Go to: **https://my-portfolio-dawn-glade-2810.fly.dev/admin**

Login with your admin credentials.

### 2. Set Public Permissions
Navigate to: **Settings → Users & Permissions Plugin → Roles → Public**

For each Content Type that's showing 401 errors, enable these permissions:

#### Enable "find" and "findOne" for:
- ✅ **Skills** - find, findOne
- ✅ **Experiences** - find, findOne  
- ✅ **Educations** - find, findOne
- ✅ **Coursera-cetificats** - find, findOne
- ✅ **Projects** - find, findOne
- ✅ **Personal-data** - find, findOne
- ✅ **Contact-form** - find, findOne (or just "find")

### 3. Save
Click **Save** button at the top right.

### 4. Test
Refresh your Vercel site: https://portfolio-ixnmua5av-bemots-projects.vercel.app

The data should now load!

---

## Alternative: Make All Public via Database

If you can't access admin panel, you can set permissions via SSH:

```bash
cd MY_PORTFOLIO/backend
flyctl ssh console

# Inside the container:
sqlite3 /app/.tmp/data.db

# Run this SQL:
UPDATE up_permissions 
SET enabled = 1 
WHERE action IN ('find', 'findOne') 
AND role = (SELECT id FROM up_roles WHERE type = 'public');

.exit
exit

# Restart app:
flyctl apps restart
```

---

## Why This Happened

By default, Strapi content is private. You need to explicitly allow public access to each content type for the frontend to fetch data without authentication.
