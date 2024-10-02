import * as fromHallEvents from './hall-events.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectHallEventsState = (state: AppState) => state.hallEvents;

export const selectHallEvents = createSelector(
  selectHallEventsState,
  fromHallEvents.adapter.getSelectors().selectAll
)
