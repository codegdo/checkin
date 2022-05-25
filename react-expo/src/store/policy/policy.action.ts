import { AnyAction } from 'redux';
import { PolicyState, POLICY_RETRIEVE, POLICY_CREATE, POLICY_UPDATE, POLICY_DELETE, POLICY_DELETE_ALL } from './policy.type';

export function retrievePolicy(payload: PolicyState[]): AnyAction {
  return {
    type: POLICY_RETRIEVE,
    payload
  };
}

export function createPolicy(payload: PolicyState): AnyAction {
  return {
    type: POLICY_CREATE,
    payload
  };
}

export function updatePolicy(payload: PolicyState): AnyAction {
  return {
    type: POLICY_UPDATE,
    payload
  };
}

export function deletePolicy(payload: number): AnyAction {
  return {
    type: POLICY_DELETE,
    payload
  };
}

export function deleteAllPolicy(): AnyAction {
  return {
    type: POLICY_DELETE_ALL
  };
}
