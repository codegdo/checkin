import { AnyAction } from 'redux';
import { PolicyState, POLICY_UPDATE } from './policy.type';

export const initialPolicyState: PolicyState = {};

export const policyReducer = (
  state = initialPolicyState,
  action: AnyAction
): PolicyState => {
  switch (action.type) {
    case POLICY_UPDATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
