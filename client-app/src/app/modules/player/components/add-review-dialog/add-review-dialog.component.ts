import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Review} from "../../interfaces/review.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import {selectUser} from "../../../auth/store/auth/auth.selectors";
import {take} from "rxjs";


@Component({
  selector: 'app-add-review-dialog',
  templateUrl: './add-review-dialog.component.html',
  styleUrl: './add-review-dialog.component.css'
})
export class AddReviewDialogComponent implements OnInit {
  newReview: Review = {
    rating: 5,
    comment: '',
    username: ''
  }

  constructor(
    public dialogRef: MatDialogRef<AddReviewDialogComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select(selectUser).pipe(
      take(1)
    ).subscribe(user => {
      if (user) {
        this.newReview.username = user.username;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
