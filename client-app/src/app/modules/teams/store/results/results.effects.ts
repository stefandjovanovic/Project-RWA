import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ChallengesService} from "../../services/challenges.service";
import * as ResultsActions from "./results.actions";
import {map} from "rxjs/operators";
import {switchMap} from "rxjs";


@Injectable()
export class ResultsEffects {
  constructor(
    private actions$: Actions,
    private challengesService: ChallengesService
    ) {
  }

  getResults$ = createEffect(() => this.actions$.pipe(
    ofType(ResultsActions.getResultRequests),
    switchMap(action => this.challengesService.getResultRequests(action.teamId).pipe(
      map(resultRequests => ResultsActions.getResultRequestsSuccess({resultRequests}))
    ))
  ));

  submitResult$ = createEffect(() => this.actions$.pipe(
    ofType(ResultsActions.submitResult),
    switchMap(action => this.challengesService.submitResult(action.result).pipe(
      map(() => ResultsActions.submitResultSuccess({result: action.result}))
    ))
  ));

  acceptResult$ = createEffect(() => this.actions$.pipe(
    ofType(ResultsActions.acceptResult),
    switchMap(action => this.challengesService.acceptResult(action.challengeId).pipe(
      map(() => ResultsActions.acceptResultSuccess({challengeId: action.challengeId}))
    ))
  ));

  rejectResult$ = createEffect(() => this.actions$.pipe(
    ofType(ResultsActions.rejectResult),
    switchMap(action => this.challengesService.rejectResult(action.challengeId).pipe(
      map(() => ResultsActions.rejectResultSuccess({challengeId: action.challengeId}))
    ))
  ));


}
