import { useFetch, useFetchQuery, useMutationQuery } from '../../../hooks';
import { UserData } from '../../../store/types';
import { AppStatus } from '../../../constants';

export interface LoginData {
  user: UserData;
  current: {
    appId: number;
    appStatus: AppStatus;
  };
}

export const loginApi = () => useFetch<LoginData>('/api/auth/login');
