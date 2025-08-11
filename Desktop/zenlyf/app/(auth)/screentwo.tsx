import { Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import ecg from "../../assets/images/ecg.png";
import pill from "../../assets/images/pill.png";
import digital from "../../assets/images/digital.png";
import clinical from "../../assets/images/clinical.png";
import sentiment from "../../assets/images/sentiment.png";
import { useRouter } from "expo-router";

const SafeIems= [
    {mainText: "Detect unusual inactivity and checks in with you", icon: ecg},
    {mainText: "Reminds you to take your medications promptly", icon: pill},
    {mainText: "Alert Loved ones if you fall or stop responding", icon: digital},
    {mainText: "Helps you understand and share medical reports", icon: clinical},
    {mainText: "Encourages daily checks-ins to stay connected", icon: sentiment},
]
const {height,width} = Dimensions.get("window");
const Screentwo = () => {
    const router = useRouter();
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{paddingHorizontal:24, paddingVertical:38, display:"flex", flex:1 , flexDirection:"column", gap:80, }}>
        <View style={{display:"flex"}}>
        <Text style={{fontSize:32, fontWeight:"700",textShadowColor:'rgba(0, 0, 0, 0.45)',
            textShadowOffset: { height: 1 },
            textShadowRadius: 1}}>
            5 Ways <Text style={{color:"#0077FF"}}>Zenlyf</Text>{'\n'} Keeps you safe
        </Text>
        </View>
        <View style={{display:"flex",
             flexDirection:"column",
             gap:10,}}>
            {
                SafeIems.map((item, i ) => (
                    <TouchableOpacity key={i} style={{
                        width:"auto", 
                        paddingHorizontal:19,
                         paddingVertical:17, 
                          display:"flex", justifyContent:"center", 
                          alignItems:"center", borderWidth:1, 
                    borderColor:"#B3DAFF", borderRadius:8}}>
                        <View style={{display:"flex", flexDirection:"row", alignItems:"center",gap:14}}>
                        <Image source={{uri:item.icon}} />
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