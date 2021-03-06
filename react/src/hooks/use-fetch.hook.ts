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
  const location = useLocation();
  const navigate = useNavigate();

  const callback = useCallback(async (option?: RequestOption) => {
    const pathUrl = url || option?.url;

    if (!pathUrl) {
      console.warn('Invalid fetch url');
      return;
    }

    try {
      dispatch({ type: 'LOADING' });
      //
      const response = await http.request(pathUrl, option);

      dispatch({ type: 'SUCCESS', payload: response });
      console.log('FETCH', response);
    } catch (err: any) {

      dispatch({ type: 'FAILURE', payload: err });
      //
      if (err.data?.message === 'Session Timeout') {
        navigate('/auth/logout', {
          state: {
            type: RedirectTypeEnum.SessionTimeout,
            previousLocation: location,
          } as RedirectState,
        });
      }
      console.log('FETCH', err);
    }
  }, []);

  return [state, callback];
};
