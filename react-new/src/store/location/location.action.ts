import { AnyAction } from 'redux';
import { LocationState, LOCATION_GET, LOCATION_CREATE, LOCATION_UPDATE, LOCATION_DELETE, LOCATION_DELETE_ALL } from './location.type';

export function getLocations(payload: LocationState[]): AnyAction {
  return {
    type: LOCATION_GET,
    payload
  };
}

export function createLocation(payload: LocationState): AnyAction {
  return {
    type: LOCATION_CREATE,
    payload
  };
}

export function updateLocation(payload: LocationState): AnyAction {
  return {
    type: LOCATION_UPDATE,
    payload
  };
}

export function deleteLocation(payload: number): AnyAction {
  return {
    type: LOCATION_DELETE,
    payload
  };
}

export function deleteAllLocations(): AnyAction {
  return {
    type: LOCATION_DELETE_ALL
  };
}
