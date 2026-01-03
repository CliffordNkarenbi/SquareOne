import { DarkTheme, DefaultTheme, type Theme, useTheme as useNavTheme } from '@react-navigation/native';

export type AppTheme = Theme & {
  colors: Theme['colors'] & {
    colorSecondary: string;
    textSecondary: string;
    colorTertiary: string;
    textTertiary: string;
    backgroundSecondary: string;
  };
};

export const AppLightTheme: AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Brand overrides
    primary: '#0F150E',
    background: '#F1EDE6',
    card: '#FEFBF6',
    text: '#0F150E',
    border: '#E0E0E0',
    // Extended tokens
    colorSecondary: DefaultTheme.colors.notification,
    textSecondary: 'rgba(0,0,0,0.6)',
    colorTertiary: '#E0E0E0',
    textTertiary: 'rgba(0,0,0,0.4)',
    backgroundSecondary: '#FEFBF6',
  },
};

export const AppDarkTheme: AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    // Brand overrides
    primary: '#F8F7F5',
    background: '#0D120C',
    card: '#0F150E',
    text: '#FFFFFF',
    border: '#38383A',
    // Extended tokens
    colorSecondary: DarkTheme.colors.notification,
    textSecondary: 'rgba(255,255,255,0.6)',
    colorTertiary: '#38383A',
    textTertiary: 'rgba(255,255,255,0.4)',
    backgroundSecondary: '#0F150E',
  },
};

export const useAppTheme = () => useNavTheme() as AppTheme;
