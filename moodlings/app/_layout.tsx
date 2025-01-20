import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store"; // Import your Redux store
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

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
      <Stack>
        {/* Define routes here if needed */}
      </Stack>
    </Provider>
  );
}
