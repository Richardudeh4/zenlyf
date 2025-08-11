

import { svg } from "@/Config/Svg";
import React, { CSSProperties, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SvgXml } from "react-native-svg";
import { fonts } from "../Config/Fonts";
import { colors } from "../Config/colors";
import P from "./P"; // Ensure P is correctly implemented or replace with a Text component


interface PProps {
  label?: any;
  error?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?:(e:any) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  type?: "password" | "phone";
  contStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  leftIcon?: any;
  rightIcon?: any;
  editable?: boolean;
  keyboardType?: any;
  customInputStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  numberOfLines?: number;
  onTogglePasswordVisibility?: () => void;
  onPress?: () => void;
  autoCapitalize?: string;
  maxLenght?: number;
  defaultCountryCode?: string;
  errorText?: any;
  onDefualtCodePress?: ()=>void
}

const baseHeight = 800;
const baseWidth = 360;
const { width, height } = Dimensions.get("window");
export default function Input({
  label,
  error,
  value,
  onBlur,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  type,
  contStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  editable,
  keyboardType,
  customInputStyle,
  numberOfLines,
  onTogglePasswordVisibility,
  onPress,
  labelStyle,
  autoCapitalize,
  maxLenght,
  defaultCountryCode,
  errorText,
  onDefualtCodePress
}: PProps) {
  const [focus, setFocus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    if (onTogglePasswordVisibility) {
      // If the onTogglePasswordVisibility prop is provided, call it
      onTogglePasswordVisibility();
    } else {
      // Otherwise, toggle the password visibility as usual
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  return (
    // @ts-ignore
    <View style={[styles.inputCont, contStyle]} onPress={onPress}>
      {/* @ts-ignore */}
      <View style={{paddingHorizontal:24, borderWidth:0, borderColor: "transparent",color:"black", backgroundColor: ""}}>
      {label && <P style={[styles.label,labelStyle]}>{label}</P>}
      </View>
   
      <View
        style={[
          styles.customInput,
          {
            borderColor: error
              ? colors.red
              : focus
              ? colors.primary
              : colors.stroke,
          },
          // @ts-ignore
          customInputStyle,
        ]}
      >
        {type === "phone" ? (
          <>
            <TouchableOpacity style={styles.countryCodeContainer} onPress={onDefualtCodePress}>
              <Text style={styles.countryFlag}>{defaultCountryCode}</Text>
              <Text style={styles.countryCodeText}>▼</Text>
            </TouchableOpacity>
            <View style={styles.divider} />

            {/* Phone number input */}
            <TextInput
              style={[styles.input,{ width: "80%" }]}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              keyboardType="phone-pad"
              onFocus={() => setFocus(true)}
              onBlur={(e) => {
                setFocus(false);
                if (onBlur) onBlur(e);
              }}
              placeholderTextColor={colors.gray1}
              cursorColor={colors.stroke}
            />
          </>
        ) : (
          <>
            {leftIcon}
            <TextInput
              value={value}
              numberOfLines={numberOfLines}
              onBlur={(e) => {
                setFocus(false);
                if (onBlur) onBlur(e);
              }}
              onChangeText={onChangeText}
              secureTextEntry={type === "password" && !isPasswordVisible}
              onFocus={() => setFocus(true)}
              placeholder={placeholder}
              placeholderTextColor="grey"
              cursorColor={colors.black}
              editable={editable}
              keyboardType={keyboardType}
              autoCapitalize="none"
              maxLength={maxLenght}
              style={[
                styles.input,
                {
                  width: type === "password" ? "100%" : "100%",
                  pointerEvents: editable === false ? "none" : "auto",
                },
                // @ts-ignore
                inputStyle,
                {
                  width:
                    rightIcon && leftIcon
                      ? "75%"
                      : leftIcon || rightIcon
                      ? "88%"
                      : "95%",
                },
              ]}
            />
            {rightIcon}
            {type === "password" && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{
                  right: 30,
                  position: "absolute",
                  width: 20,
                  height: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SvgXml
                  xml={isPasswordVisible ? svg.eye : svg.eyeOff}
                  style={{}}
                  pointerEvents="none"
                />
              </TouchableOpacity>
            )}
            
          </>
        )}
      </View>
      {error && <P style={styles.errorText}>{errorText}</P>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputCont: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    lineHeight: 18,
    marginBottom:-10,
  },
  customInput: {
    width: "105%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 59,
    paddingLeft: (14 / baseWidth) * width,
    fontSize: 16,
    fontFamily: fonts.onestLight,
    alignItems: "center",
    color: colors.black,
    borderRadius: 10,
    borderWidth:1,
    borderColor: "#0000001F",
  },
  countryCodeContainer: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth:0.5,
    borderRightWidth:0,
    paddingVertical:17,
    borderRadius:10,
    borderColor:"#A4A4A4",
    flexDirection: "row",
    minWidth: 80,
  },
  countryCodeText: {
    fontSize: 12,
    color: colors.black,
    fontFamily: fonts.onestBold,
    marginLeft: 4,
  },
  countryFlag: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fonts.onestBold,
  },
  divider: {
    width: 1,
    height: "50%",
    backgroundColor: "#D8DADC",
  },
  errorText: {
    fontSize: 14,
    color: colors.red,
    fontFamily: fonts.onestBold,
    marginTop: 4,
  },
});
