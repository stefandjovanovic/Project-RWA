import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {UserEventData} from "../../interfaces/user-event-data.interface";
import {createReducer, on} from "@ngrx/store";
import * as PlayerEventsActions from './player-events.actions';


export interface State extends EntityState<UserEventData>{

}

export const adapter = createEntityAdapter<UserEventData>();

export const initialState: State = adapter.getInitialState();

export const playerEventsReducer = createReducer(
  initialState,
  on(PlayerEventsActions.getPlayerEventsSuccess, (state, {events}) => adapter.setAll(events, state))
)
