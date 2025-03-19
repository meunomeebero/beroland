import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState, useCallback } from 'react';
import { ContentType } from '../components/templates/content';
import { formatElements } from '../utils/formatElements';

/**
 * Interface para as respostas da API
 */
interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
}

/**
 * Interface para erros da API
 */
interface ApiError {
  message: string;
  status: number;
  statusText: string;
}

/**
 * Hook personalizado para interagir com a API
 */
export function useApi() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  /**
   * Tratamento de erros da API
   */
  const handleError = useCallback((error: AxiosError): ApiError => {
    const status = error.response?.status || 500;
    const statusText = error.response?.statusText || 'Erro interno do servidor';
    const message = error.message || 'Ocorreu um erro ao processar sua solicitação';
    
    console.error('Erro na API:', { status, statusText, message });
    return { status, statusText, message };
  }, []);

  /**
   * Criação de um novo elemento
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
   * Atualização de um elemento existente
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
   * Exclusão de um elemento
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