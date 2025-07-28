@echo off
REM Build script for Android APK (Windows)

echo 🚀 Building Daily Routine APK...

REM Build React app
echo 📦 Building React app...
call npm run build

REM Sync Capacitor
echo 🔄 Syncing Capacitor...
call npx cap sync android

echo ✅ Project ready for APK build!
echo 📱 Android project is in: ./android/
echo.
echo 🎯 To build APK:
echo 1. Push to GitHub (uses automated GitHub Actions)
echo 2. Or use online build service with ./android/ folder
