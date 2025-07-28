# 📱 Daily Routine - Cross Platform Task Manager

A Vite + React desktop widget app for daily tasks that syncs across PC and Android devices.

## ✨ Features

- **🏃‍♂️ 16 Daily Tasks** - Complete routine tracking
- **⚖️ Weight Tracking** - Daily weight logging with history
- **🏠 Weekend Tasks** - Collapsible weekend routine
- **📝 Custom Tasks** - Add your own tasks that persist
- **🔔 Smart Notifications** - Customizable deadline reminders with 24-hour format
- **☁️ Cross-Platform Sync** - Supabase database for PC/Android sync
- **🎨 Dark Theme** - Clean, minimal UI

## 🖥️ Desktop Features

- **Always on top** draggable widget (380x1500px)
- **Hidden scrollbars** for clean appearance
- **Auto-start** capability with Windows
- **Electron** wrapper for native desktop experience

## 📱 Android Features

- **Native APK** built with Capacitor
- **Touch-friendly** responsive design
- **Local notifications** for deadline reminders
- **Safe area** support for modern Android devices

## 🚀 Quick Start

### Desktop (Windows)
```bash
npm install
npm run electron
```

### Development
```bash
npm run dev
```

### Build Android APK
The APK is automatically built using GitHub Actions when you push to the main branch.

## 🔧 Tech Stack

- **Frontend**: Vite + React + Tailwind CSS
- **Desktop**: Electron
- **Mobile**: Capacitor
- **Database**: Supabase
- **Build**: GitHub Actions

## 📦 Build Status

[![Build Android APK](https://github.com/[YOUR-USERNAME]/[YOUR-REPO]/actions/workflows/build-android.yml/badge.svg)](https://github.com/[YOUR-USERNAME]/[YOUR-REPO]/actions/workflows/build-android.yml)

## 📲 Download

- **Desktop**: Run `npm run electron`
- **Android APK**: Download from [Releases](https://github.com/[YOUR-USERNAME]/[YOUR-REPO]/releases)

## ⚙️ Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up Supabase (see SUPABASE_SETUP.md)
4. Run desktop: `npm run electron`
5. Build Android: Push to GitHub (auto-builds APK)

---

Made with ❤️ for better daily routines
