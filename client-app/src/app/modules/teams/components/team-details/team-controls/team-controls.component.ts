import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Team} from "../../../interfaces/team.interface";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import * as TeamActions from "../../../store/teams/teams.actions";
import * as TeamSelectors from "../../../store/teams/teams.selectors";
import {AddMembersDialogComponent} from "../../dialogs/add-members-dialog/add-members-dialog.component";
import {EditTeamDialogComponent} from "../../dialogs/edit-team-dialog/edit-team-dialog.component";
import {DeleteDialogComponent} from "../../../../events/components/court-edit/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-team-controls',
  templateUrl: './team-controls.component.html',
  styleUrl: './team-controls.component.css'
})
export class TeamControlsComponent implements OnDestroy, OnInit{
  selectedTeam: Team | null = null;
  storeSubscription?: Subscription;
  @Output() teamDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.storeSubscription = this.store.select(TeamSelectors.selectSelectedTeam).subscribe(team => {
      this.selectedTeam = team;
    });
  }

  ngOnDestroy() {
    if(this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  onAddMember(){
    const dialogRef = this.dialog.open(AddMembersDialogComponent, {data: this.selectedTeam?.members});
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  onEdit(){
    const dialogRef = this.dialog.open(EditTeamDialogComponent, {data: {
        id: this.selectedTeam?.id,
        name: this.selectedTeam?.name,
        sport: this.selectedTeam?.sport
      }});
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  onDelete(){
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(TeamActions.deleteTeam({teamId: this.selectedTeam!.id}));
        this.teamDeleted.emit(true);
      }
    });
  }

}
