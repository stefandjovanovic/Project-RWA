import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {EventInterface} from "../../interfaces/event.inerface";
import {createReducer, on} from "@ngrx/store";
import * as EventsActions from './events.actions';

export interface State extends EntityState<EventInterface>{

}

export const adapter = createEntityAdapter<EventInterface>();

export const initialState: State = adapter.getInitialState();

export const eventReducer = createReducer(
  initialState,
  on(EventsActions.loadEventsSuccess, (state, {events}) =>
    adapter.setAll(events, state)
  ),
  on(EventsActions.createEventSuccess, (state, {event}) =>
    adapter.addOne(event, state)
  ),
  on(EventsActions.deleteEventSuccess, (state, {id}) =>
    adapter.removeOne(id, state)
  ),
  on(EventsActions.joinEventSuccess, (state, {eventId, username}) =>
    adapter.updateOne({id: eventId, changes: {participants: [...state.entities[eventId]!.participants, username]}}, state)
  ),
  on(EventsActions.leaveEventSuccess, (state, {id, username}) =>
    adapter.updateOne({id, changes: {participants: state.entities[id]!.participants.filter(participant => participant !== username)}}, state)
  )
)
