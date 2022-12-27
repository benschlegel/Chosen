import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useEffect } from "react";
import { setBackgroundColorAsync, setPositionAsync } from "expo-navigation-bar";

import Home from "./routes/Home/Home";
import Settings from "./routes/Settings/Settings";
import type { Routes } from "./Routes";

const Stack = createNativeStackNavigator<Routes>();

function App() {
  //Sets transparency on android on startup
  const fixAndroidNavbar = useCallback(async () => {
    // enables edge-to-edge mode
    await setPositionAsync("absolute");
    // transparent backgrounds to see through
    await setBackgroundColorAsync("transparent");
  }, []);

  useEffect(() => {
    fixAndroidNavbar();
  });
  return (
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
  );
}

registerRootComponent(App);
export default App;
