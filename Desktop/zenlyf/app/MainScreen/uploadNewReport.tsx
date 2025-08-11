import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { useRouter } from 'expo-router';

const UploadNewReport = () => {
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    uri: string;
    type: string;
    size?: string;
  } | null>(null);
  const [reportTitle, setReportTitle] = useState('');
  const [reportDate, setReportDate] = useState('');
  const router = useRouter();
  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'image/jpeg',
          'image/jpg',
          'image/png'
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        const fileSize = file.size ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : 'Unknown size';
        setSelectedFile({
          name: file.name || 'Selected File',
          uri: file.uri,
          type: file.mimeType || 'unknown',
          size: fileSize,
        });
        console.log('File selected:', file);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to select file. Please try again.');
    }
  };

  const handleOpenCamera = async () => {
    try {
      // Request camera permissions
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Camera permission is required to scan documents.');
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const image = result.assets[0];
        const fileSize = image.fileSize ? `${(image.fileSize / (1024 * 1024)).toFixed(1)} MB` : 'Unknown size';
        setSelectedFile({
          name: 'Scanned Document',
          uri: image.uri,
          type: 'image/jpeg',
          size: fileSize,
        });
        console.log('Image captured:', image);
      }
    } catch (error) {
      console.error('Error opening camera:', error);
      Alert.alert('Error', 'Failed to open camera. Please try again.');
    }
  };

  const handleUploadReport = () => {
    if (selectedFile) {
      console.log('Uploading report:', selectedFile);
      router.push('/MainScreen/successReportUpload');
      // Here you would typically upload the file to your server
      setSelectedFile(null);
    } else {
      Alert.alert('No File Selected', 'Please select a file or scan a document first.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <AppHeader text="Upload New Report" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Primary Upload Area */}
        <View style={styles.uploadArea}>
          <View style={styles.uploadZone}>
            <Ionicons name="cloud-upload" size={48} color={colors.primary} />
            <Text style={styles.uploadText}>Tap to upload a file or scan document</Text>
            
            <TouchableOpacity style={styles.chooseFileButton} onPress={handleChooseFile}>
              <Text style={styles.chooseFileText}>Choose File</Text>
            </TouchableOpacity>
            
            <Text style={styles.supportedFormats}>PDF, JPG, PNG</Text>
          </View>
        </View>

        {/* Selected File Display */}
        {selectedFile && (
          <View style={styles.selectedFileContainer}>
            <View style={styles.selectedFileInfo}>
              <Ionicons 
                name={selectedFile.type === 'application/pdf' ? 'document-text' : 'image'} 
                size={20} 
                color={colors.primary} 
              />
              <Text style={styles.selectedFileName}>{selectedFile.name}</Text>
            </View>
            <TouchableOpacity 
              style={styles.removeFileButton}
              onPress={() => setSelectedFile(null)}
            >
              <Ionicons name="close" size={20} color={colors.error} />
            </TouchableOpacity>
          </View>
        )}

        {/* Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OR</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Camera Option */}
        <View style={styles.cameraSection}>
          <TouchableOpacity style={styles.cameraButton} onPress={handleOpenCamera}>
            <Text style={styles.cameraButtonText}>Open Camera to Scan</Text>
          </TouchableOpacity>
        </View>

        {/* File Information and Report Details */}
        {selectedFile && (
          <View style={styles.fileDetailsSection}>
            {/* File Information */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>File Information</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>File Name</Text>
                <Text style={styles.infoValue}>{selectedFile.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>File Size</Text>
                <Text style={styles.infoValue}>{selectedFile.size}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Status</Text>
                <Text style={styles.infoValue}>Ready to upload</Text>
              </View>
            </View>

            {/* Report Details */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Report Details</Text>
              <View style={styles.inputField}>
                <Text style={styles.inputLabel}>Report Title</Text>
                <TextInput
                  style={styles.textInput}
                  value={reportTitle}
                  onChangeText={setReportTitle}
                  placeholder="Enter report title"
                  placeholderTextColor={colors.gray1}
                />
              </View>
              <View style={styles.inputField}>
                <Text style={styles.inputLabel}>Report Date</Text>
                <TextInput
                  style={styles.textInput}
                  value={reportDate}
                  onChangeText={setReportDate}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={colors.gray1}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Upload Report Button */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={[
            styles.uploadReportButton,
            !selectedFile && styles.uploadReportButtonDisabled
          ]} 
          onPress={handleUploadReport}
          disabled={!selectedFile}
        >
          <Ionicons name="cloud-upload" size={20} color={colors.white} />
          <Text style={styles.uploadReportButtonText}>Upload Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadNewReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  uploadArea: {
    marginBottom: 20,
  },
  uploadZone: {
    borderWidth: 2,
    borderColor: '#E3F2FD',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFBFC',
  },
  uploadText: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  chooseFileButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  chooseFileText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  supportedFormats: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  selectedFileContainer: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedFileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedFileName: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginLeft: 8,
  },
  removeFileButton: {
    padding: 4,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  separatorText: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.gray1,
    marginHorizontal: 16,
  },
  cameraSection: {
    marginBottom: 20,
  },
  cameraButton: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cameraButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  bottomButtonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 10,
  },
  uploadReportButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadReportButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  uploadReportButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.white,
    marginLeft: 8,
  },
  fileDetailsSection: {
    marginTop: 20,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  inputField: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: fonts.onestLight,
    backgroundColor: colors.white,
    color: colors.black,
  },
});