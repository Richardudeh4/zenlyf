import { svg } from '@/Config/Svg';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import { useRouter } from 'expo-router';

const Profile = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();
  const handleBackPress = () => {
    console.log('Back pressed');
  };

  const handleMenuPress = () => {
    setIsMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setIsMenuVisible(false);
  };

  const handleEditProfilePicture = () => {
    console.log('Edit profile picture pressed');
  };

  const handleEditBasicInfo = () => {
    console.log('Edit basic info pressed');
  };

  const handleViewLinkedPatients = () => {
    console.log('View linked patients pressed');
  };

  const handleReset = () => {
    console.log('Reset pressed');
  };

  const handleSaveChanges = () => {
    console.log('Save changes pressed');
  };

  const handleManageNotifications = () => {
    console.log('Manage Notifications pressed');
    router.push('/MainScreen/manageNotification');
    setIsMenuVisible(false);
  };

  const handleLinkWearables = () => {
    console.log('Link Wearables pressed');
    router.push('/MainScreen/languages');
    setIsMenuVisible(false);
  };

  const handleEmergencyContacts = () => {
    console.log('Emergency Contacts pressed');
    setIsMenuVisible(false);
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    setIsMenuVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={24} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
            <Ionicons name="ellipsis-vertical" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePictureWrapper}>
            <Image 
              source={require('../../assets/images/avatar.png')} 
              style={styles.profilePicture} 
            />
            <TouchableOpacity 
              style={styles.editPictureButton} 
              onPress={handleEditProfilePicture}
            >
              <SvgXml xml={svg.edit} color={"#0077FF"} width={12} height={12} />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Name */}
        <Text style={styles.userName}>Jennifer Madu</Text>

        {/* Basic Info Section */}
        <View style={styles.basicInfoSection}>
          <View style={styles.basicInfoHeader}>
            <Text style={styles.basicInfoTitle}>Basic Info</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEditBasicInfo}>
              <Text style={styles.editText}>Tap to edit</Text>
              <SvgXml xml={svg.edit} width={12} height={12} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.basicInfoContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name:</Text>
              <Text style={styles.infoValue}>Jennifer Madu</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>jenniferm@gmail.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone No.:</Text>
              <Text style={styles.infoValue}>+234 812 345 5678</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Linked Patients:</Text>
              <TouchableOpacity style={styles.linkedPatientsButton} onPress={handleViewLinkedPatients}>
                <Text style={styles.linkedPatientsText}>Tap to view list</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.gray1} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveChangesButton} onPress={handleSaveChanges}>
            <Text style={styles.saveChangesButtonText}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Menu Modal */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseMenu}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuModal}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseMenu}>
              <Ionicons name="close" size={20} color={colors.gray1} />
            </TouchableOpacity>

            {/* Menu Items */}
            <View style={styles.menuItems}>
              <TouchableOpacity style={styles.menuItem} onPress={handleManageNotifications}>
                <View style={styles.menuItemIcon}>
                  <SvgXml xml={svg.bell} width={20} height={20} />
                </View>
                <Text style={styles.menuItemText}>Manage Notifications</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleLinkWearables}>
                <View style={styles.menuItemIcon}>
                  <Ionicons name="link" size={20} color="#007AFF" />
                </View>
                <Text style={styles.menuItemText}>Languages</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleEmergencyContacts}>
                <View style={styles.menuItemIcon}>
                  <SvgXml xml={svg.phone} width={20} height={20} />
                </View>
                <Text style={styles.menuItemText}>Emergency Contacts</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <View style={styles.menuItemIcon}>
                  <Ionicons name="log-out" size={20} color="#007AFF" />
                </View>
                <Text style={styles.menuItemText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePictureWrapper: {
    position: 'relative',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editPictureButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 42,
    height: 42,
    borderRadius: "50%",
    backgroundColor: '#EFF6FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  userName: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: 30,
  },
  basicInfoSection: {
    marginBottom: 40,
  },
  basicInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  basicInfoTitle: {
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editText: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
  },
  basicInfoContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: fonts.onestMedium,
    color: colors.black,
  },
  infoValue: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  linkedPatientsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkedPatientsText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  actionButtonsContainer: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 40,
  },
  resetButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: '#007AFF',
  },
  saveChangesButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveChangesButtonText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.white,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
  },
  menuModal: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    minWidth: 280,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItems: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  menuItemIcon: {
    marginRight: 16,
    width: 24,
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    flex: 1,
  },
});
