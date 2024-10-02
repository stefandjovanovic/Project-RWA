import {Component, Input, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EventsService} from "../../../services/events.service";
import {MatDialog} from "@angular/material/dialog";
import {HallsService} from "../../../services/halls.service";
import {DeleteDialogComponent} from "../../court-edit/delete-dialog/delete-dialog.component";
import {EventInterface} from "../../../interfaces/event.inerface";
import * as HallEventsActions from "../../../store/hall-events/hall-events.actions";
import * as HallEventsSelectors from "../../../store/hall-events/hall-events.selectors";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";

@Component({
  selector: 'app-hall-events-list',
  templateUrl: './hall-events-list.component.html',
  styleUrl: './hall-events-list.component.css'
})
export class HallEventsListComponent {
  @Input() hallId?: string;

  displayedColumns: string[] = ['sport', 'user', 'date', 'time', 'participants', 'actions'];
  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  events: EventInterface[] = [];

  dataSource = new MatTableDataSource<EventInterface>(this.events);

  storeSub?: Subscription;



  constructor(private dialog: MatDialog,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.storeSub = this.store.select(HallEventsSelectors.selectHallEvents).subscribe( events => {
      this.events = events;
      this.dataSource = new MatTableDataSource<EventInterface>(this.events);
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  ngOnChanges() {
    if(this.hallId){
      this.store.dispatch(HallEventsActions.loadHallEvents({hallId: this.hallId!}));
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  onDelete(id: string){
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(HallEventsActions.deleteEvents({eventId: id}));
      }
    })



  }
}
