import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducer";
import * as TableActions from "../../store/table/table.actions";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(TableActions.getTableData());
  }

}
