const sharp = require('sharp');
const fs = require('fs');

// Generate PNG files from SVGs
async function generateAssets() {
  // Icon 1024x1024
  await sharp('assets/icon.svg')
    .resize(1024, 1024)
    .png({ compressionLevel: 9, interlace: 'none' })
    .toFile('assets/icon.png');

  // Adaptive icon 1024x1024
  await sharp('assets/icon.svg')
    .resize(1024, 1024)
    .png({ compressionLevel: 9, interlace: 'none' })
    .toFile('assets/adaptive-icon.png');

  // Splash 1284x2778 (iPhone screen size)
  await sharp('assets/splash.svg')
    .resize(1284, 2778)
    .png({ compressionLevel: 9, interlace: 'none' })
    .toFile('assets/splash-icon.png');

  // Notification icon 96x96
  await sharp('assets/icon.svg')
    .resize(96, 96)
    .png({ compressionLevel: 9, interlace: 'none' })
    .toFile('assets/notification-icon.png');

  // Favicon 32x32
  await sharp('assets/icon.svg')
    .resize(32, 32)
    .png({ compressionLevel: 9, interlace: 'none' })
    .toFile('assets/favicon.png');

  console.log('Assets generated successfully!');
}

generateAssets().catch(console.error);
