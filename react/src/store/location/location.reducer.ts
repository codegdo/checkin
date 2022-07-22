import { AnyAction } from 'redux';
import { LocationState, LOCATION_GET, LOCATION_CREATE, LOCATION_UPDATE, LOCATION_DELETE, LOCATION_DELETE_ALL } from './location.type';

export const initialLocationState: LocationState[] = [];

export const locationReducer = (
  state = initialLocationState,
  { type, payload }: AnyAction
): LocationState[] => {
  switch (type) {
    case LOCATION_GET: {
      return [...payload];
    }
    case LOCATION_CREATE: {
      return [...state, payload];
    }
    case LOCATION_UPDATE: {
      return state.map(location => {
        return location.id === payload.id ? payload : location;
      });
    }
    case LOCATION_DELETE: {
      return state.filter(location => location.id !== payload);
    }
    case LOCATION_DELETE_ALL: {
      return [];
    }
    default: {
      return state;
    }
  }
};
