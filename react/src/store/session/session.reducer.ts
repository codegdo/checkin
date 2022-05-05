import { AnyAction } from 'redux';
import { SessionState, SESSION_UPDATE, SESSION_DELETE } from './session.type';

export const initialSessionState: SessionState = {};

export const sessionReducer = (
  state = initialSessionState,
  action: AnyAction
): SessionState => {
  switch (action.type) {
    case SESSION_UPDATE: {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }
    case SESSION_DELETE: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
