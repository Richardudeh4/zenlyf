import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppHeader from '@/components/AppHeader'
import P from '@/components/P'
import { useRouter } from 'expo-router'

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
                        <Text style={{fontSize:32, fontWeight:"700", color:"#050505"}}>Wellness Setup</Text>
                        <P style={{color:"#888888", fontSize:18, fontWeight:"400",}}>
                            Want smarter insights and tailored care{'\n'}
                            alerts? Complete your wellness setup. {'\n'}
                            This takes less than 3 minutes.
                        </P>
                        </View>
                <View style={{padding:34,borderWidth:2, borderColor:"#0077FF", backgroundColor:"#F6FAFE", display:"flex", flexDirection:"column", gap:32,
                  marginTop:48, alignItems:"flex-start",borderRadius:14}}>
                    <P style={{color:"#050505", fontWeight:"600", fontSize:24,lineHeight:28}}>Unlocks access to:</P>
                <View style={{display:"flex", flexDirection:"column", gap:24}}>
                  {accessItem.map((item,i) => (
                      <View key={i} style={{display:"flex", flexDirection:"row", alignItems:"center", gap:14}}>
                        <Image source={item.icon} style={{width: 24, height: 24}}/>
                        <P style={{color:"#050505", fontSize:18, fontWeight:"500"}}>{item.text}</P>
                      </View>
                    ))
                  }
                </View>
                </View>

                <View style={{marginTop:96, width:"100%"}}>
                  <TouchableOpacity 
                  onPress={() => router.push("/(auth)/WellnessSetup/trustedcontact")}
                  style={{backgroundColor: "#0077FF", borderRadius:10, width:"auto", height:52, display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <P style={{color:"#ffff",fontSize:18, fontWeight:"700"}}>Get Started</P>
                  </TouchableOpacity>
                </View>
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