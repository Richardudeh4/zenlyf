import React, { useRef, useCallback, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import { colors } from "../Config/colors";
import { fonts } from "../Config/Fonts";
import Feather from "@expo/vector-icons/Feather";

const { width, height } = Dimensions.get("window");

interface SliderVisualizationProps {
  value: number;
  minValue: number;
  maxValue: number;
  unit: string;
  onValueChange: (newValue: number) => void;
  step?: number; // Optional step size for increments
}

const SliderVisualization = ({
  value,
  minValue,
  maxValue,
  unit,
  onValueChange,
  step = 1, // Default step size is 1
}: SliderVisualizationProps) => {
  const incrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const decrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDecrement = useCallback(() => {
    if (value > minValue) {
      const newValue = Math.max(minValue, value - step);
      // Round to appropriate decimal places based on step size
      const roundedValue = step < 1 ? Math.round(newValue * 10) / 10 : Math.round(newValue);
      onValueChange(roundedValue);
    }
  }, [value, minValue, onValueChange, step]);

  const handleIncrement = useCallback(() => {
    if (value < maxValue) {
      const newValue = Math.min(maxValue, value + step);
      // Round to appropriate decimal places based on step size
      const roundedValue = step < 1 ? Math.round(newValue * 10) / 10 : Math.round(newValue);
      onValueChange(roundedValue);
    }
  }, [value, maxValue, onValueChange, step]);

  const startLongPressIncrement = useCallback(() => {
    // Clear any existing intervals
    if (incrementIntervalRef.current) {
      clearInterval(incrementIntervalRef.current);
    }

    // Start long press after 500ms
    longPressTimeoutRef.current = setTimeout(() => {
      let currentValue = value;
      incrementIntervalRef.current = setInterval(() => {
        if (currentValue < maxValue) {
          const newValue = Math.min(maxValue, currentValue + step);
          currentValue = step < 1 ? Math.round(newValue * 10) / 10 : Math.round(newValue);
          onValueChange(currentValue);
        }
      }, 100); // Increment every 100ms during long press
    }, 500);
  }, [value, maxValue, onValueChange, step]);

  const startLongPressDecrement = useCallback(() => {
    // Clear any existing intervals
    if (decrementIntervalRef.current) {
      clearInterval(decrementIntervalRef.current);
    }

    // Start long press after 500ms
    longPressTimeoutRef.current = setTimeout(() => {
      let currentValue = value;
      decrementIntervalRef.current = setInterval(() => {
        if (currentValue > minValue) {
          const newValue = Math.max(minValue, currentValue - step);
          currentValue = step < 1 ? Math.round(newValue * 10) / 10 : Math.round(newValue);
          onValueChange(currentValue);
        }
      }, 100); // Decrement every 100ms during long press
    }, 500);
  }, [value, minValue, onValueChange, step]);

  const stopLongPress = useCallback(() => {
    // Clear all intervals and timeouts
    if (incrementIntervalRef.current) {
      clearInterval(incrementIntervalRef.current);
      incrementIntervalRef.current = null;
    }
    if (decrementIntervalRef.current) {
      clearInterval(decrementIntervalRef.current);
      decrementIntervalRef.current = null;
    }
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
      longPressTimeoutRef.current = null;
    }
  }, []);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      stopLongPress();
    };
  }, [stopLongPress]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleDecrement}
        onPressIn={startLongPressDecrement}
        onPressOut={stopLongPress}
        onLongPress={() => {}} // Required for onPressIn/onPressOut to work properly
        delayLongPress={500}
      >
        <Feather name="minus" size={20} color="white" />
      </TouchableOpacity>
      <Text style={styles.valueText}>
        {`${step < 1 ? value.toFixed(1) : Math.round(value)} ${unit}`}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleIncrement}
        onPressIn={startLongPressIncrement}
        onPressOut={stopLongPress}
        onLongPress={() => {}} // Required for onPressIn/onPressOut to work properly
        delayLongPress={500}
      >
        <Feather name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gray1, // Red as in the sample
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: fonts.onestBold,
  },
  valueText: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fonts.onestLight,
    textAlign: "center",
    minWidth: 100,
  },
});

export default SliderVisualization;
