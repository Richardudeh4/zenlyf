import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import P from '@/components/P'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const AccessCode = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
      <View style={{paddingHorizontal:63, paddingVertical:68, display:"flex", flexDirection:"column", gap:24, alignItems:"center"}}>
        <View style={{display:"flex", flexDirection:"column",gap:8, alignItems:"center"}}>
            <P style={{color:"#050505", fontSize:24, fontWeight:"700", lineHeight:26 }}>Care Access Code</P>
            <P style={{color:"#888888", fontSize:18, fontWeight:"400"}}>Show this QR code or share the {"\n"}
            link code with caregivers or doctors</P>
        </View>
        <View style={{display:"flex", flexDirection:"column", gap:5,alignItems:"center"}}>
        <Image source={require("../../../assets/images/qrcode.png")} alt='qrcode'/>
        <View style={{display:"flex", justifyContent:"center", alignItems:"center", width:181, height:60, borderRadius:6, backgroundColor:"#E0F0FF"}}>
            <P style={{fontSize:18, fontWeight:"500",color:"#0077FF"}}>CW83-PL40</P>
        </View>
        </View>
        <View style={{display:"flex", flexDirection:"column", gap:8,}}>
        <View style={{display:"flex", flexDirection:"row", gap:8}}>
        <TouchableOpacity style={{ display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row",gap:8, borderWidth:1, borderColor:"#E0F0FF",width:140, height:40,  borderRadius:8}}>
        <MaterialCommunityIcons name="content-copy" size={18} color="black" />
        <P style={{color:"#888888", fontSize:12, fontWeight:"500"}}>Copy</P>
        </TouchableOpacity>
        <TouchableOpacity style={{ display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row",gap:8, borderWidth:1, borderColor:"#E0F0FF",width:140, height:40, borderRadius:8}}>
        <MaterialIcons name="ios-share" size={18} color="black" />
        <P style={{color:"#888888", fontSize:12, fontWeight:"500"}}>Share</P>
        </TouchableOpacity>
        </View>
        <View style={{display:"flex", flexDirection:"row", gap:8}}>
        <TouchableOpacity style={{ display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row",gap:8, borderWidth:1, borderColor:"#E0F0FF",width:140, height:40, borderRadius:8}}>
        <MaterialIcons name="photo" size={18} color="black" />
        <P style={{color:"#888888", fontSize:12, fontWeight:"500"}}>Save QR Image</P>
        </TouchableOpacity>
        <TouchableOpacity style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row",gap:8, borderWidth:1, borderColor:"#E0F0FF",width:140, height:40, borderRadius:8}}>
        <MaterialIcons name="mail-outline" size={18} color="black" />
        <P style={{color:"#888888", fontSize:12, fontWeight:"500"}}>Email to Me</P>
        </TouchableOpacity>
        </View>
        </View>
        <TouchableOpacity>
          <Text style={{color:"#0077FF", fontSize:18, fontWeight:"500", textAlign:"center"}}>Regenerate Code</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => router.push("/WellnessSetup/credentialCreated")}
        style={{marginTop:52, width:84, height:35, backgroundColor:"#BEFFD9", borderRadius:6, display:"flex", justifyContent:"center", alignItems:"center"}}>
        <P style={{fontSize:12, fontWeight:"500"}}>00:53</P>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default AccessCode

const styles = StyleSheet.create({})