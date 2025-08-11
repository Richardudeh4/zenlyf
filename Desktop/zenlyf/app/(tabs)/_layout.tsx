import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import { colors } from '../../Config/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
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
            <Image 
              source={color === colors.primary 
                ? require('../../assets/images/homeActive.png') 
                : require('../../assets/images/homeInactive.png')} 
              alt="home" 
              style={{width:24, height:24}} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="meds"
        options={{
          title: 'Meds',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={color === colors.primary 
                ? require('../../assets/images/monitorActive.png') 
                : require('../../assets/images/monitorInactive.png')} 
              alt="meds" 
              style={{width:24, height:24}} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={color === colors.primary 
                ? require('../../assets/images/chartActive.png') 
                : require('../../assets/images/chartInactive.png')} 
              alt="reports" 
              style={{width:24, height:24}} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="exercise"
        options={{
          title: 'Exercise',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={color === colors.primary 
                ? require('../../assets/images/directionActive.png') 
                : require('../../assets/images/directionInactive.png')} 
              alt="exercise" 
              style={{width:24, height:24}} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={color === colors.primary 
                ? require('../../assets/images/personActive.png') 
                : require('../../assets/images/personInactive.png')} 
              alt="profile" 
              style={{width:24, height:24}} 
            />
          ),
        }}
      />
   
    </Tabs>
  );
}
