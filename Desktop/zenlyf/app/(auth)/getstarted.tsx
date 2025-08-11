import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const {width,height} = Dimensions.get("window");
const getstarted = () => {
    const router = useRouter();
    const { role } = useLocalSearchParams();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
        <View style={{paddingHorizontal:24, display:"flex", flex:1,paddingVertical:48, flexDirection:"column", gap:20 }}>
        <Text style={{fontWeight:"600", fontSize: 24,textShadowColor:'rgba(0, 0, 0, 0.45)',textShadowOffset: {width:1, height: 1 },
            textShadowRadius: 1}}>
            Let's get you {'\n'}started on Zenlyf 
        </Text>
        {/* This is for the GIF */}
        <View style={{display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"white"}}>
        <Image source={require("../../assets/images/login.gif")} style={{width:271, height:249}}/>
        </View>
        <TouchableOpacity
               onPress={() => {
                  router.push(`/(auth)/signup?role=${role}`) 
               }}
               style={{
                    display:"flex",
                    paddingHorizontal:0.06 * width,
                    justifyContent:"center", 
                    alignItems:"center", 
                    borderRadius:11,
                    width:382, 
                    height:52, 
                    backgroundColor: "#0077FF"
                    }}>
                <Text style={{color:"white", fontSize:18, fontWeight:"600"}}>Sign up</Text> 
        </TouchableOpacity>
        <View style={{display:"flex", flexDirection:"column", gap:24, marginTop:4}}>
        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
          <Text style={{fontSize:16, textAlign:"center"}}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signin')}>
            <Text style={{color:"#0077FF", fontSize:16, fontWeight:"600"}}>Log in</Text>
          </TouchableOpacity>
        </View>
        <Text style={{textAlign:"center"}}>OR</Text>
        <View style={{display:"flex", flexDirection:"column", gap:12}}>
        <TouchableOpacity style={{height:52, display:"flex", width:382,  justifyContent:"center", alignItems:"center", flexDirection:"row", gap:8,backgroundColor:"#E0F0FF99", borderRadius:8}}>
            <Image source={require("../../assets/images/google.png")}/>
            <Text style={{fontSize:16, fontWeight:"400"}}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height:52, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", gap:8,backgroundColor:"#E0F0FF99", borderRadius:8}}>
            <Image source={require("../../assets/images/apple.png")}/>
            <Text style={{fontSize:16, fontWeight:"400"}}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{height:52, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"row", gap:8,backgroundColor:"#E0F0FF99", borderRadius:8}}>
            <Image source={require("../../assets/images/facebook.png")}/>
            <Text style={{fontSize:16, fontWeight:"400"}}>Continue with Facebook</Text>
        </TouchableOpacity>
       
        </View>
        </View>
        </View>
   
    </SafeAreaView>
  )
}

export default getstarted

const styles = StyleSheet.create({})