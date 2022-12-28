import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";

import { Ball } from "../../components/Ball/Ball";
import type { Routes, StackNavigationProps } from "../../Routes";

const Settings = ({ navigation }: StackNavigationProps<Routes, "Settings">) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Ball />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "green", flex: 1, justifyContent: "center" },
});

export default Settings;
