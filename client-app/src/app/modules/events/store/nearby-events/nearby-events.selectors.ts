import {AppState} from "../../../../store/app.reducer";
import * as fromNearbyEvents from './nearby-events.reducer';
import {createSelector} from "@ngrx/store";


export const selectNearbyEventsState = (state: AppState) => state.nearbyEvents;

export const selectNearbyEvents = createSelector(
  selectNearbyEventsState,
  fromNearbyEvents.adapter.getSelectors().selectAll
);

export const selectNearbyEventsAddressValid = createSelector(
    selectNearbyEventsState,
    (state: fromNearbyEvents.State) => state.addressValid
);
