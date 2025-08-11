import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

interface SetupCheckerProps {
  children: React.ReactNode;
}

const SetupChecker: React.FC<SetupCheckerProps> = ({ children }) => {
  const { selectedRole, hasCompletedSetup, isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Add a small delay to ensure the layout is mounted
    const timer = setTimeout(() => {
      console.log('SetupChecker: hasCompletedSetup:', hasCompletedSetup, 'selectedRole:', selectedRole, 'isLoggedIn:', isLoggedIn);
      
      // If user is logged in, redirect to appropriate dashboard based on role
      if (isLoggedIn) {
        console.log('SetupChecker: Redirecting to dashboard for role:', selectedRole);
        if (selectedRole === 'doctor') {
          router.replace('/(doctor-tabs)');
        } else if (selectedRole === 'caregiver') {
          router.replace('/(caregiver-tabs)');
        } else {
          // Default to regular tabs for 'myself' role
          router.replace('/(tabs)');
        }
      }
      // If user has completed setup and has a selected role, redirect to sign-in screen
      else if (hasCompletedSetup && selectedRole) {
        console.log('SetupChecker: Redirecting to sign-in screen');
        router.replace('/(auth)/signin');
      }
      // If user has no role selected, redirect to account setup
      else if (!selectedRole) {
        console.log('SetupChecker: Redirecting to account setup');
        router.replace('/(auth)/accountSetup');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hasCompletedSetup, selectedRole, router]);

  return <>{children}</>;
};

export default SetupChecker;
