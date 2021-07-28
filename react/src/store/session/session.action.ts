import { AnyAction } from 'redux';
import { SessionState, UPDATE_SESSION, DELETE_SESSION } from './session.type';

export function updateSession(newSession: SessionState): AnyAction {
  return {
    type: UPDATE_SESSION,
    payload: newSession,
  };
}

export function deleteSession(): AnyAction {
  return {
    type: DELETE_SESSION,
  };
}
