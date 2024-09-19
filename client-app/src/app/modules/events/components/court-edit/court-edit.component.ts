import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Court} from "../../interfaces/court.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as CourtsActions from "../../store/courts/courts.actions";
import * as CourtsSelectors from "../../store/courts/courts.selectors";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-court-edit',
  templateUrl: './court-edit.component.html',
  styleUrl: './court-edit.component.css'
})
export class CourtEditComponent implements OnDestroy, OnInit {
  storeSubscription?: Subscription;
  selectedCourt?: Court;
  courts: Court[] = [];
  editMode = false;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.storeSubscription = this.store.select(CourtsSelectors.selectCourts).subscribe(courts => {
      this.courts = courts.filter(court => !court.isHall);
    })
    this.store.dispatch(CourtsActions.loadCourts());
  }

  ngOnDestroy() {
    if(this.storeSubscription){
      this.storeSubscription.unsubscribe();
    }
  }

  onClickEdit(court: Court){
    this.selectedCourt = court;
    this.editMode = true;
    console.log(this.selectedCourt);
  }

  onClickDelete(court: Court){
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(CourtsActions.deleteCourt({id: court.id}));
      }
    })
  }

}
