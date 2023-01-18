import { useCallback, useReducer } from 'react';
import { http, RequestOption } from '../services';

type Action = {
  type: 'IDLE' | 'PENDING' | 'SUCCESS' | 'FAILURE';
  payload?: any;
};

interface State {
  status: string;
  response?: any;
}

type Callback = (option?: RequestOption) => Promise<void>;

const initialState = {
  status: 'idle',
  response: null,
};

const reducer = (state: State, { type, payload: response }: Action) => {
  switch (type) {
    case 'PENDING':
      return { status: 'loading' };
    case 'SUCCESS':
      return { status: 'success', response };
    case 'FAILURE':
      return { status: 'error', response };
    default:
      return state;
  }
};

export const useFetch = (
  url?: string
): [State, Callback] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const callback = useCallback(async (option?: RequestOption) => {
    const pathUrl = url || option?.url;

    if (!pathUrl) {
      console.warn('Invalid fetch url');
      return;
    }

    try {
      dispatch({ type: 'PENDING' });
      const payload = await http.request(pathUrl, option);
      dispatch({ type: 'SUCCESS', payload });
    } catch (err: any) {
      console.log(err);
      dispatch({ type: 'FAILURE', payload: err });
    }
  }, []);

  return [state, callback];
};
