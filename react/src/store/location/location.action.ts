import { AnyAction } from 'redux';
import { LocationState, LOCATION_UPDATE, LOCATION_DELETE } from './location.type';

export function updateLocation(newLocation: LocationState): AnyAction {
  return {
    type: LOCATION_UPDATE,
    payload: newLocation,
  };
}

export function deleteLocation(): AnyAction {
  return {
    type: LOCATION_DELETE,
  };
}
