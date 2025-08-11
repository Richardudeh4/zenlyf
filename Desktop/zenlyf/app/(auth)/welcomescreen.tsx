import { useRouter } from 'expo-router';
import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'

const {height,width} = Dimensions.get("window");
const Welcomescreen = () => {
    const router = useRouter();
  return (
    <View style={{display:"flex", flex:1, backgroundColor:"white",justifyContent:"center", paddingHorizontal:24, position:"relative"}}>
        <View style={{display:"flex", flexDirection:"column",gap:100, justifyContent:"center",alignItems:"center"}}>
        <Image source={require("../../assets/images/illustration1.png")} />
        <View style={{display:"flex", flexDirection:"column", gap:24,alignItems:"center"}}>
        <Text style={{fontSize:40, fontWeight:"600", color:"050505"}}>Welcome to <Text style={{color:"#0077FF"}}>Zenlyf</Text></Text>
        <Text style={{color:"888888", fontSize:19, fontWeight:"300",textAlign:"center"}}>
            Zenlyf is your smart health companion.
            It watches for signs of danger, and helps alert the right people when you can’t.
                </Text>
            <Text style={{ color:"888888", fontSize:19, fontWeight:"300",textAlign:"center"}}>
            Feel safer every day with smart health
            alerts and check-ins.
            </Text> 
        </View>
        </View>
        <TouchableOpacity
        onPress={() => {
           router.push("/(auth)/screentwo") 
        }}
        style={{
            position:"absolute",
            bottom: 0.11 * height,
             display:"flex",
             marginHorizontal:0.06 * width,
             justifyContent:"center", 
             alignItems:"center", 
             borderRadius:11,
             width:382, 
             height:52, 
             backgroundColor: "#0077FF"
             }}>
         <Text style={{color:"white", fontSize:18, fontWeight:"600"}}>Next</Text> 
        </TouchableOpacity>
    </View>
  )
}

export default Welcomescreen