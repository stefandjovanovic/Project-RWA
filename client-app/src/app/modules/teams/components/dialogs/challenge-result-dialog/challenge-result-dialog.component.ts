import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Challenge} from "../../../interfaces/challenge.interface";
import * as ResultsActions from "../../../store/results/results.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";

@Component({
  selector: 'app-challenge-result-dialog',
  templateUrl: './challenge-result-dialog.component.html',
  styleUrl: './challenge-result-dialog.component.css'
})
export class ChallengeResultDialogComponent {
  homeScore = new FormControl('', [Validators.required, Validators.min(0), Validators.max(200)]);
  awayScore = new FormControl('', [Validators.required, Validators.min(0), Validators.max(200)]);


  constructor(public dialogRef: MatDialogRef<ChallengeResultDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:{
                challenge: Challenge
              },
              private store: Store<AppState>){}

  onNoClick(): void {
    this.dialogRef.close();
  }


  submitResult(){

    if(this.homeScore.valid && this.awayScore.valid) {
      if(this.homeScore.value !== null && this.awayScore.value !== null){
        this.store.dispatch(ResultsActions.submitResult({result:{
            challengeId: this.data.challenge.id,
            homeScore: +this.homeScore.value,
            awayScore: +this.awayScore.value
          }}))
        this.dialogRef.close();
      }
    }
  }

}
