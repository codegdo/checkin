import { AnyAction } from 'redux';
import { NavState, NAV_GET } from './nav.type';

export function getNav(payload: NavState): AnyAction {
  return {
    type: NAV_GET,
    payload
  };
}
