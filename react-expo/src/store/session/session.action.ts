import { AnyAction } from 'redux';
import { SessionState, SESSION_UPDATE, SESSION_DELETE } from './session.type';

export function updateSession(newSession: SessionState): AnyAction {
  return {
    type: SESSION_UPDATE,
    payload: newSession,
  };
}

export function deleteSession(): AnyAction {
  return {
    type: SESSION_DELETE,
  };
}
