import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Court} from "../../../interfaces/court.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import {MatDialog} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import * as HallsActions from "../../../store/halls/halls.actions";
import * as HallsSelectors from "../../../store/halls/halls.selectors";
import {DeleteDialogComponent} from "../../court-edit/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-halls-list',
  templateUrl: './halls-list.component.html',
  styleUrl: './halls-list.component.css'
})
export class HallsListComponent implements OnInit, OnDestroy{
  @Output() editHallEvent = new EventEmitter<Court>();
  @Output() showEventsEvent = new EventEmitter<Court>();

  halls: Court[] = [];

  storeSub: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.storeSub = this.store.select(HallsSelectors.selectHalls).subscribe(halls => {
      this.halls = halls;
    })
    this.store.dispatch(HallsActions.loadManagerHalls());
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  editHall(hall: Court) {
    this.editHallEvent.emit(hall);
  }

  deleteHall(hallId: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(HallsActions.deleteHall({id: hallId}));
      }
    })

  }

  showEvents(hall: Court) {
    this.showEventsEvent.emit(hall);
  }


}
