import { useMutation, useQuery } from '@tanstack/react-query';

import { http } from '../../../helpers';

export const useLoginApi = () => {
  const getLogin = async (data: any) =>
    http.post('/api/auth/login', { body: data });

  return {
    getLogin,
  };
};
