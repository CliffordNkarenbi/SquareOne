import { Redirect, Stack } from "expo-router";
import { useAuth } from "../providers/AuthProvider";

export default function AuthLayout() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Redirect href="/(protected)/(tabs)" />;
    }


    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{headerTitle: '', headerBackButtonDisplayMode: 'minimal', headerStyle: { backgroundColor: '#262B1C'}, headerTintColor: 'white'}}  />
        </Stack>
    )
}