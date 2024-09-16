import {createAction, props} from "@ngrx/store";
import {Court} from "../../interfaces/court.interface";
import {Sport} from "../../enums/sport.enum";


export const loadManagerHalls = createAction(
  '[Halls] Load Manager Halls'
);

export const managerHallsLoaded = createAction(
  '[Halls] Manager Halls Loaded',
  props<{halls: Court[]}>()
);

export const createHall = createAction(
  '[Halls] Create Hall',
  props<{
    name: string,
    address: string,
    image: string,
    sport: Sport,
    startTime: number,
    endTime: number,
    pricePerHour: number
  }>()
);

export const hallCreateSuccess = createAction(
  '[Halls] Hall Create Success',
  props<{hall: Court}>()
);

export const hallCreateFailure = createAction(
  '[Halls] Hall Create Failure',
  props<{error: string}>()
);

export const updateHall = createAction(
  '[Halls] Update Hall',
  props<{
    id: string,
    name: string,
    address: string,
    image: string,
    sport: Sport,
    startTime: number,
    endTime: number,
    pricePerHour: number
  }>()
);

export const hallUpdateSuccess = createAction(
  '[Halls] Hall Update Success',
  props<{hall: Court}>()
);

export const hallUpdateFailure = createAction(
  '[Halls] Hall Update Failure',
  props<{error: string}>()
);

export const deleteHall = createAction(
  '[Halls] Delete Hall',
  props<{id: string}>()
);

export const hallDeleteSuccess = createAction(
  '[Halls] Hall Delete Success',
  props<{id: string}>()
);
