import {Injectable} from "@angular/core";
import {PlayerService} from "../../services/player.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as PlayerEventsActions from "./player-events.actions";
import * as AuthSelectors from "../../../auth/store/auth/auth.selectors";
import {map} from "rxjs/operators";
import {switchMap, withLatestFrom} from "rxjs";
import {AppState} from "../../../../store/app.reducer";
import {Store} from "@ngrx/store";


@Injectable()
export class PlayerEventsEffects {

  constructor(
    private actions$: Actions,
    private playerService: PlayerService,
    private store: Store<AppState>
  ) {
  }

  getUserEvents = createEffect(() =>
    this.actions$.pipe(
    ofType(PlayerEventsActions.getPlayerEvents),
    withLatestFrom(this.store.select(AuthSelectors.selectUser)),
    switchMap(([action, user]) => {
      return this.playerService.getUserEvents(user.id).pipe(
        map(events => {
          return PlayerEventsActions.getPlayerEventsSuccess({events});
        })
      );
    })
  ));




}
