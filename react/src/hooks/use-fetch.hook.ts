import { useCallback, useReducer } from 'react';
import { http, RequestOption } from '../services';

enum ActionType {
  IDLE = 'IDLE',
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

type Action = { type: ActionType; payload?: any };

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
    case ActionType.REQUEST:
      return { ...state, status: 'loading' };
    case ActionType.SUCCESS:
      return { ...state, status: 'success', result: payload };
    case ActionType.FAILURE:
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
        dispatch({ type: ActionType.REQUEST });
        //
        const result = await http.request(url, option);
        //
        dispatch({ type: ActionType.SUCCESS, payload: result });
      } catch (err) {
        dispatch({ type: ActionType.FAILURE, payload: err });
      }
    },
    [url]
  );

  return [state, callback];
};
