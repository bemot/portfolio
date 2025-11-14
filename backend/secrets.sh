#!/bin/bash

# Fly.io Secrets Setup Script for Strapi Backend
# This script generates and sets all required secrets for Strapi on Fly.io

set -e

echo "🔐 Generating Strapi secrets for Fly.io..."
echo ""

# Generate random secrets
APP_KEY_1=$(openssl rand -base64 32)
APP_KEY_2=$(openssl rand -base64 32)
APP_KEY_3=$(openssl rand -base64 32)
APP_KEY_4=$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)

# Combine APP_KEYS
APP_KEYS="${APP_KEY_1},${APP_KEY_2},${APP_KEY_3},${APP_KEY_4}"

echo "Generated secrets:"
echo "✅ APP_KEYS (4 keys combined)"
echo "✅ API_TOKEN_SALT"
echo "✅ ADMIN_JWT_SECRET"
echo "✅ TRANSFER_TOKEN_SALT"
echo "✅ JWT_SECRET"
echo ""

# Prompt for URLs
read -p "Enter your PUBLIC_URL (e.g., https://portfolio-backend.fly.dev): " PUBLIC_URL
#read -p "Enter your FRONTEND_URL (e.g., https://your-frontend.vercel.app): " FRONTEND_URL

echo ""
echo "🚀 Setting secrets in Fly.io..."
echo ""

# Set secrets in Fly.io
flyctl secrets set \
  APP_KEYS="$APP_KEYS" \
  API_TOKEN_SALT="$API_TOKEN_SALT" \
  ADMIN_JWT_SECRET="$ADMIN_JWT_SECRET" \
  TRANSFER_TOKEN_SALT="$TRANSFER_TOKEN_SALT" \
  JWT_SECRET="$JWT_SECRET" \
  PUBLIC_URL="$PUBLIC_URL" \
  FRONTEND_URL="$FRONTEND_URL"

echo ""
echo "✅ Secrets successfully set in Fly.io!"
echo ""
echo "📝 Note: These secrets are now stored securely in Fly.io."
echo "   You can view them with: flyctl secrets list"
echo ""
echo "🚀 Next steps:"
echo "   1. Deploy your app: flyctl deploy"
echo "   2. Check logs: flyctl logs"
echo ""
