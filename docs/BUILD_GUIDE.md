# Build & Release Guide for Bengali Calendar App

## Prerequisites

1. **Install EAS CLI** (if not already installed):
```bash
npm install -g eas-cli
```

2. **Login to Expo account**:
```bash
eas login
```

3. **Configure project**:
```bash
eas build:configure
```

## Building the App

### Development Build (for testing)
```bash
# Build APK for testing on device
eas build -p android --profile development

# Or build locally (requires Android SDK)
eas build -p android --profile development --local
```

### Preview Build (for internal distribution)
```bash
# Build APK for sharing with testers
eas build -p android --profile preview
```

### Production Build (for Play Store)
```bash
# Build App Bundle (AAB) for Play Store
eas build -p android --profile production
```

## Generating Keystore for Signing

### Option 1: Let EAS manage credentials (Recommended)
EAS will automatically generate and manage your keystore:
```bash
eas build -p android --profile production
```

### Option 2: Use local keystore

1. **Generate keystore**:
```bash
# Run the provided script
chmod +x scripts/generate-keystore.sh
./scripts/generate-keystore.sh

# Or manually:
keytool -genkeypair -v \
    -storetype PKCS12 \
    -keystore bengali-calendar.keystore \
    -alias bengali-calendar \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000
```

2. **Create credentials.json** in project root:
```json
{
  "android": {
    "keystore": {
      "keystorePath": "./bengali-calendar.keystore",
      "keystorePassword": "YOUR_KEYSTORE_PASSWORD",
      "keyAlias": "bengali-calendar",
      "keyPassword": "YOUR_KEY_PASSWORD"
    }
  }
}
```

3. **Build with local credentials**:
```bash
eas build -p android --profile production --local
```

## Submitting to Play Store

### 1. Build the AAB
```bash
eas build -p android --profile production
```

### 2. Download the AAB
After build completes, download from Expo dashboard or use:
```bash
eas build:list
```

### 3. Submit to Play Store

**Option A: Using EAS Submit**
```bash
eas submit -p android --latest
```

**Option B: Manual Upload**
1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app or select existing
3. Go to Release > Testing > Internal Testing
4. Upload the AAB file
5. Fill in release notes
6. Roll out to testing tracks

## Play Store Listing Details

### App Title (30 chars max)
```
Bengali Calendar - বাংলা ক্যালেন্ডার
```

### Short Description (80 chars max)
```
Bengali English Calendar with festivals, holidays & panchang
```

### Full Description
```
📅 Bengali English Calendar - বাংলা ক্যালেন্ডার

A beautiful dual calendar app featuring both Bengali Panjika and Gregorian calendar with festivals, holidays, and panchang information.

✨ FEATURES:

📆 DUAL CALENDAR SYSTEM
• Gregorian Calendar (English)
• Bengali Panjika (বাংলা পঞ্জিকা)
• Easy switching between both calendars

🎉 FESTIVALS & HOLIDAYS
• Complete Bengali festival database
• Durga Puja, Kali Puja, Saraswati Puja
• Eid ul-Fitr, Eid ul-Adha, Muharram
• Independence Day, Victory Day
• Pohela Boishakh, Nabanna, Basanta Utsav
• Public holiday indicators

🌙 PANCHANG
• Tithi (তিথি)
• Nakshatra (নক্ষত্র)
• Yoga & Karana
• Sunrise/Sunset times
• Auspicious & inauspicious times

🎨 BEAUTIFUL DESIGN
• Bengali cultural theme
• Gradient colors inspired by tradition
• Smooth animations
• Easy to use interface

⚡ ADDITIONAL FEATURES
• Today button for quick navigation
• Upcoming festivals widget
• Day detail modal
• Customizable settings
• Notification reminders

Perfect for Bengali community in Bangladesh, West Bengal, Tripura, Assam, and Bengali diaspora worldwide.

Download now and stay connected to your cultural roots!
```

### Category
```
Lifestyle
```

### Tags
```
Calendar, Bengali, Bangla, Panjika, Festival, Holiday, Panchang, Durga Puja, Eid, Bengali New Year
```

## Screenshots Required

Prepare screenshots for:
- Phone (minimum 2, max 8)
- 7-inch Tablet (optional)
- 10-inch Tablet (optional)

Recommended screenshot sizes:
- Phone: 1080x1920 or 1440x2560
- 7-inch: 1200x1920
- 10-inch: 1600x2560

## Icon Requirements

- **App Icon**: 512x512 PNG
- **Feature Graphic**: 1024x500 PNG (for Play Store header)

## Privacy Policy URL

Create a privacy policy and host it online. Example structure:
```
https://yourdomain.com/privacy-policy
```

## Version Updates

When releasing updates:

1. **Update version in app.json**:
```json
{
  "expo": {
    "version": "1.0.1",
    "android": {
      "versionCode": 2
    }
  }
}
```

2. **Build new version**:
```bash
eas build -p android --profile production
```

3. **Submit to Play Store**:
```bash
eas submit -p android --latest
```

## Troubleshooting

### Build Fails
- Check `eas.json` configuration
- Verify all dependencies are compatible
- Check Expo SDK version

### Keystore Issues
- Keep backup of keystore file
- Remember passwords
- Use same keystore for all updates

### Play Store Rejection
- Check content rating
- Verify permissions are necessary
- Ensure privacy policy is accessible
- Test on multiple devices

## Support

For build issues:
- [Expo Forums](https://forums.expo.dev)
- [Expo Documentation](https://docs.expo.dev)

For Play Store issues:
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)
