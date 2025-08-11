import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import { colors } from "../Config/colors";
import { fonts } from "../Config/Fonts";
import P from "./P";
import { SvgXml } from "react-native-svg";
import { svg } from "../Config/Svg";

interface SelectableTagProps {
  label: string;
  onRemove: () => void;
}

export default function SelectableTag({ label, onRemove }: SelectableTagProps) {
  return (
    <View style={styles.container}>
      <P numberOfLines={1} style={styles.label}>
        {label}
      </P>
      <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
        <SvgXml
          xml={
            svg.close ||
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 6L18 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'
          }
          width={16}
          height={16}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    
  },
  label: {
    fontFamily: fonts.onestLight,
    fontSize: 14,
    color: colors.primary,
    marginRight: 8,
  },
  removeButton: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});