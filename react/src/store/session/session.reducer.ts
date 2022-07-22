import { AnyAction } from 'redux';
import { SessionState, SESSION_GET, SESSION_UPDATE, SESSION_DELETE } from './session.type';

export const initialSessionState: SessionState = {};

export const sessionReducer = (
  state = initialSessionState,
  { type, payload }: AnyAction
): SessionState => {
  switch (type) {
    case SESSION_GET: {
      return { ...payload };
    }
    case SESSION_UPDATE: {
      return { ...state, ...payload };
    }
    case SESSION_DELETE: {
      return {};
    }
    default: {
      return state;
    }
  }
};
