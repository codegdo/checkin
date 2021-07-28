import { AnyAction } from 'redux';
import { SessionState, UPDATE_SESSION, DELETE_SESSION } from './session.type';

const initialState: SessionState = {
  loggedIn: false,
  user: null,
  orgId: null,
};

export const sessionReducer = (
  state = initialState,
  action: AnyAction
): SessionState => {
  switch (action.type) {
    case UPDATE_SESSION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_SESSION: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
