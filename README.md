# Bengali English Calendar 📅

A beautiful native mobile app featuring both Bengali Panjika and Gregorian calendar with festivals, holidays, and panchang information.

## Features ✨

### Dual Calendar System
- **Gregorian Calendar** - Standard English calendar
- **Bengali Panjika** - Traditional Bengali calendar (বাংলা পঞ্জিকা)
- Seamless switching between both calendars

### Festivals & Holidays 🎉
- Complete database of Bengali festivals
- Hindu religious festivals (Durga Puja, Kali Puja, Saraswati Puja, etc.)
- Islamic festivals (Eid ul-Fitr, Eid ul-Adha, etc.)
- National holidays (Independence Day, Victory Day, etc.)
- Seasonal festivals (Nabanna, Poush Mela, Basanta Utsav)
- Visual indicators on calendar days
- Public holiday markers

### Panchang Information 🌙
- Tithi (তিথি)
- Nakshatra (নক্ষত্র)
- Yoga (যোগ)
- Karana (করণ)
- Sunrise/Sunset times
- Moonrise/Moonset times
- Auspicious times (শুভ সময়)
- Inauspicious times (রাহু কাল, যমগন্ধ, গুলিকা)

### Additional Features
- **Today Button** - Quick navigation back to current date
- **Upcoming Festivals** - See what festivals are coming soon
- **Day Details Modal** - Detailed view of each day
- **Beautiful UI** - Bengali cultural theme with gradients
- **Splash Screen** - Animated app launch experience
- **Settings** - Customize notifications, display preferences

## Tech Stack 🛠️

- **React Native** with **Expo** (SDK 54)
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Linear Gradients** for beautiful UI
- **Safe Area Context** for proper device handling

## Getting Started 🚀

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bengali-english-calendar.git

# Navigate to project directory
cd bengali-english-calendar

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Building for Production 📦

### Android APK (for testing)

```bash
# Build APK using EAS
eas build -p android --profile preview
```

### Android App Bundle (for Play Store)

```bash
# Build AAB for Play Store
eas build -p android --profile production
```

### iOS (requires macOS)
```

### 7. Important Notes

#### Keystore Security
- **Never commit keystore files** to git
- **Never share keystore passwords**
- **Back up your keystore file** securely
- **Same keystore must be used** for all app updates

#### APK vs AAB
- **APK**: Can be installed directly on devices
- **AAB**: Cannot be installed directly, only for Google Play Store
- **AAB benefits**: Smaller size, dynamic delivery, better optimization

#### Troubleshooting
- If build fails, check GitHub Secrets are correctly set
- Ensure keystore passwords match exactly
- Verify base64 encoding doesn't have extra characters
- Check build logs in GitHub Actions for specific errors

### 8. Build Configuration Files

#### `android/app/build.gradle`
- Configured to use environment variables for keystore
- Same keystore used for both debug and release builds
- Falls back to default signing if no keystore provided

#### `.github/workflows/android-build.yml`
- Automated CI/CD pipeline
- Supports both debug and release builds
- Handles keystore setup securely
- Generates appropriate artifacts

## Project Structure 📁

```
bengali-english-calendar/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── eas.json               # EAS Build configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── assets/                # Images, fonts, icons
│   ├── icon.png
│   ├── adaptive-icon.png
│   ├── splash-icon.png
│   └── favicon.png
└── src/
    ├── components/        # Reusable UI components
    │   ├── SplashScreen.tsx
    │   ├── FestivalCard.tsx
    │   ├── UpcomingFestivals.tsx
    │   ├── DayDetailModal.tsx
    │   ├── CalendarTypeToggle.tsx
    │   ├── BottomNavBar.tsx
    │   └── Calendar/
    │       ├── CalendarHeader.tsx
    │       ├── CalendarDay.tsx
    │       └── CalendarGrid.tsx
    ├── screens/           # App screens
    │   ├── CalendarScreen.tsx
    │   ├── FestivalsScreen.tsx
    │   ├── PanchangScreen.tsx
    │   └── SettingsScreen.tsx
    ├── constants/         # Static data & config
    │   ├── bengaliCalendar.ts
    │   ├── festivals.ts
    │   └── theme.ts
    ├── types/             # TypeScript types
    │   └── index.ts
    └── utils/             # Utility functions
        └── calendarUtils.ts
```

## Play Store Release Checklist ✅

1. **App Assets**
   - [ ] High-quality app icon (512x512)
   - [ ] Feature graphic (1024x500)
   - [ ] Screenshots (minimum 2, recommended 8)
   - [ ] Privacy policy URL

2. **Store Listing**
   - [ ] App title (max 30 characters)
   - [ ] Short description (max 80 characters)
   - [ ] Full description (max 4000 characters)
   - [ ] Category: Lifestyle / Productivity
   - [ ] Content rating questionnaire

3. **Technical**
   - [ ] Signed AAB file
   - [ ] Version number incremented
   - [ ] Target SDK version (34+)
   - [ ] Test on multiple devices

4. **Legal**
   - [ ] Privacy policy
   - [ ] Terms of service
   - [ ] Copyright compliance

## Bengali Calendar Information ℹ️

The Bengali calendar (বাংলা পঞ্জিকা) is a solar calendar used in Bangladesh and Indian states of West Bengal, Tripura, and Assam. The year starts on Pohela Boishakh (April 14/15).

### Bengali Months:
1. **বৈশাখ (Boishakh)** - 31 days
2. **জ্যৈষ্ঠ (Joishtho)** - 31 days
3. **আষাঢ় (Asharh)** - 31 days
4. **শ্রাবণ (Shrabon)** - 31 days
5. **ভাদ্র (Bhadro)** - 31 days
6. **আশ্বিন (Ashwin)** - 30 days
7. **কার্তিক (Kartik)** - 30 days
8. **অগ্রহায়ণ (Agrahayan)** - 30 days
9. **পৌষ (Poush)** - 30 days
10. **মাঘ (Magh)** - 30 days
11. **ফাল্গুন (Falgun)** - 30 days
12. **চৈত্র (Chaitra)** - 30 days

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- Bengali calendar calculations based on traditional Panjika
- Festival data compiled from various cultural sources
- Icons from Expo Vector Icons (Ionicons)

---

Made with ❤️ for the Bengali community

**বাংলা ক্যালেন্ডার - Bengali English Calendar**
