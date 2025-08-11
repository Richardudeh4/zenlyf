import React, { createContext, ReactNode, useContext, useState } from 'react';

type UserRole = 'myself' | 'caregiver' | 'doctor';

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

  const clearUserData = () => {
    setSelectedRole(null);
    setHasCompletedSetup(false);
    setIsLoggedIn(false);
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
