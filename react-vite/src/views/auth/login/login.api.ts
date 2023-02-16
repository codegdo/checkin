import { useFetch, useFetchQuery, useMutationQuery } from '../../../hooks';
import { UserData, UserStatus } from '../../../store/types';

export interface LoginData {
  user: UserData;
  status: UserStatus;
}

export const loginApi = () => useFetch<LoginData>('/api/auth/login');
