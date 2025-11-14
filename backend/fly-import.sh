#!/bin/bash
set -e

cd /Users/sashabemotoff/Coding/MYPORTFOLIO/MY_PORTFOLIO/backend

echo "📤 Uploading and importing Strapi data..."
echo ""

# Upload and import in one SSH session
cat export_20251113133209.tar.gz.enc | flyctl ssh console << 'EOF'
echo "Receiving file..."
cat > /app/import.tar.gz.enc
echo "File received, checking size..."
ls -lh /app/import.tar.gz.enc
echo ""
echo "Starting import..."
cd /app
yarn strapi import --file /app/import.tar.gz.enc --key sasha --force
echo ""
echo "Cleaning up..."
rm -f /app/import.tar.gz.enc
echo "✅ Import complete!"
EOF

echo ""
echo "🔄 Restarting app..."
flyctl apps restart

echo ""
echo "🎉 Done! Wait 30 seconds, then:"
echo "1. Visit: https://my-portfolio-dawn-glade-2810.fly.dev/admin"
echo "2. Set public permissions"
echo "3. Check: https://portfolio-omega-khaki-64.vercel.app"
