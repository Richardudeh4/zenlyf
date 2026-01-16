import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../hooks/useAuth';

interface SetupCheckerProps {
  children: React.ReactNode;
}

const SetupChecker: React.FC<SetupCheckerProps> = ({ children }) => {
  const { isAuthenticated, isLoading, userRole } = useAuth();
  const { setIsLoggedIn, setSelectedRole } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth check to complete before redirecting
    if (isLoading) {
      return;
    }

    // Add a small delay to ensure the layout is mounted
    const timer = setTimeout(() => {
      console.log('=== SetupChecker Navigation Logic ===');
      console.log('Is Authenticated:', isAuthenticated);
      console.log('User Role:', userRole);

      if (isAuthenticated && userRole) {
        // User is authenticated with valid token, redirect to their role's home screen
        console.log('SetupChecker: User authenticated, redirecting to role-based screen');
        setIsLoggedIn(true);
        setSelectedRole(userRole);

        if (userRole === 'doctor') {
          router.replace('/(doctor-tabs)');
        } else if (userRole === 'caregiver') {
          router.replace('/(caregiver-tabs)');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        // User is not authenticated or token expired, show splash/onboarding
        console.log('SetupChecker: User not authenticated, redirecting to splash');
        setIsLoggedIn(false);
        router.replace('/splash');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, userRole, router, setIsLoggedIn, setSelectedRole]);

  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return <>{children}</>;
};

export default SetupChecker;
