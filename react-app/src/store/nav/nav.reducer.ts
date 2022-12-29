import { AnyAction } from 'redux';
import { NavState, NAV_GET } from './nav.type';

export const initialNavState: NavState = {};

export const navReducer = (
  state = initialNavState,
  { type, payload }: AnyAction
): NavState => {
  switch (type) {
    case NAV_GET: {
      return { ...payload };
    }
    default: {
      return state;
    }
  }
};
