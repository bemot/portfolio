#!/bin/bash

# Quick verification script for Ukrainian content status

echo "=========================================="
echo "Ukrainian Content Status Check"
echo "=========================================="
echo ""

STRAPI_URL="http://127.0.0.1:1337"
TOKEN="17494554655c3a6ddbcd019653502f7841e04ba4f8b10d2b892e55e02f836a91fee302349ced0438efe6fa9dc550533e4708135d5ce4820e295df74c45796cd664318e9e6635843a3f52b972cd0d4f2c322aee15ff3504ed6bc2f6b6713a50bf9bb8f9d583f7f1317ff33ac1b6b1c0fef32f790f745a45826e763d29e3fb9fb6"

echo "Checking Personal Data (Single Type)..."
PERSONAL=$(curl -s -H "Authorization: Bearer $TOKEN" "$STRAPI_URL/api/personal-data?populate=*&locale=uk")
if echo "$PERSONAL" | grep -q '"error"'; then
    echo "❌ Personal Data: NO Ukrainian version"
    echo "   → Action: Create Ukrainian localization in Strapi"
else
    echo "✅ Personal Data: Ukrainian version exists"
fi
echo ""

echo "Checking Education (Collection Type)..."
EDUCATION=$(curl -s -H "Authorization: Bearer $TOKEN" "$STRAPI_URL/api/educations?locale=uk")
EDU_COUNT=$(echo "$EDUCATION" | grep -o '"id"' | wc -l)
echo "✅ Education: $EDU_COUNT Ukrainian entries found"
echo ""

echo "Checking Experience (Collection Type)..."
EXPERIENCE=$(curl -s -H "Authorization: Bearer $TOKEN" "$STRAPI_URL/api/experiences?locale=uk")
EXP_COUNT=$(echo "$EXPERIENCE" | grep -o '"id"' | wc -l)
if [ "$EXP_COUNT" -gt 0 ]; then
    echo "✅ Experience: $EXP_COUNT Ukrainian entries found"
else
    echo "❌ Experience: NO Ukrainian entries"
    echo "   → Action: Create Ukrainian versions in Strapi"
fi
echo ""

echo "Checking Projects (Collection Type)..."
PROJECTS=$(curl -s -H "Authorization: Bearer $TOKEN" "$STRAPI_URL/api/projects?locale=uk")
PROJ_COUNT=$(echo "$PROJECTS" | grep -o '"id"' | wc -l)
if [ "$PROJ_COUNT" -gt 0 ]; then
    echo "✅ Projects: $PROJ_COUNT Ukrainian entries found"
else
    echo "❌ Projects: NO Ukrainian entries"
    echo "   → Action: Create Ukrainian versions in Strapi"
fi
echo ""

echo "=========================================="
echo "Summary"
echo "=========================================="
echo ""
echo "To fix Personal Data (About section & Contact form text):"
echo "1. Open Strapi Admin: http://127.0.0.1:1337/admin"
echo "2. Go to: Content Manager → Personal Data"
echo "3. Click: Locales dropdown (top right) → Ukrainian"
echo "4. Fill in Ukrainian translations"
echo "5. Click: Save → Publish"
echo ""
echo "This will fix:"
echo "  - About section description"
echo "  - Contact form 'text_to_client' message"
echo "  - All other Personal Data fields (name, designation, etc.)"
