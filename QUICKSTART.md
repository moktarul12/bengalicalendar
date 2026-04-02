# Quick Start Guide - Bengali Calendar App

## 🚀 Quick Commands

### Development
```bash
npm start              # Start development server
npm run android        # Run on Android device/emulator
npm run ios            # Run on iOS device/simulator
npm run web            # Run on web browser
```

### Build for Play Store
```bash
# Install EAS CLI (one-time)
npm install -g eas-cli

# Login to Expo
eas login

# Build APK for testing
npm run build:dev

# Build AAB for Play Store
npm run build:prod

# Submit to Play Store
npm run submit
```

## 📋 Pre-Release Checklist

### 1. Replace Placeholder Icons
Replace these files in `/assets` with actual designed icons:
- `icon.png` (1024x1024) - App icon
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `splash-icon.png` (512x512) - Splash screen
- `favicon.png` (48x48) - Web favicon
- `notification-icon.png` (96x96) - Notification icon

### 2. Update App Details
Edit `app.json`:
- Update `version` for new releases
- Increment `android.versionCode` for each update
- Update `extra.eas.projectId` with your actual project ID

### 3. Generate Keystore (First Release Only)
```bash
chmod +x scripts/generate-keystore.sh
./scripts/generate-keystore.sh
```
**⚠️ IMPORTANT:** Save keystore file and passwords securely!

### 4. Build & Submit
```bash
# Build production AAB
npm run build:prod

# After build completes, submit to Play Store
npm run submit
```

## 🎨 Design Assets Needed

For Play Store listing, prepare:
- [ ] App icon (512x512 PNG)
- [ ] Feature graphic (1024x500 PNG)
- [ ] Phone screenshots (1080x1920, min 2, max 8)
- [ ] Privacy policy URL

## 📝 Play Store Listing

**Title:** Bengali Calendar - বাংলা ক্যালেন্ডার

**Short Description:** Bengali English Calendar with festivals, holidays & panchang

**Category:** Lifestyle

## 🔧 Troubleshooting

**Build fails:**
- Check internet connection
- Verify EAS login: `eas whoami`
- Check `eas.json` configuration

**Icons not showing:**
- Ensure PNG files are valid
- Check file paths in `app.json`

**Keystore issues:**
- Keep backup of `.keystore` file
- Never commit keystore to git
- Use same keystore for all updates

## 📚 Full Documentation

- `README.md` - Project overview
- `docs/BUILD_GUIDE.md` - Detailed build instructions

## 🆘 Support

- Expo Forums: https://forums.expo.dev
- Expo Docs: https://docs.expo.dev
- Play Store Help: https://support.google.com/googleplay/android-developer
