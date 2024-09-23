import {PrivateEvent} from "../../interfaces/private-event.interface";
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {createReducer, on} from "@ngrx/store";
import * as PrivateEventsActions from './private-events.actions';


export interface State extends EntityState<PrivateEvent> {

}

export const adapter: EntityAdapter<PrivateEvent> = createEntityAdapter<PrivateEvent>();

export const initialState: State = adapter.getInitialState({});

export const privateEventsReducer = createReducer(
  initialState,
  on(PrivateEventsActions.createPrivateEventSuccess, (state, {privateEvent}) => adapter.addOne(privateEvent, state)),
  on(PrivateEventsActions.getPrivateEventsForTeamSuccess, (state, {privateEvents}) => adapter.setAll(privateEvents, state)),
  on(PrivateEventsActions.joinPrivateEventSuccess, (state, {eventId, username}) =>{
    if(!state.entities[eventId]){
      return {... state};
    }
    return adapter.updateOne({id: eventId, changes: {participants: [...state.entities[eventId].participants, username]}}, state);
    }
  ),
  on(PrivateEventsActions.leavePrivateEventSuccess, (state, {eventId, username}) => {
    if(!state.entities[eventId]){
      return {... state};
    }
    return adapter.updateOne({id: eventId, changes: {participants: state.entities[eventId].participants.filter(participant => participant !== username)}}, state);
  }),
  on(PrivateEventsActions.deletePrivateEventSuccess, (state, {eventId}) => adapter.removeOne(eventId, state))
)
