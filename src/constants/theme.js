// src/constants/theme.js

// Brand Colors
export const COLORS = {
  // Primary
  primary: '#1054c2', // Crimson Red - Buttons, icons, highlights
  
  // Secondary
  secondary: '#00AEEF', // Sky Blue - Info banners, links
  
  // Accent
  accent: '#7C3AED', // Electric Violet - Category highlights, badges
  
  // Text Colors
  textDark: '#121212', // Charcoal Black - Main text, headers
  textMedium: '#4B5563', // Medium dark for secondary text
  textLight: '#9CA3AF', // Light gray for less important text
  
  // Background Colors
  background: '#F9F9F9', // Soft White - Page background
  cardBackground: '#FFFFFF', // Pure white for cards
  
  // UI Elements
  border: '#D1D5DB', // Cool Gray - Input borders, dividers
  
  // Status Colors
  success: '#10B981', // Green for success states
  warning: '#F59E0B', // Amber for warnings
  error: '#EF4444', // Red for errors
  info: '#3B82F6', // Blue for info


  //Purple Shades
  pnormal: '#6200ee',
  // Gradients (as objects with start and end colors)
  gradients: {
    primary: {
      start: '#E50914',
      end: '#FF4D4D'
    },
    accent: {
      start: '#7C3AED',
      end: '#9F7AEA'
    }
  }
};

// Typography
export const FONTS = {
  // Font Families
  primary: 'Poppins',
  secondary: 'Inter',
  
  // For development, fallback to system fonts until we import custom fonts
  primaryFallback: 'System', 
  secondaryFallback: 'System',
  
  // Font Weights
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

// Typography Styles
export const TYPOGRAPHY = {
  // Headings
  h1: {
    fontFamily: FONTS.primary, 
    fontSize: 32,
    fontWeight: FONTS.bold,
    lineHeight: 40
  },
  h2: {
    fontFamily: FONTS.primary,
    fontSize: 28,
    fontWeight: FONTS.bold,
    lineHeight: 36
  },
  h3: {
    fontFamily: FONTS.primary,
    fontSize: 24,
    fontWeight: FONTS.semiBold,
    lineHeight: 32
  },
  h4: {
    fontFamily: FONTS.primary,
    fontSize: 20,
    fontWeight: FONTS.semiBold,
    lineHeight: 28
  },
  
  // Body Text
  bodyLarge: {
    fontFamily: FONTS.secondary,
    fontSize: 18,
    fontWeight: FONTS.regular,
    lineHeight: 28
  },
  bodyMedium: {
    fontFamily: FONTS.secondary,
    fontSize: 16,
    fontWeight: FONTS.regular,
    lineHeight: 24
  },
  bodySmall: {
    fontFamily: FONTS.secondary,
    fontSize: 14,
    fontWeight: FONTS.regular,
    lineHeight: 20
  },
  
  // Other Text Styles
  button: {
    fontFamily: FONTS.primary,
    fontSize: 16,
    fontWeight: FONTS.medium,
    lineHeight: 24
  },
  caption: {
    fontFamily: FONTS.secondary,
    fontSize: 12,
    fontWeight: FONTS.regular,
    lineHeight: 16
  },
  label: {
    fontFamily: FONTS.secondary,
    fontSize: 12,
    fontWeight: FONTS.medium,
    lineHeight: 16,
    letterSpacing: 0.5
  }
};

// Spacing
export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48
};

// Border Radius
export const BORDER_RADIUS = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  round: 9999 // Fully rounded (for profile pictures, etc.)
};

// Shadows
export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8
  }
};

// Layout
export const LAYOUT = {
  fullWidth: '100%',
  container: {
    paddingHorizontal: SPACING.m
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background
  }
};

// UI Element Styles
export const UI = {
  // Buttons
  button: {
    primary: {
      backgroundColor: COLORS.primary,
      borderRadius: BORDER_RADIUS.m,
      paddingVertical: SPACING.m,
      paddingHorizontal: SPACING.l,
      ...SHADOWS.small
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLORS.primary,
      borderRadius: BORDER_RADIUS.m,
      paddingVertical: SPACING.m,
      paddingHorizontal: SPACING.l
    },
    disabled: {
      backgroundColor: COLORS.border,
      borderRadius: BORDER_RADIUS.m,
      paddingVertical: SPACING.m,
      paddingHorizontal: SPACING.l
    }
  },
  
  // Cards
  card: {
    container: {
      backgroundColor: COLORS.cardBackground,
      borderRadius: BORDER_RADIUS.m,
      padding: SPACING.m,
      ...SHADOWS.medium
    },
    featured: {
      backgroundColor: COLORS.cardBackground,
      borderRadius: BORDER_RADIUS.m,
      padding: SPACING.m,
      ...SHADOWS.large
    }
  },
  
  // Input Fields
  input: {
    container: {
      backgroundColor: COLORS.cardBackground,
      borderRadius: BORDER_RADIUS.m,
      borderWidth: 1,
      borderColor: COLORS.border,
      padding: SPACING.m
    },
    focused: {
      borderColor: COLORS.accent
    }
  },
  
  // Badges
  badge: {
    container: {
      backgroundColor: COLORS.accent,
      borderRadius: BORDER_RADIUS.round,
      paddingVertical: SPACING.xs,
      paddingHorizontal: SPACING.s
    },
    text: {
      color: COLORS.cardBackground,
      ...TYPOGRAPHY.label
    }
  }
};

// Animation Timing
export const ANIMATION = {
  fast: 200,
  medium: 300,
  slow: 500
};

// A function to get responsive sizes based on screen width
export const getResponsiveSize = (size, screenWidth) => {
  // This is a simple implementation - you might want to make this more sophisticated
  const ratio = screenWidth / 375; // Based on iPhone 8 width as baseline
  return size * ratio;
};

// Export all theme elements
export default {
  COLORS,
  FONTS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  LAYOUT,
  UI,
  ANIMATION,
  getResponsiveSize
};