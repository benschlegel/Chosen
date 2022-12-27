import { View, Text, StyleSheet, Button } from "react-native";

import type { Routes, StackNavigationProps } from "../../Routes";

export default function Home({
  navigation,
}: StackNavigationProps<Routes, "Home">): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
});
