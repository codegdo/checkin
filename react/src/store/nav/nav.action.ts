import { AnyAction } from 'redux';
import { NavState, NAV_UPDATE } from './nav.type';

export function updateNav(nav: NavState): AnyAction {
  return {
    type: NAV_UPDATE,
    payload: nav,
  };
}
