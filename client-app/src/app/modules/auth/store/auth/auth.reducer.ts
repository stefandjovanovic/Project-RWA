import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {User} from "../../interfaces/user.interface";
import {createReducer, on} from "@ngrx/store";
import * as AuthActions from "./auth.actions";
export interface State extends EntityState<User>{
  authError: string | null;
  loading: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  authError: null,
  loading: false
});

export const authReducer = createReducer(
  initialState,
  on(AuthActions.authenticate, (state, action) => {
    return adapter.setOne(action.user, {
      ...state,
      loading: false,
      authError: null
    })
  }),
  on(AuthActions.signInStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true
    }
  }),
  on(AuthActions.logout, (state) => {
    return adapter.removeAll({
      ...state
    })
  }),
  on(AuthActions.signupStart, (state) => {
    return {
      ...state,
      authError: null,
      loading: true
    }
  }),
  on(AuthActions.authenticateFail, (state, action) => {
    return {
      ...state,
      authError: action.errorMessage,
      loading: false
    }
  }),
  on(AuthActions.clearError, (state) => {
    return {
      ...state,
      authError: null
    }
  })
)
