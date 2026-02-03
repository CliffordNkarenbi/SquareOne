import { supabase } from '@/lib/supabase';
import { useAppTheme } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import Authpagelogo from 'assets/images/authpagelogo.svg';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SignUpScreen() {
  const theme = useAppTheme();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({ email, password, });

      if (error) Alert.alert(error.message)
      if (!session) Alert.alert('Please check your inbox for email verification!')

      // After successful login, navigate to the app
      // router.replace('/(protected)/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#262B1C' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-10 justify-between ">
          {/* Header Section */}
          <View className="items-center pt-14 pb-0">
            <Text ><Authpagelogo width={88} height={88} /></Text>
          </View>

          {/* Form Section */}
          <View className="flex-1 justify-center pb-0">
            {/* Email Input */}
            <View>
              <TextInput
                style={{
                  borderBottomColor: '#666',
                  borderBottomWidth: 1,
                }}
                placeholder="Email address"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={!loading}
                className="text-white text-base pb-1"
              />
            </View>

            {/* Password Input */}
            <View className='mb-0 pb-0'>
              <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#666', borderBottomWidth: 1, paddingTop:40 }}>
                <TextInput
                  style={{
                    flex: 1,
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                  className="text-white text-base pb-1"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={!password} className="ml-2 ">
                  <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={20} color={password ? '#ccc' : '#666'}  />
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-3 mt-2 ">
                <Text className="text-gray-400 text-xs">Already have an account?</Text>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text className="text-gray-400 text-xs">Login</Text>
                  </TouchableOpacity>
                </Link>
            </View>
                  
            <View className='flex-row justify-between items-center pt-11 '>      
                {/* Sign Up Button */}
                <TouchableOpacity
                onPress={handleSignUp}
                disabled={loading}
                className="bg-[#1B1F14] py-4 rounded-2xl active:opacity-70"
                style={{ opacity: loading ? 0.6 : 1, width: '46%', height: 45 }}
                >
                <Text className="text-white text-center font-medium text-sm">Sign Up</Text>
                </TouchableOpacity>

                {/* Google Sign Up Button */}
                <TouchableOpacity
                onPress={handleGoogleSignUp}
                disabled={loading}
                className="bg-[#1B1F14] py-4 rounded-2xl flex-row items-center justify-center active:opacity-70"
                style={{ opacity: loading ? 0.6 : 1, width: '46%', height: 45 }}
                >
                <Ionicons name="logo-google" size={16} color="white" />
                </TouchableOpacity>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
