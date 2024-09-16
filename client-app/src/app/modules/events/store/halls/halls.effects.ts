import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HallsService} from "../../services/halls.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map} from "rxjs/operators";
import {of, switchMap, tap} from "rxjs";
import * as HallsActions from "./halls.actions";
import {GeocodingService} from "../../services/geocoding.service";
import * as CourtsActions from "../courts/courts.actions";


@Injectable()
export class HallsEffects{
  constructor(
    private actions$: Actions,
    private hallsService: HallsService,
    private geoCodingService: GeocodingService,
    private snackBar: MatSnackBar
  ) {}

  loadManagerHalls = createEffect(() =>
    this.actions$.pipe(
      ofType(HallsActions.loadManagerHalls),
      switchMap(() => {
        return this.hallsService.getManagerHalls().pipe(
          map(halls => {
            return HallsActions.managerHallsLoaded({halls});
          })
        );
      })
    )
  );

  createHall = createEffect(() =>
  this.actions$.pipe(
    ofType(HallsActions.createHall),
    switchMap(actionData => {
      return this.geoCodingService.searchByName(actionData.address).pipe(
        switchMap(geoData => {
          if(geoData.features.length === 0){
            this.snackBar.open('Address not found', 'Close', {
              duration: 3000
            });
            return of(CourtsActions.courtCreateFailure({error: 'Address not found'}));
          }
          return this.hallsService.createHall({
            sport: actionData.sport,
            name: actionData.name,
            address: actionData.address,
            image: actionData.image,
            longitude: geoData.features[0].center[0],
            latitude: geoData.features[0].center[1],
            startTime: actionData.startTime,
            endTime: actionData.endTime,
            pricePerHour: actionData.pricePerHour
          }).pipe(
            map(court => {
              return CourtsActions.courtCreateSuccess({court});
            })
          );
        })
      )
    })
  ))

  updateHall = createEffect(() =>
    this.actions$.pipe(
      ofType(HallsActions.updateHall),
      switchMap(actionData => {
        return this.geoCodingService.searchByName(actionData.address).pipe(
          switchMap(geoData => {
            if(geoData.features.length === 0){
              this.snackBar.open('Address not found', 'Close', {
                duration: 3000
              });
              return of(CourtsActions.courtUpdateFailure({error: 'Address not found'}));
            }
            return this.hallsService.updateHall({
              sport: actionData.sport,
              name: actionData.name,
              address: actionData.address,
              image: actionData.image,
              longitude: geoData.features[0].center[0],
              latitude: geoData.features[0].center[1],
              startTime: actionData.startTime,
              endTime: actionData.endTime,
              pricePerHour: actionData.pricePerHour
            }, actionData.id).pipe(
              map(court => {
                return CourtsActions.courtUpdateSuccess({court});
              })
            );
          })
        );
      })
    )
  );

  deleteHall = createEffect(() =>
    this.actions$.pipe(
      ofType(HallsActions.deleteHall),
      switchMap(actionData => {
        return this.hallsService.deleteHall(actionData.id).pipe(
          map(() => {
            return HallsActions.hallDeleteSuccess({id: actionData.id});
          })
        );
      })
    )
  );

  createHallSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(HallsActions.hallCreateSuccess),
      tap(() => {
        this.snackBar.open('Hall created successfully', 'Close', {
          duration: 3000
        });
        //this.router.navigate(['/manager/halls']);
      })
    ),
    {dispatch: false}
  );

  updateHallSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(HallsActions.hallUpdateSuccess),
      tap(() => {
        this.snackBar.open('Hall updated successfully', 'Close', {
          duration: 3000
        });
        this.hallsService.successfullyUpdated.next(true);
      })
    ),
    {dispatch: false}
  );



}
