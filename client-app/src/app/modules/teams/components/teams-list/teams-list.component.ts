import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Team} from "../../interfaces/team.interface";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as TeamsActions from "../../store/teams/teams.actions";
import * as TeamsSelectors from "../../store/teams/teams.selectors";
import {CreateTeamDialogComponent} from "../dialogs/create-team-dialog/create-team-dialog.component";


@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrl: './teams-list.component.css'
})
export class TeamsListComponent implements OnInit, OnDestroy{
  @Output() teamSelected = new EventEmitter<void>();

  teams: Team[] = [];

  storeSub?: Subscription;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(TeamsActions.loadTeams());
    this.storeSub = this.store.select(TeamsSelectors.selectTeams).subscribe(teams => {
      this.teams = teams;
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  createTeam(){
    const dialogRef = this.dialog.open(CreateTeamDialogComponent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  onTeamClicked(team: Team){
    this.store.dispatch(TeamsActions.selectTeam({team}));
    this.teamSelected.emit();
  }


}
