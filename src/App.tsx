import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { setBackgroundColorAsync, setPositionAsync } from "expo-navigation-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Platform } from "react-native";

import Settings from "./routes/Settings/Settings";
import type { Routes } from "./helpers/Routes";
import Home from "./routes/Home/Home";
const Stack = createNativeStackNavigator<Routes>();

function App() {
  //Sets transparency on android on startup
  const fixAndroidNavbar = useCallback(async () => {
    if (Platform.OS === "android") {
      // enables edge-to-edge mode
      await setPositionAsync("absolute");
      // transparent backgrounds to see through, only this specific value is fully transparent on android
      await setBackgroundColorAsync("rgba(0, 0, 0, 0.005)");
    }
  }, []);

  useEffect(() => {
    fixAndroidNavbar();
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ animation: "none" }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

registerRootComponent(App);
export default App;
