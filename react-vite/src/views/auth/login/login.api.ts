import { useMutation, useQuery } from '@tanstack/react-query';

import { http } from '../../../helpers';
import { useFetch, useFetchQuery, useMutationQuery } from '../../../hooks';

export const loginApi = () => useMutationQuery('/api/auth/login');
