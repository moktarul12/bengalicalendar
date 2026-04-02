const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for web assets
config.resolver.assetExts.push(
  // Images
  'png',
  'jpg',
  'jpeg',
  'gif',
  'webp',
  'svg',
  'ico',
  // Fonts
  'ttf',
  'otf',
  'woff',
  'woff2',
  'eot',
  // Audio
  'mp3',
  'wav',
  'ogg',
  'aac',
  // Video
  'mp4',
  'webm',
  'mov',
  'avi'
);

// Configure source extensions
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'json');

// Configure transformer for web
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;
