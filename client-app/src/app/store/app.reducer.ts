import {ActionReducerMap} from "@ngrx/store";
import * as fromAuth from "../modules/auth/store/auth/auth.reducer";
import * as fromAdminPanel from "../modules/auth/store/admin-panel/admin-panel.reducer";

export interface AppState{
  auth: fromAuth.State;
  adminPanel: fromAdminPanel.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  adminPanel: fromAdminPanel.adminPanelReducer
}
