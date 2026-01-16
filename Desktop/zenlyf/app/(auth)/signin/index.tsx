import { colors } from '@/Config/colors';
import { Login, saveAuthToken } from '@/app/Requesthandler/Auth';
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
import { useUser } from '../../../contexts/UserContext';

const SignInScreen = () => {
  const { setIsLoggedIn, selectedRole } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
    
      const loginData = {
        email: email,
        password: password
      };
      
      console.log('=== Login Attempt ===');
      console.log('Email:', email);
      console.log('Role:', selectedRole);
      
      const response = await Login(loginData);
      console.log("=== Login Response ===");
      console.log("Full response:", response);
      console.log("Access token exists:", !!response?.access_token);
      console.log("Refresh token exists:", !!response?.refresh_token);
      
      // Save the tokens - map access_token and refresh_token to access and refresh
      if (response?.access_token && response?.refresh_token) {
        const tokenData = {
          access: response.access_token,
          refresh: response.refresh_token
        };
        
        console.log("=== Saving Tokens ===");
        console.log("Token data to save:", {
          access: tokenData.access.substring(0, 20) + "...",
          refresh: tokenData.refresh.substring(0, 20) + "..."
        });
        console.log("User role:", selectedRole);
        
        // Save token with user role for 4-day expiration tracking
        await saveAuthToken(tokenData, selectedRole as 'user' | 'caregiver' | 'doctor');
        console.log("Tokens saved successfully with role");
        setIsLoggedIn(true);
        
        if (selectedRole === 'doctor') {
          router.replace('/(doctor-tabs)');
        } else if (selectedRole === 'caregiver') {
          router.replace('/(caregiver-tabs)');
        } else {
          // Default to regular tabs for 'myself' role
          router.replace('/(tabs)');
        }
      } else {
        console.error("=== Token Missing ===");
        console.error("Response does not contain required tokens");
        setIsLoading(false);
        alert("Login failed: Invalid response from server");
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("=== Login Error ===");
      console.error("Error:", error);
      alert("Login failed: " + (error.message || "Unknown error"));
    }
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    router.push('/(auth)/signin/forgetPassword');
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
          <View style={styles.headerContainer}>
            <AppHeader text="Login" />
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Description */}
          <View style={styles.descriptionContainer}>
            <P style={styles.description}>
              Your wellness companion. Safe, secure, and always by your side.
            </P>
          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999999"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIconText}>
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  signUpText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  descriptionContainer: {
    marginBottom: 40,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 22,
    textAlign: 'left',
  },
  inputContainer: {
    gap: 16,
  },
  inputWrapper: {
    position: 'relative',
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
  passwordInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#000000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconText: {
    fontSize: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});