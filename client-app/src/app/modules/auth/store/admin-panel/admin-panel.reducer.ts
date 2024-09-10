import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {UserInfo} from "../../interfaces/user-info.interface";
import {createReducer, on} from "@ngrx/store";
import * as AdminPanelActions from './admin-panel.actions';

export interface State extends EntityState<UserInfo>{

}

export const adapter: EntityAdapter<UserInfo> = createEntityAdapter<UserInfo>();

export const initialState: State = adapter.getInitialState();

export const adminPanelReducer = createReducer(
  initialState,
  on(AdminPanelActions.fetchUsersSuccess,(state, action) => adapter.setAll(action.users, state)),
  on(AdminPanelActions.roleUpdated, (state, action) => adapter.updateOne(action.user, state)),
  on(AdminPanelActions.deleteUserSuccess, (state, action) => adapter.removeOne(action.id, state))
)
