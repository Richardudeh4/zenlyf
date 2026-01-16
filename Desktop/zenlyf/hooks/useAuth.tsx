import { clearAuthToken, getAuthToken } from '@/app/Requesthandler/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  userRole: 'user' | 'caregiver' | 'doctor' | null;
}

const TOKEN_EXPIRATION_DAYS = 4;

/**
 * Custom hook to check authentication status and token expiration
 * Tokens expire after 4 days
 */
export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    userRole: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Get the token from storage
      const token = await getAuthToken();
      
      if (!token) {
        console.log('useAuth: No token found');
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          userRole: null,
        });
        return;
      }

      // Get the token metadata
      const authDataString = await AsyncStorage.getItem('authData');
      
      if (!authDataString) {
        console.log('useAuth: No auth metadata found');
        // Token exists but no metadata - clear it
        await clearAuthToken();
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          userRole: null,
        });
        return;
      }

      const authData = JSON.parse(authDataString);
      const savedTimestamp = authData.timestamp;
      const savedRole = authData.role;

      // Check if token has expired (4 days = 4 * 24 * 60 * 60 * 1000 ms)
      const currentTime = Date.now();
      const expirationTime = savedTimestamp + (TOKEN_EXPIRATION_DAYS * 24 * 60 * 60 * 1000);

      console.log('=== useAuth Token Check ===');
      console.log('Current time:', new Date(currentTime).toISOString());
      console.log('Token saved at:', new Date(savedTimestamp).toISOString());
      console.log('Token expires at:', new Date(expirationTime).toISOString());
      console.log('Is expired:', currentTime > expirationTime);
      console.log('User role:', savedRole);

      if (currentTime > expirationTime) {
        console.log('useAuth: Token expired, clearing auth data');
        await clearAuthToken();
        await AsyncStorage.removeItem('authData');
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          userRole: null,
        });
      } else {
        console.log('useAuth: Token valid, user authenticated');
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          userRole: savedRole,
        });
      }
    } catch (error) {
      console.error('useAuth: Error checking auth status:', error);
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        userRole: null,
      });
    }
  };

  const refreshAuthStatus = async () => {
    await checkAuthStatus();
  };

  return {
    ...authState,
    refreshAuthStatus,
  };
};

