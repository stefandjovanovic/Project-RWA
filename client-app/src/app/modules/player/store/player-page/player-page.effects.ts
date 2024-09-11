import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {PlayerService} from "../../services/player.service";
import {of, switchMap, withLatestFrom} from "rxjs";
import * as PlayerPageActions from "./player-page.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {selectPlayers} from "./player-page.selectors";
import {map} from "rxjs/operators";


@Injectable()
export class PlayerPageEffects{
    constructor(
        private actions$: Actions,
        private playerService: PlayerService,
        private store: Store<AppState>
    ) {}

  loadPlayerPage = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.loadPlayerPage),
      withLatestFrom(this.store.select(selectPlayers)),
      switchMap(([actionData, loadedPlayers]) => {
        if(loadedPlayers.some(player => player.username === actionData.username)){
          return of();
        }
        return this.playerService.getPlayerDetails(actionData.username).pipe(
          map(playerDetails => {
            return PlayerPageActions.playerDataLoaded(playerDetails);
          })
        );
      })
  ));

    editBio = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.editBio),
      switchMap(actionData => {
        return this.playerService.editBio(actionData.bio, actionData.username).pipe(
          map(() => {
            return PlayerPageActions.editBioSuccess({
              username: actionData.username,
              bio: actionData.bio
            });
          })
        );
      })
    ));

    uploadProfilePicture = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.uploadProfilePicture),
      switchMap(actionData => {
        return this.playerService.uploadProfilePicture(actionData.file).pipe(
          map(profilePicture => {
            return PlayerPageActions.uploadProfilePictureSuccess({
              profilePicture: profilePicture.photoUrl
            });
          })
        );
      })
    ));

    postReview = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.postReview),
      switchMap(actionData => {
        return this.playerService.postReview(actionData.review, actionData.username).pipe(
          map(() => {
            return PlayerPageActions.postReviewSuccess({
              review: actionData.review,
              username: actionData.username
            });
          })
        );
      })
    ));

    deleteProfilePicture = createEffect(() =>
    this.actions$.pipe(
      ofType(PlayerPageActions.deleteProfilePicture),
      switchMap(actionData => {
        return this.playerService.deleteProfilePicture().pipe(
          map(() => {
            return PlayerPageActions.deleteProfilePictureSuccess({
              username: actionData.username
            });
          })
        );
      })
    ));
}
