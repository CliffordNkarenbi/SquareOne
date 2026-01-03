declare global {
  namespace ReactNavigation {
    interface Theme {
      colors: Theme['colors'] & {
        colorSecondary: string;
        textSecondary: string;
        colorTertiary: string;
        textTertiary: string;
        backgroundSecondary: string;
      };
    }
  }
}
