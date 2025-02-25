import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from './lib/supabaseClient'; // Import the Supabase client
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/userSlice'; // Import the Redux action
import { setDetail, setTheme } from '@/redux/cardThemeSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // Input validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password fields.');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific errors
        if (error.message === 'Email not confirmed') {
          Alert.alert('Error', 'Please confirm your email to sign in.');
        } else if (error.message === 'Invalid login credentials') {
          Alert.alert('Error', 'Invalid email or password.');
        } else {
          Alert.alert('Error', error.message);
        }
        return;
      }

      // Success: Retrieve user info from Supabase
      const { data: userInfo, error: userError } = await supabase
        .from('MoodUsers')
        .select('*')
        .eq('id', data.session?.user.id)
        .single();

      if (userError) {
        console.error('Error fetching user info:', userError.message);
        Alert.alert('Error', 'Failed to retrieve user information.');
        return;
      }

      // Save user info to Redux
      dispatch(
        setUserInfo({
          name: userInfo.name,
          avatar: userInfo.avatar,
          dateOfBirth: userInfo.date_of_birth,
          zodiacSymbol: userInfo.zodiac_symbol,
          mood: userInfo.mood, // Include mood here

        })
      );

      dispatch(setTheme(userInfo.theme || 'babyblue')); // Default to 'babyblue' if theme is null
      dispatch(setDetail(userInfo.detail || null)); // Default to null if detail is null

      // Redirect to the main screen
      router.push('/MainScreen/mainScreen');
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSignup = async () => {
    // Input validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password fields.');
      return;
    }

    setLoading(true); // Start loading

    try {
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        // Handle specific errors
        if (error.message === 'User already registered') {
          Alert.alert('Error', 'Email already in use.');
        } else {
          Alert.alert('Error', error.message);
        }
      } else {
        // Check if the user session is available
        const { data: userSession, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !userSession.session) {
          Alert.alert('Error', 'Failed to retrieve user session.');
          return;
        }

        console.log('User session after signup:', userSession.session);

        // Success: Redirect to onboarding screen
        Alert.alert('Success', 'Signup successful!');
        router.push('/onboarding/create');
      }
    } catch (err) {
      // Handle unexpected errors
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address" // Use email keyboard
        autoCapitalize="none" // Prevent auto-capitalization
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        autoCapitalize="none" // Prevent auto-capitalization
      />
      <Button title="Log In" onPress={handleLogin} />
      <Button
        title={loading ? 'Signing Up...' : 'Sign Up'} // Show loading state
        onPress={handleSignup}
        disabled={loading} // Disable button when loading
      />
    </View>
  );
};

export default LoginScreen;
function dispatch(arg0: { payload: { name: string; avatar: import("./MainScreen/avatarMap").AvatarType; dateOfBirth: string; zodiacSymbol: string; }; type: "user/setUserInfo"; }) {
  throw new Error('Function not implemented.');
}

