import {createAction, props} from "@ngrx/store";
import {EventInterface} from "../../interfaces/event.inerface";


export const calculateUserLocation = createAction(
  '[NearbyEvents] Calculate User Location'
);

export const calculateUserLocationSuccess = createAction(
  '[NearbyEvents] Calculate User Location Success',
  props<{
    longitude: number,
    latitude: number
  }>()
);

export const calculateUserLocationFailure = createAction(
  '[NearbyEvents] Calculate User Location Failure'
);


export const nearbyEventsLoaded = createAction(
  '[NearbyEvents] NearbyEvents Loaded',
  props<{
    events: EventInterface[]
  }>()
);
