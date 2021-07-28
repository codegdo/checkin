import { AnyAction } from 'redux';
import { NavState, UPDATE_NAV } from './nav.type';

const initialState: NavState = {};

export const navReducer = (state = initialState, action: AnyAction): NavState => {
  switch (action.type) {
    case UPDATE_NAV: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
