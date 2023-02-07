import {
  useMutation,
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';

import { http, RequestOptionBody } from '../helpers';

type QueryKeyT = [string, object | undefined];

// export const fetcher = <T>({
//   queryKey,
//   pageParam,
// }: QueryFunctionContext<QueryKeyT>): Promise<T> => {
//   const [url, params] = queryKey;
//   return http.request(url, params});
//   //api.get<T>(url, { params: { ...params, pageParam } }).then((res) => res.data);
// };

const fetcher = <T>(option?: QueryFunctionContext<QueryKeyT>) => {
  const url = option?.url;

  if (!url) {
    console.warn('Invalid fetch url');
    return;
  }

  try {
    return http.request(url, option);
  } catch (err: any) {
    console.log(err);
  }
};

export const useFetch = <T>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const context = useQuery<T, Error, T, QueryKeyT>(
    [url!, params],
    ({ queryKey }) => fetcher({ queryKey }),
    {
      enabled: !!url,
      ...config,
    }
  );

  return context;
};

//https://www.smashingmagazine.com/2022/01/building-real-app-react-query/
