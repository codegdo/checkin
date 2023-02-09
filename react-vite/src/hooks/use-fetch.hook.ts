import { useCallback, useState } from 'react';
import { http, RequestOptions } from '../helpers';

import { BASE_URL } from '../app.config';
import { stringifyUrl } from '../utils';

type ResponseFetch<T> = {
  status: string;
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: T | undefined;
  data: T | undefined;
  mutate: (options: RequestOptions) => void;
};

export const useFetch = <T>(
  url: string,
  params: object = {}
): ResponseFetch<T> => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<T>();
  const [error, setError] = useState<T>();
  const isIdle = status === 'idle';
  const isLoading = status === 'loading';
  const isError = status === 'error';
  const isSuccess = status === 'success';

  const callback = useCallback(async (options: RequestOptions = {}) => {
    const baseUrl = options?.baseUrl ?? BASE_URL;
    const strUrl = stringifyUrl(`${baseUrl}${url}`, params);

    try {
      setStatus('loading');
      const response = await http.request<T>(strUrl, options);
      setData(response?.data);
      setStatus('success');
    } catch (err: any) {
      setError(err);
      setStatus('error');
    }
  }, []);

  return {
    status,
    isIdle,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    mutate: callback,
  };
};
