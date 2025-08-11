import { Text, StyleProp, TextStyle } from "react-native";
import React from "react";
import { fonts } from "../Config/Fonts";
import { colors } from "../Config/colors";

interface PProps {
  children: any;
  style?: StyleProp<TextStyle>;
}

export default function H4({ children, style }: PProps) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.onestBold,
          fontSize: 16,
          color: colors.black,
          letterSpacing: 0,
        },
        style as TextStyle,
      ]}
    >
      {children}
    </Text>
  );
}