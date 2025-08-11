import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ViewStyle,
} from "react-native";
import { colors } from "../Config/colors";
import { fonts } from "../Config/Fonts";
import P from "./P";
import { SvgXml } from "react-native-svg";
import { svg } from "../Config/Svg";
import DatePickerModal from "../components/DatePickerModal";
import { formatDate } from "../utils/DateUtils";


const { width, height } = Dimensions.get("window");

interface DateInputProps {
  label: string;
  placeholder: string;
  value: string;
  onSelect: (date: string) => void;
  error?: boolean;
  errorText?: string;
  contStyle?: ViewStyle;
}

export default function DateInput({
  label,
  placeholder,
  value,
  onSelect,
  error,
  errorText,
  contStyle,
}: DateInputProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, contStyle]}>
      <P style={styles.label}>{label}</P>
      <TouchableOpacity
        style={[styles.inputContainer, error && styles.inputError]}
        onPress={() => setModalVisible(true)}
      >
        <P
          style={[
            styles.inputText,
            !value && styles.placeholderText,
          ]}
        >
          {value ? formatDate(value) : placeholder}
        </P>
        <SvgXml
          xml={
            svg.chevronDown ||
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'
          }
          width={20}
          height={20}
        />
      </TouchableOpacity>
      {error && errorText && <P style={styles.errorText}>{errorText}</P>}

      <DatePickerModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={onSelect}
        selectedDate={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontFamily: fonts.onestBold,
    fontSize: 14,
    marginBottom: 8,
    color: colors.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    borderWidth: 1,
    borderColor: colors.stroke,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.error || "red",
  },
  inputText: {
    fontFamily: fonts.onestLight,
    fontSize: 14,
    color: colors.black,
  },
  placeholderText: {
    color: "#00000080",
  },
  errorText: {
    fontFamily: fonts.onestBold,
    fontSize: 14,
    color: colors.error || "red",
    marginTop: 4,
  },
});