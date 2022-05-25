import { AnyAction } from 'redux';
import { NavState, NAV_RETRIEVE } from './nav.type';

export function retrieveNav(payload: NavState[]): AnyAction {
  return {
    type: NAV_RETRIEVE,
    payload
  };
}
