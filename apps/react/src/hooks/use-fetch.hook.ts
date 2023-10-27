import { useRef, useState } from 'react';
import { http, HttpResponse, RequestOptions } from '../helpers';
import { BASE_URL } from '../app.constant';
import { stringifyUrl } from '../utils';

enum FetchStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Error = 'Error',
  Success = 'Success',
  Delay = 'Delay',
  Cancel = 'Cancel',
  Abort = 'Abort',
}

type ResponseFetch<T> = {
  status: FetchStatus;
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isDelay: boolean;
  isAbort: boolean;
  error: Error | undefined;
  data: T | undefined;
  mutate: (options?: RequestOptions) => Promise<void>;
  query: (customBaseUrl?: string) => Promise<void>;
  controller: AbortController;
};

export const useFetch = <T>(
  url: string,
  params: Record<string, string | number> = {}
): ResponseFetch<T> => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const controller = new AbortController();
  const ctrlRef = useRef(controller);
  const timeoutIdRef = useRef<NodeJS.Timeout | undefined>();

  const isIdle = status === FetchStatus.Idle;
  const isLoading = status === FetchStatus.Loading;
  const isError = status === FetchStatus.Error;
  const isSuccess = status === FetchStatus.Success;
  const isDelay = status === FetchStatus.Delay;
  const isAbort = status === FetchStatus.Abort;

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

      console.log('raceResponses', raceResponse);

      if (raceResponse === 'DELAY') {
        checkDelay(responsePromise, delayCount + 1);
        if (delayCount < maxDelayCount) {
          setStatus(FetchStatus.Delay);
        } else {
          setStatus(FetchStatus.Abort);
        }
      } else {
        const httpResponse = raceResponse as HttpResponse<T>;

        if (httpResponse.status >= 200 && httpResponse.status < 300) {
          setData(httpResponse.data);
          setStatus(FetchStatus.Success);
        } else {
          throw new Error(`Request failed with status: ${httpResponse.status}`);
        }

        clearTimeoutIdRef();
      }
    } catch (error) {
      if (error?.name === 'AbortError') {
        setStatus(FetchStatus.Cancel);
      } else {
        setError(error as Error);
        setStatus(FetchStatus.Error);
      }
    }
  };

  const makeRequest = async (strUrl: string, options: RequestOptions) => {
    try {
      const responsePromise = http.request<T>(strUrl, options); // Wrap the http.request in a Promise
      checkDelay(responsePromise);
    } catch (error) {
      setError(error as Error);
      setStatus(FetchStatus.Error);
    }
  };

  const mutate = async (options: RequestOptions = {}): Promise<void> => {
    const baseUrl = options.baseUrl || BASE_URL;
    const strUrl = stringifyUrl(`${baseUrl}${url}`, params);

    setStatus(FetchStatus.Loading);
    makeRequest(strUrl, { ...options, signal: ctrlRef.current.signal });
  };

  const query = async (customBaseUrl?: string): Promise<void> => {
    const baseUrl = customBaseUrl || BASE_URL;
    const strUrl = stringifyUrl(`${baseUrl}${url}`, params);

    setStatus(FetchStatus.Loading);
    makeRequest(strUrl, { signal: ctrlRef.current.signal });
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
    mutate,
    query,
    controller: ctrlRef.current,
  };
};
