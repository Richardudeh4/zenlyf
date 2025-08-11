import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { CSSProperties } from "react";
import { fonts } from "../Config/Fonts";
const { width, height } = Dimensions.get("window");

interface PProps {
  children: any;
  style?: CSSProperties;
  numberOfLines?: number;
  onPress?: any;
}

const baseWidth = 360;
export default function P({ children, style, numberOfLines, onPress }: PProps) {
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: fonts.onestLight,
          fontSize: 16,
          color: "rgba(22, 24, 23, 1)",
          lineHeight: 18,
          letterSpacing: 0,
        },
        // @ts-ignore
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({});
