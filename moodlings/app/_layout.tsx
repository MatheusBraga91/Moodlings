import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import 'react-native-gesture-handler';

// Global Styles
const globalStyles = {
  text: {
    fontFamily: "fink-heavy",
  },
};

export default function RootLayout() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        "fink-heavy": require("../assets/fonts/FinkHeavy.ttf"),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);

  if (!fontLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{
        headerShown: false, // Hide the header for all screens
      }}>
        {/* Define routes here if needed */}
      </Stack>
    </Provider>
  );
}
