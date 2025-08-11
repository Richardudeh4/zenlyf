import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ViewStyle,
  ScrollView,
} from "react-native";
import { colors } from "../Config/colors";
import { fonts } from "../Config/Fonts";
import P from "./P";
import { SvgXml } from "react-native-svg";
import { svg } from "../Config/Svg";
import SelectableTag from "./SelectableTag";
import SingleSelectBottomSheet from "./SingleSelectBottomSheet";
import MultiSelectBottomSheet from "./MultiSelectBottomSheet";

const { width, height } = Dimensions.get("window");

interface SelectInputProps {

  placeholder: string;
  options: Array<{ label: string; value: string }>;
  selectedValues: string[];
  onSelect: (values: string[]) => void;
  error?: boolean;
  errorText?: string;
  contStyle?: ViewStyle;
  multiSelect?: boolean;
  maxSelections?: number;
  searchPlaceholder?: string;
  disabled?: boolean;
}

export default function SelectInput({
  placeholder,
  options,
  selectedValues,
  onSelect,
  error,
  errorText,
  contStyle,
  multiSelect = false,
  maxSelections = 10,
  searchPlaceholder = "Search",
  disabled = false,
}: SelectInputProps) {
  const [modalVisible, setModalVisible] = useState(false);

  // Get selected labels for display
  const getSelectedLabels = () => {
    return selectedValues.map(
      (value) => options.find((option) => option.value === value)?.label || ""
    );
  };

  // Handle single selection
  const handleSingleSelect = (value: string) => {
    onSelect([value]);
  };

  // Handle multi selection
  const handleMultiSelect = (values: string[]) => {
    onSelect(values);
  };

  // Remove a selected item (for multi-select)
  const handleRemoveItem = (index: number) => {
    const newValues = [...selectedValues];
    newValues.splice(index, 1);
    onSelect(newValues);
  };

  return (
    <View style={[styles.container, contStyle]}>
      {/* <P style={styles.label}>{label}</P> */}

      {/* Input field that opens the bottom sheet */}
      <TouchableOpacity
        style={[
          styles.inputContainer,
          error && styles.inputError,
          disabled && styles.inputDisabled
        ]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        {selectedValues.length > 0 && !multiSelect ? (
          <P style={[styles.inputText, disabled && styles.disabledText]} numberOfLines={1}>
            {getSelectedLabels()[0]}
          </P>
        ) : selectedValues.length > 0 && multiSelect ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.selectedItemsScroll}
            scrollEnabled={!disabled}
          >
            {getSelectedLabels().map((label, index) => (
              <SelectableTag
                key={index}
                label={label}
                onRemove={disabled ? undefined : () => handleRemoveItem(index)}
              />
            ))}
          </ScrollView>
        ) : (
          <P style={[styles.placeholderText, disabled && styles.disabledText]}>{placeholder}</P>
        )}
        <SvgXml
          xml={
            svg.chevronDown ||
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'
          }
          width={20}
          height={20}
          style={{position: "absolute", right: 16}}
        />
      </TouchableOpacity>

      {error && errorText && <P style={styles.errorText}>{errorText}</P>}

      {/* Bottom sheet for selection */}
      {multiSelect ? (
        <MultiSelectBottomSheet
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={handleMultiSelect}
          title={label}
          options={options}
          selectedValues={selectedValues}
          maxSelections={maxSelections}
          searchPlaceholder={searchPlaceholder}
        />
      ) : (
        <SingleSelectBottomSheet
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelect={handleSingleSelect}
          options={options}
          selectedValue={selectedValues[0]}
          searchPlaceholder={searchPlaceholder}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontFamily: fonts.kameronSemibold,
    fontSize: 14,
    marginBottom: 8,
    color: colors.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    
    minHeight: 56,
    borderWidth: 1,
    borderColor: colors.stroke,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: colors.error || "red",
  },
  inputDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
    opacity: 0.6,
  },
  inputText: {
    flex: 1,
    fontFamily: fonts.onestLight,
    fontSize: 14,
    color: colors.black,
  },
  placeholderText: {
    flex: 1,
    fontFamily: fonts.onestBold,
    fontSize: 14,
    color: colors.gray1,
    maxWidth: '90%',
  },
  disabledText: {
    color: '#9E9E9E',
  },
  errorText: {
    fontFamily: fonts.kameronRegular,
    fontSize: 14,
    color: colors.error || "red",
    marginTop: 4,
  },
  selectedItemsScroll: {
    flexDirection: "row",
    flexWrap: "nowrap",
    flex: 1,
    paddingVertical: 8,
    paddingRight: 16,
  },
});