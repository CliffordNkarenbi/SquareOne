import { supabase } from '@/lib/supabase';
import { useAppTheme } from '@/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
    const theme = useAppTheme();
    const router = useRouter();
    const { colors } = theme;
    const colorScheme = theme.dark ? 'dark' : 'light';
    
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
            <Text style={[styles.title, { color: colors.text }]}>
                Profile Settings
            </Text>
            
            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    Theme
                </Text>
                <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
                    Current theme: {colorScheme}
                </Text>
                <Text style={[styles.description, { color: colors.textSecondary }]}>
                    Automatically follows your system theme settings
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => supabase.auth.signOut()}
                activeOpacity={0.7}
            >
                <Text style={[styles.logoutButtonText, { color: colors.text }]}>
                    Sign Out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    sectionSubtitle: {
        fontSize: 16,
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
    },
    logoutButton: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        marginTop: 'auto',
        marginBottom: 20,
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});