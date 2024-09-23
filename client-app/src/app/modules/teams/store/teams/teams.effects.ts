import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TeamsService} from "../../services/teams.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, EMPTY, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";
import * as TeamsActions from './teams.actions';


@Injectable()
export class TeamsEffects{
  constructor(
    private actions$: Actions,
    private teamsService: TeamsService,
    private snackBar: MatSnackBar
  ) { }

  loadTeams$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.loadTeams),
    switchMap(() => this.teamsService.getMyTeams().pipe(
      map(teams => TeamsActions.loadTeamsSuccess({teams})),
      catchError(() => {
        this.snackBar.open('Error loading teams', 'Close');
        return EMPTY;
      })
    ))
  ));

  createTeam$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.createTeam),
    switchMap(({team}) => this.teamsService.createTeam(team).pipe(
      map(team => TeamsActions.createTeamSuccess({team})),
      catchError(() => {
        this.snackBar.open('Error creating team', 'Close');
        return EMPTY;
      })
    ))
  ));

  createTeamSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.createTeamSuccess),
    tap(() => this.snackBar.open('Team created', 'Close'))
  ), {dispatch: false});

  editTeam$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.editTeam),
    switchMap(({teamId, team}) => this.teamsService.editTeam(teamId, team).pipe(
      map(team => TeamsActions.editTeamSuccess({team})),
      catchError(() => {
        this.snackBar.open('Error editing team', 'Close');
        return EMPTY;
      })
    ))
  ));

  editTeamSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.editTeamSuccess),
    tap(() => this.snackBar.open('Team edited', 'Close'))
  ), {dispatch: false});

  deleteTeam$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.deleteTeam),
    switchMap(({teamId}) => this.teamsService.deleteTeam(teamId).pipe(
      map(() => TeamsActions.deleteTeamSuccess({teamId})),
      catchError(() => {
        this.snackBar.open('Error deleting team', 'Close');
        return EMPTY;
      })
    ))
  ));

  deleteTeamSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.deleteTeamSuccess),
    tap(() => this.snackBar.open('Team deleted', 'Close'))
  ), {dispatch: false});

  addMember$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.addMember),
    switchMap(({teamId, username}) => this.teamsService.addMember(teamId, username).pipe(
      map(newMember => TeamsActions.addMemberSuccess({teamId, newMember})),
      catchError(() => {
        this.snackBar.open('Error adding member', 'Close');
        return EMPTY;
      })
    ))
  ));

  addMemberSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.addMemberSuccess),
    tap((action) => this.snackBar.open(`${action.newMember.username} added to team`, 'Close'))
  ), {dispatch: false});

  removeMember$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.removeMember),
    switchMap(({teamId, username}) => this.teamsService.removeMember(teamId, username).pipe(
      map(() => TeamsActions.removeMemberSuccess({teamId, username})),
      catchError(() => {
        this.snackBar.open('Error removing member', 'Close');
        return EMPTY;
      })
    ))
  ));

  removeMemberSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TeamsActions.removeMemberSuccess),
    tap((action) => this.snackBar.open(`${action.username} removed from team`, 'Close'))
  ), {dispatch: false});


}
