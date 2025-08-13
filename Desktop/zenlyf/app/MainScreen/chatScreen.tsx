import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Config/colors';
import { fonts } from '../../Config/Fonts';
import AppHeader from '@/components/AppHeader';

const ChatScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Get user data from params
  const userName = params.userName as string || 'Ebere Madu';
  const userImage = params.userImage as string || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face';

  // Sample chat messages
  const [messages] = useState([
    {
      id: '1',
      text: 'Hello, Doctor Eze!',
      timestamp: '09:45 AM',
      isOutgoing: false,
    },
    {
      id: '2',
      text: 'Good day Mrs. Ebere... How are you going today?',
      timestamp: '10:02 AM',
      isOutgoing: true,
    },
    {
      id: '3',
      text: "I'm feeling a bit better. Still in some pain, though",
      timestamp: '10:03 AM',
      isOutgoing: false,
    },
    {
      id: '4',
      text: 'Glad to hear that! Are you up for a quick walk in 10 mins?',
      timestamp: '10:05 AM',
      isOutgoing: true,
    },
    {
      id: '5',
      text: 'Alright, I will do... let me quickly get prepared',
      timestamp: '10:08 AM',
      isOutgoing: false,
    },
    {
      id: '6',
      text: 'Okay, great!',
      timestamp: '10:20 AM',
      isOutgoing: true,
    },
    {
      id: '7',
      text: 'Thank you very much Doc! I feel much better now...',
      timestamp: '10:20 AM',
      isOutgoing: false,
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      // Here you would typically send the message to the backend
    }
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View style={[
      styles.messageContainer,
      item.isOutgoing ? styles.outgoingMessage : styles.incomingMessage
    ]}>
      <View style={[
        styles.messageBubble,
        item.isOutgoing ? styles.outgoingBubble : styles.incomingBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.isOutgoing ? styles.outgoingText : styles.incomingText
        ]}>
          {item.text}
        </Text>
      </View>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        
        <AppHeader text={userName}/>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.messagesContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
          inverted={false}
        />
      </KeyboardAvoidingView>

      {/* Message Input Bar */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.inputIcon}>
          <Ionicons name="mic" size={24} color={colors.gray1} />
        </TouchableOpacity>
        
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Write your message"
            placeholderTextColor={colors.gray1}
            multiline
            maxLength={500}
          />
        </View>

        <View style={styles.actionIcons}>
          <TouchableOpacity style={styles.inputIcon}>
            <Ionicons name="document" size={24} color={colors.gray1} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.inputIcon}>
            <Ionicons name="camera" size={24} color={colors.gray1} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.inputIcon, message.trim() && styles.sendButton]}
            onPress={handleSendMessage}
          >
            <Ionicons 
              name={message.trim() ? "send" : "mic"} 
              size={24} 
              color={message.trim() ? colors.white : colors.gray1} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
   
    backgroundColor: colors.white,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: fonts.onestBold,
    color: colors.black,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  incomingMessage: {
    alignSelf: 'flex-start',
  },
  outgoingMessage: {
    alignSelf: 'flex-end',
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 4,
  },
  incomingBubble: {
    backgroundColor: '#F0F0F0',
  },
  outgoingBubble: {
    backgroundColor: colors.primary,
  },
  messageText: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    lineHeight: 20,
  },
  incomingText: {
    color: colors.black,
  },
  outgoingText: {
    color: colors.white,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: fonts.onestLight,
    color: colors.gray1,
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray1,
    backgroundColor: colors.white,
  },
  inputIcon: {
    padding: 8,
    marginHorizontal: 4,
  },
  textInputContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  textInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.black,
    maxHeight: 100,
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
  },
});