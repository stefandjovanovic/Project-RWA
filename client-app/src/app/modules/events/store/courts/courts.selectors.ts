import * as fromCourts from './courts.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectCourtsState = (state: AppState) => state.courts;

export const selectCourts = createSelector(
  selectCourtsState,
  fromCourts.adapter.getSelectors().selectAll
);

export const selectCourtsError = createSelector(
  selectCourtsState,
  (state: fromCourts.State) => state.error
);

export const selectCourtsIsLoading = createSelector(
  selectCourtsState,
  (state: fromCourts.State) => state.isLoading
);
