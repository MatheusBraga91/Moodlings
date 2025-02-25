import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from './lib/supabaseClient'; // Import the Supabase client
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/userSlice'; // Import the Redux action
import { setDetail, setTheme } from '@/redux/cardThemeSlice';
import { styles } from './LoginScreenStyles'; // Import the styles
import { FontContext } from './_layout'; // Import the FontContext

// Import the background image
const backgroundImage = require('../assets/backgrounds/login.png');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();
  const dispatch = useDispatch();
  const fontLoaded = useContext(FontContext); // Check if font is loaded

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

    if (!fontLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
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
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>WELCOME!</Text>
        <View style={styles.inputContainer}>
          <Text style={{ color: 'black', marginBottom: 5 }}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <Text style={{ color: 'black', marginBottom: 5 }}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignup} disabled={loading}>
              <Text style={styles.buttonText}>
                {loading ? <Text>Signing Up...</Text> : <Text>Sign Up</Text>}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ImageBackground>
  );


};

export default LoginScreen;
function dispatch(arg0: { payload: { name: string; avatar: import("./MainScreen/avatarMap").AvatarType; dateOfBirth: string; zodiacSymbol: string; }; type: "user/setUserInfo"; }) {
  throw new Error('Function not implemented.');
}

