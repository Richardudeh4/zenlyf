import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
} from "react-native";
import { colors } from "../Config/colors";
import { fonts } from "../Config/Fonts";
import P from "./P";
import H4 from "./H4";
import Button from "./Button";
import { SvgXml } from "react-native-svg";
import { svg } from "../Config/Svg";
import SelectableTag from "./SelectableTag";

const { width, height } = Dimensions.get("window");

interface MultiSelectBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (values: string[]) => void;
  title: string;
  options: Array<{ label: string; value: string }>;
  selectedValues: string[];
  maxSelections?: number;
  searchPlaceholder?: string;
}

export default function MultiSelectBottomSheet({
  isVisible,
  onClose,
  onSelect,
  title,
  options,
  selectedValues,
  maxSelections = 10,
  searchPlaceholder = "Search",
}: MultiSelectBottomSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedValues, setLocalSelectedValues] =
    useState<string[]>(selectedValues);

  // Filter options based on search query (only if search is visible)
  const filteredOptions = options.length >= 10
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Handle selection of an option
  const handleSelect = (value: string) => {
    let newSelectedValues: string[] = [];

    if (value === "none") {
      // If "None" is selected, clear all selections
      newSelectedValues = [];
    } else if (localSelectedValues.includes(value)) {
      // If already selected, remove it
      newSelectedValues = localSelectedValues.filter((v) => v !== value);
    } else {
      // If not selected and under max limit, add it
      if (localSelectedValues.length < maxSelections) {
        newSelectedValues = [...localSelectedValues, value];
      } else {
        // Max selections reached
        return;
      }
    }

    setLocalSelectedValues(newSelectedValues);
  };

  // Handle confirm button press
  const handleConfirm = () => {
    onSelect(localSelectedValues);
    onClose();
  };

  // Get selected labels for display
  const getSelectedLabels = () => {
    return localSelectedValues.map(
      (value) => options.find((option) => option.value === value)?.label || ""
    );
  };

  // Remove a selected item
  const handleRemoveItem = (value: string) => {
    setLocalSelectedValues(localSelectedValues.filter((v) => v !== value));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlayTouchable} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <H4 style={styles.modalTitle}>{title}</H4>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <SvgXml
                    xml={
                      svg.close ||
                      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 6L18 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'
                    }
                    width={24}
                    height={24}
                  />
                </TouchableOpacity>
              </View>

              {/* Selected Items */}
              {localSelectedValues.length > 0 && (
                <View style={styles.selectedItemsContainer}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={getSelectedLabels()}
                    keyExtractor={(item, index) => `selected-${index}`}
                    renderItem={({ item, index }) => (
                      <SelectableTag
                        label={item}
                        onRemove={() =>
                          handleRemoveItem(localSelectedValues[index])
                        }
                      />
                    )}
                    contentContainerStyle={styles.selectedItemsScroll}
                    ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                  />
                </View>
              )}

              {/* Max Selections Info */}
              <P style={styles.maxSelectionsText}>
                You can add up to {maxSelections} {title.toLowerCase()}
              </P>

              {/* Search Input - Only show if options are 10 or more */}
              {options.length >= 10 && (
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <SvgXml
                    xml={
                      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 21L16.65 16.65" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>'
                    }
                    width={20}
                    height={20}
                    style={styles.searchIcon}
                  />
                </View>
              )}

              {/* Options List */}
              <FlatList
                style={styles.optionsContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={filteredOptions}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.optionItem,
                      localSelectedValues.includes(item.value) &&
                        styles.selectedOption,
                    ]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <P
                      style={[
                        styles.optionText,
                        localSelectedValues.includes(item.value) &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {item.label}
                    </P>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
              />

              <View style={styles.buttonContainer}>
                <Button
                  btnText="Confirm"
                  onPress={handleConfirm}
                  style={styles.confirmButton}
                />
              </View>
            </View>
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalOverlayTouchable: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: fonts.onestBold,
    fontSize: 16,
  },
  closeButton: {
    padding: 5,
  },
  selectedItemsContainer: {
    // marginBottom: 16,
    width: '100%',
  },
  selectedItemsScroll: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingRight: 16,
  },
  maxSelectionsText: {
    fontFamily: fonts.onestLight,
    fontSize: 14,
    color: colors.gray1,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: colors.grayLx,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#D8DADC"
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontFamily: fonts.onestBold,
    fontSize: 14,
  },
  searchIcon: {
    opacity: 0.5,
  },
  optionsContainer: {
    maxHeight: height * 0.4,
  },
  optionItem: {
    paddingVertical: 16,
  },
  selectedOption: {

  },
  optionText: {
    fontFamily: fonts.onestBold,
    fontSize: 14,
  },
  selectedOptionText: {
    fontFamily: fonts.onestBold,
    color: colors.primary,
  },
  buttonContainer: {
    marginTop: 20,
  },
  confirmButton: {
    width: "100%",
    height: 56,
    borderRadius: 28,
  },
});