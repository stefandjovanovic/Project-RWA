import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Court} from "../../interfaces/court.interface";
import {createReducer, on} from "@ngrx/store";
import * as CourtsActions from "./courts.actions";

export interface State extends EntityState<Court>{
  error: string | null;
  isLoading: boolean;
}

export const adapter = createEntityAdapter<Court>();

export const initialState: State = adapter.getInitialState({
  error: null,
  isLoading: false
});

export const courtsReducer = createReducer(
  initialState,
  on(CourtsActions.courtsLoaded, (state, action) => {
    return adapter.setAll(action.courts, {... state, error: null, isLoading: false});
  }),
  on(CourtsActions.loadCourts, (state) => {
    return {... state, isLoading: true};
  }),
  on(CourtsActions.createCourt, (state) => {
    return {... state, isLoading: true};
  }),
  on(CourtsActions.courtCreateFailure, (state, action) => {
    return {... state, error: action.error, isLoading: false};
  }),
  on(CourtsActions.courtCreateSuccess, (state, action) => {
    return adapter.addOne(action.court, {... state, error: null, isLoading: false});
  }),
  on(CourtsActions.updateCourt, (state) => {
    return {... state, isLoading: true};
  }),
  on(CourtsActions.courtUpdateFailure, (state, action) => {
    return {... state, error: action.error, isLoading: false};
  }),
  on(CourtsActions.courtUpdateSuccess, (state, action) => {
    return adapter.updateOne({id: action.court.id, changes: action.court}, {... state, error: null, isLoading: false});
  }),
  on(CourtsActions.courtDeleteSuccess, (state, action) => {
    return adapter.removeOne(action.id, {... state, error: null, isLoading: false});
  })
)
