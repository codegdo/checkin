import { useRef, useState } from 'react';
import { http, HttpResponse, RequestOptions } from '@/helpers';
import { API_URL } from '@/constants';
import utils from '@/utils';

export enum FetchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  DELAY = 'DELAY',
  CANCEL = 'CANCEL',
  ABORT = 'ABORT',
}

type ResponseFetch<T> = {
  status: keyof typeof FetchStatus | string;
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isDelay: boolean;
  isAbort: boolean;
  error: Error | undefined;
  data: T | undefined;
  mutation: (options?: RequestOptions) => Promise<HttpResponse<T> | Error | undefined>;
  query: (options?: RequestOptions) => Promise<HttpResponse<T> | Error | undefined>;
  controller: AbortController;
};

export const useFetch = <T>(
  url?: string,
  params: Record<string, unknown> = {}
): ResponseFetch<T> => {
  const [status, setStatus] = useState<keyof typeof FetchStatus | string>('IDLE');
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const controller = new AbortController();
  const ctrlRef = useRef(controller);
  const timeoutIdRef = useRef<NodeJS.Timeout | undefined>();

  const isIdle = status === 'IDLE';
  const isLoading = status === 'LOADING';
  const isError = status === 'ERROR';
  const isSuccess = status === 'SUCCESS';
  const isDelay = status === 'DELAY';
  const isAbort = status === 'ABORT';

  const clearTimeoutIdRef = () => {
    if (timeoutIdRef.current !== undefined) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = undefined;
    }
  };

  const checkDelay = async (
    responsePromise: Promise<HttpResponse<T>>,
    delayCount = 0
  ) => {
    // Clear the previous timeout (if any)
    clearTimeoutIdRef();

    const maxDelayCount = 3; // Maximum number of delay calls

    const timeoutPromise = new Promise<string>((resolve) => {
      timeoutIdRef.current = setTimeout(() => {
        resolve('DELAY');
      }, 500); // Set the timeout duration (in milliseconds)
    });

    try {
      const raceResponse = await Promise.race([
        responsePromise,
        timeoutPromise,
      ]);

      //console.log('raceResponse', raceResponse);

      if (raceResponse === 'DELAY') {
        if (delayCount < maxDelayCount) {
          setStatus('DELAY');
          checkDelay(responsePromise, delayCount + 1);
        } else {
          setStatus('ABORT');
        }
      } else {
        const httpResponse = raceResponse as HttpResponse<T>;

        if (httpResponse.status >= 200 && httpResponse.status < 300) {
          setData(httpResponse.data);
          setStatus('SUCCESS');
        } else {
          throw new Error(`Request failed with status: ${httpResponse.status}`);
        }

        clearTimeoutIdRef();
        return httpResponse;
      }
    } catch (error) {
      console.log('ERROR', error);
      const err = error as Error;
      if (err?.name === 'AbortError') {
        setStatus('CANCEL');
      } else {
        setError(err);
        setStatus('ERROR');
        throw err;
      }
    }
  };

  const fetchRequest = async (strUrl: string, options: RequestOptions) => {
    setStatus('LOADING');

    const responsePromise = http.request<T>(strUrl, options);
    return checkDelay(responsePromise);
  };

  const makeRequest = async (options: RequestOptions = {}) => {
    const baseUrl = options.baseUrl || API_URL;
    const pathUrl = options.url || url;
    const urlParams = options.params || params;
    const strUrl = utils.stringifyUrl(`${baseUrl}${pathUrl}`, urlParams);

    return fetchRequest(strUrl, { ...options, signal: ctrlRef.current.signal });
  };

  const mutation = async (options: RequestOptions = {}) => {
    return makeRequest(options);
  };

  const query = async (options: RequestOptions = {}) => {
    return makeRequest(options);
  };

  return {
    status,
    isIdle,
    isLoading,
    isError,
    isSuccess,
    isDelay,
    isAbort,
    error,
    data,
    mutation,
    query,
    controller: ctrlRef.current,
  };
};
