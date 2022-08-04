import { AnyAction } from 'redux';
import { PolicyState, POLICY_GET, POLICY_CREATE, POLICY_UPDATE, POLICY_DELETE, POLICY_DELETE_ALL } from './policy.type';

export const initialPolicyState: PolicyState[] = [];

export const policyReducer = (
  state = initialPolicyState,
  { type, payload }: AnyAction
): PolicyState[] => {
  switch (type) {
    case POLICY_GET: {
      return [...payload];
    }
    case POLICY_CREATE: {
      return [...state, payload];
    }
    case POLICY_UPDATE: {
      return state.map(policy => {
        return policy.id === payload.id ? payload : policy;
      });
    }
    case POLICY_DELETE: {
      return state.filter(policy => policy.id !== payload);
    }
    case POLICY_DELETE_ALL: {
      return [];
    }
    default: {
      return state;
    }
  }
};
