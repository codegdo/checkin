import { createAction } from '@reduxjs/toolkit';

export const getLocation = createAction('location/GET_LOCATION');
export const createLocation = createAction('location/CREATE_LOCATION');
export const updateLocation = createAction('location/UPDATE_LOCATION');
export const deleteLocation = createAction('delete/DELETE_LOCATION');

export const getLocations = createAction('location/GET_LOCATIONS');
export const deleteLocations = createAction('delete/DELETE_LOCATIONS');
