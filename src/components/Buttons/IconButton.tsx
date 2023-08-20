import React from "react";
import type { StyleProp, TextStyle } from "react-native";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import Ionicons from "@expo/vector-icons/Ionicons";

interface IconButtonProps {
  text?: string;
  onPress?: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

const IconButton = ({
  text = "Button",
  onPress,
  iconName = "md-settings-outline",
  size = 40,
  color = "white",
}: IconButtonProps): React.ReactElement => {
  const textColorStyle: StyleProp<TextStyle> = {
    color: color,
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.iconContainer} accessible accessibilityRole="button">
        <Ionicons name={iconName} size={size} color={color} />
      </View>
      <Text style={[styles.buttonText, textColorStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 28,
    marginRight: 28,
    marginBottom: 6,
  },
  buttonText: {
    textAlign: "center",
    marginTop: 6,
    color: "white",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconButton;
