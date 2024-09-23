import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CourtsService} from "../../services/courts.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {map} from "rxjs/operators";
import {catchError, of, switchMap, tap, withLatestFrom} from "rxjs";
import * as CourtsActions from "./courts.actions";
import {GeocodingService} from "../../services/geocoding.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {selectCourts} from "./courts.selectors";


@Injectable()
export class CourtsEffects{
  constructor(
    private actions$: Actions,
    private courtsService: CourtsService,
    private geoCodingService: GeocodingService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>
  ) {}

  loadCourts = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtsActions.loadCourts),
      withLatestFrom(this.store.select(selectCourts)),
      switchMap(([actionData, loadedCourts]) => {
        if (loadedCourts.length > 0) {
          return of();
        }
        return this.courtsService.getAllCourts().pipe(
          map(courts => {
            return CourtsActions.courtsLoaded({courts});
          })
        );
      })
    )
  );

  createCourt = createEffect(() =>
  this.actions$.pipe(
    ofType(CourtsActions.createCourt),
    switchMap(actionData => {
      return this.geoCodingService.searchByName(actionData.address).pipe(
        switchMap(geoData => {
          if(geoData.features.length === 0){
              this.snackBar.open('Address not found', 'Close', {
                duration: 3000
              });
              return of(CourtsActions.courtCreateFailure({error: 'Address not found'}));
          }
          return this.courtsService.createCourt({
            sport: actionData.sport,
            name: actionData.name,
            address: actionData.address,
            image: actionData.image,
            longitude: geoData.features[0].center[0],
            latitude: geoData.features[0].center[1]
          }).pipe(
            map(court => {
              return CourtsActions.courtCreateSuccess({court});
            })
          );
        }),
        catchError(error => {
          console.log(error);
          return of(CourtsActions.courtUpdateFailure({error}));
        })
      );
    })
  ));

  updateCourt = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtsActions.updateCourt),
      switchMap(actionData => {
        return this.geoCodingService.searchByName(actionData.address).pipe(
          switchMap(geoData => {
            if(geoData.features.length === 0){
              this.snackBar.open('Address not found', 'Close', {
                duration: 3000
              });
              return of(CourtsActions.courtUpdateFailure({error: 'Address not found'}));
            }
            return this.courtsService.updateCourt({
              sport: actionData.sport,
              name: actionData.name,
              address: actionData.address,
              image: actionData.image,
              longitude: geoData.features[0].center[0],
              latitude: geoData.features[0].center[1]
            }, actionData.id).pipe(
              map(court => {
                return CourtsActions.courtUpdateSuccess({court});
              })
            );
          }),
          catchError(error => {
            console.log(error);
            return of(CourtsActions.courtUpdateFailure({error}));
          })
        );
      })
    )
  );

  deleteCourt = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtsActions.deleteCourt),
      switchMap(actionData => {
        return this.courtsService.deleteCourt(actionData.id).pipe(
          map(() => {
            return CourtsActions.courtDeleteSuccess({id: actionData.id});
          })
        );
      })
    )
  );

  courtsRedirect = createEffect(() =>
     this.actions$.pipe(
      ofType(CourtsActions.courtCreateSuccess),
      tap(() => {
        this.snackBar.open('Court saved successfully', 'Close', {
          duration: 3000
        });
        this.router.navigate(['/events']);
      })
    ),{dispatch: false});

  courtsUpdated = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtsActions.courtUpdateSuccess),
      tap(() => {
        this.snackBar.open('Court updated successfully', 'Close', {
          duration: 3000
        });
        this.courtsService.successfullyUpdated.next(true);
      })
    ),{dispatch: false});
}
