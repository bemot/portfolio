# Strapi Field Visibility Fix

## Problem
The `iconUrl` field was added to the Skills schema but is not visible in the Strapi admin panel.

## Solution Applied
✅ Rebuilt the Strapi admin panel to recognize the new field.

## Steps to See the iconUrl Field

### Method 1: Refresh and Check Content Manager (Try First)
1. **Completely refresh** your Strapi admin panel
   - Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac) for a hard refresh
   - Or close and reopen your browser
2. Go to **Content Manager → Skills**
3. Click on an existing skill or **Create new entry**
4. You should now see the **iconUrl** field

### Method 2: Configure View (If field still not visible)
1. Go to **Content Manager → Skills**
2. Click the **⚙️ (Configure the view)** button in the top right
3. In the settings, make sure **iconUrl** is:
   - ✅ Checked/enabled
   - Not hidden
4. Click **Save**
5. Try editing a skill again

### Method 3: Clear Browser Cache
If the field is still not visible:
1. Clear your browser cache completely
2. Log out of Strapi admin
3. Log back in
4. Try again

### Method 4: Restart Strapi Server
If nothing works, restart the Strapi development server:
```bash
# Stop the current Strapi server (Ctrl+C in the terminal)
# Then restart it:
cd /home/sasha/WORK/MY_PORTFOLIO/portfolio/backend
source ~/.nvm/nvm.sh
nvm use 18
yarn develop
```

## Verification
Once the field is visible, you should see:
- **skillname** (text field)
- **iconUrl** (text field) ← NEW!

Example values:
- skillname: `Statistics`
- iconUrl: `https://cdn.simpleicons.org/statistics/16f2b3`

## Testing
1. Edit an existing skill (e.g., "Statistics")
2. Add iconUrl: `https://cdn.simpleicons.org/statistics/16f2b3`
3. Save and Publish
4. Check your frontend - the icon should now display!

## Troubleshooting

### Field shows but can't save?
Check API permissions:
1. Go to **Settings → Roles → Public**
2. Find **Skill** in the permissions list
3. Make sure these are checked:
   - ✅ find
   - ✅ findOne
4. Click **Save**

### Still not working?
The build was successful, so the field should be available. Try:
1. Hard refresh browser (Ctrl+Shift+R)
2. Check browser console for errors (F12)
3. Make sure you're logged in as an admin user

## Next Steps
Once the field is visible, follow the **SKILLS_CUSTOM_ICONS_GUIDE.md** to add custom icons!
