import AppHeader from "@/components/AppHeader";
import { svg } from "@/Config/Svg";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { colors } from "../../Config/colors";
import { fonts } from "../../Config/Fonts";

const ZenlyfAi = () => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [messages, setMessages] = useState<
    { id: string; text: string; isUser: boolean }[]
  >([]);

  const handleMoreOptions = () => {
    // Handle more options
    console.log("More options pressed");
  };

  const handleAttachment = () => {
    setShowAttachmentModal(true);
  };

  const handleCamera = () => {
    setShowAttachmentModal(false);
    // Handle camera functionality
    console.log("Camera selected");
    Alert.alert("Camera", "Camera functionality would open here");
  };

  const handleGallery = async () => {
    setShowAttachmentModal(false);

    try {
      // Request permission to access media library
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please grant permission to access your photo library"
        );
        return;
      }

      // Open image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log("Image selected:", result.assets[0].uri);

        Alert.alert("Success", "Image selected successfully!");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image from gallery");
    }
  };

  const handleFilePicker = async () => {
    setShowAttachmentModal(false);

    try {
      // Open document picker
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        console.log("File selected:", result.assets[0]);

        Alert.alert("Success", `File selected: ${result.assets[0].name}`);
      }
    } catch (error) {
      console.error("Error picking file:", error);
      Alert.alert("Error", "Failed to pick file");
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Handle voice recording
    console.log("Voice recording:", !isRecording);
  };

  const handleSend = () => {
    if (message.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now().toString(),
        text: message,
        isUser: true,
      };
      setMessages((prev) => [...prev, userMessage]);

      // Add AI response (simulate with atorvastatin side effects)
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: `Common side effects of atorvastatin can include:

• Headache
• Muscle pain, tenderness, or weakness (myalgia)
• Joint pain
• Nausea or upset stomach
• Diarrhea
• Indigestion or heartburn
• Cold-like symptoms (runny nose, sore throat)

Less common but serious side effects (seek medical help if these occur):

• Severe muscle pain with weakness and dark-colored urine (possible rhabdomyolysis)
• Liver problems (yellowing of skin/eyes, dark urine, unusual fatigue)
• Memory loss or confusion (rare)
• Allergic reactions (rash, swelling, difficulty breathing)`,
        isUser: false,
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);

      setMessage("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AppHeader showBackArrow />

        <TouchableOpacity onPress={handleMoreOptions} style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {messages.length === 0 ? (
          <>
            <Text style={styles.title}>
              <Text style={{ fontWeight: "700" }}>Zenlyf AI -</Text> Your Health{" "}
              {"\n"} Companion
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 12,
                },
              ]}
            >
              Ask about medications, symptoms, reports, {"\n"}or wellness tips.
            </Text>
          </>
        ) : (
          <ScrollView
            style={styles.messageContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={msg.isUser ? styles.userMessage : styles.aiMessage}
              >
                <Text style={styles.messageText}>{msg.text}</Text>
                {!msg.isUser && (
                  <View style={styles.actionIcons}>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons
                        name="arrow-up"
                        size={16}
                        color={colors.black}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons
                        name="volume-high"
                        size={16}
                        color={colors.black}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons name="create" size={16} color={colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons name="copy" size={16} color={colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons
                        name="thumbs-up"
                        size={16}
                        color={colors.black}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Bottom Input Section */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <View style={styles.inputSection}>
          {/* Attachment Button */}
          <TouchableOpacity
            onPress={handleAttachment}
            style={styles.attachmentButton}
          >
            <Ionicons name="add" size={20} color={colors.black} />
          </TouchableOpacity>

          {/* Text Input */}
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask Zenlyf AI"
              placeholderTextColor={colors.gray1}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />

            {/* Voice Icon inside input */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={handleVoiceRecord}
                style={styles.voiceButton}
              >
                <Ionicons
                  name={isRecording ? "mic" : "mic-outline"}
                  size={18}
                  color={colors.black}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSend}
                style={[
                  styles.sendButton,
                  isRecording && styles.recordingButton,
                ]}
              >
                {isRecording ? (
                  <>
                    <SvgXml xml={svg.record} />
                  </>
                ) : (
                  <>
                    <Ionicons name="send" size={16} color={colors.white} />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Modal
        visible={showAttachmentModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAttachmentModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAttachmentModal(false)}
        >
          <View style={styles.attachmentModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Attachment</Text>
              <TouchableOpacity onPress={() => setShowAttachmentModal(false)}>
                <Ionicons name="close" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>

            <View style={styles.attachmentOptions}>
              <TouchableOpacity
                style={styles.attachmentOption}
                onPress={handleCamera}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name="camera" size={24} color={colors.primary} />
                </View>
                <Text style={styles.optionText}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.attachmentOption}
                onPress={handleGallery}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name="images" size={24} color={colors.primary} />
                </View>
                <Text style={styles.optionText}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.attachmentOption}
                onPress={handleFilePicker}
              >
                <View style={styles.optionIcon}>
                  <Ionicons name="folder" size={24} color={colors.primary} />
                </View>
                <Text style={styles.optionText}>Files</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  moreButton: {
    padding: 8,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    fontFamily: fonts.onestBold,
    color: "#050505",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: "#888888",
    textAlign: "center",
    lineHeight: 22,
  },
  inputContainer: {
    paddingBottom: Platform.OS === "ios" ? 20 : 10,
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 12,
  },
  attachmentButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.white,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#B3DAFF",
    borderRadius: 99,
    paddingHorizontal: 11,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    minHeight: 50,
    maxHeight: 100,
  },
  textInput: {
    outline: "none",
  },
  voiceButton: {},
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingButton: {
    backgroundColor: "#0077FF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  attachmentModal: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  attachmentOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  attachmentOption: {
    alignItems: "center",
    flex: 1,
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  optionText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    textAlign: "center",
  },
  messageContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  userMessage: {
    backgroundColor: "#F2F9FF",
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: "75%",
    alignSelf: "flex-end",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  aiMessage: {
    backgroundColor: "white",
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: "85%",
    alignSelf: "flex-start",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: "#000000",
    lineHeight: 22,
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  actionIcon: {
    padding: 4,
  },
});

export default ZenlyfAi;
