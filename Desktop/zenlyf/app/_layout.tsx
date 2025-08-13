import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import SetupChecker from '../components/SetupChecker';
import { UserProvider } from '../contexts/UserContext';

export default function RootLayout() {
    const [fontLoaded] = useFonts({
    "plusJakarta": require('../assets/fonts/plusJakarta.ttf'),
  });
  return (
    <UserProvider>
      <SetupChecker>
        <Stack>
    <Stack.Screen name="splash" options={{ headerShown: false }} />
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/welcomescreen" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/screentwo" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/getstarted" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/signup/index" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/signup/healthOnboarding1" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/signup/healthOnboarding2" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/signup/AccountCreated" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/signup/reviewingDocument" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/WellnessSetup/index" options={{ headerShown: false }} />
    <Stack.Screen name="(auth)/WellnessSetup/trustedcontact" options={{ headerShown: false }}/>
    <Stack.Screen name="(auth)/WellnessSetup/accesscode" options={{ headerShown: false }}/>
    <Stack.Screen name="(auth)/WellnessSetup/credentialCreated" options={{ headerShown: false }}/>
    <Stack.Screen name="(auth)/threeTierSetup/index" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/threeTierSetup/surgeryHistory" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/threeTierSetup/mentalHealthinfo" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/threeTierSetup/vitalRange" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/threeTierSetup/insuranceandHospital" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/threeTierSetup/sucideRick" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/threeTierSetup/smartAlert" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/threeTierSetup/familyHistory" options={{ headerShown: false}}/>
    <Stack.Screen name="onBoarding/index" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/signin/index" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/signin/forgetPassword" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/signin/emailOtpSent" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/signin/verifyPhoneNumber" options={{ headerShown: false}}/>
    <Stack.Screen name="(auth)/signin/verifiedUser" options={{ headerShown: false}}/>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
    <Stack.Screen name="(doctor-tabs)" options={{ headerShown: false }}/>
    <Stack.Screen name="(caregiver-tabs)" options={{ headerShown: false }}/>
    <Stack.Screen name="MainScreen/index" options={{ headerShown: false }}/>
    <Stack.Screen name="MainScreen/todayMeds" options={{ headerShown: false }}/>
    <Stack.Screen name="MainScreen/successHealthEvent" options={{ headerShown: false }}/>
    <Stack.Screen name="MainScreen/myMedication" options={{ headerShown: false }}/>
    <Stack.Screen name="MainScreen/addMymedication" options={{ headerShown: false }}/>
    <Stack.Screen name="MainScreen/setRemainder" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/uploadNewReport" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/successReportUpload" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/viewReport" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/getAIInsight" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/addRoutine" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/prescriptionAnalysis" options={{ headerShown: false }}/>
      <Stack.Screen name="(auth)/accountSetup" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/patientProfile" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/uploadReport" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/predictionMedication" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/prescriptionSuccess" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/checkinSchedule" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/checkinSuccess" options={{ headerShown: false }}/>
      <Stack.Screen name="MainScreen/chatScreen" options={{ headerShown: false }}/>
        </Stack>
      </SetupChecker>
    </UserProvider>
  )

}
