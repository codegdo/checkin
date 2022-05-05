import { AnyAction } from 'redux';
import { LocationState, LOCATION_UPDATE, LOCATION_DELETE } from './location.type';

export const initialLocationState: LocationState = {};

export const locationReducer = (
  state = initialLocationState,
  action: AnyAction
): LocationState => {
  switch (action.type) {
    case LOCATION_UPDATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOCATION_DELETE: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};
