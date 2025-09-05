import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';

const Inbox = () => {
  const router = useRouter();

  // Alert data
  const alerts = [
    {
      id: '1',
      type: 'fall',
      label: 'Fall detected',
      count: 2,
      icon: require('../../assets/images/spatial.png'),
      color: colors.primary,
    },
    {
      id: '2',
      type: 'meds',
      label: 'Missed meds',
      count: 1,
      icon: require('../../assets/images/pills.png'),
      color: colors.primary,
    },
    {
      id: '3',
      type: 'vitals',
      label: 'Abnormal vitals',
      count: 0,
      icon: require('../../assets/images/pulse.png'),
      color: colors.primary,
    },
  ];

  // Message data
  const messages = [
    {
      id: '1',
      name: 'Ebere Madu',
      message: 'Thank you very much!',
      timestamp: '10:20 AM',
      unreadCount: 2,
      profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '2',
      name: 'Smith Joe',
      message: 'Okay, I feel better...',
      timestamp: 'Yesterday',
      unreadCount: 0,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '3',
      name: 'Catrina Beino',
      message: 'The last time I checked my bp...',
      timestamp: 'Yesterday',
      unreadCount: 0,
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '4',
      name: 'Smith Joe',
      message: 'Okay, I feel better...',
      timestamp: 'Yesterday',
      unreadCount: 0,
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    {
      id: '5',
      name: 'Catrina Beino',
      message: 'The last time I checked my bp...',
      timestamp: 'Yesterday',
      unreadCount: 0,
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
  ];

  const handleAlertPress = (alert: any) => {
    console.log('Alert pressed:', alert.type);
    // Handle alert acknowledgment or escalation
  };

  const handleMessagePress = (message: any) => {
    console.log('Message pressed:', message.id);
    
    // Navigate to chat screen with user data
    router.push({
      pathname: '/MainScreen/chatScreen',
      params: {
        userName: message.name,
        userImage: message.profileImage,
      }
    });
  };

  const renderAlert = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.alertButton}
      onPress={() => handleAlertPress(item)}
    >
      <View style={styles.alertIconContainer}>
        <Image source={item.icon} style={{width:24, height:24}}/>
        {item.count > 0 && (
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>{item.count}</Text>
          </View>
        )}
      </View>
      <Text style={styles.alertLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => handleMessagePress(item)}
    >
      <Image
        source={{ uri: item.profileImage }}
        style={styles.profileImage}
        defaultSource={require('../../assets/images/avatar.png')}
      />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.name}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={styles.messageText} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader text="Inbox / Messages" contStyle={{paddingLeft:24}} />
      
      <View style={styles.content}>
        {/* Instruction Text */}
        <Text style={styles.instructionText}>Tap to acknowledge or escalate</Text>
        
        {/* Alerts Section */}
        <View style={styles.alertsSection}>
          <FlatList
            data={alerts}
            renderItem={renderAlert}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.alertsList}
          />
        </View>

        {/* Messages Section */}
        <View style={styles.messagesSection}>
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  instructionText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
    marginBottom: 20,
  },
  alertsSection: {
    marginBottom: 24,
  },
  alertsList: {
    gap: 16,
  },
  alertButton: {
    alignItems: 'center',
    width: 80,
  },
  alertIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  alertBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.error,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBadgeText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  alertLabel: {
    fontSize: 12,
    fontFamily: fonts.onestMedium,
    color: colors.black,
    textAlign: 'center',
  },
  messagesSection: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontFamily: fonts.onestBold,
    color: colors.black,
  },
  timestamp: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    textAlign:"right",
  },
  messageText: {
    fontSize: 14,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
  unreadBadge: {
    backgroundColor: colors.success,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadBadgeText: {
    fontSize: 12,
    fontFamily: fonts.onestBold,
    color: colors.white,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray1,
    opacity: 0.3,
  },
});