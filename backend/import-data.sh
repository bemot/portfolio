#!/bin/bash
set -e

echo "📥 Importing Strapi data from encrypted export..."
echo ""

# Step 1: Upload the encrypted file
echo "Step 1: Uploading export file to Fly.io..."
flyctl ssh sftp shell << 'SFTP'
put export_20251113133209.tar.gz.enc /app/import.tar.gz.enc
exit
SFTP

# Step 2: Import data using Strapi CLI
echo ""
echo "Step 2: Importing data into Strapi..."
flyctl ssh console << 'SSH'
cd /app
export STRAPI_DISABLE_UPDATE_NOTIFICATION=true
export STRAPI_TELEMETRY_DISABLED=true

# Import with password
echo "sasha" | yarn strapi import -f /app/import.tar.gz.enc

# Clean up
rm -f /app/import.tar.gz.enc

echo "✅ Import complete!"
exit
SSH

# Step 3: Restart to ensure everything loads
echo ""
echo "Step 3: Restarting app..."
flyctl apps restart

echo ""
echo "🎉 Data imported successfully!"
echo ""
echo "Next steps:"
echo "1. Visit: https://my-portfolio-dawn-glade-2810.fly.dev/admin"
echo "2. Login with your credentials"
echo "3. Set public permissions (Settings → Users & Permissions → Roles → Public)"
echo "4. Refresh your Vercel site: https://portfolio-omega-khaki-64.vercel.app"
echo ""
