import AppHeader from '@/components/AppHeader'
import Button from '@/components/Button'
import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import P from '@/components/P'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const index = () => {
  const { role } = useLocalSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
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
            <TouchableOpacity>
      <Text style={{color:"#0077FF",fontWeight:"600", fontSize:14, textDecorationLine:"underline"}}>Log in</Text>
            </TouchableOpacity>
        </View>
        <View style={{display:"flex", flexDirection:"column", gap:16}}>
            <Input placeholder='Email' editable={loading} value={email} onChangeText={setEmail}/>
            <Input type="password" placeholder="Password"/>
            <Input type="password" placeholder="Confirm Password"/>
        <Text style={{color:"#888888", fontSize:12, fontWeight:"400", marginTop:-8}}>Password must be at least 8 characters</Text>
        </View>
     
        </View>
        <View style={{display:"flex", flexDirection:"column", gap:24}}>
        <Button
         
        onPress={() => router.push(`/(auth)/signup/healthOnboarding1?role=${role}`) }
        btnText='Get Started'
        />
        <View style={{display:"flex", flexDirection:"row", alignItems:"flex-start", justifyContent:"center", paddingHorizontal:24, gap:14}}>
            <Checkbox 
            borderColor='#0066E6'
            color='#C4E0FF'
            checked={false}
            onPress={() => {}}
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