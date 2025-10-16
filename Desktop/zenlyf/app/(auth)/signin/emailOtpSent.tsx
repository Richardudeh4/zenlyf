import { VerifyOtp } from '@/app/Requesthandler/Auth';
import { useToast } from '@/contexts/ToastContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../../../components/AppHeader';
import OtpInput from '../../../components/OtpInput';
import { colors } from '../../../Config/colors';
import { fonts } from '../../../Config/Fonts';

const EmailOtpSent = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otpCode, setOtpCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(60); // 20 seconds countdown
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { showToast } = useToast();

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpComplete = async (code: string) => {
    if (isVerifying) return; // Prevent multiple submissions
    
    try{
      setIsVerifying(true);
      const response = await VerifyOtp(code, email as string);
      console.log("VerifyOtp response:", response);
      showToast("OTP verified successfully", "success");
      
      // Small delay before navigation to ensure toast is shown
      setTimeout(() => {
        router.push("/(auth)/signup/AccountCreated");
      }, 500);
    }
    catch(error:any){
      setIsVerifying(false);
      showToast(error?.message || "Failed to verify OTP", "error");
      console.log("error", error?.message)
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      setTimeLeft(20);
      setCanResend(false);
      // Add your resend code logic here
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        text="Enter the code we sent"
        showBackArrow={true}
      />
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Enter the code we sent to you
        </Text>

        <View style={styles.otpContainer}>
          <OtpInput
            length={6}
            onComplete={handleOtpComplete}
            onCodeChange={setOtpCode}
          />
        </View>

        <View style={styles.resendContainer}>
          {canResend ? (
            <Text style={styles.resendText} onPress={handleResendCode}>
              Resend code
            </Text>
          ) : (
            <Text style={styles.timerText}>
              Resend code in {formatTime(timeLeft)}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailOtpSent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  description: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.black,
    lineHeight: 24,
    marginBottom: 40,
    textAlign: 'left',
  },
  otpContainer: {
    marginBottom: 40,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    fontSize: 16,
    fontFamily: fonts.onestMedium,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  timerText: {
    fontSize: 16,
    fontFamily: fonts.onestLight,
    color: colors.black,
  },
});