import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '@/Config/colors'
import H4 from '@/components/H4'
import P from '@/components/P'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const AccountCreated = () => {
    const router = useRouter();
  return (
    <SafeAreaView 
    style={{flex:1}}
    >
        <View style={{paddingHorizontal:24, display:"flex", flexDirection:"column", justifyContent:"space-between",alignItems:"center", gap:121}}>
            <View>
            </View>
            <View style={{display:"flex", flexDirection:"column", gap:40, alignItems:"center",justifyContent:"center"}}>
            <View style={{width:140, height:140, borderRadius:"50%", backgroundColor:"#E0F0FF",display:"flex", justifyContent:"center", alignItems:"center"}}>
            <View style={{width:93, height:93, borderRadius:"50%", display:"flex", justifyContent:"center", alignItems:"center",backgroundColor:colors.primary}}>
                <Feather name="check" size={48} color="white" />
            </View>
            </View>
            <View style={{display:"flex", flexDirection:"column", gap:32, justifyContent:"center"}}>
            <H4 style={{fontSize:32,fontWeight:"500", color:"#050505", textAlign:"center"}}>Your account is successfully created!</H4>
            <P style={{color:"#888888", fontWeight:"400", fontSize:18, textAlign:"center"}}>Start with Zenlyf’s basic features — unlock personalized care and deeper insights by completing your wellness setup.</P>
            </View>
            </View>

         <View style={{display:"flex", flexDirection: "columm", gap:16,width:"100%"}}>
            <TouchableOpacity 
            onPress={() => router.push("/onBoarding")}
            style={{backgroundColor:colors.primary, display:"flex", justifyContent:"center", alignItems:"center", width:"100%", borderRadius:10, height:52}}>
                <Text style={{color:"#FFFFFF", fontSize:18, fontWeight:"700"}}>Go to Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => router.push("/(auth)/WellnessSetup")}
            style={{backgroundColor:colors.white, display:"flex", justifyContent:"center", alignItems:"center", width:"100%", borderRadius:10,height:52 }}>
                <Text style={{color:"#0077FF", fontSize:18, fontWeight:"500"}}>Complete Wellness setup</Text>
            </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default AccountCreated

const styles = StyleSheet.create({})