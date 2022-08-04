import { AnyAction } from 'redux';
import { SessionState, SESSION_GET, SESSION_UPDATE, SESSION_DELETE } from './session.type';

export function getSession(payload: SessionState): AnyAction {
  return {
    type: SESSION_GET,
    payload,
  };
}

export function updateSession(payload: SessionState): AnyAction {
  return {
    type: SESSION_UPDATE,
    payload,
  };
}

export function deleteSession(): AnyAction {
  return {
    type: SESSION_DELETE,
  };
}
