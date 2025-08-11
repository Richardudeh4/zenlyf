import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import {
    Dimensions,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { colors } from "../Config/colors";
import { fonts } from "../Config/Fonts";
import H4 from "./H4";
import P from "./P";
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get("window");

interface AddEventModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddEvent: (eventData: {
    title: string;
    dateTime: string;
    type: string;
  }) => void;
}

export default function AddEventModal({
  isVisible,
  onClose,
  onAddEvent,
}: AddEventModalProps) {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("Mon, Jul 4 • 10:00 AM");
  const [selectedType, setSelectedType] = useState("Medication");
const router = useRouter();
  const eventTypes = ["Medication", "Exercise", "Appointment"];

  const handleAddEvent = () => {
    if (title.trim()) {
      onAddEvent({
        title: title.trim(),
        dateTime,
        type: selectedType,
      });
      router.push('/MainScreen/successHealthEvent');
      // Reset form
      setTitle("");
      setSelectedType("Medication");
      onClose();
    }
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
                <H4 style={styles.modalTitle}>Add Event</H4>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={colors.black} />
                </TouchableOpacity>
              </View>

              {/* Title Input */}
              <View style={styles.inputSection}>
                <P style={styles.inputLabel}>Title</P>
                <TextInput
                  style={styles.textInput}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter event title"
                  placeholderTextColor={colors.gray1}
                />
              </View>

              {/* Date/Time Input */}
              <View style={styles.inputSection}>
                <P style={styles.inputLabel}>Date / Time</P>
                <TextInput
                  style={styles.textInput}
                  value={dateTime}
                  onChangeText={setDateTime}
                  placeholder="Mon, Jul 4 • 10:00 AM"
                  placeholderTextColor={colors.gray1}
                />
              </View>

              {/* Type Selection */}
              <View style={styles.inputSection}>
                <P style={styles.inputLabel}>Type</P>
                <View style={styles.typeButtonsContainer}>
                  {eventTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeButton,
                        selectedType === type && styles.selectedTypeButton,
                      ]}
                      onPress={() => setSelectedType(type)}
                    >
                      <P
                        style={[
                          styles.typeButtonText,
                          selectedType === type && styles.selectedTypeButtonText,
                        ]}
                      >
                        {type}
                      </P>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Add Health Event Button */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addEventButton}
                  onPress={handleAddEvent}
                >
                  <Ionicons name="add" size={24} color={colors.white} />
                  <P style={styles.addEventButtonText}>Add Health Event</P>
                </TouchableOpacity>
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
    maxHeight: height * 0.8,
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
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: fonts.onestMedium,
    fontSize: 16,
    color: colors.black,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: fonts.onestRegular,
    backgroundColor: colors.white,
    color: colors.black,
  },
  typeButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  selectedTypeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeButtonText: {
    fontFamily: fonts.onestMedium,
    fontSize: 14,
    color: colors.black,
  },
  selectedTypeButtonText: {
    color: colors.white,
  },
  buttonContainer: {
    marginTop: 20,
  },
  addEventButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  addEventButtonText: {
    fontFamily: fonts.onestMedium,
    fontSize: 16,
    color: colors.white,
    marginLeft: 8,
  },
});
