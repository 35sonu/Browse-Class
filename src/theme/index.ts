export const colors = {
  // Primary colors inspired by Indian saffron and spiritual themes
  primary: '#FF6B35', // Vibrant saffron orange
  primaryLight: '#FF8A5C',
  primaryDark: '#E55100',
  secondary: '#00C853', // Indian green
  secondaryLight: '#40E870',
  accent: '#9C27B0', // Royal purple
  
  // Backgrounds with subtle gradients
  background: '#FFF8F0', // Warm off-white
  surface: '#FFFFFF',
  card: '#FFFFFF',
  
  // Text colors
  text: '#2E2E2E',
  textSecondary: '#666666',
  textLight: '#999999',
  border: '#E0E0E0',
  
  // Status colors
  error: '#F44336',
  success: '#4CAF50',
  warning: '#FF9800',
  
  // Level colors with Indian inspiration
  beginner: '#4CAF50', // Calm green like meditation
  intermediate: '#FF9800', // Turmeric orange
  advanced: '#E91E63', // Bold pink like festival colors
  
  // Gradient colors
  gradientStart: '#FF6B35',
  gradientEnd: '#F7931E',
  cardGradientStart: '#FFFFFF',
  cardGradientEnd: '#FFF8F0',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};