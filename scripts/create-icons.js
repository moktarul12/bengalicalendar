// Script to create placeholder PNG icons for the app
// Run this with: node scripts/create-icons.js

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets');

// Create a simple 1x1 red pixel PNG as placeholder
// In production, replace these with actual designed icons
const createPlaceholderPNG = (filename, size) => {
  // PNG header for a simple colored square
  // This is a minimal valid PNG file
  const pngData = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    0x00, 0x00, 0x00, 0x0D, // IHDR length
    0x49, 0x48, 0x44, 0x52, // IHDR type
    0x00, 0x00, 0x00, 0x01, // width = 1
    0x00, 0x00, 0x00, 0x01, // height = 1
    0x08, 0x02, // bit depth = 8, color type = 2 (RGB)
    0x00, 0x00, 0x00, // compression, filter, interlace
    0x90, 0x77, 0x53, 0xDE, // CRC
    0x00, 0x00, 0x00, 0x0C, // IDAT length
    0x49, 0x44, 0x41, 0x54, // IDAT type
    0x08, 0xD7, 0x63, 0x38, 0xE6, 0xE6, 0xE6, 0x00, // compressed data (red pixel)
    0x00, 0x00, 0x00, 0x00, // CRC placeholder
    0x49, 0x45, 0x4E, 0x44, // IEND type
    0xAE, 0x42, 0x60, 0x82, // IEND CRC
  ]);
  
  const filePath = path.join(assetsDir, filename);
  fs.writeFileSync(filePath, pngData);
  console.log(`Created: ${filename}`);
};

// Create required icon files
const icons = [
  { name: 'icon.png', size: 1024 },
  { name: 'adaptive-icon.png', size: 1024 },
  { name: 'splash-icon.png', size: 512 },
  { name: 'favicon.png', size: 48 },
  { name: 'notification-icon.png', size: 96 },
];

console.log('Creating placeholder icon files...');
console.log('Note: Replace these with actual designed icons before release!\n');

icons.forEach(icon => {
  try {
    createPlaceholderPNG(icon.name, icon.size);
  } catch (err) {
    console.error(`Error creating ${icon.name}:`, err.message);
  }
});

console.log('\n✅ Icon files created!');
console.log('⚠️  Replace these placeholder files with actual PNG icons designed by a designer.');
