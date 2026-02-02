import { useAppTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import Authpagelogo from 'assets/images/authpagelogo.svg';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      // Add your authentication logic here
      console.log('Sign in with:', email, password);
      // After successful login, navigate to the app
      // router.replace('/(protected)/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // Add your Google authentication logic here
      console.log('Sign in with Google');
      // After successful login, navigate to the app
      // router.replace('/(protected)/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2A332A' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-6 justify-between py-8">
          {/* Header Section */}
          <View className="items-center mt-12">
            <Text className=" mb-2"><Authpagelogo width={90} height={90}  /></Text>
          </View>

          {/* Form Section */}
          <View className="space-y-6 flex-1 justify-center">
            {/* Email Input */}
            <View>
              <TextInput
                style={{
                  borderBottomColor: '#666',
                  borderBottomWidth: 1,
                  paddingTop: 100,
                  paddingBottom:5,
                  paddingHorizontal: 0,
                }}
                placeholder="Email address"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={!loading}
                className="text-white text-base"
              />
            </View>

            {/* Password Input */}
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#666', borderBottomWidth: 1, paddingBottom:5 }}>
                <TextInput
                  style={{
                    flex: 1,
                    paddingTop: 50,
                    paddingHorizontal: 0,
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                  className="text-white text-base"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={!password} className="ml-2 ">
                  <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color={password ? '#ccc' : '#666'}  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row justify-between items-center mb-3">
                <Link href="/(auth)/forgot-password" asChild>
                  <TouchableOpacity>
                    <Text className="text-gray-400 text-xs">Forgot Password</Text>
                  </TouchableOpacity>
                </Link>
                <Link href="/(auth)/sign-up" asChild>
                  <TouchableOpacity>
                    <Text className="text-gray-400 text-xs">Sign Up</Text>
                  </TouchableOpacity>
                </Link>
              </View>
                  
            <View className='flex-row justify-between items-center gap-1 pt-11'>      
                {/* Sign In Button */}
                <TouchableOpacity
                onPress={handleSignIn}
                disabled={loading}
                className="bg-gray-800 py-4 rounded-lg active:opacity-70"
                style={{ opacity: loading ? 0.6 : 1, width: '40%' }}
                >
                <Text className="text-white text-center font-semibold text-base">Sign In</Text>
                </TouchableOpacity>

                {/* Google Sign In Button */}
                <TouchableOpacity
                onPress={handleGoogleSignIn}
                disabled={loading}
                className="bg-gray-900 py-4 rounded-lg flex-row items-center justify-center active:opacity-70"
                style={{ opacity: loading ? 0.6 : 1, width: '40%' }}
                >
                <Ionicons name="logo-google" size={24} color="white" />
                </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
