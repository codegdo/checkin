import { AnyAction } from 'redux';
import { PolicyState, POLICY_GET, POLICY_CREATE, POLICY_UPDATE, POLICY_DELETE, POLICY_DELETE_ALL } from './policy.type';

export function getPolicies(payload: PolicyState[]): AnyAction {
  return {
    type: POLICY_GET,
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

export function deleteAllPolicies(): AnyAction {
  return {
    type: POLICY_DELETE_ALL
  };
}
