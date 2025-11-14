#!/bin/bash

# Deployment Helper Script
# This script helps you deploy your portfolio to Vercel and Fly.io

set -e

echo "🚀 Portfolio Deployment Helper"
echo "=============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if required tools are installed
check_tools() {
    echo "Checking required tools..."
    
    if ! command -v vercel &> /dev/null; then
        echo -e "${RED}❌ Vercel CLI not found${NC}"
        echo "Install with: npm install -g vercel"
        exit 1
    fi
    
    if ! command -v flyctl &> /dev/null; then
        echo -e "${RED}❌ Fly.io CLI not found${NC}"
        echo "Install with: curl -L https://fly.io/install.sh | sh"
        exit 1
    fi
    
    echo -e "${GREEN}✅ All tools installed${NC}"
    echo ""
}

# Deploy backend to Fly.io
deploy_backend() {
    echo -e "${YELLOW}📦 Deploying Backend to Fly.io${NC}"
    cd backend
    
    # Check if fly.toml has been configured
    if grep -q "your-app-name" fly.toml; then
        echo -e "${RED}⚠️  Please update 'your-app-name' in backend/fly.toml first${NC}"
        cd ..
        return 1
    fi
    
    # Check if logged in to Fly.io
    if ! flyctl auth whoami &> /dev/null; then
        echo "Please login to Fly.io:"
        flyctl auth login
    fi
    
    # Deploy
    echo "Deploying to Fly.io..."
    flyctl deploy
    
    cd ..
    echo -e "${GREEN}✅ Backend deployed successfully${NC}"
    echo ""
}

# Deploy frontend to Vercel
deploy_frontend() {
    echo -e "${YELLOW}🎨 Deploying Frontend to Vercel${NC}"
    cd frontend
    
    # Check if logged in to Vercel
    if ! vercel whoami &> /dev/null; then
        echo "Please login to Vercel:"
        vercel login
    fi
    
    # Deploy
    echo "Deploying to Vercel..."
    if [ "$1" == "prod" ]; then
        vercel --prod
    else
        vercel
    fi
    
    cd ..
    echo -e "${GREEN}✅ Frontend deployed successfully${NC}"
    echo ""
}

# Main menu
main() {
    check_tools
    
    echo "What would you like to deploy?"
    echo "1) Backend (Fly.io)"
    echo "2) Frontend (Vercel)"
    echo "3) Both (Backend first, then Frontend)"
    echo "4) Exit"
    echo ""
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            deploy_backend
            ;;
        2)
            read -p "Deploy to production? (y/n): " prod
            if [ "$prod" == "y" ]; then
                deploy_frontend prod
            else
                deploy_frontend
            fi
            ;;
        3)
            deploy_backend && {
                read -p "Backend deployed! Deploy frontend to production? (y/n): " prod
                if [ "$prod" == "y" ]; then
                    deploy_frontend prod
                else
                    deploy_frontend
                fi
            }
            ;;
        4)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid choice${NC}"
            exit 1
            ;;
    esac
    
    echo ""
    echo -e "${GREEN}🎉 Deployment complete!${NC}"
}

main
