import { AnyAction } from 'redux';
import { NavState, NAV_RETRIEVE } from './nav.type';

export const initialNavState: NavState = {};

export const navReducer = (
  nav = initialNavState,
  { type, payload }: AnyAction
): NavState => {
  switch (type) {
    case NAV_RETRIEVE: {
      return { ...payload };
    }
    default: {
      return nav;
    }
  }
};
