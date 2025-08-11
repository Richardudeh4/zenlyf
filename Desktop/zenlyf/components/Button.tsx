import React, { CSSProperties, useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../Config/colors";
import P from "./P";
import { fonts } from "../Config/Fonts";
import { SvgXml } from "react-native-svg";
const { width, height } = Dimensions.get("window");
const baseHeight = 800;

interface ButtonProps {
  onPress?: () => void;
  btnText?: string;
  icon?: React.ReactNode;
  type?: "alt";
  style?: CSSProperties;
  disabled?: boolean;
  btnTextStyle?: CSSProperties;
  loading?: boolean;
}

export default function Button({
  onPress,
  btnText,
  icon,
  type,
  style,
  disabled,
  btnTextStyle,
  loading = false,
}: ButtonProps) {
  const [activeDot, setActiveDot] = useState(0);

  // Create an array of numbers [1, 2, 3] for the dots
  const dotsArray = [1, 2, 3];

  // Cycle through the dots every 500ms
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setActiveDot((prevDot) => (prevDot + 1) % dotsArray.length); // Cycle through dots
      }, 200);
      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || loading}>
      <View
        style={[
          styles.btnCont,
          {
            backgroundColor: type === "alt" ? "transparent" : colors.primary,
            borderColor: type === "alt" ? colors.primary : "transparent",
            opacity: disabled ? 0.5 : 1,
          },
          // @ts-ignore
          style,
        ]}
      >
        {loading ? (
          <View style={styles.loaderContainer}>
            {dotsArray.map((dot, index) => (
              <View
                key={dot}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      activeDot === index
                        ? type === "alt"
                          ? colors.primary
                          : colors.white
                        : type === "alt"
                        ? colors.primary
                        : "#C5D8EF",
                  },
                ]}
              />
            ))}
          </View>
        ) : (
          <>
            {btnText && (
              <P
                // @ts-ignore
                style={[
                  styles.btnText,
                  { color: type === "alt" ? colors.primary : colors.white },
                  btnTextStyle,
                ]}
              >
            {btnText}
              </P>
            )}
           {icon} 
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnCont: {
    width: "100%",
    height: (44 / baseHeight) * height,
    borderWidth: 1,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.onestBold,
  },
  loaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 30, // Space for the 3 dots
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    marginHorizontal: 2,
  },
});
