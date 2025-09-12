import { svg } from '@/Config/Svg';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SvgXml } from 'react-native-svg';
import { colors } from '../../Config/colors';

export default function CaregiverTabLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
        
          height: 88,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          title: 'Patients',
          tabBarIcon: ({ color, size, focused }) => (
            <SvgXml 
              xml={focused ? svg.patient : svg.inactivePatient} 
              width={30} 
              height={30} 
            />
          ),
        }}
      />
       <Tabs.Screen
        name="schedule"
        options={{
          title: 'Report',
          tabBarIcon: ({ color, size, focused }) => (
            <SvgXml 
              xml={focused ? svg.activeReport : svg.report} 
              width={30} 
              height={30} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, size,focused }) => (
            <SvgXml 
              xml={focused ? svg.inbox : svg.inactiveMessage} 
              width={30} 
              height={30} 
            />
          ),
        }}
      />
     
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <SvgXml 
            xml={focused ? svg.activeSettings : svg.inactiveSettings} 
            width={30} 
            height={30} 
          />
          ),
        }}
      />
    </Tabs>
  );
}
