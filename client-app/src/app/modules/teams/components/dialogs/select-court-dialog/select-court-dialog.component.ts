import {AfterViewInit, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Court} from "../../../../events/interfaces/court.interface";
import {Subscription} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import * as CourtsSelectors from "../../../../events/store/courts/courts.selectors";
import * as CourtsActions from "../../../../events/store/courts/courts.actions";

@Component({
  selector: 'app-select-court-dialog',
  templateUrl: './select-court-dialog.component.html',
  styleUrl: './select-court-dialog.component.css'
})
export class SelectCourtDialogComponent implements OnInit, OnDestroy, AfterViewInit{
  courts: Court[] = [];
  courtsSubscription?: Subscription;

  constructor(public dialogRef: MatDialogRef<SelectCourtDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {
                teamId: string,
                sport: string
              },
              private store: Store<AppState>){}

  ngOnInit(): void {
    this.courtsSubscription = this.store.select(CourtsSelectors.selectCourts).subscribe((courts => {
      this.courts = courts.filter(court => court.sport === this.data.sport);
    }))
  }

  ngAfterViewInit(): void {
    this.store.dispatch(CourtsActions.loadCourts());
  }

  ngOnDestroy(): void {
    if(this.courtsSubscription) {
      this.courtsSubscription.unsubscribe();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
