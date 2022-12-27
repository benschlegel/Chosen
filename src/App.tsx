import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { setBackgroundColorAsync } from "expo-navigation-bar";

import Home from "./routes/Home/Home";
import Settings from "./routes/Settings/Settings";
import type { Routes } from "./Routes";

const Stack = createNativeStackNavigator<Routes>();

function App() {
  useEffect(() => {
    setBackgroundColorAsync("rgba(0, 0, 0, 0.005)");
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
