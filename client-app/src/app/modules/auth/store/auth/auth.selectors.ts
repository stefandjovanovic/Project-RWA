import * as fromAuth from './auth.reducer';
import {createSelector} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";

export const selectAuthState = (state: AppState) => state.auth;

export const selectUser = createSelector(
  selectAuthState,
  (state: fromAuth.State) => fromAuth.adapter.getSelectors().selectAll(state)[0]
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.authError
)
export const selectLoading = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.loading
);

export const selectToken = createSelector(
  selectUser,
  (state) => state.token
)

export const selectRole = createSelector(
  selectUser,
  (state) => state.role
)
