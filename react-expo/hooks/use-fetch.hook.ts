import { useCallback, useReducer } from 'react';
import { http, RequestOption } from '../services';

type Action = {
  type: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE';
  payload?: any;
};

type State = {
  status: string;
  response?: any;
};

const initialState = {
  status: 'idle',
  response: {},
};

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOADING':
      return { ...state, status: 'pending' };
    case 'SUCCESS':
      return { ...state, status: 'success', response: payload };
    case 'FAILURE':
      return { ...state, status: 'error', response: payload };
    default:
      return state;
  }
};

export const useFetch = (
  url?: string
): [State, (option?: RequestOption) => Promise<void>] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const callback = useCallback(async (option?: RequestOption) => {
    const pathUrl = url || option?.url;

    if (!pathUrl) {
      console.warn('Invalid pathUrl');
      return;
    }

    try {
      dispatch({ type: 'LOADING' });
      //
      const response = await http.request(pathUrl, option);
      //console.log('FETCH', response);
      //
      dispatch({ type: 'SUCCESS', payload: response });
    } catch (err: any) {
      //console.log('FETCH', err);
      dispatch({ type: 'FAILURE', payload: err });
    }
  }, []);

  return [state, callback];
};
