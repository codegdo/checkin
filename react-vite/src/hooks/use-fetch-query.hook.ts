import {
  useMutation,
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';

type QueryKeyT = [string, object | undefined];

const fn = (query: any) => {
  return Promise.resolve(query)
}

export const useFetchQuery = <T>(
  url: string | null,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {

  const context = useQuery<T, Error, T, QueryKeyT>(
    [url!, params],
    ({ queryKey }) => fn(queryKey),
    {
      enabled: !!url,
      ...config,
    }
  );

  return context;
};