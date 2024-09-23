import { Component } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {AppState} from "../../../../../store/app.reducer";
import {Store} from "@ngrx/store";
import * as TeamsActions from '../../../store/teams/teams.actions';
import {TeamCreate} from "../../../interfaces/team-create.interface";
import {Sport} from "../../../../events/enums/sport.enum";

@Component({
  selector: 'app-create-team-dialog',
  templateUrl: './create-team-dialog.component.html',
  styleUrl: './create-team-dialog.component.css'
})
export class CreateTeamDialogComponent {
  name = new FormControl('', [Validators.required]);
  sport = new FormControl('', [Validators.required]);
  constructor(public dialogRef: MatDialogRef<CreateTeamDialogComponent>,
              private store: Store<AppState>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreate(){
    if (this.name.valid && this.sport.valid) {
      const newTeam: TeamCreate = {
        name: this.name.value!,
        sport: this.sport.value! as Sport
      }
      this.store.dispatch((TeamsActions.createTeam({team: newTeam})));

      this.dialogRef.close();
    }
  }
}
