import { AnyAction } from 'redux';
import { NavState, NAV_UPDATE } from './nav.type';

export const initialNavState: NavState = {};

export const navReducer = (state = initialNavState, action: AnyAction): NavState => {
  switch (action.type) {
    case NAV_UPDATE: {
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
