import { AnyAction } from 'redux';
import { LocationState, UPDATE_LOCATION, DELETE_LOCATION } from './location.type';

export function updateLocation(newLocation: LocationState): AnyAction {
  return {
    type: UPDATE_LOCATION,
    payload: newLocation,
  };
}

export function deleteLocation(): AnyAction {
  return {
    type: DELETE_LOCATION,
  };
}
