import AsyncStorage from "@react-native-async-storage/async-storage";

export class RequestHandler {
  private BASE_URL = "http://16.170.141.94:8000/";
  private TIMEOUT_MS = 60000; // 20 seconds timeout

  // Helper method to handle fetch with timeout
  private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const { signal } = controller;
    
    // Create a timeout promise
    const timeout = new Promise<Response>((_, reject) => {
      setTimeout(() => {
        controller.abort();
        reject(new Error('Request timeout'));
      }, this.TIMEOUT_MS);
    });

    // Create the fetch promise with the abort signal
    const fetchPromise = fetch(url, {
      ...options,
      signal
    });

    // Race between fetch and timeout
    try {
      return await Promise.race([fetchPromise, timeout]) as Response;
    } catch (error:any) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  public async get(
    path: string,
    token?: string,
    functions?: Array<(data: any) => void>
  ): Promise<any> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails, try to get the text response
        const textData = await response.text();
        console.log("Non-JSON response:", textData);
        data = {
          error: "Invalid JSON response",
          status: response.status,
          statusText: response.statusText,
          body: textData
        };
      }
      
      // Call the callback functions with the data
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(data));
      }
      
      // Check if the response was successful (status code 200-299)
      if (response.ok) {
        return data;
      } else {
        // For non-2xx responses, throw the error data
        throw data;
      }
    } catch (error:any) {
      // Check if it's a network error
      if (error.message && (
        error.message.includes('Network request failed') || 
        error.message.includes('Request timeout')
      )) {
        const networkError = {
          isNetworkError: true,
          message: error.message,
          status: 'network_error'
        };
        
        // Call the callback functions with the network error
        if (functions && functions.length > 0) {
          functions.forEach((func) => func(networkError));
        }
        
        throw networkError;
      }
      
      // For other errors (including API errors), just throw them
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(error));
      }
      
      throw error;
    }
  }
  

  public async post(
    path: string,
    body: object,
    token?: string,
    functions?: Array<(data: any) => void>
  ): Promise<any> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        
        },
        body: JSON.stringify(body),
      });
      
      let data;
      try {
        data = await response.json();
        console.log("request data", data);
      } catch (jsonError) {
        // If JSON parsing fails, try to get the text response
        const textData = await response.text();
        console.log("Non-JSON response:", textData);
        data = {
          error: "Invalid JSON response",
          status: response.status,
          statusText: response.statusText,
          body: textData
        };
      }
      
      // Call the callback functions with the data
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(data));
      }
      
      // Check if the response was successful (status code 200-299)
      if (response.ok) {
        return data;
      } else {
        // For non-2xx responses, throw the error data
        throw data;
      }
    } catch (error:any) {
      // Check if it's a network error
      if (error.message && (
        error.message.includes('Network request failed') || 
        error.message.includes('Request timeout')
      )) {
        const networkError = {
          isNetworkError: true,
          message: error.message,
          status: 'network_error'
        };
        
        // Call the callback functions with the network error
        if (functions && functions.length > 0) {
          functions.forEach((func) => func(networkError));
        }
        
        throw networkError;
      }
      
      // For other errors (including API errors), just throw them
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(error));
      }
      
      throw error;
    }
  }

  public async put(
    path: string,
    body: object,
    token?: string,
    functions?: Array<(data: any) => void>
  ): Promise<any> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      // Call the callback functions with the data
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(data));
      }
      
      // Check if the response was successful (status code 200-299)
      if (response.ok) {
        return data;
      } else {
        // For non-2xx responses, throw the error data
        throw data;
      }
    } catch (error:any) {
      // Check if it's a network error
      if (error.message && (
        error.message.includes('Network request failed') || 
        error.message.includes('Request timeout')
      )) {
        const networkError = {
          isNetworkError: true,
          message: error.message,
          status: 'network_error'
        };
        
        // Call the callback functions with the network error
        if (functions && functions.length > 0) {
          functions.forEach((func) => func(networkError));
        }
        
        throw networkError;
      }
      
      // For other errors (including API errors), just throw them
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(error));
      }
      
      throw error;
    }
  }

  public async patch(
    path: string,
    body: object,
    token?: string,
    functions?: Array<(data: any) => void>
  ): Promise<any> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}${path}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(data));
      }
      
      // Check if the response was successful (status code 200-299)
      if (response.ok) {
        return data;
      } else {
        // For non-2xx responses, throw the error data
        throw data;
      }
    } catch (error:any) {
      // Check if it's a network error
      if (error.message && (
        error.message.includes('Network request failed') || 
        error.message.includes('Request timeout')
      )) {
        const networkError = {
          isNetworkError: true,
          message: error.message,
          status: 'network_error'
        };
        
        // Call the callback functions with the network error
        if (functions && functions.length > 0) {
          functions.forEach((func) => func(networkError));
        }
        
        throw networkError;
      }
      
      // For other errors (including API errors), just throw them
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(error));
      }
      
      throw error;
    }
  }

   public async patchFormData(
    path: string,
    formData: FormData,
    token?: string,
    functions?: Array<(data: any) => void>
  ): Promise<any> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}${path}`, {
        method: "PATCH",
        headers: {
          // Don't set Content-Type for FormData - let browser handle it
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      });
      
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonError) {
          console.log("JSON parsing failed:", jsonError);
          data = {
            error: "Invalid JSON response",
            status: response.status,
            statusText: response.statusText,
            body: "Failed to parse JSON"
          };
        }
      } else {
        // If not JSON, get as text
        try {
          const textData = await response.text();
          console.log("Non-JSON response:", textData);
          data = {
            error: "Non-JSON response",
            status: response.status,
            statusText: response.statusText,
            body: textData
          };
        } catch (textError) {
          console.log("Text parsing failed:", textError);
          data = {
            error: "Failed to read response",
            status: response.status,
            statusText: response.statusText,
            body: "Unable to read response body"
          };
        }
      }
      
      // Call the callback functions with the data
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(data));
      }
      
      // Check if the response was successful (status code 200-299)
      if (response.ok) {
        return data;
      } else {
        // For non-2xx responses, throw the error data
        throw data;
      }
    } catch (error:any) {
      // Check if it's a network error
      if (error.message && (
        error.message.includes('Network request failed') || 
        error.message.includes('Request timeout')
      )) {
        const networkError = {
          isNetworkError: true,
          message: error.message,
          status: 'network_error'
        };
        
        // Call the callback functions with the network error
        if (functions && functions.length > 0) {
          functions.forEach((func) => func(networkError));
        }
        
        throw networkError;
      }
      
      // For other errors (including API errors), just throw them
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(error));
      }
      
      throw error;
    }
  }
    public async postFormData(
    path: string,
    formData: FormData,
    token?: string,
    functions?: Array<(data: any) => void>
  ): Promise<any> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}${path}`, {
        method: "POST",
        headers: {
          // Don't set Content-Type for FormData - let browser handle it
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      });
      
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (jsonError) {
          console.log("JSON parsing failed:", jsonError);
          data = {
            error: "Invalid JSON response",
            status: response.status,
            statusText: response.statusText,
            body: "Failed to parse JSON"
          };
        }
      } else {
        // If not JSON, get as text
        try {
          const textData = await response.text();
          console.log("Non-JSON response:", textData);
          data = {
            error: "Non-JSON response",
            status: response.status,
            statusText: response.statusText,
            body: textData
          };
        } catch (textError) {
          console.log("Text parsing failed:", textError);
          data = {
            error: "Failed to read response",
            status: response.status,
            statusText: response.statusText,
            body: "Unable to read response body"
          };
        }
      }
      
      // Call the callback functions with the data
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(data));
      }
      
      // Check if the response was successful (status code 200-299)
      if (response.ok) {
        return data;
      } else {
        // For non-2xx responses, throw the error data
        throw data;
      }
    } catch (error:any) {
      // Check if it's a network error
      if (error.message && (
        error.message.includes('Network request failed') || 
        error.message.includes('Request timeout')
      )) {
        const networkError = {
          isNetworkError: true,
          message: error.message,
          status: 'network_error'
        };
        
        // Call the callback functions with the network error
        if (functions && functions.length > 0) {
          functions.forEach((func) => func(networkError));
        }
        
        throw networkError;
      }
      
      // For other errors (including API errors), just throw them
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(error));
      }
      
      throw error;
    }
  }

  public async delete(
    path: string,
    body: object,
    token?: string,
    functions?: Array<(data: any) => void>
  ): Promise<any> {
    try {
      const response = await this.fetchWithTimeout(`${this.BASE_URL}${path}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      // Call the callback functions with the data
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(data));
      }
      
      // Check if the response was successful (status code 200-299)
      if (response.ok) {
        return data;
      } else {
        // For non-2xx responses, throw the error data
        throw data;
      }
    } catch (error:any) {
      // Check if it's a network error
      if (error.message && (
        error.message.includes('Network request failed') || 
        error.message.includes('Request timeout')
      )) {
        const networkError = {
          isNetworkError: true,
          message: error.message,
          status: 'network_error'
        };
        
        // Call the callback functions with the network error
        if (functions && functions.length > 0) {
          functions.forEach((func) => func(networkError));
        }
        
        throw networkError;
      }
      
      // For other errors (including API errors), just throw them
      if (functions && functions.length > 0) {
        functions.forEach((func) => func(error));
      }
      
      throw error;
    }
  }
  
}