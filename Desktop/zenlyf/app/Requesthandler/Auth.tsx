import AsyncStorage from "@react-native-async-storage/async-storage";
import { RequestHandler } from "./Request";

const request = new RequestHandler();

// export async function getAuthToken(): Promise<string> {
//   try {
//     const cookiesString = await AsyncStorage.getItem("cookies");
//     if (cookiesString) {
//       const cookies = JSON.parse(cookiesString);
//       if (
//         (cookies && cookies.data && cookies.data.token) ||
//         (cookies && cookies.token)
//       ) {
//         return cookies.data ? cookies.data.token : cookies.token;
//       }
//     }
//     return "";
//   } catch (error) {
//     console.error("Error getting auth token:", error);
//     return "";
//   }
// }

export async function getAuthToken(): Promise<string> {
  try {
    const cookiesString = await AsyncStorage.getItem("cookies");
    console.log("=== GetAuthToken Debug ===");
    console.log("Raw cookies string:", cookiesString);
    
    if (cookiesString) {
      const cookies = JSON.parse(cookiesString);
      console.log("Parsed cookies:", cookies);
      console.log("Access token exists:", !!cookies.access);
      console.log("Refresh token exists:", !!cookies.refresh);
      
      // Return the access token
      const token = cookies.access || cookies.refresh;
      console.log("Returning token (first 20 chars):", token ? token.substring(0, 20) + "..." : "empty");
      return token || "";
    }
    
    console.log("No cookies found in storage");
    return "";
  } catch (error) {
    console.error("Error getting auth token:", error);
    return "";
  }
}

export async function getRefreshToken(): Promise<string> {
  try {
    const cookiesString = await AsyncStorage.getItem("cookies");
    if (cookiesString) {
      const cookies = JSON.parse(cookiesString);
      return cookies.refresh || "";
    }
    return "";
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return "";
  }
}

export async function saveAuthToken(tokenData: any, userRole?: 'user' | 'caregiver' | 'doctor'): Promise<void> {
  try {
    const dataToSave = {
     access: tokenData.access,
      refresh: tokenData.refresh,
    };
    
    await AsyncStorage.setItem("cookies", JSON.stringify(dataToSave));
    
    // Save auth metadata with timestamp and role for expiration check
    const authData = {
      timestamp: Date.now(),
      role: userRole || 'user',
    };
    
    await AsyncStorage.setItem("authData", JSON.stringify(authData));
    console.log("Token and auth metadata saved successfully");
    console.log("Auth data:", { ...authData, timestamp: new Date(authData.timestamp).toISOString() });
  } catch (error) {
    console.error("Error saving auth token:", error);
    throw error;
  }
}


export async function clearAuthToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem("cookies");
    await AsyncStorage.removeItem("authData");
    console.log("Token and auth metadata cleared successfully");
  } catch (error) {
    console.error("Error clearing auth token:", error);
    throw error;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const token = await getAuthToken();
    if (!token) return false;
    
    // Check if token has expired (4 days)
    const authDataString = await AsyncStorage.getItem('authData');
    if (!authDataString) return false;
    
    const authData = JSON.parse(authDataString);
    const currentTime = Date.now();
    const expirationTime = authData.timestamp + (4 * 24 * 60 * 60 * 1000);
    
    return currentTime < expirationTime;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}

/**
 * Get token expiration information
 * Returns the number of milliseconds until token expires, or null if no token/expired
 */
export async function getTokenExpirationInfo(): Promise<{
  isValid: boolean;
  expiresAt: Date | null;
  timeRemaining: number | null;
  role: 'user' | 'caregiver' | 'doctor' | null;
}> {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { isValid: false, expiresAt: null, timeRemaining: null, role: null };
    }
    
    const authDataString = await AsyncStorage.getItem('authData');
    if (!authDataString) {
      return { isValid: false, expiresAt: null, timeRemaining: null, role: null };
    }
    
    const authData = JSON.parse(authDataString);
    const currentTime = Date.now();
    const expirationTime = authData.timestamp + (4 * 24 * 60 * 60 * 1000);
    const timeRemaining = expirationTime - currentTime;
    
    return {
      isValid: timeRemaining > 0,
      expiresAt: new Date(expirationTime),
      timeRemaining: timeRemaining > 0 ? timeRemaining : null,
      role: authData.role || null,
    };
  } catch (error) {
    console.error("Error getting token expiration info:", error);
    return { isValid: false, expiresAt: null, timeRemaining: null, role: null };
  }
}


// export async function UpdateProfileWithFile(formData: FormData): Promise<any> {
//   try {
//     const token = await getAuthToken();
    
//     console.log("=== UpdateProfileWithFile Debug Info ===");
//     console.log("Token exists:", !!token);
//     console.log("FormData keys:", Array.from(formData.keys()));
    
//     if (!token) {
//       throw new Error("No authentication token found");
//     }

//     // Use the request handler's postFormData method or create a new one
//     const response = await request.patch("api/users/me/", formData, token);
//     console.log("Profile update response:", response);
//     return response;
//   } catch (error: any) {
//     console.error("=== UpdateProfileWithFile Error ===");
//     console.error("Error:", error);
//     throw error;
//   }
// }
export async function UpdateProfileWithFile(formData: FormData): Promise<any> {
  try {
    const token = await getAuthToken();
    
    console.log("=== UpdateProfileWithFile Debug Info ===");
    console.log("Token exists:", !!token);
    console.log("FormData object:", formData);
    
    if (!token) {
      throw new Error("No authentication token found");
    }

    // Use the new patchFormData method
    const response = await request.patchFormData("users/me/", formData, token);
    console.log("Profile update response:", response);
    return response;
    
  } catch (error: any) {
    console.error("=== UpdateProfileWithFile Error ===");
    console.error("Error:", error);
    throw error;
  }
}

export async function CreateUser(userData: object): Promise<any> {
  try {
 
    // Send as JSON, not FormData - to match Swagger behavior
    const response = await request.post("api/v1/users/register", userData);
    return response;
  } catch (error: any) {
    console.error("=== CreateUser Error ===");
    console.error("Error:", error);
    throw error;
  }
}

export async function Login(loginData: object): Promise<any> {
  try {
    // Send as JSON, not FormData - to match Swagger behavior
    const response = await request.post("api/v1/users/login", loginData);
    return response;
  } catch (error: any) {
    console.error("=== Login Error ===");
    console.error("Error:", error);
    throw error;
  }
}

export async function VerifyOtp(token: string, email:string): Promise<any> {
  try {
    const response = await request.post(`api/v1/users/verify-email/?token=${token}&email=${email}`, {});
    return response;
  } catch (error: any) {
    console.error("=== VerifyOtp Error ===");
    console.error("Error:", error);
    throw error;
  }
}

export async function GetUser(token: string): Promise<any> {
  try {
    const response = await request.get("api/v1/users/me", token);
    return response;
  } catch (error: any) {
    console.error("=== GetUser Error ===");
    console.error("Error:", error);
    throw error;
  }
}

export async function getUserProfile(email: string): Promise<any> {
  try {
    const response = await request.get(`api/v1/users/profile?email=${email}`);
    return response;
  } catch (error: any) {
    console.error("=== GetUserProfile Error ===");
    console.error("Error:", error);
    throw error;
  }
}
export async function refreshAccessToken(): Promise<any> {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    console.log("=== Refreshing Access Token ===");
    console.log("Refresh token exists:", !!refreshToken);
    
    // Call the refresh endpoint with refresh_token as query parameter
    const response = await request.post(`api/v1/users/refresh?refresh_token=${refreshToken}`, {});
    
    console.log("Refresh response received:", !!response);
    
    // Save the new access token and update timestamp
    if (response.access_token) {
      const currentTokens = await AsyncStorage.getItem("cookies");
      const tokens = currentTokens ? JSON.parse(currentTokens) : {};
      
      // Update access token (keep refresh token)
      tokens.access = response.access_token;
      if (response.refresh_token) {
        tokens.refresh = response.refresh_token;
      }
      
      await AsyncStorage.setItem("cookies", JSON.stringify(tokens));
      
      // Update the timestamp in authData to reset the 4-day expiration
      const authDataString = await AsyncStorage.getItem("authData");
      if (authDataString) {
        const authData = JSON.parse(authDataString);
        authData.timestamp = Date.now(); // Reset expiration timer
        await AsyncStorage.setItem("authData", JSON.stringify(authData));
        console.log("Token refreshed and timestamp updated:", new Date(authData.timestamp).toISOString());
      }
    }
    
    return response;
  } catch (error: any) {
    console.error("=== RefreshToken Error ===");
    console.error("Error:", error);
    throw error;
  }
}

export async function getMe():Promise<any>{
  let token = await getAuthToken();
  
  try {
    const response = await request.get("api/v1/users/me", token);
    return response;
  } catch (error: any) {
    console.error("=== GetMe Error ===");
    console.error("Error:", error);
    
    // If token is invalid, try to refresh it
    if (error.detail === "Invalid token" || error.status === 401) {
      try {
        console.log("Attempting to refresh token...");
        const refreshResponse = await refreshAccessToken();
        
        // Retry the request with the new token
        const newToken = await getAuthToken();
        const response = await request.get("api/v1/users/me", newToken);
        return response;
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear tokens and throw error to trigger login redirect
        await clearAuthToken();
        throw new Error("Session expired. Please login again.");
      }
    }
    
    throw error;
  }
}
