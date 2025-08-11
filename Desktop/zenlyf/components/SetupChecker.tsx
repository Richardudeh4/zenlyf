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
      console.log('SetupChecker: Redirecting to splash screen');
      // Always redirect to splash screen when app starts/refreshes
      router.replace('/splash');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return <>{children}</>;
};

export default SetupChecker;
