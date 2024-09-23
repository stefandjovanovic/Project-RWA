import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import * as TeamsActions from '../../../store/teams/teams.actions';
import {TeamCreate} from "../../../interfaces/team-create.interface";
import {Sport} from "../../../../events/enums/sport.enum";

@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrl: './edit-team-dialog.component.css'
})
export class EditTeamDialogComponent {
  name: FormControl = new FormControl('', [Validators.required]);
  sport: FormControl = new FormControl('', [Validators.required]);
  constructor(public dialogRef: MatDialogRef<EditTeamDialogComponent>,
              private store: Store<AppState>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: {
                id: string,
                name: string,
                sport: string
              }) {
    this.name.setValue(data.name);
    this.sport.setValue(data.sport);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreate(){
    if (this.name.valid && this.sport.valid) {
      const teamData: TeamCreate = {
        name: this.name.value!,
        sport: this.sport.value! as Sport
      }
      this.store.dispatch(TeamsActions.editTeam({teamId: this.data.id, team: teamData}));

      this._snackBar.open('Team edited successfully', 'Close', {
        duration: 3000,
      });

      this.dialogRef.close();
    }
  }
}
