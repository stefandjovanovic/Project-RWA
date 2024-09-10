import {createAction, props} from "@ngrx/store";
import {User} from "../../interfaces/user.interface";
import {SignInUser} from "../../interfaces/signInUser.interface";
import {SignUpUser} from "../../interfaces/signUpUser.interface";

export const SIGNIN_START = '[Auth] SignIn Start';
export const AUTHENTICATE = '[Auth] Authenticate';
export const LOGOUT = '[Auth] Logout';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const AUTO_LOGIN = '[Auth] Auto Login';

export const signInStart = createAction(
  SIGNIN_START,
  props<SignInUser>()
)

export const authenticate = createAction(
  AUTHENTICATE,
  props<{
    user: User,
    redirect: boolean
  }>()
)

export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{
    errorMessage: string
  }>()
)

export const logout = createAction(
  LOGOUT
)

export const signupStart = createAction(
  SIGNUP_START,
  props<SignUpUser>()
)

export const clearError = createAction(
  CLEAR_ERROR
)

export const autoLogin = createAction(
  AUTO_LOGIN
)
