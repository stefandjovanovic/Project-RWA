import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {EventInterface} from "../../interfaces/event.inerface";
import {createReducer, on} from "@ngrx/store";
import * as NearbyEventActions from './nearby-events.actions';
import * as EventsActions from '../events/events.actions';


export interface State extends EntityState<EventInterface>{
  addressValid: boolean;
  userLongitude: number | null;
  userLatitude: number | null;
}

export const adapter = createEntityAdapter<EventInterface>();

export const initialState: State = adapter.getInitialState({
  addressValid: false,
  userLongitude: null,
  userLatitude: null
});

export const reducer = createReducer(
  initialState,
  on(NearbyEventActions.calculateUserLocationSuccess, (state, {longitude, latitude}) => {
      return {
        ...state,
        addressValid: true,
        userLongitude: longitude,
        userLatitude: latitude
      }
    }),
  on(NearbyEventActions.calculateUserLocationFailure, (state) =>
  adapter.removeAll({
    ...state,
    addressValid: false,
    userLongitude: null,
    userLatitude: null
  })),
  on(NearbyEventActions.nearbyEventsLoaded, (state, {events}) =>
    adapter.setAll(events, state)
  ),
  on(EventsActions.joinEventSuccess, (state, {eventId, username}) => {
    if(state.entities[eventId]){
      return adapter.updateOne({id: eventId, changes: {participants: [...state.entities[eventId]!.participants, username]}}, state)
    }else {
      return {... state};
    }
  }
  ),
  on(EventsActions.leaveEventSuccess, (state, {id, username}) =>{
    if(state.entities[id]){
      return adapter.updateOne({id, changes: {participants: state.entities[id]!.participants.filter(participant => participant !== username)}}, state)
    }else {
      return {... state};
    }
  }
  ),
  on(EventsActions.deleteEventSuccess, (state, {id}) =>{
    if(state.entities[id]){
      return adapter.removeOne(id, state)
    }else {
      return {... state};
    }
  }
  )

)
