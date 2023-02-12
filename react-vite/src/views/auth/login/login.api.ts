import { useFetch, useFetchQuery, useMutationQuery } from '../../../hooks';

export const loginApi = <T>() => useFetch<T>('/api/auth/login');
