import {createAction, props} from "@ngrx/store";
import {Court} from "../../interfaces/court.interface";
import {Sport} from "../../enums/sport.enum";


export const loadCourts = createAction(
  '[Courts] Load Courts'
);

export const courtsLoaded = createAction(
  '[Courts] Courts Loaded',
  props<{ courts: Court[] }>()
);

export const createCourt = createAction(
  '[Courts] Create Court',
  props<{
    sport: Sport,
    name: string,
    address: string,
    image: string,
  }>()
);

export const courtCreateSuccess = createAction(
  '[Courts] Court Create Success',
  props<{ court: Court }>()
);

export const courtCreateFailure = createAction(
  '[Courts] Court Create Failure',
  props<{ error: string }>()
);

export const updateCourt = createAction(
  '[Courts] Update Court',
  props<{
    id: string,
    sport: Sport,
    name: string,
    address: string,
    image: string,
  }>()
);

export const courtUpdateSuccess = createAction(
  '[Courts] Court Update Success',
  props<{ court: Court }>()
);

export const courtUpdateFailure = createAction(
  '[Courts] Court Update Failure',
  props<{ error: string }>()
);

export const deleteCourt = createAction(
  '[Courts] Delete Court',
  props<{ id: string }>()
);

export const courtDeleteSuccess = createAction(
  '[Courts] Court Delete Success',
  props<{ id: string }>()
);
