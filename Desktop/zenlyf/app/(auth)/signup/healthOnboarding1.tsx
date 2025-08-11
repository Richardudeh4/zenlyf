import AppHeader from '@/components/AppHeader';
import Checkbox from '@/components/Checkbox';
import DateInput from '@/components/DateInput';
import GenderModal from '@/components/GenderModal';
import H4 from '@/components/H4';
import Input from '@/components/Input';
import P from '@/components/P';
import RadioButton from '@/components/RadioButton';
import SelectInput from '@/components/SelectInput';
import SpecializationModal from '@/components/SpecializationModal';
import { colors } from '@/Config/colors';
import { fonts } from '@/Config/Fonts';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { useUser } from '../../../contexts/UserContext';


const educationalQualification = [
    {value: "no_formal_education", label: "No Formal Education"},
    {value: "primary", label: "Primary Education"},
    {value: "secondary", label: "Secondary Education"},
    {value: "high_school", label: "High School"},
    {value: "diploma", label: "Diploma"},
    {value: "bachelor", label: "Bachelor's Degree"},
    {value: "master", label: "Master's Degree"},
    {value: "doctorate", label: "Doctorate/PhD"},
    {value: "professional", label: "Professional Certification"},
    {value: "trade_school", label: "Trade/Vocational School"},
    {value: "associate", label: "Associate Degree"},
    {value: "other", label: "Other"}
];

const religion = [
    {value: "christianity", label: "Christianity"},
    {value: "islam", label: "Islam"},
    {value: "judaism", label: "Judaism"},
    {value: "hinduism", label: "Hinduism"},
    {value: "buddhism", label: "Buddhism"},
    {value: "sikhism", label: "Sikhism"},
    {value: "jainism", label: "Jainism"},
    {value: "bahai", label: "Baháʼí Faith"},
    {value: "confucianism", label: "Confucianism"},
    {value: "taoism", label: "Taoism"},
    {value: "shintoism", label: "Shintoism"},
    {value: "traditional_african", label: "Traditional African Religion"},
    {value: "atheism", label: "Atheism"},
    {value: "agnosticism", label: "Agnosticism"},
    {value: "secular", label: "Secular/Non-religious"},
    {value: "prefer_not_to_say", label: "Prefer not to say"},
    {value: "other", label: "Other"}
];


const bloodGroup = [
    {value: "a_positive", label: "A+"},
    {value: "a_negative", label: "A-"},
    {value: "b_positive", label: "B+"},
    {value: "b_negative", label: "B-"},
    {value: "ab_positive", label: "AB+"},
    {value: "ab_negative", label: "AB-"},
    {value: "o_positive", label: "O+"},
    {value: "o_negative", label: "O-"},
    {value: "unknown", label: "Unknown"}
];
const disabilityType = [
    {value: "none", label: "No Disability"},
    {value: "visual_impairment", label: "Visual Impairment"},
    {value: "hearing_impairment", label: "Hearing Impairment"},
    {value: "speech_impairment", label: "Speech Impairment"},
    {value: "physical_disability", label: "Physical Disability"},
    {value: "intellectual_disability", label: "Intellectual Disability"},
    {value: "learning_disability", label: "Learning Disability"},
    {value: "autism_spectrum", label: "Autism Spectrum Disorder"},
    {value: "mental_health", label: "Mental Health Condition"},
    {value: "neurological", label: "Neurological Condition"},
    {value: "chronic_illness", label: "Chronic Illness"},
    {value: "mobility_impairment", label: "Mobility Impairment"},
    {value: "cognitive_disability", label: "Cognitive Disability"},
    {value: "multiple_disabilities", label: "Multiple Disabilities"},
    {value: "other", label: "Other"},
    {value: "prefer_not_to_say", label: "Prefer not to say"}
];

const assistanceRequired = [
    {value: "none", label: "No Assistance Required"},
    {value: "mobility_assistance", label: "Mobility Assistance"},
    {value: "visual_assistance", label: "Visual Assistance"},
    {value: "hearing_assistance", label: "Hearing Assistance"},
    {value: "communication_assistance", label: "Communication Assistance"},
    {value: "cognitive_assistance", label: "Cognitive Assistance"},
    {value: "personal_care", label: "Personal Care Assistance"},
    {value: "medication_management", label: "Medication Management"},
    {value: "transportation", label: "Transportation Assistance"},
    {value: "technology_assistance", label: "Technology Assistance"},
    {value: "sign_language", label: "Sign Language Interpreter"},
    {value: "reading_assistance", label: "Reading Assistance"},
    {value: "writing_assistance", label: "Writing Assistance"},
    {value: "emergency_assistance", label: "Emergency Assistance"},
    {value: "other", label: "Other Assistance"},
    {value: "multiple", label: "Multiple Types of Assistance"}
];
const languageReference = [
    {value: "english", label: "English"},
    {value: "spanish", label: "Spanish"},
    {value: "mandarin", label: "Mandarin Chinese"},
    {value: "hindi", label: "Hindi"},
    {value: "arabic", label: "Arabic"},
    {value: "bengali", label: "Bengali"},
    {value: "portuguese", label: "Portuguese"},
    {value: "russian", label: "Russian"},
    {value: "japanese", label: "Japanese"},
    {value: "punjabi", label: "Punjabi"},
    {value: "german", label: "German"},
    {value: "javanese", label: "Javanese"},
    {value: "wu_chinese", label: "Wu Chinese"},
    {value: "malay", label: "Malay"},
    {value: "telugu", label: "Telugu"},
    {value: "vietnamese", label: "Vietnamese"},
]
const gender = [
    {value:"male", label: "Male"},
    {value:"female", label: "Female"},
    {value:"others", label: "Others"},
]
const maritalStatus = [
    {value: "single", label: "Single"},
    {value: "married", label: "Married"},
]
const userRole = [
    {value:"user", label:"User"},
    {value:"caregiver", label:"Caregiver"},
    {value:"doctor", label:"Doctor"},
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

const HealthOnboardingOne = () => {
  const { setHasCompletedSetup } = useUser();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<string>("+44");
  const [userOption, setUserOption] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [isGenderModalVisible, setIsGenderModalVisible] = useState<boolean>(false);
  const [isSpecializationModalVisible, setIsSpecializationModalVisible] = useState<boolean>(false);
    const [selectedRoleType, setSelectedRoleType] = useState<string>("professional");
    const [organizationName, setOrganizationName] = useState<string>("");
    const [supervisorContact, setSupervisorContact] = useState<string>("");
    const [doctorsCode, setDoctorsCode] = useState<string>("");
    const [isIndependentCaregiver, setIsIndependentCaregiver] = useState<boolean>(false);
    const [idBadgeImage, setIdBadgeImage] = useState<string | null>(null);
    const [organizationIdImage, setOrganizationIdImage] = useState<string | null>(null);
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
    const [hospitalName, setHospitalName] = useState<string>("");
    const [hospitalAddress, setHospitalAddress] = useState<string>("");
    const [facilityContact, setFacilityContact] = useState<string>("");
    const [hospitalIdImage, setHospitalIdImage] = useState<string | null>(null);
    const [referralLetterImage, setReferralLetterImage] = useState<string | null>(null);
    const router = useRouter();
        const { role } = useLocalSearchParams();

    const pickImage = async (type: 'idBadge' | 'organizationId' | 'hospitalId' | 'referralLetter') => {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to upload images!');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        if (type === 'idBadge') {
          setIdBadgeImage(result.assets[0].uri);
        } else if (type === 'organizationId') {
          setOrganizationIdImage(result.assets[0].uri);
        } else if (type === 'hospitalId') {
          setHospitalIdImage(result.assets[0].uri);
        } else if (type === 'referralLetter') {
          setReferralLetterImage(result.assets[0].uri);
        }
      }
    };

    return (
    <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        >
    <View style={{display:"flex", flexDirection:"column", gap:40, paddingHorizontal:24}}>
        {
          role == "myself" && (
            <>
      <View style={{display:"flex", flexDirection:'column', gap:16,}}>
        <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <AppHeader
        goToScreen="/(auth)/signup"
        showBackArrow
        />
        <CircularProgress
            currentStep={currentStep}
            totalSteps={2}
          />
        </View>
        <View style={{display:"flex", flexDirection:"column", gap:14}}>
        <Text style={{fontSize:32, fontWeight:"700", color:"#050505"}}>Health Passport</Text>
        <P style={{color:"#888888", fontSize:18, fontWeight:"400",}}>Enter your details to get started.</P>
        </View>
        </View>


        {
        currentStep == 1 && (
        <View style={{display:"flex", flexDirection:"column", gap:16}}>
        <Input placeholder='First Name'/>
        <Input placeholder='Last Name'/>
        <Input placeholder='Email'/>
        <TouchableOpacity
          style={{
            marginTop: 10,
            height: 54,
            borderWidth: 1,
            borderColor: colors.gray1,
            borderRadius: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            backgroundColor: colors.white,
          }}
          onPress={() => setIsGenderModalVisible(true)}
        >
          <Text style={{
            fontSize: 16,
            fontFamily: fonts.onestLight,
            color: selectedGender ? colors.black : colors.gray1,
          }}>
            {selectedGender || 'Gender'}
          </Text>
        </TouchableOpacity>
        
        <GenderModal
          isVisible={isGenderModalVisible}
          onClose={() => setIsGenderModalVisible(false)}
          onSelect={(gender) => setSelectedGender(gender)}
          selectedGender={selectedGender}
        />
          <DateInput
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          value=''
          onSelect={() => {}}
        />
        <Input 
        defaultCountryCode={countryCode}
        onDefualtCodePress={() => {
        setShow(true);
        }}
        type="phone" 
        placeholder=''
        autoCapitalize="none"
        />
        <View style={{display:"flex", flexDirection:"column", gap:8}}>
        <H4>Basic Health Goal</H4>
        <Input placeholder='e.g. track meds / detect falls'/>
        </View>
        <TouchableOpacity
        onPress={() => setCurrentStep(2)}
         style={{marginTop:12, backgroundColor:colors.primary, height:52, borderRadius:10, display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Text style={{fontSize:18, fontWeight:"700", color:"white", textAlign:"center"}}>Continue</Text>
        </TouchableOpacity>
        <View>
        </View>
        </View>
            )
        }
        {
            currentStep == 2 && (
            <View style={{display:"flex", flexDirection:'column', gap:16,}}>
            <SelectInput
               placeholder="Marital Status"
               options={maritalStatus}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
               />
            <Input 
            contStyle={{}}
            placeholder='Occupation'
            inputStyle={{color:"black", backgroundColor:"white"}}
            />
            <SelectInput
               placeholder="Educational Qualification"
               options={educationalQualification}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
               />
            <SelectInput
               placeholder="Religion"
               options={religion}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
               />
            <SelectInput
               placeholder="Blood Group"
               options={bloodGroup}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
               />
            <SelectInput
               placeholder="Disability Type"
               options={disabilityType}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
               />
            <SelectInput
               placeholder="Assistance Required"
               options={assistanceRequired}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
               />
            <SelectInput
               placeholder="Language Preference"
               options={languageReference}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
               />
               <View style={{display:"flex", flexDirection:"column", gap:16}}>
                <H4 style={{color:"#050505", }}>Select Role</H4>
                 {userRole.map((option) => (
                    <RadioButton
                    key={option.value}
                    selected={userOption === option.value}
                    onPress={() => setUserOption(option.value)}
                    />
                ))}
               </View>
               <View style={{display:"flex", flexDirection:"column", gap:24}}>
                <View style={{width:"100%", height:0.5, backgroundColor:"#A4A4A4"}}/>
                <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                  <Checkbox 
                  onPress={() => {}}
                  checked={false}/>
                  <P style={{color:"#888888", fontSize:16, fontWeight:"500"}}>I accept the terms & allow permissions</P>
                </View>
                <TouchableOpacity 
                onPress={() => {
                  setHasCompletedSetup(true);
                  router.push("/(auth)/signup/AccountCreated");
                }}
                style={{backgroundColor:"#0077FF", width:"100%", height:52, borderRadius:10,display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <P style={{color:"#FFFFFF", fontWeight:"700", fontSize:18,}}>Create My Zenlyf Account</P>
                </TouchableOpacity>
               </View>
            </View>
                 
            )
        }
        </>
          )
        }

        {
          role == "doctor" && (
            <>
            {
        currentStep == 1 && (
          <>

      <View style={{display:"flex", flexDirection:'column', gap:16,}}>
        <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <AppHeader
        goToScreen="/(auth)/signup"
        text="Basic Information"
        showBackArrow
        />
        <CircularProgress
            currentStep={currentStep}
            totalSteps={3}
          />
        </View>
       
        </View>
          
        <View style={{display:"flex", flexDirection:"column", gap:16}}>
        <Input placeholder='First Name'/>
        <Input placeholder='Last Name'/>
        <Input placeholder='Email'/>
        <TouchableOpacity
          style={{
            marginTop: 10,
            height: 54,
            borderWidth: 1,
            borderColor: colors.gray1,
            borderRadius: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            backgroundColor: colors.white,
          }}
          onPress={() => setIsGenderModalVisible(true)}
        >
          <Text style={{
            fontSize: 16,
            fontFamily: fonts.onestLight,
            color: selectedGender ? colors.black : colors.gray1,
          }}>
            {selectedGender || 'Gender'}
          </Text>
        </TouchableOpacity>
        
        <GenderModal
          isVisible={isGenderModalVisible}
          onClose={() => setIsGenderModalVisible(false)}
          onSelect={(gender) => setSelectedGender(gender)}
          selectedGender={selectedGender}
        />
          <DateInput
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          value=''
          onSelect={() => {}}
        />
        <Input 
        defaultCountryCode={countryCode}
        onDefualtCodePress={() => {
        setShow(true);
        }}
        type="phone" 
        placeholder=''
        autoCapitalize="none"
        />
         <SelectInput
               placeholder="Marital Status"
               options={maritalStatus}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
            />
           <SelectInput
               placeholder="Language Preference"
               options={languageReference}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
              />
        <TouchableOpacity
        onPress={() => setCurrentStep(2)}
         style={{marginTop:12, backgroundColor:colors.primary, height:52, borderRadius:10, display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Text style={{fontSize:18, fontWeight:"700", color:"white", textAlign:"center"}}>Continue</Text>
        </TouchableOpacity>
        <View>
        </View>
        </View>
        </>
        )
        }
          {
           currentStep == 2 && (
            <>
          <View style={{display:"flex", flexDirection:'column', gap:16,}}>
        <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <AppHeader
        goToScreen="/(auth)/signup"
        text="Professional Details"
        showBackArrow
        />
        <CircularProgress
            currentStep={currentStep}
            totalSteps={3}
          />
        </View>
        
        </View>
             <View style={{display:"flex", flexDirection:"column", gap:16}}>
               {/* Specialization Section */}
               <View style={{display:"flex", flexDirection:"column", gap:12}}>
                 <Text style={{fontSize:18, fontWeight:"700", color:"#050505"}}>Specialization</Text>
                 
                 <TouchableOpacity
                   style={{
                     height: 54,
                     borderWidth: 1,
                     borderColor: colors.gray1,
                     borderRadius: 8,
                     paddingHorizontal: 16,
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     backgroundColor: colors.white,
                     flexDirection: 'row',
                   }}
                   onPress={() => setIsSpecializationModalVisible(true)}
                 >
                   <Text style={{
                     fontSize: 16,
                     fontFamily: fonts.onestLight,
                     color: selectedSpecialization ? colors.black : colors.gray1,
                   }}>
                     {selectedSpecialization || 'General Practitioner'}
                   </Text>
                   <Text style={{
                     fontSize: 16,
                     color: colors.black,
                   }}>
                     ▼
                   </Text>
                 </TouchableOpacity>
                 
                 <SpecializationModal
                   isVisible={isSpecializationModalVisible}
                   onClose={() => setIsSpecializationModalVisible(false)}
                   onSelect={(specialization) => setSelectedSpecialization(specialization)}
                   selectedSpecialization={selectedSpecialization}
                 />
               </View>
               
               {/* Place of Work Section */}
               <View style={{display:"flex", flexDirection:"column", gap:12}}>
                 <Text style={{fontSize:18, fontWeight:"700", color:"#050505"}}>Place of Work</Text>
                 
                 <View style={{display:"flex", flexDirection:"column", gap:12}}>
                   <Input 
                     placeholder="Hospital/Clinic Name"
                     value={hospitalName}
                     onChangeText={setHospitalName}
                   />
                   
                   <Input 
                     placeholder="Address"
                     value={hospitalAddress}
                     onChangeText={setHospitalAddress}
                   />
                   
                   <Input 
                     placeholder="Contact Number of Facility"
                     value={facilityContact}
                     onChangeText={setFacilityContact}
                   />
                 </View>
               </View>
               
               {/* Next Button */}
               <TouchableOpacity
                 onPress={() => {
                   setCurrentStep(3);
                   console.log('Next pressed for doctor step 2');
                 }}
                 style={{
                   marginTop: 12,
                   backgroundColor: colors.primary,
                   height: 52,
                   borderRadius: 10,
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                 }}
               >
                 <Text style={{
                   fontSize: 18,
                   fontWeight: "700",
                   color: "white",
                   textAlign: "center",
                 }}>
                   Next
                 </Text>
               </TouchableOpacity>
             </View>
             </>
           )
          }
          {
             currentStep == 3 && (
               <>
                 <View style={{display:"flex", flexDirection:'column', gap:16,}}>
        <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <AppHeader
        goToScreen="/(auth)/signup"
        text="Upload Proof of Profession"
        showBackArrow
        />
        <CircularProgress
            currentStep={currentStep}
            totalSteps={3}
          />
        </View>
       
        </View>
          
                 <View style={{display:"flex", flexDirection:"column", gap:16}}>
                   {/* Hospital/Clinic ID Upload Section */}
                   <View style={{display:"flex", flexDirection:"column", gap:12}}>
                     <Text style={{fontSize:18, fontWeight:"700", color:"#050505"}}>Photo of Hospital/Clinic ID or Work Badge</Text>
                     
                     <TouchableOpacity
                       style={{
                         height: 80,
                         borderWidth: 1,
                         borderColor: colors.gray1,
                         borderRadius: 12,
                         backgroundColor: colors.white,
                         paddingHorizontal: 16,
                         flexDirection: 'row',
                         alignItems: 'center',
                         gap: 12,
                       }}
                       onPress={() => pickImage('hospitalId')}
                     >
                       {hospitalIdImage ? (
                         <View style={{
                           width: 48,
                           height: 48,
                           borderRadius: 8,
                           overflow: 'hidden',
                         }}>
                           <Image 
                             source={{ uri: hospitalIdImage }} 
                             style={{
                               width: '100%',
                               height: '100%',
                             }}
                             resizeMode="cover"
                           />
                         </View>
                       ) : (
                         <View style={{
                           width: 48,
                           height: 48,
                           backgroundColor: colors.primary + '20',
                           borderRadius: 8,
                           justifyContent: 'center',
                           alignItems: 'center',
                         }}>
                           <Text style={{
                             fontSize: 24,
                             color: colors.primary,
                           }}>
                             🏔️
                           </Text>
                         </View>
                       )}
                       <Text style={{
                         fontSize: 16,
                         fontFamily: fonts.onestLight,
                         color: hospitalIdImage ? colors.black : colors.gray1,
                         flex: 1,
                       }}>
                         {hospitalIdImage ? 'Hospital ID uploaded' : 'Upload'}
                       </Text>
                     </TouchableOpacity>
                   </View>
                   
                   {/* Optional Referral Letter Upload Section */}
                   <View style={{display:"flex", flexDirection:"column", gap:12}}>
                     <Text style={{fontSize:18, fontWeight:"700", color:"#050505"}}>Optional: Referral Letter or Certificate</Text>
                     
                     <TouchableOpacity
                       style={{
                         height: 80,
                         borderWidth: 1,
                         borderColor: colors.gray1,
                         borderRadius: 12,
                         backgroundColor: colors.white,
                         paddingHorizontal: 16,
                         flexDirection: 'row',
                         alignItems: 'center',
                         gap: 12,
                       }}
                       onPress={() => pickImage('referralLetter')}
                     >
                       {referralLetterImage ? (
                         <View style={{
                           width: 48,
                           height: 48,
                           borderRadius: 8,
                           overflow: 'hidden',
                         }}>
                           <Image 
                             source={{ uri: referralLetterImage }} 
                             style={{
                               width: '100%',
                               height: '100%',
                             }}
                             resizeMode="cover"
                           />
                         </View>
                       ) : (
                         <View style={{
                           width: 48,
                           height: 48,
                           backgroundColor: colors.primary + '20',
                           borderRadius: 8,
                           justifyContent: 'center',
                           alignItems: 'center',
                         }}>
                           <Text style={{
                             fontSize: 24,
                             color: colors.primary,
                           }}>
                             🏔️
                           </Text>
                         </View>
                       )}
                       <Text style={{
                         fontSize: 16,
                         fontFamily: fonts.onestLight,
                         color: referralLetterImage ? colors.black : colors.gray1,
                         flex: 1,
                       }}>
                         {referralLetterImage ? 'Referral letter uploaded' : 'Upload'}
                       </Text>
                     </TouchableOpacity>
                   </View>
                   
                   {/* Submit for Verification Button */}
                   <TouchableOpacity
                     style={{
                       marginTop: 20,
                       backgroundColor: colors.primary,
                       height: 52,
                       borderRadius: 10,
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                     }}
                     onPress={() => {
                       // Handle submit for verification
                       console.log('Submit for verification pressed');
                       setHasCompletedSetup(true);
                       router.push('/(tabs)');
                     }}
                   >
                     <Text style={{
                       fontSize: 16,
                       fontWeight: "700",
                       color: colors.white,
                     }}>
                       Submit for Verification
                     </Text>
                   </TouchableOpacity>
                 </View>
               </>
             )
           }

            </>
          )
        }

        {
          role == "caregiver" && (
            <>
        {
        currentStep == 1 && (
          <>
        <View style={{display:"flex", flexDirection:'column', gap:16,}}>
        <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <AppHeader
        goToScreen="/(auth)/signup"
        text="Basic Information"
        showBackArrow
        />
        <CircularProgress
            currentStep={currentStep}
            totalSteps={3}
          />
        </View>
       
        </View>
        <View style={{display:"flex", flexDirection:"column", gap:16}}>
        <Input placeholder='First Name'/>
        <Input placeholder='Last Name'/>
        <Input placeholder='Email'/>
        <TouchableOpacity
          style={{
            marginTop: 10,
            height: 54,
            borderWidth: 1,
            borderColor: colors.gray1,
            borderRadius: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            backgroundColor: colors.white,
          }}
          onPress={() => setIsGenderModalVisible(true)}
        >
          <Text style={{
            fontSize: 16,
            fontFamily: fonts.onestLight,
            color: selectedGender ? colors.black : colors.gray1,
          }}>
            {selectedGender || 'Gender'}
          </Text>
        </TouchableOpacity>
        
        <GenderModal
          isVisible={isGenderModalVisible}
          onClose={() => setIsGenderModalVisible(false)}
          onSelect={(gender) => setSelectedGender(gender)}
          selectedGender={selectedGender}
        />
          <DateInput
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          value=''
          onSelect={() => {}}
        />
        <Input 
        defaultCountryCode={countryCode}
        onDefualtCodePress={() => {
        setShow(true);
        }}
        type="phone" 
        placeholder=''
        autoCapitalize="none"
        />
         <SelectInput
               placeholder="Marital Status"
               options={maritalStatus}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
            />
           <SelectInput
               placeholder="Language Preference"
               options={languageReference}
               multiSelect={false}
               selectedValues={[]}
               onSelect={() => {}}
              />
        <TouchableOpacity
        onPress={() => setCurrentStep(2)}
         style={{marginTop:12, backgroundColor:colors.primary, height:52, borderRadius:10, display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Text style={{fontSize:18, fontWeight:"700", color:"white", textAlign:"center"}}>Continue</Text>
        </TouchableOpacity>
        <View>
        </View>
        </View>
        </>
        )
        }

          {
           currentStep == 2 && (
            <>
            <View style={{display:"flex", flexDirection:'column', gap:16,}}>
        <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <AppHeader
        goToScreen="/(auth)/signup"
        text="Professional Details"
        showBackArrow
        />
        <CircularProgress
            currentStep={currentStep}
            totalSteps={3}
          />
        </View>
       
        </View>
           
             <View style={{display:"flex", flexDirection:"column", gap:16}}>
               {/* Role Type Section */}
               <View style={{display:"flex", flexDirection:"column", gap:12}}>
                 <Text style={{fontSize:18, fontWeight:"700", color:"#050505"}}>Role Type</Text>
                 
                 {/* Role Type Radio Buttons */}
                 <View style={{display:"flex", flexDirection:"row", gap:12}}>
                   <TouchableOpacity
                     style={{
                       flex: 1,
                       paddingVertical: 16,
                       paddingHorizontal: 20,
                       borderRadius: 12,
                       borderWidth: 1,
                       borderColor: selectedRoleType === 'professional' ? colors.primary : colors.gray1,
                       backgroundColor: selectedRoleType === 'professional' ? colors.primary + '10' : colors.white,
                       alignItems: 'center',
                       justifyContent: 'center',
                     }}
                     onPress={() => setSelectedRoleType('professional')}
                   >
                     <View style={{
                       flexDirection: 'row',
                       alignItems: 'center',
                       gap: 8,
                     }}>
                       <View style={{
                         width: 20,
                         height: 20,
                         borderRadius: 10,
                         borderWidth: 2,
                         borderColor: selectedRoleType === 'professional' ? colors.primary : colors.gray1,
                         backgroundColor: selectedRoleType === 'professional' ? colors.primary : 'transparent',
                         justifyContent: 'center',
                         alignItems: 'center',
                       }}>
                         {selectedRoleType === 'professional' && (
                           <View style={{
                             width: 8,
                             height: 8,
                             borderRadius: 4,
                             backgroundColor: colors.white,
                           }} />
                         )}
                       </View>
                       <Text style={{
                         fontSize: 16,
                         fontWeight: "500",
                         color: selectedRoleType === 'professional' ? colors.primary : colors.gray1,
                       }}>
                         Professional
                       </Text>
                     </View>
                   </TouchableOpacity>
                   
                   <TouchableOpacity
                     style={{
                       flex: 1,
                       paddingVertical: 16,
                       paddingHorizontal: 20,
                       borderRadius: 12,
                       borderWidth: 1,
                       borderColor: selectedRoleType === 'family' ? colors.primary : colors.gray1,
                       backgroundColor: selectedRoleType === 'family' ? colors.primary + '10' : colors.white,
                       alignItems: 'center',
                       justifyContent: 'center',
                     }}
                     onPress={() => setSelectedRoleType('family')}
                   >
                     <View style={{
                       flexDirection: 'row',
                       alignItems: 'center',
                       gap: 8,
                     }}>
                       <View style={{
                         width: 20,
                         height: 20,
                         borderRadius: 10,
                         borderWidth: 2,
                         borderColor: selectedRoleType === 'family' ? colors.primary : colors.gray1,
                         backgroundColor: selectedRoleType === 'family' ? colors.primary : 'transparent',
                         justifyContent: 'center',
                         alignItems: 'center',
                       }}>
                         {selectedRoleType === 'family' && (
                           <View style={{
                             width: 8,
                             height: 8,
                             borderRadius: 4,
                             backgroundColor: colors.white,
                           }} />
                         )}
                       </View>
                       <Text style={{
                         fontSize: 16,
                         fontWeight: "500",
                         color: selectedRoleType === 'family' ? colors.primary : colors.gray1,
                       }}>
                         Family Member
                       </Text>
                     </View>
                   </TouchableOpacity>
                 </View>
               </View>
               
               {/* Input Fields */}
               <View style={{display:"flex", flexDirection:"column", gap:16}}>
                 <Input 
                   placeholder='Organization Name'
                   value={organizationName}
                   onChangeText={setOrganizationName}
                 />
                 <Input 
                   placeholder='Supervisor or Facility Contact info'
                   value={supervisorContact}
                   onChangeText={setSupervisorContact}
                 />
               </View>
               
               {/* Next Button */}
               <TouchableOpacity
                 onPress={() => {
                  setCurrentStep(3);
                   // Handle next step or form submission
                   console.log('Next pressed for caregiver step 2');
                 }}
                 style={{
                   marginTop: 12,
                   backgroundColor: colors.primary,
                   height: 52,
                   borderRadius: 10,
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                 }}
               >
                 <Text style={{
                   fontSize: 18,
                   fontWeight: "700",
                   color: "white",
                   textAlign: "center",
                 }}>
                   Next
                 </Text>
               </TouchableOpacity>
             </View>
             </>
           )
         }
        {
           currentStep == 3 && (
            <>
          <View style={{display:"flex", flexDirection:'column', gap:16,}}>
        <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
        <AppHeader
        goToScreen="/(auth)/signup"
        text="Upload Caregiver Verification"
        showBackArrow
        />
        <CircularProgress
            currentStep={currentStep}
            totalSteps={3}
          />
        </View>
       
        </View>

             <View style={{display:"flex", flexDirection:"column", gap:16}}>
               {/* Uploads Section */}
               <View style={{display:"flex", flexDirection:"column", gap:12}}>
                 <Text style={{fontSize:18, fontWeight:"700", color:"#050505"}}>Uploads:</Text>
                 
                 {/* Upload Fields */}
                 <View style={{display:"flex", flexDirection:"column", gap:12}}>
                   {/* Photo of ID Badge or Certificate */}
                   <TouchableOpacity
                     style={{
                       height: 80,
                       borderWidth: 1,
                       borderColor: colors.gray1,
                       borderRadius: 12,
                       backgroundColor: colors.white,
                       paddingHorizontal: 16,
                       flexDirection: 'row',
                       alignItems: 'center',
                       gap: 12,
                     }}
                     onPress={() => pickImage('idBadge')}
                   >
                     {idBadgeImage ? (
                       <View style={{
                         width: 48,
                         height: 48,
                         borderRadius: 8,
                         overflow: 'hidden',
                       }}>
                         <Image 
                           source={{ uri: idBadgeImage }} 
                           style={{
                             width: '100%',
                             height: '100%',
                           }}
                           resizeMode="cover"
                         />
                       </View>
                     ) : (
                       <View style={{
                         width: 48,
                         height: 48,
                         backgroundColor: colors.primary + '20',
                         borderRadius: 8,
                         justifyContent: 'center',
                         alignItems: 'center',
                       }}>
                         <Text style={{
                           fontSize: 24,
                           color: colors.primary,
                         }}>
                           🏔️
                         </Text>
                       </View>
                     )}
                     <Text style={{
                       fontSize: 16,
                       fontFamily: fonts.onestLight,
                       color: idBadgeImage ? colors.black : colors.gray1,
                       flex: 1,
                     }}>
                       {idBadgeImage ? 'ID Badge/Certificate uploaded' : 'Photo of ID Badge or Certificate'}
                     </Text>
                   </TouchableOpacity>
                   
                   {/* Photo of ID Organization ID */}
                   <TouchableOpacity
                     style={{
                       height: 80,
                       borderWidth: 1,
                       borderColor: colors.gray1,
                       borderRadius: 12,
                       backgroundColor: colors.white,
                       paddingHorizontal: 16,
                       flexDirection: 'row',
                       alignItems: 'center',
                       gap: 12,
                     }}
                     onPress={() => pickImage('organizationId')}
                   >
                     {organizationIdImage ? (
                       <View style={{
                         width: 48,
                         height: 48,
                         borderRadius: 8,
                         overflow: 'hidden',
                       }}>
                         <Image 
                           source={{ uri: organizationIdImage }} 
                           style={{
                             width: '100%',
                             height: '100%',
                           }}
                           resizeMode="cover"
                         />
                       </View>
                     ) : (
                       <View style={{
                         width: 48,
                         height: 48,
                         backgroundColor: colors.primary + '20',
                         borderRadius: 8,
                         justifyContent: 'center',
                         alignItems: 'center',
                       }}>
                         <Text style={{
                           fontSize: 24,
                           color: colors.primary,
                         }}>
                           🏔️
                         </Text>
                       </View>
                     )}
                     <Text style={{
                       fontSize: 16,
                       fontFamily: fonts.onestLight,
                       color: organizationIdImage ? colors.black : colors.gray1,
                       flex: 1,
                     }}>
                       {organizationIdImage ? 'Organization ID uploaded' : 'Photo of ID Organization ID'}
                     </Text>
                   </TouchableOpacity>
                 </View>
               </View>
               
               {/* Doctor's Zenlyf Code Input */}
               <View style={{display:"flex", flexDirection:"column", gap:12}}>
                 <Input 
                   placeholder="Add Doctor's Zenlyf Code"
                   value={doctorsCode}
                   onChangeText={setDoctorsCode}
                 />
               </View>
               
               {/* Independent Caregiver Checkbox */}
               <View style={{display:"flex", flexDirection:"row", alignItems:"center", gap:12}}>
                 <TouchableOpacity
                   style={{
                     width: 24,
                     height: 24,
                     borderRadius: 12,
                     borderWidth: 2,
                     borderColor: isIndependentCaregiver ? colors.success : colors.gray1,
                     backgroundColor: isIndependentCaregiver ? colors.success : 'transparent',
                     justifyContent: 'center',
                     alignItems: 'center',
                   }}
                   onPress={() => setIsIndependentCaregiver(!isIndependentCaregiver)}
                 >
                   {isIndependentCaregiver && (
                     <Text style={{
                       fontSize: 16,
                       color: colors.white,
                       fontWeight: 'bold',
                     }}>
                       ✓
                     </Text>
                   )}
                 </TouchableOpacity>
                 <Text style={{
                   fontSize: 16,
                   fontFamily: fonts.onestMedium,
                   color: colors.black,
                   flex: 1,
                 }}>
                   I am an independent Caregiver
                 </Text>
               </View>
               
               {/* Action Buttons */}
               <View style={{display:"flex", flexDirection:"column", gap:12, marginTop: 20}}>
                 {/* Upload Button */}
                 <TouchableOpacity
                   style={{
                     height: 52,
                     borderWidth: 1,
                     borderColor: colors.primary,
                     borderRadius: 10,
                     backgroundColor: colors.primary + '10',
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     gap: 8,
                   }}
                   onPress={() => {
                     // Handle upload action
                     console.log('Upload pressed');
                   }}
                 >
                   <Text style={{
                     fontSize: 18,
                     color: colors.primary,
                     fontWeight: '600',
                   }}>
                     ↑
                   </Text>
                   <Text style={{
                     fontSize: 16,
                     fontWeight: "600",
                     color: colors.primary,
                   }}>
                     Upload
                   </Text>
                 </TouchableOpacity>
                 
                 {/* Submit Button */}
                 <TouchableOpacity
                   style={{
                     height: 52,
                     backgroundColor: colors.primary,
                     borderRadius: 10,
                     justifyContent: 'center',
                     alignItems: 'center',
                   }}
                                        onPress={() => {
                       // Handle submit for manual review
                       console.log('Submit for Manual Review pressed');
                       setHasCompletedSetup(true);
                       router.push('/(tabs)');
                     }}
                 >
                   <Text style={{
                     fontSize: 16,
                     fontWeight: "700",
                     color: colors.white,
                   }}>
                     Submit for Manual Review
                   </Text>
                 </TouchableOpacity>
               </View>
             </View>
             </>
           )
          }
           </>
          )
        }
        </View>
     </ScrollView>
    </SafeAreaView>
  )
}

export default HealthOnboardingOne

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