import { AnyAction } from 'redux';
import { PolicyState, UPDATE_POLICY } from './policy.type';

const initialState: PolicyState = {};

export const policyReducer = (state = initialState, action: AnyAction): PolicyState => {
  switch (action.type) {
    case UPDATE_POLICY: {
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
