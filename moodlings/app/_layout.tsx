import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store";
import * as Font from "expo-font";
import React, { useEffect, useState, createContext } from "react";
import { Text, View } from "react-native";
import 'react-native-gesture-handler';

// Create a context for font loading
export const FontContext = createContext<boolean>(false);

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
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <FontContext.Provider value={fontLoaded}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Define routes here if needed */}
        </Stack>
      </FontContext.Provider>
    </Provider>
  );
}