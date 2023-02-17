import { useFetch, useFetchQuery, useMutationQuery } from '../../../hooks';
import { UserData } from '../../../store/types';
import { UserStatus } from '../../../constants';

export interface LoginData {
  user: UserData;
  status: UserStatus;
}

export const loginApi = () => useFetch<LoginData>('/api/auth/login');
