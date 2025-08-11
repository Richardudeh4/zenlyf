import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

const SafeIems= [
    {mainText: "Detect unusual inactivity and checks in with you", icon: require("../../assets/images/ecg.png")},
    {mainText: "Reminds you to take your medications promptly", icon: require("../../assets/images/pill.png")},
    {mainText: "Alert Loved ones if you fall or stop responding", icon: require("../../assets/images/digital.png")},
    {mainText: "Helps you understand and share medical reports", icon: require("../../assets/images/clinical.png")},
    {mainText: "Encourages daily checks-ins to stay connected", icon: require("../../assets/images/sentiment.png")},
]
const {height,width} = Dimensions.get("window");
const Screentwo = () => {
    const router = useRouter();
    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const handleItemPress = (index: number) => {
        setSelectedItem(selectedItem === index ? null : index);
    };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{paddingHorizontal:24, paddingVertical:38, display:"flex", flex:1 , flexDirection:"column", gap:80, }}>
        <View style={{display:"flex"}}>
        <Text style={{fontSize:32, fontWeight:"700",textShadowColor:'rgba(0, 0, 0, 0.45)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1}}>
            5 Ways <Text style={{color:"#0077FF"}}>Zenlyf</Text>{'\n'} Keeps you safe
        </Text>
        </View>
        <View style={{display:"flex",
             flexDirection:"column",
             gap:10,}}>
            {
                SafeIems.map((item, i ) => (
                    <TouchableOpacity 
                        key={i} 
                        onPress={() => handleItemPress(i)}
                        style={{
                            width:"auto", 
                            paddingHorizontal: selectedItem === i ? 25 : 19,
                            paddingVertical: selectedItem === i ? 19 : 17, 
                            display:"flex", justifyContent:"center", 
                            alignItems:"center", borderWidth:1, 
                            borderColor:"#B3DAFF", borderRadius:8
                        }}
                    >
                        <View style={{display:"flex", flexDirection:"row", alignItems:"center",gap:14}}>
                        <Image source={item.icon} style={{width: 24, height: 24}} />
                        <View>
                        <Text style={{}}>{item.mainText}</Text>
                        </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
           <TouchableOpacity
               onPress={() => {
                  router.push("/(auth)/accountSetup") 
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
                <Text style={{color:"white", fontSize:18, fontWeight:"600"}}>Next</Text> 
               </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Screentwo