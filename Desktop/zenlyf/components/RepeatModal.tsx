import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import {
    Dimensions,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { colors } from "../Config/colors";
import { fonts } from "../Config/Fonts";
import H4 from "./H4";
import P from "./P";

const { width, height } = Dimensions.get("window");

interface RepeatModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (repeatOption: string) => void;
  selectedRepeat?: string;
}

export default function RepeatModal({
  isVisible,
  onClose,
  onSelect,
  selectedRepeat = "Once",
}: RepeatModalProps) {
  const [selectedOption, setSelectedOption] = useState(selectedRepeat);

  const repeatOptions = [
    { id: "Once", label: "Once" },
    { id: "Daily", label: "Daily" },
    { id: "Mon to Fri", label: "Mon to Fri" },
    { id: "Custom", label: "Custom" },
  ];

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
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
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.modalHeader}>
                <H4 style={styles.modalTitle}>Repeat</H4>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={colors.black} />
                </TouchableOpacity>
              </View>

              {/* Repeat Options */}
              <View style={styles.optionsContainer}>
                {repeatOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionRow,
                      selectedOption === option.id && styles.selectedOptionRow,
                    ]}
                    onPress={() => handleSelect(option.id)}
                  >
                    <P style={styles.optionText}>{option.label}</P>
                    {selectedOption === option.id && (
                      <Ionicons name="checkmark" size={20} color={colors.black} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    maxHeight: height * 0.6,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 8,
  },
  modalTitle: {
    fontFamily: fonts.onestBold,
    fontSize: 18,
    color: colors.black,
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    paddingHorizontal: 4,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: colors.white,
  },
  selectedOptionRow: {
    backgroundColor: "#E3F2FD",
  },
  optionText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
});


