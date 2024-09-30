import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ChallengesService} from "../../services/challenges.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as ChallengesActions from "./challenges.actions";
import {catchError, EMPTY, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";


@Injectable()
export class ChallengesEffects {
  constructor(
    private actions$: Actions,
    private challengesService: ChallengesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getChallenges$ = createEffect(() => this.actions$.pipe(
    ofType(ChallengesActions.getChallenges),
    switchMap(action => this.challengesService.getChallenges(action.teamId).pipe(
      map(challenges => ChallengesActions.getChallengesSuccess({challenges})),
      catchError(() => {
        this.snackBar.open('Failed to get challenges', 'Close', {duration: 2000});
        return EMPTY;
      })
    ))
  ));

  createChallenge$ = createEffect(() => this.actions$.pipe(
    ofType(ChallengesActions.createChallenge),
    switchMap(action => this.challengesService.createChallenge(action.challenge).pipe(
      map(challenge => ChallengesActions.createChallengeSuccess({challenge})),
      catchError(() => {
        this.snackBar.open('Failed to create challenge', 'Close', {duration: 2000});
        return EMPTY;
      })
    ))
  ));

  createChallengeSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(ChallengesActions.createChallengeSuccess),
    map(() => {
      this.snackBar.open('Challenge created successfully', 'Close', {duration: 2000});
      this.router.navigate(['/teams']);
    })
  ), {dispatch: false});

  acceptChallenge$ = createEffect(() => this.actions$.pipe(
    ofType(ChallengesActions.acceptChallenge),
    switchMap(action => this.challengesService.acceptChallenge(action.challengeId).pipe(
      map(() => ChallengesActions.acceptChallengeSuccess({challengeId: action.challengeId})),
      catchError(() => {
        this.snackBar.open('Failed to accept challenge', 'Close', {duration: 2000});
        return EMPTY;
      })
    ))
  ));

  rejectChallenge$ = createEffect(() => this.actions$.pipe(
    ofType(ChallengesActions.rejectChallenge),
    switchMap(action => this.challengesService.rejectChallenge(action.challengeId).pipe(
      map(() => ChallengesActions.rejectChallengeSuccess({challengeId: action.challengeId})),
      catchError(() => {
        this.snackBar.open('Failed to reject challenge', 'Close', {duration: 2000});
        return EMPTY;
      })
    ))
  ));
}
