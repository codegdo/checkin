import { useCallback, useState } from 'react';
import { http, RequestOptionBody } from '../helpers';


export const useFetch = <T>() => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState<any>(null);
  const isLoading = (status === 'pending');
  const isError = (status === 'failure');
  const isSuccess = (status === 'success');

  const callback = useCallback(async (option?: RequestOptionBody<T>) => {
    const url = option?.url;

    if (!url) {
      console.warn('Invalid fetch url');
      return;
    }

    try {
      setStatus('loading');
      const result = await http.request(url, option);
      setData(result);
      setStatus('success');
    } catch (err: any) {
      console.log(err);
      setData(err);
      setStatus('error');
    }

  }, []);

  return [{ status, isLoading, isError, isSuccess, data }, callback]
}

