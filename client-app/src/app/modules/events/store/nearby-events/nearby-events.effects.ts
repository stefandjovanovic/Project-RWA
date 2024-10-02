import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {EventsService} from "../../services/events.service";
import {GeocodingService} from "../../services/geocoding.service";
import * as NearbyEventActions from './nearby-events.actions';
import * as AuthSelectors from '../../../auth/store/auth/auth.selectors';
import {catchError, of, switchMap, withLatestFrom} from "rxjs";
import {map} from "rxjs/operators";


@Injectable()
export class NearbyEventsEffects{
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private eventsService: EventsService,
    private geoCodingService: GeocodingService
  ) {}

  calculateUserLocation = createEffect(() =>
    this.actions$.pipe(
      ofType(NearbyEventActions.calculateUserLocation),
      withLatestFrom(this.store.select(AuthSelectors.selectUser)),
      switchMap(([actionData, user]) => {
        return this.geoCodingService.searchByName(user.address).pipe(
          map(geoData => {
            if(geoData.features.length === 0){
              return NearbyEventActions.calculateUserLocationFailure();
            }
            return NearbyEventActions.calculateUserLocationSuccess({
              longitude: geoData.features[0].center[0],
              latitude: geoData.features[0].center[1]
            });
          }),
          catchError(() => {
            return of(NearbyEventActions.calculateUserLocationFailure());
          })
        );
      })
    )
  );

  // calculateUserLocationCombinationOperators = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(NearbyEventActions.calculateUserLocation),
  //     withLatestFrom(this.store.select(AuthSelectors.selectUser)),
  //   )
  // );



  loadNearbyEvents = createEffect(() =>
    this.actions$.pipe(
      ofType(NearbyEventActions.calculateUserLocationSuccess),
      switchMap((actionData) => {
        return this.eventsService.fetchNearbyEvents(actionData.longitude, actionData.latitude).pipe(
          map(events => {
            return NearbyEventActions.nearbyEventsLoaded({events});
          }),
          catchError(() => {
            return of(NearbyEventActions.nearbyEventsLoaded({events: []}));
          })
        );
      })
    )
  );




}
