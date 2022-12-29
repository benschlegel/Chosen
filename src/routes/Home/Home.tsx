import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import { StatusBar } from "expo-status-bar";
import type { StyleProp, ViewStyle } from "react-native";
import { Platform, View, StyleSheet, Text, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { Routes, StackNavigationProps } from "../../Routes";
import IconButton from "../../components/Buttons/IconButton";

const { width, height } = Dimensions.get("screen");

const orangeGradient = ["#ff9068", "#fd746c"];

export default function Home({
  navigation,
}: StackNavigationProps<Routes, "Home">): React.ReactElement {
  const insets = useSafeAreaInsets();
  const headerMarginStyle: StyleProp<ViewStyle> = {
    marginTop: insets.top + 32,
  };

  const footerMarginStyle: StyleProp<ViewStyle> = {
    paddingBottom:
      Platform.OS === "android" ? insets.bottom + 10 : insets.bottom + 4,
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Canvas style={styles.canvasContainer}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={orangeGradient}
          />
        </Rect>
      </Canvas>
      <View style={styles.absoluteContainer}>
        <View style={[styles.headerContainer, headerMarginStyle]}>
          <Text style={styles.headerText}>Chosen</Text>
        </View>
        <View>
          <Text style={styles.instructionText}>
            Press anywhere to get started
          </Text>
        </View>
        <View style={[styles.footerContainer, footerMarginStyle]}>
          <IconButton text="Themes" iconName="md-brush-outline" />
          <IconButton
            text="Settings"
            iconName="md-settings-outline"
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
    height: "100%",
    width: "100%",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },
  footerContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    // alignContent: "space-between",
  },
  instructionText: {
    opacity: 0.85,
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
