import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppHeader from '@/components/AppHeader'
import P from '@/components/P'
import { useRouter } from 'expo-router'
import { Entypo } from '@expo/vector-icons'

const accessItem = [
  {icon: require("../../../assets/images/heart.png"), text:"Wellness Setup"},
  {icon:require("../../../assets/images/emergency.png"), text:"Emergency Contacts"},
  {icon:require("../../../assets/images/alert.png"), text:"Triggers & AI Alerts"},
  {icon:require("../../../assets/images/watch.png"), text:"Wearables Sync"},
  {icon:require("../../../assets/images/diversity.png"), text:`Limited Caregiver /  Doctor ${'\n'} Collaboration`}
]
const index = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
       <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        >
            <View style={{display:"flex", flexDirection:"column", gap:16,paddingHorizontal:24}}>
                 <View style={{display:"flex", flexDirection:'column', gap:16,}}>
                        <AppHeader
                        goToScreen="/(auth)/signup/healthOnboarding1"
                        showBackArrow
                        />
                        <View style={{display:"flex", flexDirection:"column", gap:14}}>
                        <Text style={{fontSize:32, fontWeight:"700", color:"#050505"}}>Full Health Profile</Text>
                        <P style={{color:"#888888", fontSize:18, fontWeight:"400",}}>
                            Build your complete health passport.{"\n"}
                            Required for critical alerts, hospital sync,{"\n"}
                            and full caregiver collaboration.
                        </P>
                </View>    
              </View>
              <View style={{display:"flex", flexDirection:"column", gap:16, width:"100%"}}>
                  <TouchableOpacity
                   onPress={() => router.push("/(auth)/threeTierSetup/surgeryHistory")}
                   style={{paddingHorizontal:10, paddingVertical:15, display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderWidth:1, borderColor:"#A4A4A4", borderRadius:8}}>
                            <P style={{fontFamily: "onest-thin", fontSize:18, fontWeight:"500"}}>Full Surgery / Implant History</P>
                            <Entypo name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/threeTierSetup/mentalHealthinfo")}
                   style={{paddingHorizontal:10, paddingVertical:15, display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderWidth:1, borderColor:"#A4A4A4", borderRadius:8}}>
                            <P style={{fontFamily: "onest-thin", fontSize:18, fontWeight:"500"}}>Mental Health Info</P>
                            <Entypo name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/threeTierSetup/vitalRange")}
                   style={{paddingHorizontal:10, paddingVertical:15, display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderWidth:1, borderColor:"#A4A4A4", borderRadius:8}}>
                            <P style={{fontFamily: "onest-thin", fontSize:18, fontWeight:"500"}}>Vital Ranges</P>
                            <Entypo name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => router.push("/(auth)/threeTierSetup/insuranceandHospital")}
                  style={{paddingHorizontal:10, paddingVertical:15, display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderWidth:1, borderColor:"#A4A4A4", borderRadius:8}}>
                            <P style={{fontFamily: "onest-thin", fontSize:18, fontWeight:"500"}}>Insurance & Preferred Hospital</P>
                            <Entypo name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={() => router.push("/(auth)/threeTierSetup/sucideRick")}
                  style={{paddingHorizontal:10, paddingVertical:15, display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderWidth:1, borderColor:"#A4A4A4", borderRadius:8}}>
                            <P style={{fontFamily: "onest-thin", fontSize:18, fontWeight:"500"}}>Suicide Risk</P>
                            <Entypo name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={() => router.push("/(auth)/threeTierSetup/smartAlert")}
                  style={{paddingHorizontal:10, paddingVertical:15, display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderWidth:1, borderColor:"#A4A4A4", borderRadius:8}}>
                            <P style={{fontFamily: "onest-thin", fontSize:18, fontWeight:"500"}}>Smart Alert Config (e.g, heart rate, no movement)</P>
                            <Entypo name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
                  <TouchableOpacity
                  onPress={() => router.push("/(auth)/threeTierSetup/familyHistory")}
                   style={{paddingHorizontal:10, paddingVertical:15, display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderWidth:1, borderColor:"#A4A4A4", borderRadius:8}}>
                            <P style={{fontFamily: "onest-thin", fontSize:18, fontWeight:"500"}}>Family Medical History</P>
                            <Entypo name="chevron-right" size={24} color="black" />
                </TouchableOpacity>
              </View>
                <View style={{marginTop:96, width:"100%"}}>
                  <TouchableOpacity 
                  onPress={() => router.push("/(auth)/WellnessSetup/trustedcontact")}
                  style={{backgroundColor: "#0077FF", borderRadius:10, width:"auto", height:52, display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <P style={{color:"#ffff",fontSize:18, fontWeight:"700"}}>Get Started</P>
                  </TouchableOpacity>
                </View>
                
            </View>
        
</ScrollView>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
 scrollContainer: {
      paddingBottom: 5, 
      gap:24,   
  },
   
})