import React from "react";
import {
  Dimensions,
  Modal,
  PixelRatio,
  ScrollView,
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

interface SpecializationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (specialization: string) => void;
  selectedSpecialization?: string;
}

const specializations = [
  "General Practitioner",
  "Cardiologist",
  "Dermatologist",
  "Endocrinologist",
  "Gastroenterologist",
  "Hematologist",
  "Infectious Disease Specialist",
  "Nephrologist",
  "Neurologist",
  "Oncologist",
  "Ophthalmologist",
  "Orthopedic Surgeon",
  "Otolaryngologist",
  "Pathologist",
  "Pediatrician",
  "Psychiatrist",
  "Pulmonologist",
  "Radiologist",
  "Rheumatologist",
  "Urologist",
  "Emergency Medicine",
  "Family Medicine",
  "Internal Medicine",
  "Obstetrics & Gynecology",
  "Physical Medicine & Rehabilitation",
  "Preventive Medicine",
  "Sports Medicine",
  "Geriatric Medicine",
  "Pain Management",
  "Sleep Medicine",
  "Addiction Medicine",
  "Hospice & Palliative Medicine",
  "Medical Genetics",
  "Nuclear Medicine",
  "Occupational Medicine",
  "Public Health",
  "Other"
];

export default function SpecializationModal({
  isVisible,
  onClose,
  onSelect,
  selectedSpecialization,
}: SpecializationModalProps) {
  const handleSpecializationSelect = (specialization: string) => {
    onSelect(specialization);
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
                <H4 style={styles.modalTitle}>Select Specialization</H4>
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

              <ScrollView style={styles.specializationContainer} showsVerticalScrollIndicator={false}>
                {specializations.map((specialization) => (
                  <TouchableOpacity
                    key={specialization}
                    style={[
                      styles.specializationOption,
                      selectedSpecialization === specialization && styles.selectedSpecializationOption,
                    ]}
                    onPress={() => handleSpecializationSelect(specialization)}
                  >
                    <P
                      style={[
                        styles.specializationOptionText,
                        selectedSpecialization === specialization && styles.selectedSpecializationOptionText,
                      ]}
                    >
                      {specialization}
                    </P>
                  </TouchableOpacity>
                ))}
              </ScrollView>

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
  specializationContainer: {
    marginBottom: responsiveSize(16),
    paddingHorizontal: responsiveSize(4),
  },
  specializationOption: {
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(20),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(8),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  selectedSpecializationOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  specializationOptionText: {
    fontFamily: fonts.onestMedium,
    fontSize: responsiveSize(16),
    textAlign: "center",
  },
  selectedSpecializationOptionText: {
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





