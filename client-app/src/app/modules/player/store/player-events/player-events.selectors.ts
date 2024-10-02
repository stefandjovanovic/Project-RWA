import * as fromPlayerEvents from './player-events.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectPlayerEventsState = (state: AppState) => state.playerEvents;

export const selectPlayerEvents = createSelector(
  selectPlayerEventsState,
  fromPlayerEvents.adapter.getSelectors().selectAll
);

