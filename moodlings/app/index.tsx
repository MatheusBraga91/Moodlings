import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // WE NEED TO IMPLEMENT THE LOGIC HERE AFTER WE CREATE THE SUPABASE , BUT FOR NOW LETS JUST KEEP THIS LIKE THIS AS PLACEHOLDER
    console.log('Logging in with:', email, password);
    router.push('/onboarding/create'); // Redirect to Onboarding Screen after login
  };

  const handleSignup = () => {
    // WE NEED TO IMPLEMENT THE LOGIC HERE AFTER WE CREATE THE SUPABASE , BUT FOR NOW LETS JUST KEEP THIS LIKE THIS AS PLACEHOLDER
    console.log('Sign up with:', email, password);
    router.push('/onboarding/create'); // Redirect to Onboarding Screen after Sign up
  };


  return (
    <View>
      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />

      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

export default LoginScreen;