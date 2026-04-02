#!/bin/bash

# Bengali Calendar - Play Store Build Script
# This script helps build the app for Play Store release

echo "📅 Bengali English Calendar - Build Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    print_error "EAS CLI is not installed"
    echo "Install it with: npm install -g eas-cli"
    exit 1
fi

print_success "EAS CLI found"

# Check if user is logged in
echo ""
echo "Checking EAS authentication..."
if ! eas whoami &> /dev/null; then
    print_warning "Not logged in to EAS"
    echo "Please login with: eas login"
    eas login
fi

print_success "Logged in to EAS"

# Menu
echo ""
echo "Select build type:"
echo "1) Development APK (for testing)"
echo "2) Preview APK (for internal distribution)"
echo "3) Production AAB (for Play Store)"
echo "4) Generate Keystore"
echo "5) Exit"
echo ""
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "Building Development APK..."
        eas build -p android --profile development
        ;;
    2)
        echo ""
        echo "Building Preview APK..."
        eas build -p android --profile preview
        ;;
    3)
        echo ""
        echo "Building Production AAB for Play Store..."
        print_warning "This will create an App Bundle (AAB) for Play Store"
        read -p "Have you updated versionCode in app.json? (y/n): " version_check
        if [ "$version_check" != "y" ]; then
            print_warning "Please update versionCode in app.json before building"
            exit 1
        fi
        eas build -p android --profile production
        ;;
    4)
        echo ""
        echo "Generating Keystore..."
        ./scripts/generate-keystore.sh
        ;;
    5)
        echo "Exiting..."
        exit 0
        ;;
    *)
        print_error "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_success "Build initiated!"
echo "Check the build status at: https://expo.dev/accounts/[your-account]/projects/bengali-english-calendar/builds"
