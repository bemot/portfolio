#!/bin/bash
set -e

echo "📤 Uploading database to Fly.io..."

# Stop Strapi temporarily
echo "Stopping Strapi..."
flyctl ssh console -C "pkill -f strapi" || true
sleep 2

# Upload database
echo "Uploading data.db..."
flyctl ssh console -C "cat > /app/.tmp/data.db.new" < .tmp/data.db

# Replace old database
echo "Replacing database..."
flyctl ssh console -C "mv -f /app/.tmp/data.db.new /app/.tmp/data.db"

# Restart app
echo "Restarting app..."
flyctl apps restart

echo "✅ Database uploaded successfully!"
echo "Wait 30 seconds then check: https://my-portfolio-dawn-glade-2810.fly.dev/admin"
