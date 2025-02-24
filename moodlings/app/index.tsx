import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from './lib/supabaseClient'; // Import the Supabase client

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleLogin = () => {
    // TODO: Implement login logic
    console.log('Logging in with:', email, password);
    router.push('/onboarding/create'); // Redirect to Onboarding Screen after login
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
