import { AnyAction } from 'redux';
import { LocationState, LOCATION_RETRIEVE, LOCATION_CREATE, LOCATION_UPDATE, LOCATION_DELETE, LOCATION_DELETE_ALL } from './location.type';

export const initialLocationState: LocationState[] = [];

export const locationReducer = (
  locations = initialLocationState,
  { type, payload }: AnyAction
): LocationState[] => {
  switch (type) {
    case LOCATION_RETRIEVE: {
      return payload;
    }
    case LOCATION_CREATE: {
      return [...locations, payload];
    }
    case LOCATION_UPDATE: {
      return locations.map(location => {
        return location.id === payload.id ? payload : location;
      });
    }
    case LOCATION_DELETE: {
      return locations.filter(location => location.id !== payload);
    }
    case LOCATION_DELETE_ALL: {
      return [];
    }
    default: {
      return locations;
    }
  }
};
