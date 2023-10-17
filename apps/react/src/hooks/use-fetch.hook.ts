import { useCallback, useState } from 'react';
import { http, RequestOptions } from '../helpers';
import { BASE_URL } from '../app.constant';
import { stringifyUrl } from '../utils';

enum FetchStatus {
  Idle,
  Loading,
  Error,
  Success,
}

type ResponseFetch<T> = {
  status: FetchStatus;
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | undefined;
  data: T | undefined;
  useMutation: (options?: RequestOptions) => Promise<void>;
  useQuery: (customBaseUrl?: string) => Promise<void>;
};

export const useFetch = <T>(
  url: string,
  params: Record<string, string | number> = {}
): ResponseFetch<T> => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const isIdle = status === FetchStatus.Idle;
  const isLoading = status === FetchStatus.Loading;
  const isError = status === FetchStatus.Error;
  const isSuccess = status === FetchStatus.Success;

  const useMutation = useCallback(async (options: RequestOptions = {}) => {
    const baseUrl = options.baseUrl || BASE_URL;
    const strUrl = stringifyUrl(`${baseUrl}${url}`, params);

    try {
      setStatus(FetchStatus.Loading);
      const response = await http.request<T>(strUrl, options);
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
        setStatus(FetchStatus.Success);
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      setError(error as Error);
      setStatus(FetchStatus.Error);
    }
  }, [url, params]);

  const useQuery = useCallback(async (customBaseUrl?: string) => {
    const baseUrl = customBaseUrl || BASE_URL;
    const strUrl = stringifyUrl(`${baseUrl}${url}`, params);

    try {
      setStatus(FetchStatus.Loading);
      const response = await http.request<T>(strUrl);
      if (response.status >= 200 && response.status < 300) {
        setData(response.data);
        setStatus(FetchStatus.Success);
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      setError(error as Error);
      setStatus(FetchStatus.Error);
    }
  }, [url, params]);

  return {
    status,
    isIdle,
    isLoading,
    isError,
    isSuccess,
    error,
    data,
    useMutation,
    useQuery,
  };
};
