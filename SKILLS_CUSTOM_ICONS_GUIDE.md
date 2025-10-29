# Skills Custom Icons Guide

## Overview
You can now add custom icon URLs for your skills in Strapi! This allows you to add icons for any skill, including custom ones like "Statistics", "Welding", etc.

## How It Works

The system now supports three ways to display skill icons:

1. **Custom Icon URL** (Priority 1) - If you provide an `iconUrl` in Strapi, it will be used
2. **Built-in Template Icons** (Priority 2) - If no custom URL, it uses the template's built-in icons
3. **Fallback Letter** (Priority 3) - If neither exists, it shows the first letter of the skill name

## Adding Custom Icons in Strapi

### Step 1: Access Strapi Admin
1. Go to `http://127.0.0.1:1337/admin`
2. Log in to your Strapi admin panel

### Step 2: Edit or Create a Skill
1. Navigate to **Content Manager → Skills**
2. Click on an existing skill or **Create new entry**
3. You'll now see two fields:
   - **skillname**: The name of your skill (e.g., "Statistics", "Welding")
   - **iconUrl**: The URL to your custom icon (NEW!)

### Step 3: Find Icon URLs
You can use icons from various sources:

#### Option A: Simple Icons (Recommended)
- Website: https://simpleicons.org/
- Example URLs:
  - Statistics: `https://cdn.simpleicons.org/statistics/16f2b3`
  - Welding: `https://cdn.simpleicons.org/welding/16f2b3`
  - R Language: `https://cdn.simpleicons.org/r/16f2b3`
  - SPSS: `https://cdn.simpleicons.org/ibm/16f2b3`

#### Option B: Dev Icons
- Website: https://devicon.dev/
- Example URLs:
  - R: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg`
  - SPSS: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spss/spss-original.svg`

#### Option C: Your Own Icons
- Upload your SVG/PNG icons to Strapi Media Library
- Use the URL from Strapi: `http://127.0.0.1:1337/uploads/your_icon.svg`

#### Option D: External SVG/PNG URLs
- Any publicly accessible image URL (SVG, PNG recommended)
- Make sure the URL is HTTPS for production

### Step 4: Save and Publish
1. Enter your **skillname**: e.g., "Statistics"
2. Enter your **iconUrl**: e.g., `https://cdn.simpleicons.org/statistics/16f2b3`
3. Click **Save**
4. Click **Publish**

## Example Skills with Custom Icons

| Skill Name | iconUrl |
|------------|---------|
| Statistics | `https://cdn.simpleicons.org/statistics/16f2b3` |
| Welding | `https://cdn.simpleicons.org/welding/16f2b3` |
| R | `https://cdn.simpleicons.org/r/16f2b3` |
| Tableau | `https://cdn.simpleicons.org/tableau/16f2b3` |
| Excel | `https://cdn.simpleicons.org/microsoftexcel/16f2b3` |
| Power BI | `https://cdn.simpleicons.org/powerbi/16f2b3` |

## Fixing Existing Skills

### Fix "Pyhton" Typo
1. Go to **Content Manager → Skills**
2. Find the skill "Pyhton"
3. Change **skillname** to "Python"
4. Leave **iconUrl** empty (it will use the built-in Python icon)
5. Save and Publish

### Add Icon for "Statistics"
1. Go to **Content Manager → Skills**
2. Find the skill "Statistics"
3. Add **iconUrl**: `https://cdn.simpleicons.org/statistics/16f2b3`
4. Save and Publish

### Add Icon for "AI"
1. Go to **Content Manager → Skills**
2. Find the skill "AI"
3. You could:
   - Change name to "Tensorflow" or "PyTorch" (built-in icons available)
   - Or add custom **iconUrl**: `https://cdn.simpleicons.org/openai/16f2b3`
4. Save and Publish

## Color Customization

Simple Icons allows you to customize colors by adding the hex color at the end of the URL:
- Green accent (default): `/16f2b3`
- White: `/ffffff`
- Custom: `/YOUR_HEX_COLOR` (without #)

Example:
- `https://cdn.simpleicons.org/statistics/16f2b3` - Green accent
- `https://cdn.simpleicons.org/statistics/ffffff` - White
- `https://cdn.simpleicons.org/statistics/ff6b6b` - Red

## Built-in Skills (No iconUrl Needed)

If you leave `iconUrl` empty, these skills will use built-in template icons:
- Programming: HTML, CSS, JavaScript, TypeScript, Python, Java, C, C++, C#, Go, PHP, Ruby, Swift, Kotlin, Julia, Matlab, Dart
- Frameworks: React, Next JS, Vue, Angular, Django, Flutter, Svelte, Bootstrap, Tailwind, MaterialUI
- Databases: MongoDB, MySQL, PostgreSQL, Firebase
- Tools: Git, Docker, Figma, AWS, Azure, GCP, Nginx, Linux, Strapi, etc.

## Troubleshooting

### Icon Not Showing?
1. Check if `iconUrl` is correct and accessible
2. Make sure the skill is **Published** in Strapi
3. Clear your browser cache
4. Check browser console for errors

### Icon Too Large/Small?
The system automatically sizes icons to fit. If needed, you can use different icon sources.

### CORS Issues?
If using external URLs, make sure they allow CORS. Simple Icons and DevIcon CDNs are CORS-friendly.

## Next Steps

Now you can add any skill you want with custom icons! Just find an appropriate icon URL and add it to Strapi.
