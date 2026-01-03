import { AppDarkTheme, AppLightTheme } from '@/theme';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../../global.css";

import { ThemeProvider } from '@react-navigation/native';


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? AppDarkTheme : AppLightTheme}>
        <Slot />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}