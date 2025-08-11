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

const { width, height } = Dimensions.get("window");

interface SingleSelectBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (value: string) => void;
  title?: string;
  options: Array<{ label: string; value: string }>;
  selectedValue?: string;
  searchPlaceholder?: string;
}

export default function SingleSelectBottomSheet({
  isVisible,
  onClose,
  onSelect,
  title,
  options,
  selectedValue,
  searchPlaceholder = "Search",
}: SingleSelectBottomSheetProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSelectedValue, setLocalSelectedValue] = useState<
    string | undefined
  >(selectedValue);

  // Filter options based on search query (only if search is visible)
  const filteredOptions = options.length >= 10
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Handle selection of an option
  const handleSelect = (value: string) => {
    setLocalSelectedValue(value);
  };

  // Handle confirm button press
  const handleConfirm = () => {
    if (localSelectedValue) {
      onSelect(localSelectedValue);
    }
    onClose();
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
                      localSelectedValue === item.value &&
                        styles.selectedOption,
                    ]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <P
                      style={[
                        styles.optionText,
                        localSelectedValue === item.value &&
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
    fontFamily: fonts.kameronSemibold,
    fontSize: 18,
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: colors.grayLx,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: "#D8DADC",
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontFamily: fonts.onestLight,
    fontSize: 12,
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
    // backgroundColor: colors.primaryLight,
  },
  optionText: {
    fontFamily: fonts.onestBold,
    fontSize: 14,
  },
  selectedOptionText: {
    fontFamily: fonts.kameronSemibold,
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