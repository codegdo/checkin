import { useMutation, useQuery } from '@tanstack/react-query';

import { http } from '../../../helpers';
import { useFetchQuery } from '../../../hooks';

export const useLoginApi = () => {
  const getLogin = async (data: any) =>
    http.post('/api/auth/login', { body: data });

  return {
    getLogin,
  };
};

export const getLoginApi = (id: number) => {
  console.log('getLoginApi');
  return useFetchQuery('/api/auth/login', { id });
}
