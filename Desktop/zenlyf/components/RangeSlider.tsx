import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface RangeSliderProps {
  minValue?: number;
  maxValue?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
  width?: number;
  height?: number;
  thumbSize?: number;
  step?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  minValue = 0,
  maxValue = 100,
  initialValue = 20,
  onValueChange,
  width = 300,
  height = 6,
  thumbSize = 24,
  step = 1,
}) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const translateX = useSharedValue(
    ((initialValue - minValue) / (maxValue - minValue)) * (width - thumbSize)
  );

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number }
  >({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      const newTranslateX = context.startX + event.translationX;
      translateX.value = Math.max(0, Math.min(width - thumbSize, newTranslateX));
    },
    onEnd: () => {
      const percentage = translateX.value / (width - thumbSize);
      const rawValue = minValue + percentage * (maxValue - minValue);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(minValue, Math.min(maxValue, steppedValue));
      
      // Update translateX to snap to the stepped position
      translateX.value = ((clampedValue - minValue) / (maxValue - minValue)) * (width - thumbSize);
      
      runOnJS(setCurrentValue)(clampedValue);
      if (onValueChange) {
        runOnJS(onValueChange)(clampedValue);
      }
    },
  });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const selectedRangeStyle = useAnimatedStyle(() => ({
    width: translateX.value + thumbSize / 2,
  }));

  const selectedPercentage = ((currentValue - minValue) / (maxValue - minValue)) * 100;

  return (
    <View style={{ width, alignItems: 'center' }}>
      <View
        style={{
          width,
          height,
          backgroundColor: '#CBCBCB', // Unselected track color
          borderRadius: height / 2,
          position: 'relative',
          justifyContent: 'center',
        }}
      >
        {/* Selected Range Background */}
        <Animated.View
          style={[
            {
              height,
              backgroundColor: '#B3DAFF', // Selected range color
              borderRadius: height / 2,
              position: 'absolute',
              left: 0,
            },
            selectedRangeStyle,
          ]}
        />
        
        {/* Draggable Thumb */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: thumbSize,
                height: thumbSize,
                backgroundColor: '#0077FF', // Thumb color
                borderRadius: thumbSize / 2,
                top: -((thumbSize - height) / 2),
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              thumbStyle,
            ]}
          />
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default RangeSlider;