// Bengali Calendar Theme - Traditional Panjika Style
// Inspired by old paper, earthy tones, and traditional Bengali colors
// Flat design - no gradients

export const COLORS = {
  // ===== PRIMARY - Traditional Red (Sindoor/Lal) =====
  primary: '#C41E3A',
  primaryDark: '#8B0000',
  primaryLight: '#E63946',
  primarySoft: '#FFF5F5',

  // ===== SECONDARY - Golden Yellow (Turmeric/Haldi) =====
  secondary: '#D4A017',
  secondaryDark: '#B8860B',
  secondaryLight: '#F4C430',
  secondarySoft: '#FFFDE7',

  // ===== ACCENT - Deep Green (Sacred) =====
  accent: '#228B22',
  accentDark: '#006400',
  accentLight: '#32CD32',
  accentSoft: '#F0FFF0',

  // ===== BACKGROUND - Old Paper/Cream (Parchment) =====
  backgroundAlt: '#FAF0E6',
  surface: '#FFFFFF',
  surfaceAlt: '#FFFEF7',

  // ===== TEXT - Ink-like =====
  text: '#2C1810',              // Dark brown like ink
  textSecondary: '#5C4033',
  textMuted: '#8B7355',
  textLight: '#A0826D',
  textInverse: '#FFFFFF',
  textBengali: '#3E2723',       // For Bengali text

  // ===== BORDERS =====
  border: '#D2B48C',
  borderLight: '#E8DCC8',
  borderDark: '#B8860B',
  divider: '#E8DCC8',

  // ===== OVERLAY =====
  overlay: 'rgba(44, 24, 16, 0.7)',

  // ===== FESTIVAL TYPE COLORS =====
  festivalReligious: '#C41E3A',
  festivalCultural: '#D4A017',
  festivalNational: '#1E3A5F',
  festivalSeasonal: '#228B22',

  // ===== CALENDAR SPECIFIC =====
  today: '#C41E3A',
  todayBg: '#FFF5F5',
  todayBorder: '#C41E3A',
  selectedDay: '#C41E3A',
  selectedBg: '#FFEBEE',
  weekend: '#CD5C5C',
  weekendBg: '#FFF5F5',
  holiday: '#D4A017',
  holidayBg: '#FFFDE7',
  bengaliDay: '#228B22',
  bengaliBg: '#F0FFF0',
  moonDay: '#4A4A4A',
  moonBg: '#F5F5F5',

  // ===== UI STATUS =====
  success: '#228B22',
  successBg: '#F0FFF0',
  warning: '#D4A017',
  warningBg: '#FFFDE7',
  error: '#C41E3A',
  errorBg: '#FFF5F5',
  info: '#1E3A5F',
  infoBg: '#F0F8FF',

  // ===== EVENT TYPE COLORS =====
  eventFestival: '#C41E3A',
  eventHistorical: '#1E3A5F',
  eventPerson: '#8B4513',
  eventCultural: '#D4A017',
};

// ===== FONTS =====
export const FONTS = {
  xs: 10,
  sm: 12,
  body: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  heading: 28,
  display: 32,
  bengali: 16,
  bengaliLarge: 20,
  bengaliSmall: 14,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

// ===== SPACING =====
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// ===== BORDER RADIUS =====
export const BORDER_RADIUS = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
};

// ===== SHADOWS - Subtle, paper-like =====
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: '#2C1810',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#2C1810',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#2C1810',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#2C1810',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
};

// ===== ANIMATIONS =====
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Bengali numerals
export const BENGALI_NUMERALS = ['\u09E6', '\u09E7', '\u09E8', '\u09E9', '\u09EA', '\u09EB', '\u09EC', '\u09ED', '\u09EE', '\u09EF'];

export const toBengaliNumeral = (num: number): string => {
  return num.toString().split('').map(d => BENGALI_NUMERALS[parseInt(d)]).join('');
};

export const getGreeting = (hour: number): { bn: string; en: string } => {
  if (hour >= 4 && hour < 12) return { bn: '\u09B6\u09C1\u09AD \u09B8\u0995\u09BE\u09B2', en: 'Good Morning' };
  if (hour >= 12 && hour < 17) return { bn: '\u09B6\u09C1\u09AD \u09A6\u09C1\u09AA\u09C1\u09B0', en: 'Good Afternoon' };
  if (hour >= 17 && hour < 20) return { bn: '\u09B6\u09C1\u09AD \u09B8\u09A8\u09CD\u09A7\u09CD\u09AF\u09BE', en: 'Good Evening' };
  return { bn: '\u09B6\u09C1\u09AD \u09B0\u09BE\u09A4', en: 'Good Night' };
};

export default {
  COLORS,
  FONTS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATIONS,
  BENGALI_NUMERALS,
  toBengaliNumeral,
  getGreeting,
};
