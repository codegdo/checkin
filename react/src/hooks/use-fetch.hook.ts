import { useCallback, useReducer } from 'react';
import { http, RequestOption } from '../services';

type Action = {
  type: 'IDLE' | 'REQUEST' | 'SUCCESS' | 'FAILURE';
  payload?: any
};

type State = {
  status: string;
  result?: any;
};

const initialState = {
  status: 'idle',
  result: undefined,
};

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'REQUEST':
      return { ...state, status: 'loading' };
    case 'SUCCESS':
      return { ...state, status: 'success', result: payload };
    case 'FAILURE':
      return { ...state, status: 'error', result: payload };
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
        dispatch({ type: 'REQUEST' });
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
