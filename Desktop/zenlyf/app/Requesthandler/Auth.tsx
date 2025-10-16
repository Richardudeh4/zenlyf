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
    if (cookiesString) {
      const cookies = JSON.parse(cookiesString);
      // Return the access token
      return cookies.access || cookies.refresh;
    }
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

export async function saveAuthToken(tokenData: any): Promise<void> {
  try {
    const dataToSave = {
     access: tokenData.access,
      refresh: tokenData.refresh,
    };
    
    await AsyncStorage.setItem("cookies", JSON.stringify(dataToSave));
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving auth token:", error);
    throw error;
  }
}


export async function clearAuthToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem("cookies");
    console.log("Token cleared successfully");
  } catch (error) {
    console.error("Error clearing auth token:", error);
    throw error;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const token = await getAuthToken();
    return token !== "";
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
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
export async function getMe():Promise<any>{
  const token = await getAuthToken();
  try {
    const response = await request.get("api/v1/users/me", token);
    return response;
  } catch (error: any) {
    console.error("=== GetMe Error ===");
    console.error("Error:", error);
    throw error;
  }
}
