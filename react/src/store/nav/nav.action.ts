import { AnyAction } from 'redux';
import { NavState, UPDATE_NAV } from './nav.type';

export function updateNav(nav: NavState): AnyAction {
  return {
    type: UPDATE_NAV,
    payload: nav,
  };
}
