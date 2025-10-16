import AppHeader from '@/components/AppHeader'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import P from '@/components/P'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const index = () => {
  const { role } = useLocalSearchParams();
  console.log('Signup index - received role:', role);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [terms, setTerms] = useState<boolean>(false);

    // Email validation function
    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Password validation function
    const validatePassword = (password: string): { isValid: boolean; error: string } => {
      if (password.length < 8) {
        return { isValid: false, error: "Password must be at least 8 characters" };
      }
      
      if (!/[A-Z]/.test(password)) {
        return { isValid: false, error: "Password must contain at least one uppercase letter" };
      }
      
      if (!/[a-z]/.test(password)) {
        return { isValid: false, error: "Password must contain at least one lowercase letter" };
      }
      
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return { isValid: false, error: "Password must contain at least one symbol" };
      }
      
      return { isValid: true, error: "" };
    };

    // Validate form whenever inputs change
    useEffect(() => {
      const isEmailValid = email.length > 0 && validateEmail(email);
      const passwordValidation = password.length > 0 ? validatePassword(password) : { isValid: false, error: "" };
      const isConfirmPasswordValid = confirmPassword.length > 0 && password === confirmPassword;
      
      setIsFormValid(isEmailValid && passwordValidation.isValid && isConfirmPasswordValid && terms);
    }, [email, password, confirmPassword, terms]);

    // Handle email change
    const handleEmailChange = (text: string) => {
      setEmail(text);
      if (text.length > 0 && !validateEmail(text)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    };

    // Handle password change
    const handlePasswordChange = (text: string) => {
      setPassword(text);
      if (text.length > 0) {
        const validation = validatePassword(text);
        setPasswordError(validation.error);
      } else {
        setPasswordError("");
      }
      
      // Also validate confirm password if it has a value
      if (confirmPassword.length > 0) {
        if (text !== confirmPassword) {
          setConfirmPasswordError("Passwords do not match");
        } else {
          setConfirmPasswordError("");
        }
      }
    };

    // Handle confirm password change
    const handleConfirmPasswordChange = (text: string) => {
      setConfirmPassword(text);
      if (text.length > 0 && password !== text) {
        setConfirmPasswordError("Passwords do not match");
      } else {
        setConfirmPasswordError("");
      }
    };
  return (
    <SafeAreaView style={{flex:1,}}>
      <View style={{paddingHorizontal:24, display:"flex", flexDirection:"column", justifyContent:"space-between", flex:1}}>
        <View style={{display:"flex", flexDirection:"column", gap:52,}}>
        <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between",alignItems:"center"}}>
            <View style={{}}>
            <AppHeader
            showBackArrow
            text='Sign up'
             goToScreen='/(auth)/getstarted'
            />
            </View>
            <TouchableOpacity
            onPress={() => router.push(`/(auth)/signin`)}
            >
      <Text style={{color:"#0077FF",fontWeight:"600", fontSize:14, textDecorationLine:"underline"}}>Log in</Text>
            </TouchableOpacity>
        </View>
        <View style={{display:"flex", flexDirection:"column", gap:16}}>
            <View>
              <Input placeholder='Email' value={email} onChangeText={handleEmailChange}/>
              {emailError ? <Text style={{color:"#FF3B30", fontSize:12, fontWeight:"400", marginTop:4}}>{emailError}</Text> : null}
            </View>
            <View>
              <Input type="password" value={password} onChangeText={handlePasswordChange} placeholder="Password"/>
              {passwordError ? <Text style={{color:"#FF3B30", fontSize:12, fontWeight:"400", marginTop:4}}>{passwordError}</Text> : null}
            </View>
            <View>
              <Input type="password" value={confirmPassword} onChangeText={handleConfirmPasswordChange} placeholder="Confirm Password"/>
              {confirmPasswordError ? <Text style={{color:"#FF3B30", fontSize:12, fontWeight:"400", marginTop:4}}>{confirmPasswordError}</Text> : null}
            </View>
        </View>
     
        </View>
        <View style={{display:"flex", flexDirection:"column", gap:24}}>
        <Button
        onPress={() => {
          console.log('Navigating with params:', { role, email, password, confirmPassword, terms });
          router.push({
            pathname: "/(auth)/signup/healthOnboarding1",
            params: {
              role: role as string,
              email: email,
              password: password,
              confirmPassword: confirmPassword,
              terms: terms.toString()
            }
          });
        }}
        btnText='Get Started'
        disabled={!isFormValid}
        />
        <View style={{display:"flex", flexDirection:"row", alignItems:"flex-start", justifyContent:"center", paddingHorizontal:24, gap:14}}>
            <Checkbox 
            borderColor='#0066E6'
            color='#C4E0FF'
            checked={terms}
            onPress={() => setTerms(!terms)}
            size="large"/>
            <View style={{flex: 1, justifyContent:"center"}}>
              <P style={{fontSize:14, fontWeight:"400", lineHeight: 20}}>
                I agree to Zenlyf's <Text style={{color:"#0077FF"}}>Terms & Conditions</Text> and <Text style={{color:"#0077FF"}}>Privacy Policy</Text> and <Text style={{color:"#0077FF"}}>Cookies Policy</Text>
              </P>
            </View>
        </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})