import {PrivateEvent} from "../../interfaces/private-event.interface";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer} from "@ngrx/store";


export interface State extends EntityState<PrivateEvent> {

}

export const adapter: EntityAdapter<PrivateEvent> = createEntityAdapter<PrivateEvent>();

export const initialState: State = adapter.getInitialState({});

export const privateEventsReducer = createReducer(
  initialState
)
