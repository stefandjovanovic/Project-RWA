import * as fromResults from './results.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectResultsState = (state: AppState) => state.results;

export const selectResultRequests = createSelector(
  selectResultsState,
  fromResults.adapter.getSelectors().selectAll
);
