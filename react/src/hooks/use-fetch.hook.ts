import { useCallback, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { http, RequestOption } from '../services';

type Action = {
  type: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE';
  payload?: any;
};

type State = {
  loading: string;
  result?: any;
};

const initialState = {
  loading: 'idle',
  result: undefined,
};

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOADING':
      return { ...state, loading: 'pending' };
    case 'SUCCESS':
      return { ...state, loading: 'success', result: payload };
    case 'FAILURE':
      return { ...state, loading: 'error', result: payload };
    default:
      return state;
  }
};

export const useFetch = (
  url?: string
): [State, (option?: RequestOption) => Promise<void>] => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const callback = useCallback(
    async (option?: RequestOption) => {
      url = url || option?.url;

      if (!url) {
        console.warn('Invalid fetch url');
        return;
      }

      try {
        dispatch({ type: 'LOADING' });
        //
        const result = await http.request(url, option);
        console.log('FETCH', result);
        //
        dispatch({ type: 'SUCCESS', payload: result });
      } catch (err: any) {
        dispatch({ type: 'FAILURE', payload: err });
        //
        if (err.data?.message === 'Session Timeout') {
          navigate('/auth/logout');
        }
      }
    },
    [url]
  );

  return [state, callback];
};
