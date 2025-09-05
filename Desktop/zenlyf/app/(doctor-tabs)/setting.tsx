import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const Setting = () => {
  const router = useRouter();

  const handleProfilePress = () => {
    console.log('Profile pressed');
    // Navigate to profile screen
  };

  const handleSetAvailability = () => {
    console.log('Set Availability pressed');
    router.push('/MainScreen/setAvailibility');
   
  };

  const handleNotificationPreferences = () => {
    console.log('Notification Preferences pressed');
    router.push('/MainScreen/notificationPreferences');
  };

  const handleLegal = () => {
    console.log('Legal pressed');
    router.push('/MainScreen/legalAndPolicy');
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    // Handle logout action
   router.push('/MainScreen/logout');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Profile Information Card */}
        <TouchableOpacity style={styles.profileCard} onPress={handleProfilePress}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileTitle}>Profile Info</Text>
            <Text style={styles.profileSubtitle}>Specialty</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#050505" />
        </TouchableOpacity>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <TouchableOpacity 
          
          style={styles.menuItem} onPress={handleSetAvailability}>
            <Text style={styles.menuText}>Set Availability</Text>
            <Ionicons name="chevron-forward" size={23} color="#050505" />
          </TouchableOpacity>
          
          <View style={styles.separator} />
          
          <TouchableOpacity style={styles.menuItem} onPress={handleNotificationPreferences}>
            <Text style={styles.menuText}>Notification Preferences</Text>
            <Ionicons name="chevron-forward" size={23} color="#050505" />
          </TouchableOpacity>
          
          <View style={styles.separator} />
          
          <TouchableOpacity style={styles.menuItem} onPress={handleLegal}>
            <Text style={styles.menuText}>Legal</Text>
            <Ionicons name="chevron-forward" size={23} color={colors.black} />
          </TouchableOpacity>
            {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        </View>

      
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: fonts.onestBold,
    color: "#050505",
    fontWeight:"700",
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#EFF6FD",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight:"500",
    fontFamily: fonts.onestBold,
    color: "#050505",
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: "#4D5766",
    fontWeight:"400",
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  menuText: {
    fontSize: 20,
    fontWeight:"500",
    fontFamily: fonts.onestMedium,
    color: "#050505",
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray1,
    opacity: 0.3,
    marginHorizontal: 16,
  },
  logoutButton: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
    borderTopWidth:1,
    marginHorizontal: 16,
    borderColor:"#CBCBCB",
  },
  logoutText: {
    fontSize: 20,
    fontFamily: fonts.onestMedium,
    color: "#FF3B3B",
    fontWeight:"500",
  },
});