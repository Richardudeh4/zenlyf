import React from "react";
import {
    Dimensions,
    Modal,
    PixelRatio,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { colors } from "../Config/colors";
import { fonts } from "../Config/Fonts";
import { svg } from "../Config/Svg";
import Button from "./Button";
import H4 from "./H4";
import P from "./P";

const { width, height } = Dimensions.get("window");

// Responsive utilities
const isSmallDevice = width < 375;
const fontScale = PixelRatio.getFontScale();
const isLargeFontScale = fontScale > 1.2;

// Responsive sizing functions
const responsiveSize = (size: number) => {
  if (isSmallDevice) return size * 0.9;
  if (isLargeFontScale) return size * 0.85;
  return size;
};

interface MedicationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (medication: string) => void;
  selectedMedication?: string;
}

const medicationOptions = [
  { id: 'aspirin', label: 'Aspirin' },
  { id: 'ibuprofen', label: 'Ibuprofen' },
  { id: 'acetaminophen', label: 'Acetaminophen' },
  { id: 'lisinopril', label: 'Lisinopril' },
  { id: 'metformin', label: 'Metformin' },
  { id: 'atorvastatin', label: 'Atorvastatin' },
  { id: 'amlodipine', label: 'Amlodipine' },
  { id: 'omeprazole', label: 'Omeprazole' },
  { id: 'losartan', label: 'Losartan' },
  { id: 'carvedilol', label: 'Carvedilol' },
  { id: 'furosemide', label: 'Furosemide' },
  { id: 'warfarin', label: 'Warfarin' },
];

export default function MedicationModal({
  isVisible,
  onClose,
  onSelect,
  selectedMedication,
}: MedicationModalProps) {
  const handleMedicationSelect = (medication: string) => {
    onSelect(medication);
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
              <View style={styles.modalHeader}>
                <H4 style={styles.modalTitle}>Select Medication</H4>
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

              <View style={styles.medicationContainer}>
                {medicationOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.medicationOption,
                      selectedMedication === option.id && styles.selectedMedicationOption,
                    ]}
                    onPress={() => handleMedicationSelect(option.id)}
                  >
                    <P
                      style={[
                        styles.medicationOptionText,
                        selectedMedication === option.id && styles.selectedMedicationOptionText,
                      ]}
                    >
                      {option.label}
                    </P>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  btnText="Cancel"
                  onPress={onClose}
                  style={styles.cancelButton}
                />
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
    borderTopLeftRadius: responsiveSize(24),
    borderTopRightRadius: responsiveSize(24),
    paddingHorizontal: responsiveSize(20),
    paddingTop: responsiveSize(20),
    paddingBottom: responsiveSize(30),
    maxHeight: height * (isSmallDevice ? 0.85 : 0.8),
    minHeight: height * (isSmallDevice ? 0.45 : 0.5),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveSize(16),
    paddingBottom: responsiveSize(8),
  },
  modalTitle: {
    fontFamily: fonts.onestBold,
    fontSize: responsiveSize(16),
  },
  closeButton: {
    padding: 5,
  },
  medicationContainer: {
    marginBottom: responsiveSize(16),
    paddingHorizontal: responsiveSize(4),
  },
  medicationOption: {
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(8),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  selectedMedicationOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  medicationOptionText: {
    fontFamily: fonts.onestMedium,
    fontSize: responsiveSize(16),
    textAlign: "center",
  },
  selectedMedicationOptionText: {
    color: colors.white,
    fontFamily: fonts.onestBold,
  },
  buttonContainer: {
    marginTop: responsiveSize(20),
    paddingHorizontal: responsiveSize(4),
  },
  cancelButton: {
    width: "100%",
    height: responsiveSize(56),
    borderRadius: responsiveSize(28),
    backgroundColor: colors.gray1,
  },
});

