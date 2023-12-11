import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import PreferenciesScreen from "./screens/PreferenciesScreen";
import IllnessesScreen from "./screens/IllnessesScreen";
import IngredientsScreen from "./screens/IngredientsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Preferencies"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Preferencies" component={PreferenciesScreen} />
        <Stack.Screen name="Illness" component={IllnessesScreen} />
        <Stack.Screen name="Ingredients" component={IngredientsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
