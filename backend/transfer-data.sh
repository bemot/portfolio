#!/bin/bash

# Transfer data from local to Fly.io using Strapi transfer

echo "🔄 Starting data transfer to Fly.io..."
echo ""
echo "Make sure your local Strapi is running on http://localhost:1337"
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

# Generate transfer token on remote
echo "📝 Step 1: Generate a transfer token on your Fly.io instance"
echo "Run this command to get a shell on Fly.io:"
echo "  cd /Users/sashabemotoff/Coding/MYPORTFOLIO/MY_PORTFOLIO/backend && flyctl ssh console"
echo ""
echo "Then run inside the container:"
echo "  yarn strapi transfer:token-generate --type push"
echo ""
echo "Copy the token and paste it here:"
read TRANSFER_TOKEN

echo ""
echo "🚀 Starting transfer..."
yarn strapi transfer \
  --to https://my-portfolio-dawn-glade-2810.fly.dev/admin \
  --to-token "$TRANSFER_TOKEN"

echo ""
echo "✅ Transfer complete!"
