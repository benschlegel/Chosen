import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";

import type { Pointer } from "../../helpers/types";

type PointerElementProps = {
  pointer: Pointer;
  isActive: Animated.SharedValue<boolean>;
  isPicking: boolean;
};

export default function PointerElement({
  pointer,
  isActive,
  isPicking,
}: PointerElementProps) {
  let backgroundColor = "blue";
  if (isActive) {
    backgroundColor = "red";
    if (isPicking) {
      backgroundColor = "green";
    }
  } else {
    backgroundColor = "blue";
  }
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: pointer.x },
      { translateY: pointer.y },
      {
        scale: pointer.visible
          ? withSpring(isActive.value ? 1.3 : 1)
          : withSpring(0, { overshootClamping: true }),
        // * (active.value ? 1.3 : 1),
      },
    ],
    backgroundColor: pointer.isWinner ? "purple" : backgroundColor,
  }));

  return <Animated.View style={[styles.pointer, animatedStyle]} />;
}

const styles = StyleSheet.create({
  pointer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "red",
    position: "absolute",
    marginStart: -30,
    marginTop: -30,
  },
});
