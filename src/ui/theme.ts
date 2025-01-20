export const theme = {
  color: {
    text: {
      primary: '#141414',
      secondary: 'white',
      inactive: '#B4B4B4',
    },
    border: {
      primary: '#B4B4B4',
    },
    background: {
      primary: 'white',
      primaryDarker: '#E5E5E5',
    },
  },
  spacing: {
    xxxs: 4,
    xxs: 8,
    xs: 12,
    sml: 16,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 56,
  },
  fontSizes: {
    xs: 12,
    sml: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
} as const;

export type Theme = typeof theme;
