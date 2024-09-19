import * as fromEvents from './events.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectEventsState = (state: AppState) => state.events;

export const selectEvents = createSelector(
  selectEventsState,
  fromEvents.adapter.getSelectors().selectAll
);

