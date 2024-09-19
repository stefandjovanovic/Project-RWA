import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EventsService} from "../../services/events.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as EventsActions from './events.actions';
import {catchError, EMPTY, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";


@Injectable()
export class EventsEffects{
  constructor(
    private actions$: Actions,
    private eventsService: EventsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loadEvents$ = createEffect(() => this.actions$.pipe(
    ofType(EventsActions.loadEvents),
    switchMap(action => this.eventsService.getPublicEvents(action.courtId).pipe(
      map(events => EventsActions.loadEventsSuccess({events})),
      catchError(() => EMPTY)
    ))
  ));

  createEvent$ = createEffect(() => this.actions$.pipe(
    ofType(EventsActions.createEvent),
    switchMap(action => this.eventsService.createPublicEvent(action.event).pipe(
      map(event => {
        return EventsActions.createEventSuccess({event});
      }),
      catchError(() => EMPTY)
    ))
  ));

  createEventSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EventsActions.createEventSuccess),
    tap(() => {
      this.snackBar.open('Event created', 'Close', {
        duration: 3000
      });
      this.router.navigate(['events']);
    })
  ), {dispatch: false});

  deleteEvent$ = createEffect(() => this.actions$.pipe(
    ofType(EventsActions.deleteEvent),
    switchMap(action => this.eventsService.deleteEvent(action.id).pipe(
      map(() => {
        return EventsActions.deleteEventSuccess({id: action.id});
      }),
      catchError(() => EMPTY)
    ))
  ));

  deleteEventSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EventsActions.deleteEventSuccess),
    tap(() => {
      this.snackBar.open('Event deleted', 'Close', {
        duration: 3000
      });
    })
  ), {dispatch: false});

  joinEvent$ = createEffect(() => this.actions$.pipe(
    ofType(EventsActions.joinEvent),
    switchMap(action => this.eventsService.joinEvent(action.eventId).pipe(
      map(() => {
        return EventsActions.joinEventSuccess({eventId: action.eventId, username: action.username});
      }),
      catchError(() => EMPTY)
    ))
  ));

  joinEventSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EventsActions.joinEventSuccess),
    tap(() => {
      this.snackBar.open('Joined event', 'Close', {
        duration: 3000
      });
    })
  ), {dispatch: false});

  leaveEvent$ = createEffect(() => this.actions$.pipe(
    ofType(EventsActions.leaveEvent),
    switchMap(action => this.eventsService.leaveEvent(action.id).pipe(
      map(() => {
        return EventsActions.leaveEventSuccess({id: action.id, username: action.username});
      }),
      catchError(() => EMPTY)
    ))
  ));

  leaveEventSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(EventsActions.leaveEventSuccess),
    tap(() => {
      this.snackBar.open('Left event', 'Close', {
        duration: 3000
      });
    })
  ), {dispatch: false});



}
