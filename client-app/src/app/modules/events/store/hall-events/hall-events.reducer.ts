import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {EventInterface} from "../../interfaces/event.inerface";
import {createReducer, on} from "@ngrx/store";
import * as HallEventsActions from './hall-events.actions';

export interface State extends EntityState<EventInterface>{

}

export const adapter = createEntityAdapter<EventInterface>();

export const initialState = adapter.getInitialState();

export const hallEventsReducer = createReducer(
  initialState,
  on(HallEventsActions.loadHallEventsSuccess, (state, {events}) => adapter.setAll(events, state)),
  on(HallEventsActions.deleteEventsSuccess, (state, {eventId}) => adapter.removeOne(eventId, state))
)
