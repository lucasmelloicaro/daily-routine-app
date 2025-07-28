#!/bin/bash
# Build script for Android APK

echo "🚀 Building Daily Routine APK..."

# Build React app
echo "📦 Building React app..."
npm run build

# Sync Capacitor
echo "🔄 Syncing Capacitor..."
npx cap sync android

echo "✅ Project ready for APK build!"
echo "📱 Android project is in: ./android/"
echo ""
echo "🎯 To build APK:"
echo "1. Push to GitHub (uses automated GitHub Actions)"
echo "2. Or use online build service with ./android/ folder"
