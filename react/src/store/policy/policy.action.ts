import { AnyAction } from 'redux';
import { PolicyState, POLICY_UPDATE } from './policy.type';

export function updatePolicy(policy: PolicyState): AnyAction {
  return {
    type: POLICY_UPDATE,
    payload: policy,
  };
}
