import { AnyAction, createReducer } from "@reduxjs/toolkit";

import { getLocation, getLocations, createLocation, updateLocation, deleteLocation, deleteLocations } from "./location.action";
import { LocationState } from './location.type';

export const initialLocation: LocationState[] = [];

export const locationReducer = createReducer(initialLocation, (builder) => {
  builder
    .addCase(getLocations.type, (_state, action: AnyAction) => {
      return [...action.payload];
    })
    .addCase(getLocation.type, (state, action: AnyAction) => {
      return state.filter(location => location.id == action.payload);
    })
    .addCase(createLocation.type, (state, action: AnyAction) => {
      return [...state, action.payload];
    })
    .addCase(updateLocation.type, (state, action: AnyAction) => {
      return state.map(location => {
        return location.id === action.payload.id ? action.payload : location;
      });
    })
    .addCase(deleteLocation.type, (state, action: AnyAction) => {
      return state.filter(location => location.id !== action.payload);
    })
    .addCase(deleteLocations.type, (_state, _action: AnyAction) => {
      return [];
    })
});

