import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AdminPanelService} from "../../services/admin-panel.service";
import * as AdminPanelActions from './admin-panel.actions';
import {map} from "rxjs/operators";
import {switchMap} from "rxjs";
@Injectable()
export class AdminPanelEffects{
    constructor(
        private actions$: Actions,
        private adminPanelService: AdminPanelService
    ) {}

    fetchUsers$ = createEffect(() => this.actions$.pipe(
      ofType(AdminPanelActions.fetchUsers),
      switchMap(() => this.adminPanelService.getUsers().pipe(
        map(users => AdminPanelActions.fetchUsersSuccess({users}))
      ))
    ));

    toAdmin$ = createEffect(() => this.actions$.pipe(
      ofType(AdminPanelActions.toAdmin),
      switchMap((action) => this.adminPanelService.updateToAdmin(action.id).pipe(
        map((user) => AdminPanelActions.roleUpdated({
          user: {
            id: user.id,
            changes: {role: user.role}
          }
        }))
      ))
    ));

    toPlayer$ = createEffect(() => this.actions$.pipe(
      ofType(AdminPanelActions.toPlayer),
      switchMap((action) => this.adminPanelService.updateToPlayer(action.id).pipe(
        map((user) => AdminPanelActions.roleUpdated({
          user: {
            id: user.id,
            changes: {role: user.role}
          }
        }))
      ))
    ));

    toManager$ = createEffect(() => this.actions$.pipe(
      ofType(AdminPanelActions.toManager),
      switchMap((action) => this.adminPanelService.updateToManager(action.id).pipe(
        map((user) => AdminPanelActions.roleUpdated({
          user: {
            id: user.id,
            changes: {role: user.role}
          }
        }))
      ))
    ));

    deleteUser$ = createEffect(() => this.actions$.pipe(
      ofType(AdminPanelActions.deleteUser),
      switchMap((action) => this.adminPanelService.deleteUser(action.id).pipe(
        map(() => AdminPanelActions.deleteUserSuccess({id: action.id}))
      ))
    ));
}
