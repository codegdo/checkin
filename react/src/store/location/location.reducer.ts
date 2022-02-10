import { AnyAction } from 'redux';
import { LocationState, UPDATE_LOCATION, DELETE_LOCATION } from './location.type';

const initialState: LocationState = {};

export const locationReducer = (
  state = initialState,
  action: AnyAction
): LocationState => {
  switch (action.type) {
    case UPDATE_LOCATION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_LOCATION: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
