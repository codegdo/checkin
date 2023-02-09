import {
  useMutation,
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
  useQueryClient,
} from '@tanstack/react-query';
import { BASE_URL } from '../app.config';
import { http, HttpResponse, RequestOptions } from '../helpers';
import { stringifyUrl } from '../utils';

type QueryKeyT = [string, object | undefined];

export const usePrefetchQuery = () => {};

export const useFetchQuery = <T>(
  url: string | null,
  params: object = {},
  options: RequestOptions = {},
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  const context = useQuery<T, Error, T, QueryKeyT>(
    [url!, params],
    ({ queryKey }) => fetcher<T>(queryKey, options) as Promise<T>,
    {
      enabled: !!url,
      ...config,
    }
  );

  return context;
};

export const useMutationQuery = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  return mutationQuery<T, S>(
    (options) => fetcher<S>([url, params], options as RequestOptions),
    url,
    params,
    updater
  );
};

async function fetcher<T>(queryKey: QueryKeyT, options: RequestOptions) {
  const baseUrl = options?.baseUrl ?? BASE_URL;
  const [url, params] = queryKey;
  const strUrl = stringifyUrl(`${baseUrl}${url}`, params);

  try {
    const response = await http.request<T>(strUrl, options);
    return response?.data;
  } catch (err: any) {
    throw err;
  }
}

function mutationQuery<T, S>(
  func: (options: T | S) => Promise<S | undefined>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined
) {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onMutate: async () => {},
    onError: () => {},
    onSettled: () => {},
  });
}
