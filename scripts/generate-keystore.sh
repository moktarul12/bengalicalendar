#!/bin/bash

# Script to generate keystore for signing Android APK

echo "🔐 Generating Keystore for Bengali Calendar App"
echo "================================================"
echo ""

KEYSTORE_NAME="bengali-calendar"
KEYSTORE_FILE="bengali-calendar.keystore"
ALIAS_NAME="bengali-calendar"
VALIDITY_DAYS=10000
KEY_SIZE=2048

echo "This will generate a keystore file for signing your Android app."
echo "Please provide the following information:"
echo ""

keytool -genkeypair -v \
    -storetype PKCS12 \
    -keystore $KEYSTORE_FILE \
    -alias $ALIAS_NAME \
    -keyalg RSA \
    -keysize $KEY_SIZE \
    -validity $VALIDITY_DAYS

echo ""
echo "✅ Keystore generated successfully!"
echo ""
echo "📁 Keystore file: $KEYSTORE_FILE"
echo "🔑 Alias: $ALIAS_NAME"
echo ""
echo "⚠️  IMPORTANT: Keep your keystore file and passwords safe!"
echo "You will need them to update your app on Play Store."
echo ""
echo "Next steps:"
echo "1. Store keystore file in a secure location"
echo "2. Create credentials.json with your keystore details"
echo "3. Run: eas build -p android --profile production --local"
