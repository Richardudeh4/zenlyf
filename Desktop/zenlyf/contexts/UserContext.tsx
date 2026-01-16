import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type UserRole = 'user' | 'caregiver' | 'doctor';

interface UserContextType {
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole) => void;
  hasCompletedSetup: boolean;
  setHasCompletedSetup: (completed: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [hasCompletedSetup, setHasCompletedSetup] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Restore user role from storage on app start
  useEffect(() => {
    const restoreUserRole = async () => {
      try {
        const authDataString = await AsyncStorage.getItem('authData');
        if (authDataString) {
          const authData = JSON.parse(authDataString);
          if (authData.role) {
            console.log('UserContext: Restoring user role:', authData.role);
            setSelectedRole(authData.role);
          }
        }
      } catch (error) {
        console.error('UserContext: Error restoring user role:', error);
      }
    };

    restoreUserRole();
  }, []);

  const clearUserData = async () => {
    setSelectedRole(null);
    setHasCompletedSetup(false);
    setIsLoggedIn(false);
    // Also clear from AsyncStorage
    try {
      await AsyncStorage.removeItem('authData');
    } catch (error) {
      console.error('UserContext: Error clearing user data:', error);
    }
  };

  const value: UserContextType = {
    selectedRole,
    setSelectedRole,
    hasCompletedSetup,
    setHasCompletedSetup,
    isLoggedIn,
    setIsLoggedIn,
    clearUserData,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
