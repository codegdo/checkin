import { useCallback, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { http, RequestOption } from '../services';
import { RedirectState, RedirectTypeEnum } from './use-redirect.hook';

type Action = {
  type: 'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE';
  payload?: any;
};

type State = {
  status: string;
  result?: any;
};

const initialState = {
  status: 'idle',
  result: {},
};

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOADING':
      return { ...state, status: 'pending' };
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
  const location = useLocation();
  const navigate = useNavigate();

  const callback = useCallback(
    async (option?: RequestOption) => {
      const _url = url || option?.url;

      if (!_url) {
        console.warn('Invalid fetch url');
        return;
      }

      try {
        dispatch({ type: 'LOADING' });
        //
        const result = await http.request(_url, option);
        console.log('FETCH', result);
        //
        dispatch({ type: 'SUCCESS', payload: result });
      } catch (err: any) {
        console.log('FETCH', err);
        dispatch({ type: 'FAILURE', payload: err });
        //
        if (err.data?.message === 'Session Timeout') {
          navigate('/auth/logout', { state: { type: RedirectTypeEnum.SessionTimeout, previousLocation: location } as RedirectState });
        }
      }
    },
    []
  );

  return [state, callback];
};
