import * as fromHalls from './halls.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";

export const selectHallsState = (state: AppState) => state.halls;

export const selectHalls = createSelector(
  selectHallsState,
  fromHalls.adapter.getSelectors().selectAll
)

export const selectHallsLoading = createSelector(
  selectHallsState,
  (state: fromHalls.State) => state.isLoading
)
