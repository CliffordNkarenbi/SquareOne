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
    colorSecondary: DefaultTheme.colors.notification,
    textSecondary: 'rgba(0,0,0,0.6)',
    colorTertiary: DefaultTheme.colors.border,
    textTertiary: 'rgba(0,0,0,0.4)',
    backgroundSecondary: DefaultTheme.colors.card,
  },
};

export const AppDarkTheme: AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    colorSecondary: DarkTheme.colors.notification,
    textSecondary: 'rgba(255,255,255,0.6)',
    colorTertiary: DarkTheme.colors.border,
    textTertiary: 'rgba(255,255,255,0.4)',
    backgroundSecondary: DarkTheme.colors.card,
  },
};

export const useAppTheme = () => useNavTheme() as AppTheme;
