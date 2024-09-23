import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PrivateEventsService} from "../../services/private-events.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, EMPTY, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import * as PrivateEventsActions from './private-events.actions';


@Injectable()
export class PrivateEventsEffects {
  constructor(
    private actions$: Actions,
    private privateEventsService: PrivateEventsService,
    private snackBar: MatSnackBar
  ) {}

  getPrivateEventsForTeam$ = createEffect(() => this.actions$.pipe(
    ofType(PrivateEventsActions.getPrivateEventsForTeam),
    switchMap(({teamId}) => this.privateEventsService.getEventsForTeam(teamId).pipe(
      map(privateEvents => PrivateEventsActions.getPrivateEventsForTeamSuccess({privateEvents})),
      catchError(() => {
        return EMPTY;
      })
    ))
  ));

  createPrivateEvent$ = createEffect(() => this.actions$.pipe(
    ofType(PrivateEventsActions.createPrivateEvent),
    switchMap(({teamId, event}) => this.privateEventsService.createPrivateEvent(teamId, event).pipe(
      map(privateEvent => PrivateEventsActions.createPrivateEventSuccess({privateEvent})),
      catchError(() => {
        this.snackBar.open('Failed to create private event', 'Close');
        return EMPTY;
      })
    ))
  ));

  createPrivateEventSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(PrivateEventsActions.createPrivateEventSuccess),
    switchMap(() => {
      this.snackBar.open('Private event created successfully', 'Close');
      return EMPTY;
    })
  ), {dispatch: false});


}
