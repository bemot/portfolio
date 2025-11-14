#!/bin/bash

echo "📦 Uploading database to Fly.io..."

# Copy database to Fly.io machine
flyctl ssh sftp shell <<'SFTP'
put .tmp/data.db /app/.tmp/data.db
exit
SFTP

echo ""
echo "✅ Database uploaded!"
echo "🔄 Restarting app..."
flyctl apps restart my-portfolio-dawn-glade-2810

echo "✅ Done! Your data should now be on the server."
