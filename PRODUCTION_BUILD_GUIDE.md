# Production Build & Keystore Setup Guide

This guide covers the complete setup for production Android builds with keystore signing using GitHub Actions.

## Overview

The project uses GitHub Actions for automated builds with production keystore signing. This ensures:
- Consistent signing across all builds
- Secure keystore management
- Automated APK/AAB generation
- Easy deployment to Google Play Store

## 1. Generate Production Keystore (One-time Setup)

Generate a keystore file on your local machine:

```bash
# Navigate to your project root
cd bengali-english-calendar

# Generate keystore (run this ONCE)
keytool -genkey -v -keystore release.keystore \
  -storepass YOUR_STORE_PASSWORD \
  -alias YOUR_KEY_ALIAS \
  -keypass YOUR_KEY_PASSWORD \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -dname "CN=Bengali Calendar, OU=Development, O=Your Company, C=US"

# Example with actual values:
keytool -genkey -v -keystore release.keystore \
  -storepass myStorePass123 \
  -alias bengaliCalendarKey \
  -keypass myKeyPass123 \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -dname "CN=Bengali Calendar, OU=Development, O=Your Company, C=US"
```

**Important Notes:**
- Keep your keystore file and passwords secure!
- This keystore will be used for all production builds
- You cannot update your app on Google Play without the same keystore
- Store the keystore file securely (backup recommended)

## 2. Convert Keystore to Base64

Convert the keystore file to base64 for GitHub Secrets:

```bash
# Convert keystore to base64 (copy the output)
base64 -i release.keystore

# Example output (copy this entire string):
# /u7+AQAAAIEAAAAAAAAAAAAAAABQAFnTRm2M1NGYwYTNFbU5qWmxNV1F5WmpFeE4yTm1ZbUZtT0dNek1HTUFBQUdkZUxKbldRQUFCUUV3Z2dUOU1BNEdDaXNHQVFRQktnSVJBUUVGQUFTQ0JPbkxhR2IrT2xUQW83dzlTUXRLcWY5UWdxQWdRZE1RVFhYanI4d0Myai9BanB2ZVMxdDBBSG1LYUZDVVBpYUM5SG8wY0lLY0tWMTJXVi9pODcyRW5BcmRvWDZ0RVdjcHBEbGxqcisxUEd3c3ljakhPWHZvcTRjVTR1Znp5c2dsUlpSVHRUSG9VRzR4MVh0TE45WGFmeVpSUVdLQnBtOUVUdEVDMzBRS3d1cmN2MVRxY3RMSjZKdWpuN0lwTVEweXVBa3RRajZ2SGVuQlZnMkkzSHRMNEV1RnhZRE9qcVFESHNLQ2JGeVl6V2FXek12V2ttZmdPeUtNKy9HRjk5ZVdPam1VV2xkRVFXUHppUUdCZXBhSFZJQW1RS0VOOGpxMVlyK0lia1kxdE9oOWswRmVpUlJDNGxYa29CVkN3N2dheHU3ZjZRRGlSeHZLL3VCRFREcDYwSkdPaURjRXJpV3RHZFpwb2lzQlYvZkNOck5rMXZhZnVGbWxYcmlndkVEQVdKYm5uV0dURm5lS1BIb3orZHBtVGpMQ0NqOHRuTWFOejRkRHprdU5LSWZheWFBTzJheUpoSCtTR2U0NUZjdEtlUVYwMlZieXEzWWpDUnNVaEtiZHVvenRhejNmVVNlZ2xORHNzWmJ3V1N6Q3k4VEhxS1BSUlB2eDlaLzFQNyt2M2hiaWVHeDArRUM0L09DdGFUS0E4elliWlNTbGVvZEtkUUtrcEZ0UzFiS1VJQjZRbms4NjBIWGdDY3JIcWh4WVpKdnlhMTZBdEZCWUhHdEthSjdqTTFJSnl5YjI3MU1WbjBHQnpKaTBWeFVqd2l0K2hvTmJkMTg1bUhJR3hmOHpWUUJUSmlrT1hoSk9PQ0RlTVJUdUVsNFMyck1vN05EdEgyWXg1MTNwN3Z6SnlDZDlKTFhVYVRjVXI0TngrOTBmUEYvZG5FdlZFYjJpNnhVRWJqNFg5b0ZYMnhIMm1BWDRxUzJ4QzB3ZjV6VTZIbk93V1NEc0NVQzZNUGFnZ1JmRkdpRHI3VFdKZVRhUE9MZnNFamlXSGFpd0toYkJoekdHZjdmSDRDVk5QVkdTRWF2MzBDVndHSXlKQi9kSmFHcXAyMWRpdHNvanNPNFRPMm14dU53NjBySzAyS3FrWGE1Si9mUElFVkFPMm5EYUs0blYwbjdYU3VKL21iMDJ6aTc0Q1kvRm9IRjJ6TjBOVU1rdHo0MUdCb3NoT0dvSlNNSHA4bWlma2VjdHNsQ0FoQk1aSTVML2pFSEwzTGYwWE81L1YwTFpXSDFRczVkMkZYcHo5ZHRHR1FlbXVBWkRsSXJPMVFieU8zcm5IdlVzY044TENha1RDRy9xTzBRNjBwbXQydzQvLzNJdjVMNFIwVm5HTVdpOHBNVW9yVHFQV2ZNc1hxeW1EUm01U3lSemJQR2p1cG5tak5udURwM2R0KzA5UjhUSWl1YVR1a3dZRldpdnRRd0wzVTVSV0RFODBaNE55Z25JbE94SjRia3Z2NjRNRGk5ZHZDRmpLZXIzN2FnRjdKazA3cEN0dG9GSTRMbzVmMlJoMlczd3FTNjFTYTRBRGxzVmdWSlhMUlJ2OEpDNzU4ZlAxcEZSVVprZEZQZzJMc2szNE95bXN6S1Jvdzcxc1JEMWEzT200TFhidmNkVllxSXR4L1dVSTE4U2szV2F6R3dDK3JqRElSb2MwNVpOaHo2V1g1KzlqZnhWZEVkVmRqaGFXaUJoUmlSTjhjZTFoN29MbXRGbDNFaVBqcGdqWHhSQnVGdXYwVTNUWGYyQ3djWEk0U3BMdzgvdk1OangzZ0RuVzFYeGR3aUJaMzNXM2VvRjFMUzFxUnkwajlROHR5Ty9seWRDZTJtdld4SmVlRFdNcFNWMlpjSlluV3hxR0RXSlBHQUZweXdVVlFOQjIvMXdnM2FGOUhNR2EyZGc1RFc1bVE4d25YOUZ5SWlpVGNuRFJpQ25KOFp3Q1pVWW0rWGdaV0wzRC8wcHZFVGR1dEJyczFsVE9DcEhCNmVuK084T0Y1V1RhZWk0d1RlNVZFZHNWczErbUFaWnRaK2Q5a0gzcGN2VjlyY25TZ29TaFZNdGlLQUtacmZaeXdJdjFzcXBBNlpaVW9DaWQ0ZWNCNFhXY0VvK0hsc0lkTCswSGMvV1B1R1NoRk5HUS9ZR2hQaGNsN0FSZWpDS3puZFVveWJjaGZhQ05RM1ZCNXpzY2NRMmIwWEo4K2pkOWs4QUFBQUJBQVZZTGpVd09RQUFBekV3Z2dNdE1JSUNGYUFEQWdFQ0FnaGlrU29LTjFwTWxqQU5CZ2txaGtpRzl3MEJBUXNGQURCRU1Rc3dDUVlEVlFRR0V3SlZVekVKTUFjR0ExVUVDQk1BTVFrd0J3WURWUVFIRXdBeENUQUhCZ05WQkFvVEFERUpNQWNHQTFVRUN4TUFNUWt3QndZRFZRUURFd0F3SUJjTk1qWXdOREV3TVRnME1EVXdXaGdQTWpBMU16QTRNall4T0RRd05UQmFNRVF4Q3pBSkJnTlZCQVlUQWxWVE1Ra3dCd1lEVlFRSUV3QXhDVEFIQmdOVkJBY1RBREVKTUFjR0ExVUVDaE1BTVFrd0J3WURWUVFMRXdBeENUQUhCZ05WQkFNVEFEQ0NBU0l3RFFZSktvWklodmNOQVFFQkJRQURnZ0VQQURDQ0FRb0NnZ0VCQUp2NHNwYlExdHhhY0JUSVpEem9RNW9wQTM2RGM1MHFNQkJoRXN5MmxPSVBmc1lGYkV1bVlpWE9mdzR1UGJZS1dIbnpHVU94eDZSYmhnRlc4NTVrZjkydFY3TTJ4WWNUSXRpcW1aUDk0cGx6VktXZUhEV253V1pVZldNWXJZLzNTRW9RNWU4ckdOeXV5V0VrdW9HMDdDclQrTm1KVjZmcVhmWGY3SmNibzdrQ3lZNVh5RW5WUXFLQ1NrdURLZ1hCRlNXY1N5SDVwT2I1WXdYMkVkU0N1aG4yYUQ5cmhmcjBZVjVFZFU5UzYxQVEvZ3YrbGQzSlR2YVkxaSsweVdoQU52aTUveVZ5NXZwY3p6S2g3ZnR6cnlHQTNqL1ZqQ3MrREpiTEVNeGRRUWlQQnI1UkxJd1E3Vlo0V1dIR2wvS2F2jFSNzRIVW15M0pRaEx4dlAwdWw4RUNBd0VBQWFNaE1COHdIUVlEVlIwT0JCWUVGQ1ZJOExCdVRvVkhYWlduT2ZnR1JqL213MUM2TUEwR0NTcUdTSWIzRFFFQkN3VUFBNElCQVFCVjZOUlhMbHlJY0lGT2w2VUJQbHdsVEVaVTdIK3d5STVNdDJDN2hrVCszR2k5ckxMcExFOGZzSUV5czVvbGVRcGJ5T3ExbjdNR25XblN1OVhEbmdGN2doY0hjNEM5cWltYjlxK0hIU3dOak1LcFlrd24yMnB2dHBtVVZIdllJUm52R1dDM2NGVXR2RXE5MVNLSHJIT1NsRGtmeXhNZ0FHMVZSbVVjNnZzVUJtd0J4ZHBBL0w2d0RWdmVJS3N6UXN2YkpnelQ4TlFkd2JHNERSblVNUDNJTFMrcVI2ZktaSnpmZnFTZkZlRlVFWGlOZ25WSWxzRVJQRmxieU82dHdOWTMrNnA5QldOS2JLUWd2M05Qa3crS2NUNFFWWUQ2YzIyRU9UY1dLK2V6VFFiQUhYOFpEZnNLd1JIN2pkakZYeWp2eXNGLzlLV1dUNkNIbjNud2REeFBadC9VeEw1b05EMGF4Ry9YcEFOYndRTTZQV2c9
```

## 3. Add Secrets to GitHub

Go to your GitHub repository: Settings > Secrets and variables > Actions > New repository secret

Add these 4 secrets:

| Secret Name | Value |
|-------------|-------|
| `KEYSTORE_BASE64` | The base64 output from step 2 |
| `KEYSTORE_PASSWORD` | Your store password (e.g., `myStorePass123`) |
| `KEY_ALIAS` | Your key alias (e.g., `bengaliCalendarKey`) |
| `KEY_PASSWORD` | Your key password (e.g., `myKeyPass123`) |

**Security Notes:**
- Never share these secrets
- Use strong passwords
- Keep a backup of your keystore file
- Store passwords in a secure password manager

## 4. Automated Builds with GitHub Actions

The project includes a GitHub Actions workflow (`.github/workflows/android-build.yml`) that automatically builds APK/AAB files.

### Automatic Debug Builds
- **Trigger**: Every push to `main` branch
- **Output**: `app-debug.apk`
- **Signing**: Default debug signing (no keystore needed)
- **Use Case**: Development testing

### Manual Release Builds
1. Go to **Actions** tab in GitHub
2. Select **"Build Android APK"** workflow
3. Click **"Run workflow"**
4. Choose build type:
   - **debug**: Generates `app-debug.apk`
   - **release**: Generates both `app-release.apk` AND `app-release.aab`

### Build Outputs Summary

| Build Type | Files Generated | Use Case | Signing |
|------------|----------------|----------|----------|
| Debug | `app-debug.apk` | Development testing | Default debug |
| Release | `app-release.apk` + `app-release.aab` | Local testing + Play Store | Production keystore |

## 5. Installation & Distribution

### For Local Testing
```bash
# Download app-release.apk from GitHub Actions
# Install on connected device
adb install app-release.apk

# Alternative: Install via USB debugging
# 1. Enable USB debugging on device
# 2. Connect device to computer
# 3. Run the install command
```

### For Google Play Store
```bash
# Download app-release.aab from GitHub Actions
# Upload to Google Play Console
# AAB is Google Play's preferred format (smaller, better optimization)
```

**AAB Benefits:**
- Smaller download size for users
- Dynamic delivery (only download needed components)
- Better optimization for different devices
- Required for Google Play Store

## 6. Local Build Commands

If you prefer building locally instead of using GitHub Actions:

```bash
# Build APK for local testing
cd android
./gradlew assembleRelease

# Build AAB for Play Store
cd android
./gradlew bundleRelease

# Install APK locally
adb install app/build/outputs/apk/release/app-release.apk

# Build outputs location:
# APK: android/app/build/outputs/apk/release/app-release.apk
# AAB: android/app/build/outputs/bundle/release/app-release.aab
```

## 7. Important Notes

### Keystore Security
- **Never commit keystore files** to git
- **Never share keystore passwords**
- **Back up your keystore file** securely
- **Same keystore must be used** for all app updates
- **Store keystore in multiple secure locations**

### APK vs AAB
- **APK**: Can be installed directly on devices
- **AAB**: Cannot be installed directly, only for Google Play Store
- **AAB benefits**: Smaller size, dynamic delivery, better optimization
- **Recommendation**: Use AAB for Play Store, APK for local testing

### Version Management
- Increment version code for each release
- Update version name for user-facing updates
- Keep track of which keystore was used for each version
- Maintain a changelog for releases

## 8. Build Configuration Files

### `android/app/build.gradle`
- Configured to use environment variables for keystore
- Same keystore used for both debug and release builds
- Falls back to default signing if no keystore provided
- Supports both APK and AAB generation

### `.github/workflows/android-build.yml`
- Automated CI/CD pipeline
- Supports both debug and release builds
- Handles keystore setup securely
- Generates appropriate artifacts
- Conditional signing based on available secrets

## 9. Troubleshooting

### Common Issues

#### Build Fails
- Check GitHub Secrets are correctly set
- Ensure keystore passwords match exactly
- Verify base64 encoding doesn't have extra characters
- Check build logs in GitHub Actions for specific errors

#### Keystore Issues
- Verify keystore file is not corrupted
- Check passwords are correct
- Ensure keystore alias matches
- Test keystore locally first

#### Installation Issues
- Enable USB debugging on device
- Check device connection
- Verify APK is signed correctly
- Try uninstalling old version first

### Debug Steps
1. Check GitHub Actions logs
2. Verify all secrets are set correctly
3. Test keystore locally
4. Check build configuration
5. Verify device compatibility

## 10. Best Practices

### Security
- Use strong, unique passwords
- Rotate passwords periodically
- Limit access to keystore
- Use GitHub environment restrictions

### Maintenance
- Regularly update dependencies
- Keep backup of keystore
- Monitor build performance
- Update documentation

### Deployment
- Test release builds thoroughly
- Use proper versioning
- Keep changelog updated
- Monitor Play Store console

## 11. Quick Reference

### Commands
```bash
# Generate keystore
keytool -genkey -v -keystore release.keystore -storepass PASS -alias ALIAS -keypass PASS -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=App Name, OU=Dev, O=Company, C=US"

# Convert to base64
base64 -i release.keystore

# Local build APK
cd android && ./gradlew assembleRelease

# Local build AAB
cd android && ./gradlew bundleRelease

# Install APK
adb install app-release.apk
```

### GitHub Secrets Required
- `KEYSTORE_BASE64`
- `KEYSTORE_PASSWORD`
- `KEY_ALIAS`
- `KEY_PASSWORD`

### File Locations
- Keystore: `release.keystore` (local only)
- APK: `android/app/build/outputs/apk/release/app-release.apk`
- AAB: `android/app/build/outputs/bundle/release/app-release.aab`
- Workflow: `.github/workflows/android-build.yml`

---

**This guide covers the complete production build setup for the Bengali English Calendar app. Follow these steps carefully to ensure secure and consistent builds.**
