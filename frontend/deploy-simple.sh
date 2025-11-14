#!/bin/bash
set -e

echo "🚀 Deploying to Vercel..."
echo ""
echo "Important: Make sure you have:"
echo "1. Logged into Vercel in your browser"
echo "2. Created a Vercel account if you don't have one"
echo ""
echo "We'll use the Vercel web interface for easier deployment."
echo ""

# Check if project has been built
if [ ! -d ".next" ]; then
    echo "📦 Building project first..."
    npm run build
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "📋 Next steps to deploy:"
echo ""
echo "Option 1 - Via GitHub (Recommended):"
echo "  1. Push your code to GitHub"
echo "  2. Go to https://vercel.com/new"
echo "  3. Import your repository"
echo "  4. Set Root Directory to: frontend"
echo "  5. Add environment variables"
echo "  6. Deploy!"
echo ""
echo "Option 2 - Via CLI:"
echo "  Run: cd frontend && npx vercel"
echo "  Follow the prompts"
echo ""
echo "Environment Variables to add in Vercel:"
echo "  NEXT_PUBLIC_STRAPI_API_URL=https://my-portfolio-dawn-glade-2810.fly.dev"
echo "  NEXT_PUBLIC_IMAGE_URL=https://my-portfolio-dawn-glade-2810.fly.dev"
cat .env.production
