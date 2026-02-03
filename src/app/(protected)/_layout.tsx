import { useTheme } from '@react-navigation/native';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';

export default function ProtectedLayout() {
  const { colors } = useTheme();

  const { isAuthenticated}=useAuth();
  
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="new"
        options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
      />
    </Stack>
  );
}