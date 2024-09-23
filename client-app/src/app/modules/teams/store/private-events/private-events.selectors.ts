import * as fromPrivateEvents from './private-events.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectPrivateEventsState = (state: AppState) => state.privateEvents;

export const selectPrivateEvents = createSelector(
  selectPrivateEventsState,
  fromPrivateEvents.adapter.getSelectors().selectAll
);
