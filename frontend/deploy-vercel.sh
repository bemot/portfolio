#!/bin/bash

echo "🚀 Deploying Frontend to Vercel..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI ready"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file with your values before deploying"
    echo ""
fi

echo "📋 Current configuration:"
echo "   NEXT_PUBLIC_STRAPI_URL should be: https://my-portfolio-dawn-glade-2810.fly.dev"
echo ""

read -p "Have you updated NEXT_PUBLIC_STRAPI_URL in .env? (y/n): " updated

if [ "$updated" != "y" ]; then
    echo "Please update .env file first, then run this script again"
    exit 1
fi

echo ""
echo "🔐 Step 1: Login to Vercel"
vercel login

echo ""
echo "🏗️  Step 2: Deploy to Vercel"
echo ""
read -p "Deploy to production? (y/n, default: preview): " production

if [ "$production" = "y" ]; then
    vercel --prod
else
    vercel
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Go to your Vercel dashboard"
echo "   2. Add environment variables if not set:"
echo "      - NEXT_PUBLIC_STRAPI_URL=https://my-portfolio-dawn-glade-2810.fly.dev"
echo "      - NEXT_PUBLIC_APP_URL=<your-vercel-url>"
echo "      - Other variables from your .env file"
echo "   3. Trigger a redeploy if needed"
echo ""
