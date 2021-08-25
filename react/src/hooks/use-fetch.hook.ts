import { useCallback, useReducer } from 'react';
import { http, RequestOption } from '../services';

type Action = {
  type: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE';
  payload?: any
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

  const callback = useCallback(
    async (option?: RequestOption) => {
      if (!url) {
        console.warn('Invalid fetch url');
        return;
      }

      try {
        dispatch({ type: 'LOADING' });
        //
        const result = await http.request(url, option);
        //
        dispatch({ type: 'SUCCESS', payload: result });
      } catch (err) {
        dispatch({ type: 'FAILURE', payload: err });
      }
    },
    [url]
  );

  return [state, callback];
};
