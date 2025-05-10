// API client wrapper that handles common operations across all API requests
import type { FetchOptions } from './types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * API client for making HTTP requests with standard error handling
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Handles API errors with consistent formatting
   */
  private handleError(response: Response, customMessage?: string): never {
    throw new Error(customMessage || `API Error: ${response.status} ${response.statusText}`);
  }

  /**
   * Builds request URL 
   */
  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  }

  /**
   * Makes a request with consistent error handling and response parsing
   */
  private async request<T>(
    endpoint: string, 
    options: FetchOptions = {}
  ): Promise<T> {
    const { 
      method = 'GET', 
      body, 
      headers = {}, 
      token,
      requiresAuth = false 
    } = options;

    const requestOptions: RequestInit = {
      method,
      headers: {
        ...headers,
        ...(body && !options.isFormData && { 'Content-Type': 'application/json' }),
        ...(requiresAuth && token && { Authorization: `Bearer ${token}` }),
      },
      ...(body && { body: options.isFormData ? body as FormData : JSON.stringify(body) }),
    };

    try {
      const response = await fetch(this.buildUrl(endpoint), requestOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }
      
      return {} as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    }
  }

  /**
   * GET request helper
   */
  public async get<T>(endpoint: string, options: Omit<FetchOptions, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request helper
   */
  public async post<T, B extends Record<string, unknown> | FormData>(endpoint: string, body: B, options: Omit<FetchOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { 
      ...options, 
      method: 'POST', 
      body, 
      isFormData: body instanceof FormData 
    });
  }

  /**
   * PUT request helper
   */
  public async put<T, B extends Record<string, unknown>>(endpoint: string, body: B, options: Omit<FetchOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  /**
   * DELETE request helper
   */
  public async delete<T>(endpoint: string, options: Omit<FetchOptions, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_URL);