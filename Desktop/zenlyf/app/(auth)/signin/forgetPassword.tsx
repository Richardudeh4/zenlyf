import { colors } from '@/Config/colors';
import AppHeader from '@/components/AppHeader';
import P from '@/components/P';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    // Handle reset password logic here
    console.log('Reset password for:', email);
    router.push('/(auth)/signin/emailOtpSent');
    // You can add your password reset logic here
    // For example, send reset email, show success message, etc.
  };



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.headerWrapper}>
          <AppHeader text="Reset password" />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <P style={styles.instructions}>
              Enter the email associated with your{"\n"} Zenlyf account.
            </P>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Reset Password Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.resetButton,
              !email.trim() && styles.resetButtonDisabled
            ]} 
            onPress={handleResetPassword}
            disabled={!email.trim()}
          >
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  headerWrapper: {
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  instructionsContainer: {
    marginBottom: 24,
  },
  instructions: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4D5766',
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#000000',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  resetButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});