import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState, useCallback } from 'react';
import { ContentType } from '../components/templates/content';
import { formatElements } from '../utils/formatElements';

/**
 * Interface for API responses
 */
interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

/**
 * Interface for API errors
 */
interface ApiError {
  message: string;
  status: number;
  statusText: string;
}

/**
 * Custom hook for interacting with the API
 */
export function useApi() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  /**
   * API error handling
   */
  const handleError = useCallback((error: AxiosError): ApiError => {
    const status = error.response?.status || 500;
    const statusText = error.response?.statusText || 'Internal server error';
    const message = error.message || 'An error occurred while processing your request';
    
    console.error('API Error:', { status, statusText, message });
    return { status, statusText, message };
  }, []);

  /**
   * Creating a new element
   */
  const createElement = useCallback(async <T = any>(
    pageSlug: string,
    type: ContentType | string,
    data: any,
    order: number,
    onSuccess?: (items: T[]) => void
  ): Promise<ApiResponse<T> | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('/api/elements', {
        pageSlug,
        type,
        data,
        order,
      });
      
      setLoading(false);
      
      if (onSuccess && response.data) {
        const formattedData = formatElements([response.data]);
        onSuccess(formattedData as unknown as T[]);
      }
      
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (err) {
      const apiError = handleError(err as AxiosError);
      setError(apiError);
      setLoading(false);
      return null;
    }
  }, [handleError]);

  /**
   * Updating an existing element
   */
  const updateElement = useCallback(async <T = any>(
    id: number,
    data: any,
    onSuccess?: (data: T) => void
  ): Promise<ApiResponse<T> | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.patch('/api/elements', {
        id,
        data,
      });
      
      setLoading(false);
      
      if (onSuccess && response.data) {
        onSuccess(response.data);
      }
      
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (err) {
      const apiError = handleError(err as AxiosError);
      setError(apiError);
      setLoading(false);
      return null;
    }
  }, [handleError]);

  /**
   * Deleting an element
   */
  const deleteElement = useCallback(async <T = any>(
    id: number,
    onSuccess?: () => void
  ): Promise<ApiResponse<T> | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.delete(`/api/elements?id=${id}`);
      
      setLoading(false);
      
      if (onSuccess) {
        onSuccess();
      }
      
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (err) {
      const apiError = handleError(err as AxiosError);
      setError(apiError);
      setLoading(false);
      return null;
    }
  }, [handleError]);

  return {
    loading,
    error,
    createElement,
    updateElement,
    deleteElement,
    clearError: () => setError(null),
  };
}