import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import type { StackNavigationProps, Routes } from "../../helpers/Routes";

const Settings = ({ navigation }: StackNavigationProps<Routes, "Settings">) => {
  const gesture = Gesture.Tap().onStart((e) => {
    console.log(e.numberOfPointers);
  });
  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <Text>Home</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "green", flex: 1, justifyContent: "center" },
});

export default Settings;
