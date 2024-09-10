import {createAction, props} from "@ngrx/store";
import {UserInfo} from "../../interfaces/user-info.interface";
import {Update} from "@ngrx/entity";

export const fetchUsers = createAction(
  '[Admin Panel] Fetch Users'
)

export const fetchUsersSuccess = createAction(
  '[Admin Panel] Fetch Users Success',
  props<{users: UserInfo[]}>()
)

export const toAdmin = createAction(
  '[Admin Panel] To Admin',
  props<{id: string}>()
)

export const toPlayer = createAction(
  '[Admin Panel] To Player',
  props<{id: string}>()
)

export const toManager = createAction(
  '[Admin Panel] To Manager',
  props<{id: string}>()
)

export const deleteUser = createAction(
  '[Admin Panel] Delete User',
  props<{id: string}>()
)

export const deleteUserSuccess = createAction(
  '[Admin Panel] Delete User Success',
  props<{id: string}>()
)

export const roleUpdated = createAction(
  '[Admin Panel] Role Updated',
  props<{user: Update<UserInfo>}>()
)
