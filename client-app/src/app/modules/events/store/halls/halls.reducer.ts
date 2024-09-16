import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Court} from "../../interfaces/court.interface";
import {createReducer, on} from "@ngrx/store";
import * as HallsActions from "./halls.actions";


export interface State extends EntityState<Court>{
  isLoading: boolean;
  error: string | null;
}

export const adapter = createEntityAdapter<Court>();

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  error: null
});

export const hallsReducer = createReducer(
  initialState,
  on(HallsActions.managerHallsLoaded, (state, action) => {
    return adapter.setAll(action.halls, {...state, isLoading: false});
  }),
  on(HallsActions.createHall, (state) => {
    return {...state, isLoading: true, error: null};
  }),
  on(HallsActions.hallCreateSuccess, (state, action) => {
    return adapter.addOne(action.hall, {...state, isLoading: false, error: null});
  }),
  on(HallsActions.hallCreateFailure, (state, action) => {
    return {...state, isLoading: false, error: action.error};
  }),
  on(HallsActions.updateHall, (state) => {
    return {...state, isLoading: true, error: null};
  }),
  on(HallsActions.hallUpdateSuccess, (state, action) => {
    return adapter.updateOne({id: action.hall.id, changes: action.hall}, {...state, isLoading: false, error: null});
  }),
  on(HallsActions.hallUpdateFailure, (state, action) => {
    return {...state, isLoading: false, error: action.error};
  }),
  on(HallsActions.deleteHall, (state) => {
    return {...state, isLoading: true, error: null};
  }),
  on(HallsActions.hallDeleteSuccess, (state, action) => {
    return adapter.removeOne(action.id, {...state, isLoading: false, error: null});
  }),
)
