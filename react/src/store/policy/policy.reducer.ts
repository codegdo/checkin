import { AnyAction } from 'redux';
import { PolicyState, POLICY_RETRIEVE, POLICY_CREATE, POLICY_UPDATE, POLICY_DELETE, POLICY_DELETE_ALL } from './policy.type';

export const initialPolicyState: PolicyState[] = [];

export const policyReducer = (
  policies = initialPolicyState,
  { type, payload }: AnyAction
): PolicyState[] => {
  switch (type) {
    case POLICY_RETRIEVE: {
      return payload;
    }
    case POLICY_CREATE: {
      return [...policies, payload];
    }
    case POLICY_UPDATE: {
      return policies.map(policy => {
        return policy.id === payload.id ? payload : policy;
      });
    }
    case POLICY_DELETE: {
      return policies.filter(policy => policy.id !== payload);
    }
    case POLICY_DELETE_ALL: {
      return [];
    }
    default: {
      return policies;
    }
  }
};
