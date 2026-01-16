import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { useUser } from '../../contexts/UserContext';
import { clearAuthToken } from '../Requesthandler/Auth';

const Logout = () => {
  const router = useRouter();
  const { clearUserData } = useUser();

  const handleCancel = () => {
    router.back();
  };

  const handleLogout = async () => {
    console.log('User logging out...');
    try {
      // Clear auth tokens and metadata
      await clearAuthToken();
      
      // Clear user context data
      await clearUserData();
      
      console.log('Logout successful, redirecting to index');
      
      // Navigate to the main index page (which will trigger the auth flow)
      router.replace('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Still navigate away even if there's an error
      router.replace('/');
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.dialogContainer}>
          {/* Confirmation Message */}
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              Are you sure you want{'\n'}to log out of your Zenlyf account
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Logout;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 32,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  messageContainer: {
    marginBottom: 24,
  },
  messageText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F2F9FF",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
  },
  logoutButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
});