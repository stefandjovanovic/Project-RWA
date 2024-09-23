import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PrivateEventsService} from "../../services/private-events.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, EMPTY, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import * as PrivateEventsActions from './private-events.actions';
import {Router} from "@angular/router";


@Injectable()
export class PrivateEventsEffects {
  constructor(
    private actions$: Actions,
    private privateEventsService: PrivateEventsService,
    private snackBar: MatSnackBar,
    private router: Router
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
      this.router.navigate(['/teams']);
      return EMPTY;
    })
  ), {dispatch: false});

  joinPrivateEvent$ = createEffect(() => this.actions$.pipe(
    ofType(PrivateEventsActions.joinPrivateEvent),
    switchMap(({eventId, username}) => this.privateEventsService.joinEvent(eventId).pipe(
      map(() => PrivateEventsActions.joinPrivateEventSuccess({eventId, username})),
      catchError(() => {
        this.snackBar.open('Failed to join private event', 'Close');
        return EMPTY;
      })
    ))
  ));

  joinPrivateEventSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(PrivateEventsActions.joinPrivateEventSuccess),
    switchMap(() => {
      this.snackBar.open('Joined private event', 'Close');
      return EMPTY;
    })
  ), {dispatch: false});

  leavePrivateEvent$ = createEffect(() => this.actions$.pipe(
    ofType(PrivateEventsActions.leavePrivateEvent),
    switchMap(({eventId, username}) => this.privateEventsService.leaveEvent(eventId).pipe(
      map(() => PrivateEventsActions.leavePrivateEventSuccess({eventId, username})),
      catchError(() => {
        this.snackBar.open('Failed to leave private event', 'Close');
        return EMPTY;
      })
    ))
  ));

  leavePrivateEventSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(PrivateEventsActions.leavePrivateEventSuccess),
    switchMap(() => {
      this.snackBar.open('Left private event', 'Close');
      return EMPTY;
    })
  ), {dispatch: false});

  deletePrivateEvent$ = createEffect(() => this.actions$.pipe(
    ofType(PrivateEventsActions.deletePrivateEvent),
    switchMap(({eventId}) => this.privateEventsService.deleteEvent(eventId).pipe(
      map(() => PrivateEventsActions.deletePrivateEventSuccess({eventId})),
      catchError(() => {
        this.snackBar.open('Failed to delete private event', 'Close');
        return EMPTY;
      })
    ))
  ));

  deletePrivateEventSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(PrivateEventsActions.deletePrivateEventSuccess),
    switchMap(() => {
      this.snackBar.open('Deleted private event', 'Close');
      return EMPTY;
    })
  ), {dispatch: false});


}
