import { Canvas, Rect, LinearGradient, vec } from "@shopify/react-native-skia";
import { StatusBar } from "expo-status-bar";
import type { StyleProp, ViewStyle } from "react-native";
import { Platform, View, StyleSheet, Text, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  Layout,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  NativeViewGestureHandler,
} from "react-native-gesture-handler";
import { useCallback, useEffect, useMemo, useState } from "react";

import IconButton from "../../components/Buttons/IconButton";
import PointerElement from "../../components/Pointer/PointerElement";
import type { StackNavigationProps, Routes } from "../../helpers/Routes";
import type { Pointer } from "../../helpers/types";
import { setArray, setArrayWorklet } from "../../helpers/stateHelpers";

const orangeGradient = ["#ff9068", "#fd746c"];

//Limit of 12 from rn gesture handler
const MAX_POINTERS = 12;

export default function Home({
  navigation,
}: StackNavigationProps<Routes, "Home">): React.ReactElement {
  // Initialize tracking pointers
  const trackedPointers: Animated.SharedValue<Pointer[]> = useSharedValue([]);
  const active = useSharedValue(false);

  // const resetPoints = useCallback(() => {
  // }, [trackedPointers]);
  const tempArray: Pointer[] = [];
  for (let i = 0; i < MAX_POINTERS; i++) {
    tempArray.push({
      visible: false,
      x: 0,
      y: 0,
      isWinner: false,
    });
  }
  trackedPointers.value = tempArray;
  // useEffect(() => {
  //   console.log("Reset points 2: ", trackedPointers.value);
  // }, []);

  //Gesture Handling
  const [isGestureActive, setIsGestureActive] = useState(false);
  const [isPickerStarted, setIsPickerStarted] = useState(false);
  const [isDelayTimerDone, setIsDelayTimerDone] = useState(false);
  const [delayTimerId, setDelayTimerId] = useState<NodeJS.Timeout>();

  const pickWinner = useCallback(() => {
    const visibleIndex: number[] = [];
    // Filter indizes of valid and visible pointers, also reset isWinner on every object
    for (let i = 0; i < trackedPointers.value.length; i++) {
      if (trackedPointers.value[i]!.visible) {
        visibleIndex.push(i);
      }
    }

    const randomIndex = Math.floor(Math.random() * visibleIndex.length);
    if (trackedPointers.value[randomIndex]) {
      trackedPointers.value[randomIndex] = {
        ...trackedPointers.value[randomIndex]!,
        isWinner: true,
      };
      // trackedPointers[randomIndex]?.value = {isWinner...}
    }
    // if (visiblePointers[randomIndex] && visiblePointers[randomIndex]?.value) {
    // }
  }, [trackedPointers]);

  useEffect(() => {
    if (isPickerStarted) {
      pickWinner();
    }
  }, [isPickerStarted, pickWinner]);

  const handleDelayFinish = useCallback(() => {
    setIsPickerStarted(true);
  }, []);

  const resetOrStartTimer = useCallback(() => {
    clearTimeout(delayTimerId);
    setIsPickerStarted(false);
    const newTimerId = setTimeout(handleDelayFinish, 1500);
    setDelayTimerId(newTimerId);
  }, [delayTimerId, handleDelayFinish]);

  const clearTimer = useCallback(() => {
    clearTimeout(delayTimerId);
  }, [delayTimerId]);

  const { width, height } = Dimensions.get("screen");
  //Insets
  const insets = useSafeAreaInsets();
  const headerMarginStyle: StyleProp<ViewStyle> = {
    marginTop: insets.top + 32,
  };

  const footerMarginStyle: StyleProp<ViewStyle> = {
    paddingBottom:
      Platform.OS === "android" ? insets.bottom + 10 : insets.bottom + 4,
  };

  //Animated styles
  const overlayOpacity = useSharedValue(1);
  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const activeColor = useAnimatedStyle(() => ({
    backgroundColor: isGestureActive ? "green" : "red",
  }));

  // Handle activation of gesture
  useAnimatedReaction(
    () => {
      return active.value;
    },
    (currentValue, previousValue) => {
      if (currentValue !== previousValue) {
        runOnJS(setIsGestureActive)(currentValue);
      }
    }
  );

  const gesture = Gesture.Manual()
    .onTouchesDown((e, manager) => {
      // console.log("Pointers: ", trackedPointers.value);
      for (const touch of e.changedTouches) {
        // const newArr = runOnJS(setArray)(trackedPointers.value, touch.id, {
        //   x: 3,
        // });

        // trackedPointers.value = trackedPointers.value.map((v, i) =>
        //   i === touch.id
        //     ? { ...v, ...{ x: touch.x, y: touch.y, visible: true } }
        //     : v
        // );
        trackedPointers.value = setArrayWorklet(
          trackedPointers.value,
          touch.id,
          { x: touch.x, y: touch.y, visible: true }
        );

        // runOnJS(console.log)(newArr);

        // setArray(trackedPointers.value, touch.id, {
        //   visible: true,
        //   x: touch.x,
        //   y: touch.y,
        // });
        // trackedPointers.value[touch.id]! = {
        //   ...trackedPointers.value[touch.id]!,
        //   visible: true,
        //   x: touch.x,
        //   y: touch.y,
        // };
      }

      if (e.numberOfTouches >= 2) {
        active.value = true;
        // Reset timer if more fingers are placed
        runOnJS(resetOrStartTimer)();
        manager.activate();
      }

      //Disable overlay as soon as a finger is down and
      overlayOpacity.value = withTiming(0);
    })
    .onTouchesMove((e, _manager) => {
      for (const touch of e.changedTouches) {
        // trackedPointers.value = setArray(trackedPointers.value, touch.id, {
        //   visible: true,
        //   x: touch.x,
        //   y: touch.y,
        // });
        trackedPointers.value = setArrayWorklet(
          trackedPointers.value,
          touch.id,
          { x: touch.x, y: touch.y, visible: true }
        );
      }
    })
    .onTouchesUp((e, manager) => {
      for (const touch of e.changedTouches) {
        // trackedPointers.value = setArray(trackedPointers.value, touch.id, {
        //   visible: true,
        //   x: touch.x,
        //   y: touch.y,
        // });
        trackedPointers.value = setArrayWorklet(
          trackedPointers.value,
          touch.id,
          { x: touch.x, y: touch.y, visible: false }
        );
      }
      if (e.numberOfTouches < 2) {
        active.value = false;
      }
      if (e.numberOfTouches === 0) {
        manager.end();
        overlayOpacity.value = withTiming(1);
      }

      if (e.numberOfTouches >= 2) {
        runOnJS(resetOrStartTimer)();
      }
    })
    // TODO: start and end timer
    .onStart(() => {
      // active.value = true;
    })
    .onEnd(() => {
      // active.value = false;
      runOnJS(clearTimer)();
      runOnJS(setIsPickerStarted)(false);
    });

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <StatusBar style="light" />

        {/* Background gradient */}
        <Canvas style={styles.canvasContainer}>
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, height)}
              colors={orangeGradient}
            />
          </Rect>
        </Canvas>

        <Animated.View style={[styles.absoluteContainer]}>
          {/* Draw Pointers */}
          {trackedPointers.value.map((pointer, index) => (
            <PointerElement
              pointer={pointer}
              isActive={active}
              key={index}
              isPicking={isPickerStarted}
            />
          ))}

          {/* Header */}
          <Animated.View
            style={[styles.headerContainer, headerMarginStyle, animatedOpacity]}
          >
            <Text style={styles.headerText}>Chosen</Text>
          </Animated.View>

          {/* Center instruction text */}
          <Animated.View style={[animatedOpacity]}>
            <Text style={styles.instructionText}>
              Place at least 2 fingers on the screen to get started
            </Text>
          </Animated.View>

          {/* Footer */}
          <Animated.View style={[activeColor, { width: "100%", height: 10 }]} />
          <Animated.View
            style={[styles.footerContainer, footerMarginStyle, animatedOpacity]}
          >
            <IconButton text="Themes" iconName="md-brush-outline" />
            <IconButton
              text="Settings"
              iconName="md-settings-outline"
              onPress={() => navigation.navigate("Settings")}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </GestureDetector>
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
  },
  instructionText: {
    opacity: 0.85,
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingHorizontal: 30,
  },
});
