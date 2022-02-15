import { AnyAction } from 'redux';
import { PolicyState, UPDATE_POLICY } from './policy.type';

export function updatePolicy(policy: PolicyState): AnyAction {
  return {
    type: UPDATE_POLICY,
    payload: policy,
  };
}
