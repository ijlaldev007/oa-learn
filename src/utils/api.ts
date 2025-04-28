/**
 * Custom API client for making fetch requests with standardized error handling
 */

// Define base API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Define response type for API calls
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    status?: number;
  };
}

// Define options type for API calls
export interface ApiOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * Constructs a URL with query parameters
 */
const buildUrl = (endpoint: string, params?: Record<string, string | number | boolean | undefined>): string => {
  const url = new URL(`${API_BASE_URL}${endpoint}`, window.location.origin);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
};

/**
 * Makes an API request with standardized error handling
 */
export const apiRequest = async <T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> => {
  const { params, ...fetchOptions } = options;
  const url = buildUrl(endpoint, params);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...fetchOptions,
    });
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      return { data: undefined };
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        error: {
          message: data.message || 'An error occurred',
          status: response.status,
        },
      };
    }
    
    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      error: {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      },
    };
  }
};

/**
 * Convenience methods for common HTTP methods
 */
export const api = {
  get: <T>(endpoint: string, options?: ApiOptions) => 
    apiRequest<T>(endpoint, { method: 'GET', ...options }),
    
  post: <T>(endpoint: string, data?: any, options?: ApiOptions) => 
    apiRequest<T>(endpoint, { 
      method: 'POST', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
    
  put: <T>(endpoint: string, data?: any, options?: ApiOptions) => 
    apiRequest<T>(endpoint, { 
      method: 'PUT', 
      body: data ? JSON.stringify(data) : undefined,
      ...options 
    }),
    
  delete: <T>(endpoint: string, options?: ApiOptions) => 
    apiRequest<T>(endpoint, { method: 'DELETE', ...options }),
};
