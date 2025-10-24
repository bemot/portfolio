# How to Add Ukrainian Content in Strapi

## Prerequisites
1. Strapi backend must be running with i18n enabled
2. You need admin access to Strapi (http://127.0.0.1:1337/admin)

## Steps to Add Ukrainian Translations

### For Single Type (Personal Data)
1. Go to **Content Manager** → **Personal Data**
2. You'll see a **Locales** dropdown in the top right (currently showing "English")
3. Click the dropdown and select **"Create new locale"** or **Ukrainian**
4. If Ukrainian doesn't exist:
   - Go to **Settings** → **Internationalization** → **Locales**
   - Click **Add new locale**
   - Select **Ukrainian (uk)**
   - Click **Save**
5. Go back to **Personal Data**
6. Click the Locales dropdown → Select **Ukrainian**
7. Fill in all fields with Ukrainian translations:
   - Name (Ім'я)
   - Designation (Посада)
   - Description (Опис)
   - Phone (Телефон)
   - Address (Адреса)
   - Email
   - Text to client (Текст клієнту)
   - etc.
8. Upload the same profile image or a different one
9. Click **Save** then **Publish**

### For Collection Types (Education, Experience, Projects)
1. Go to **Content Manager** → **Education** (or Experience/Projects)
2. For **EACH existing entry**:
   - Open the entry
   - Click the **Locales** dropdown (top right)
   - Select **Ukrainian**
   - Fill in Ukrainian translations
   - Click **Save** then **Publish**

**OR** create new entries:
1. Click **Create new entry**
2. In the Locales dropdown, select **Ukrainian**
3. Fill in all fields in Ukrainian
4. Click **Save** then **Publish**

### Example: Education Entry in Ukrainian
- **Institution**: Київський національний університет
- **Years**: 2015-2019
- **Qualification**: Бакалавр
- **Title**: Інформаційні технології

### Important Notes
1. **Each locale is a separate entry** - you must create/translate content for each language
2. **IDs are shared** - the same content ID in English and Ukrainian are linked
3. **You can copy from one locale** - Some Strapi versions allow you to duplicate and translate
4. **Fallback logic added** - If Ukrainian content doesn't exist, the app will show English content

### Testing
1. Add Ukrainian content in Strapi for at least one section (e.g., Personal Data)
2. Go to your frontend
3. Click the **UK** button in the navbar
4. Verify that the Ukrainian content appears
5. If no Ukrainian content exists for a section, English will be shown (fallback)

## Current Status
✅ Backend configured for Ukrainian language
✅ Frontend language switcher working
⏳ **Action needed**: Add Ukrainian content in Strapi admin

## Troubleshooting

### "Not Found" error when switching to Ukrainian
- **Cause**: No Ukrainian content exists in Strapi yet
- **Solution**: Add Ukrainian translations in Strapi admin
- **Temporary**: App will fallback to English content

### Skills section not translating
- **Cause**: Skills are hardcoded in `frontend/utils/data/skills.js`
- **Solution**: Either:
  1. Keep them in English (technical terms)
  2. Create a conditional translation object
  3. Move skills to Strapi as a collection type

### Contact form text not translating
- The form labels are hardcoded. To translate:
  - Create a translations file
  - Or move form labels to Strapi Personal Data (text_to_client field)
