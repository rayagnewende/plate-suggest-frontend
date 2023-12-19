import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import CustomFont from "./assets/fonts/Sansita Black.ttf";

const loadCustomFont = async () => {
  await Font.loadAsync({
    "Sansita Black": CustomFont,
  });
};

export const FontLoader = ({ children }) => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  if (!isFontLoaded) {
    return (
      <AppLoading
        startAsync={loadCustomFont}
        onFinish={() => setIsFontLoaded(true)}
        onError={(error) => console.error(error)}
      />
    );
  }

  return children;
};
