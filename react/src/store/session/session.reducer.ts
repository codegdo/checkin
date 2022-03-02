import { AnyAction } from 'redux';
import { SessionState, UPDATE_SESSION, DELETE_SESSION } from './session.type';

const initialState: SessionState = {
  isLogin: false,
  user: null,
  locationId: null,
  orgId: null,
  accessToken: null,
};

export const sessionReducer = (
  state = initialState,
  action: AnyAction
): SessionState => {
  switch (action.type) {
    case UPDATE_SESSION: {
      console.log(action.payload);
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
