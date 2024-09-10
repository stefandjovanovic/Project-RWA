import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SignInUser} from "../interfaces/signInUser.interface";
import {SignUpUser} from "../interfaces/signUpUser.interface";
import {AuthResponse} from "../interfaces/auth-response.interface";
import * as AuthActions from "../store/auth/auth.actions";
import {jwtDecode} from "jwt-decode";
import {DecodedToken} from "../interfaces/decoded-token.interface";
import {User} from "../interfaces/user.interface";
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducer";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/auth';
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  signIn(signInUser: SignInUser): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/signin`, signInUser);
  }

  signUp(signUpUser: SignUpUser): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/signup`, signUpUser);
  }

  handleAuthentication(authResponse: AuthResponse){
    const decodedToken: DecodedToken = jwtDecode(authResponse.accessToken);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const user: User = {
      username: decodedToken.username,
      email: decodedToken.email,
      role: decodedToken.role,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      address: decodedToken.address,
      id: decodedToken.id,
      token: authResponse.accessToken,
      tokenExpirationDate: expirationDate,
      profilePicture: authResponse.profilePicture
    }
    localStorage.setItem('userData', JSON.stringify(user));
    const expirationTime = new Date(user.tokenExpirationDate).getTime() - new Date().getTime();
    this.setLogoutTimer(expirationTime);
    return AuthActions.authenticate({user, redirect: true});
  }

  handleError(err: HttpErrorResponse){
    let errorMessage = 'An error occurred';
    console.log(err);
    if(!err.error || !err.error.message){
      return of(AuthActions.authenticateFail({errorMessage}));
    }
    switch (err.error.message) {
      case 'Invalid credentials': errorMessage = 'Email or password is incorrect'; break;
      case 'Username or email already exists': errorMessage = 'Username or email already exists'; break;
    }

    return of(AuthActions.authenticateFail({errorMessage}));
  }

  setLogoutTimer(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(AuthActions.logout());
    }, expirationDuration);
  }

  clearLogoutTimer(){
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
