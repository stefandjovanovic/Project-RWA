import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HallsService} from "../../services/halls.service";
import {catchError, EMPTY, of, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {deleteEvents, deleteEventsSuccess, loadHallEvents, loadHallEventsSuccess} from "./hall-events.actions";
import {EventsService} from "../../services/events.service";


@Injectable()
export class HallEventsEffects{
  constructor(private actions$: Actions, private hallsService: HallsService, private eventsService: EventsService) {}

  loadHallEvents$ = createEffect(() => this.actions$.pipe(
    ofType(loadHallEvents),
    switchMap(({hallId}) => this.hallsService.getEventsForHall(hallId).pipe(
      map((events) => loadHallEventsSuccess({events})),
      catchError((error) => EMPTY))
    ))
  );

  deleteEvent$ = createEffect(() => this.actions$.pipe(
    ofType(deleteEvents),
    switchMap(({eventId}) => this.eventsService.deleteEvent(eventId).pipe(
      map(() => deleteEventsSuccess({eventId})),
      catchError((error) => EMPTY))
    ))
  );



}
