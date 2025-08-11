import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AppHeader from '@/components/AppHeader'
import P from '@/components/P'
import Svg, { Circle, G } from 'react-native-svg';
import Input from '@/components/Input';
import SelectInput from '@/components/SelectInput';
import { colors } from '@/Config/colors';
import SwitchInput from '@/components/SwitchInput';
import SliderVisualization from '@/components/SliderVisualization';
import RangeSlider from '@/components/RangeSlider';
import { useRouter } from 'expo-router';


const gender = [
    {value:"male", label: "Male"},
    {value:"female", label: "Female"},
    {value:"others", label: "Others"},
]
const relationship = [
    {value:"single", label: "Single"},
    {value:"married", label: "Married"},
    
]

interface CircularProgressProps {
  currentStep: number;
  totalSteps?: number;
  size?: number;
  strokeWidth?: number;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  textStyle?: any;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  currentStep,
  totalSteps = 2,
  size = 45,
  strokeWidth = 3,
  activeColor = '#007AFF',
  inactiveColor = '#E5E5E5',
  backgroundColor = 'transparent',
  textStyle,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate progress for each step (since we have 2 steps, each is 50% of the circle)
  const stepProgress = circumference / totalSteps;
  const currentProgress = stepProgress * currentStep;

  // SVG center coordinates
  const center = size / 2;

  return (
    <View style={[styles.container, { width: size, height: size}]}>
      <Svg width={size} height={size} style={styles.svg}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          {/* Background circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={inactiveColor}
            strokeWidth={strokeWidth}
            fill={backgroundColor}
            strokeLinecap="round"
          />
          
          {/* Progress circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={activeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - currentProgress}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      
      {/* Text in the middle */}
      <View style={styles.textContainer}>
        <Text style={[styles.text, textStyle]}>
         <Text style={{fontFamily:"900"}}>{currentStep}</Text>/{totalSteps}
        </Text>
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get("window");
const Trustedcontact = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);
     const [show, setShow] = useState<boolean>(false);
     const [duration, setDuration] = useState<number>(30)
     const router = useRouter();
const [countryCode, setCountryCode] = useState<string>("+44");
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
      <View style={{display:"flex", flexDirection:"column", gap:41, paddingHorizontal:24,}}>
        <View style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
   
        {
        currentStep == 1 && (
        <AppHeader
        goToScreen="/(auth)/WellnessSetup/index"
        text='Add trusted contact'
        showBackArrow
        />
        )}
        {
        currentStep == 2 && (
        <AppHeader
        goToScreen="/(auth)/WellnessSetup/index"
        text='Enable Features'
        showBackArrow
        />
        )}
        {
        currentStep == 3 && (
        <AppHeader
        goToScreen="/(auth)/WellnessSetup/index"
        text="When should we check in?"
        showBackArrow
        />
        )}
        {
        currentStep == 4 && (
        <AppHeader
        goToScreen="/(auth)/WellnessSetup/index"
        text="Notifications"
        showBackArrow
        />
        )}
         <CircularProgress
            currentStep={currentStep}
            totalSteps={4}
          />
        </View>

        {
        currentStep == 1 && (
        <>
        <View style={{display:"flex", flexDirection:"column", gap:16}}>
        <Input placeholder='First Name' contStyle={{borderColor:"#A4A4A4",backgroundColor:"white"}}/>
        <Input placeholder='Last Name' contStyle={{borderColor:"#A4A4A4" ,backgroundColor:"white"}}/>
        <Input placeholder='Email' contStyle={{borderColor:"#A4A4A4" ,backgroundColor:"white"}}/>
         <Input 
        defaultCountryCode={countryCode}
        onDefualtCodePress={() => {
        setShow(true);
        }}
        type="phone" 
        placeholder='+44'
        autoCapitalize="none"
        />
         <Input placeholder='Occupation' contStyle={{borderColor:"#A4A4A4"}}/>
        <SelectInput
        placeholder="Select Gender"
        options={gender}
        multiSelect={false}
        selectedValues={[]}
        onSelect={() => {}}
        />
        <SelectInput
        placeholder="Relationship"
        options={relationship}
        multiSelect={false}
        selectedValues={[]}
        onSelect={() => {}}
        />
        </View>
        <View style={{marginTop:55,width:"100%"}}>
            <TouchableOpacity 
            onPress={() => setCurrentStep(2)}
             style={{display:"flex", justifyContent:"center", alignItems:"center", height:52, backgroundColor:colors.primary, borderRadius:10,}}>
                <P style={{fontSize:18, fontWeight:"700", color:"#FFFFFF"}}>Save Contact</P>
            </TouchableOpacity>
        </View>
        </>
        )}
        {
        currentStep == 2 && (
            <>
            <View style={{display:"flex", flexDirection:"column", gap:20, width:"100%"}}>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>Inactivity Detection</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>Fall Detection</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>Medication Reminders</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>Screen Time</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>AI Call Feature</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>Location Sharing {'\n'}
(for emergencies)</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>
            </View>
            <View style={{marginTop:40, width:"100%", height:1, backgroundColor:"#CBCBCB"}}/>
            <View style={{marginTop:20, display:"flex", flexDirection:"column", gap:6}}>
            <P style={{color:"#050505", fontSize:14, fontWeight:"500",}}><Text style={{fontWeight:"700"}}>Note: </Text>Zenlyf only activates these when needed.</P>
            <View style={{display:"flex",flexDirection:"row", gap:11, alignItems:"center"}}>
            <Image source={require("../../../assets/images/warning.png")} width={18} height={18} alt=''/>
            <P style={{fontSize:12, color:"#757575", fontWeight:"400",}}>Discover why these features matter to your health.</P>
            </View>
            </View>
            <View style={{marginTop:50,width:"100%"}}>
            <TouchableOpacity 
            onPress={() => setCurrentStep(3)}
             style={{display:"flex", justifyContent:"center", alignItems:"center", height:52, backgroundColor:colors.primary, borderRadius:10,}}>
                <P style={{fontSize:18, fontWeight:"700", color:"#FFFFFF"}}>Save and Continue</P>
            </TouchableOpacity>
        </View>

            </>
        )
      }
      {
        currentStep == 3 && (
            <>
            <View style={{display:"flex", flexDirection:"column", gap:46}}>
            <View style={{display:"flex", flexDirection:"column", gap:18}}>
            <P style={{color:"#888888", fontSize:18, fontWeight:"500",}}>Time of inactivity before check-in:</P>
            {/* <RangeSlider
            minValue={18}
            maxValue={100}
            initialValue={25}
            onValueChange={setDuration}
            width={280}
            step={1}
                /> */}
            
            </View>
            <View style={{display:"flex", flexDirection:"column", gap:20}}>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>Only check during daytime {"\n"}
            (7 AM - 10 AM)</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>  
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>Escalate if no response after  {"\n"} 10mins</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>  
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>I live alone</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>  
            </View>
            <View style={{display:"flex", flexDirection:"column", gap:24}}>
            <View style={{backgroundColor:"#CBCBCB", width:"100%", height:1,}}/>
            <View style={{width:"100%", height:99, display:"flex", justifyContent:"center", paddingHorizontal:21, alignItems:"center",borderRadius:8, backgroundColor:"#F1F8FF", }}>
            <P style={{color: "#050505", lineHeight:18, fontSize:16, fontWeight:"500"}}>If no activity is detected for 3+ hours, Zenlyf will check in. No response? We'll alert your guardian or emergency contact.</P>
            </View>
            <View style={{display:"flex", flexDirection:"row",gap:11, alignItems:"center"}}>
            <Image source={require("../../../assets/images/warning.png")} width={18} height={18} alt=''/>
            <P style={{color:"#757575", fontSize:12, fontWeight:"400",}}>Learn how AI health checks can support your wellbeing.</P>
            </View>
            </View>
            <View style={{marginTop:50,width:"100%"}}>
            <TouchableOpacity 
            onPress={() => setCurrentStep(4)}
             style={{display:"flex", justifyContent:"center", alignItems:"center", height:52, backgroundColor:colors.primary, borderRadius:10,}}>
                <P style={{fontSize:18, fontWeight:"700", color:"#FFFFFF"}}>Save and Continue</P>
            </TouchableOpacity>
            </View>
            </View>
            </>
        )
      }
      {
        currentStep == 4 && (
            <>
            <View style={{display:"flex", flexDirection:"column", justifyContent:"space-between",}}>
            <View style={{display:"flex", flexDirection:"column",gap:20,}}>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>Daily “Are you okay?”check-in</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>Medical alerts</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>AI insights on health changes</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>
            <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <P style={{color:"#050505", fontSize:18, fontWeight:"500",}}>Daily health motivations</P>
            <SwitchInput
             value={false}
            onValueChange={() => {}}/>
            </View>
            
            </View>
            <View style={{marginTop: 0.40 * height, width:"100%"}}>
            <TouchableOpacity 
            onPress={() => router.push("/(auth)/WellnessSetup/accesscode")}
             style={{display:"flex", justifyContent:"center", alignItems:"center", height:52, backgroundColor:colors.primary, borderRadius:10,}}>
                <P style={{fontSize:18, fontWeight:"700", color:"#FFFFFF"}}>Enable Notifications</P>
            </TouchableOpacity>
        </View>
            </View>
            </>
        )
      }
      </View>
    </SafeAreaView>
  )
}

export default Trustedcontact

const styles = StyleSheet.create({
    container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
   textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
    scrollContainer: {
      paddingBottom: 5, 
      gap:24,   
  },
  text: {
    fontSize: 10,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
})