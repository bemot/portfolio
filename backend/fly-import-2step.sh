#!/bin/bash
set -e

cd /Users/sashabemotoff/Coding/MYPORTFOLIO/MY_PORTFOLIO/backend

echo "📤 Step 1: Uploading file via SFTP..."
flyctl ssh sftp shell << 'SFTP'
put export_20251113133209.tar.gz.enc /app/import.tar.gz.enc
ls -l /app/import.tar.gz.enc
exit
SFTP

echo ""
echo "📥 Step 2: Running import..."
flyctl ssh console -C "cd /app && yarn strapi import --file /app/import.tar.gz.enc --key sasha --force && rm -f /app/import.tar.gz.enc"

echo ""
echo "🔄 Step 3: Restarting..."
flyctl apps restart

echo "✅ Done!"
