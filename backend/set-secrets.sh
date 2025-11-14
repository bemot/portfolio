#!/bin/bash
set -e

cd /Users/sashabemotoff/Coding/MYPORTFOLIO/MY_PORTFOLIO/backend

APP_KEYS="$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32),$(openssl rand -base64 32)"

flyctl secrets set \
  APP_KEYS="$APP_KEYS" \
  API_TOKEN_SALT="$(openssl rand -base64 32)" \
  ADMIN_JWT_SECRET="$(openssl rand -base64 32)" \
  TRANSFER_TOKEN_SALT="$(openssl rand -base64 32)" \
  JWT_SECRET="$(openssl rand -base64 32)" \
  PUBLIC_URL="https://my-portfolio-dawn-glade-2810.fly.dev" \
  FRONTEND_URL="https://your-frontend.vercel.app"

echo "✅ Secrets set successfully!"
