// Theme configuration for Bengali English Calendar App

export const COLORS = {
  // Primary Colors - Inspired by Bengali culture
  primary: '#E63946', // Red - auspicious color
  primaryLight: '#FF6B6B',
  primaryDark: '#C1121F',
  
  // Secondary Colors
  secondary: '#F77F00', // Orange - marigold flowers
  secondaryLight: '#FCBF49',
  secondaryDark: '#D62828',
  
  // Accent Colors
  accent: '#00B4D8', // Blue - water/rivers
  accentLight: '#90E0EF',
  accentDark: '#0077B6',
  
  // Background Colors
  background: '#FAFAFA',
  backgroundDark: '#121212',
  surface: '#FFFFFF',
  surfaceDark: '#1E1E1E',
  
  // Text Colors
  text: '#1A1A1A',
  textSecondary: '#666666',
  textLight: '#FFFFFF',
  textMuted: '#999999',
  
  // Festival Colors
  festivalReligious: '#9C27B0',
  festivalCultural: '#E91E63',
  festivalNational: '#006A4E',
  festivalSeasonal: '#4CAF50',
  
  // Calendar Colors
  today: '#E63946',
  selectedDay: '#00B4D8',
  weekend: '#FF6B6B',
  holiday: '#F77F00',
  
  // Gradient Colors
  gradientStart: '#E63946',
  gradientEnd: '#F77F00',
  
  // Additional UI Colors
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  
  // Bengali Traditional Colors
  sindoor: '#E31837',
  turmeric: '#FFD700',
  kumkum: '#FF6B6B',
  alpana: '#FFFFFF',
};

export const FONTS = {
  // Font sizes
  title: 28,
  heading: 24,
  subheading: 20,
  body: 16,
  caption: 12,
  small: 10,
  
  // Font weights
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 12,
  },
};

export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};

export default {
  COLORS,
  FONTS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATION,
};
