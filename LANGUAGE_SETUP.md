# Ukrainian Language Support

## Backend (Strapi)

### Configuration
1. **i18n Plugin Enabled** - Added Ukrainian (uk) locale in `backend/config/plugins.js`
   - Supported locales: English (en), Ukrainian (uk)
   - Default locale: English (en)

2. **Content Types with i18n**:
   - ✅ personal-data
   - ✅ education
   - ✅ experience
   - ✅ project
   - ✅ tool

### Setup Steps
1. **Restart Strapi backend** to apply schema changes:
   ```bash
   cd backend
   npm run develop
   ```

2. **Add Ukrainian content** in Strapi Admin:
   - Go to http://127.0.0.1:1337/admin
   - For each content type, you'll see a locale dropdown
   - Create Ukrainian versions of your content by:
     - Selecting "Ukrainian" from the locale dropdown
     - Filling in the Ukrainian translations
     - Publishing the content

## Frontend (Next.js)

### Features
1. **Language Context** - Global state management for locale
   - Located in: `frontend/contexts/LanguageContext.js`
   - Persists selection in localStorage

2. **Language Switcher** - Button component in navbar
   - Located in: `frontend/app/components/helper/language-switcher.jsx`
   - Shows EN | UK buttons
   - Active language highlighted in green

3. **Dynamic Content Loading**
   - Content automatically fetches based on selected locale
   - All API calls include locale parameter
   - Page reloads when switching languages to ensure fresh data

### How It Works
1. User clicks EN or UK button in navbar
2. Locale saved to localStorage
3. Page reloads with new locale
4. All Strapi API calls include `locale` parameter
5. Content displays in selected language

### Files Modified
- `frontend/app/layout.js` - Added LanguageProvider
- `frontend/app/page.js` - Converted to use client-side data fetching
- `frontend/app/components/navbar.jsx` - Added language switcher
- `frontend/utils/data/*.js` - Added locale parameter support

## Testing
1. Start both backend and frontend
2. Click language switcher in navbar
3. Verify content changes language (if Ukrainian translations exist in Strapi)
4. Check that language preference persists on page reload
