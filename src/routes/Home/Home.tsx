import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, Button, Dimensions } from "react-native";

import type { Routes, StackNavigationProps } from "../../Routes";

const { width, height } = Dimensions.get("screen");

const orangeGradient = ["#ff9068", "#fd746c"];

export default function Home({
  navigation,
}: StackNavigationProps<Routes, "Home">): React.ReactElement {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Canvas style={styles.canvasContainer}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={["#ff9068", "#fd746c"]}
          />
        </Rect>
      </Canvas>
      <View style={styles.absoluteContainer}>
        <View>
          <Button
            title="Go to Settings"
            onPress={() => navigation.navigate("Settings")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  canvasContainer: { flex: 1 },
  absoluteContainer: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
