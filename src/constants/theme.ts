import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Core editorial palette
    text: '#24211F',
    textSecondary: '#6F6963',
    textTertiary: '#9A948E',

    background: '#F7F5EF',
    backgroundElement: '#F1EEE8',
    backgroundSelected: '#EAE6DF',

    surface: '#FBFAF6',
    border: '#DDD9D1',

    // Main accents
    accent: '#35121F',
    accentMuted: '#B97580',
    accentSoft: '#F6E9EA',

    // Supporting accents
    success: '#4D8065',

    onAccent: '#FFFFFF',

    overlay: 'rgba(36, 33, 31, 0.42)',
  },

  dark: {
    text: '#F5F2EC',
    textSecondary: '#C6BFB8',
    textTertiary: '#8F8983',

    background: '#171513',
    backgroundElement: '#211E1B',
    backgroundSelected: '#2A2622',

    surface: '#1D1A18',
    border: '#3B3631',

    accent: '#E8D7DD',
    accentMuted: '#B97580',
    accentSoft: '#39242B',

    success: '#7FA68F',

    onAccent: '#24111A',

    overlay: 'rgba(0, 0, 0, 0.55)',
  },
} as const;

export type ThemeColor =
  keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'Helvetica Neue',
    serif: 'Georgia',
    rounded: 'Arial Rounded MT Bold',
    mono: 'Menlo',
  },

  android: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },

  default: {
    sans: 'system-ui',
    serif: 'serif',
    rounded: 'system-ui',
    mono: 'monospace',
  },

  web: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    serif: 'Georgia, Times New Roman, serif',
    rounded: 'system-ui',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 24,
  six: 32,
  seven: 40,
  eight: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
} as const;

export const Typography = {
  display: {
    fontFamily: Fonts?.serif,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: '400' as const,
    letterSpacing: -1,
  },

  title: {
    fontFamily: Fonts?.serif,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '400' as const,
    letterSpacing: -0.5,
  },

  heading: {
    fontFamily: Fonts?.serif,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400' as const,
    letterSpacing: -0.25,
  },

  body: {
    fontFamily: Fonts?.serif,
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '400' as const,
  },

  bodySans: {
    fontFamily: Fonts?.sans,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400' as const,
  },

  label: {
    fontFamily: Fonts?.sans,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '600' as const,
    letterSpacing: 2,
  },

  caption: {
    fontFamily: Fonts?.sans,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: '600' as const,
    letterSpacing: 1.4,
  },
} as const;

export const Shadows = {
  subtle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.035,
    shadowRadius: 18,
    elevation: 3,
  },

  floating: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.06,
    shadowRadius: 22,
    elevation: 3,
  },
} as const;

export const BottomTabInset =
  Platform.select({
    ios: 50,
    android: 72,
  }) ?? 0;

export const MaxContentWidth = 560;