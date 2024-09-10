import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as AuthActions from './auth.actions';
import {catchError, switchMap, tap} from "rxjs";
import {SignInUser} from "../../interfaces/signInUser.interface";
import {map} from "rxjs/operators";
import {User} from "../../interfaces/user.interface";

@Injectable()
export class AuthEffects{
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {}

  authSignIn = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInStart),
      switchMap((signInData: SignInUser) => {
        return this.authService.signIn(signInData).pipe(
            map((authResponse) => {
              return this.authService.handleAuthentication(authResponse)
            }),
            catchError( err => {
              return this.authService.handleError(err)
            })
          )
      })
  ));

  authSignUp = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap((signUpData) => {
        return this.authService.signUp(signUpData)
          .pipe(
            map((authResponse) => {
              return this.authService.handleAuthentication(authResponse)
            }),
            catchError( err => {
              return this.authService.handleError(err)
            })
          )
      })
  ));
  authRedirect = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.authenticate),
        tap((authSuccessAction) => {
          if(authSuccessAction.redirect) {
            this.router.navigate(['/events']);
          }
        })
      ),
    {dispatch: false}
  );

  authLogout = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('userData');
          this.authService.clearLogoutTimer();
          this.router.navigate(['/auth']);
        })
      ),
    {dispatch: false}
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const storedUserData = localStorage.getItem('userData');
        if(!storedUserData){
          return {type: 'DUMMY'};
        }
        const userData: User = JSON.parse(storedUserData);
        if(!userData){
          return {type: 'DUMMY'};
        }
        if(userData.tokenExpirationDate > new Date()){
          return AuthActions.authenticate({user: userData, redirect: false});
        }
        return {type: 'DUMMY'};
      })
    )
  )

}
