import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TableData} from "../../../interfaces/table-data.interface";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {TableService} from "../../../services/table.service";
import {TableTeamResults} from "../../../interfaces/table-team-results.interface";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../../store/app.reducer";
import {Subscription} from "rxjs";
import * as TableSelectors from "../../../store/table/table.selectors";
@Component({
  selector: 'app-tennis-table',
  templateUrl: './tennis-table.component.html',
  styleUrl: './tennis-table.component.css'
})
export class TennisTableComponent implements OnInit, OnDestroy, AfterViewInit{
  tableData: TableData[] = [];
  displayedColumns: string[] = ['position','team', 'played', 'won', 'drawn', 'lost', 'points'];
  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<TableData>(this.tableData);

  resultsToShow: TableTeamResults[] = [];

  storeSubscription: Subscription = new Subscription();

  constructor(private tableService: TableService, private store: Store<AppState>) {}

  ngOnInit() {
    this.storeSubscription = this.store.select(TableSelectors.selectTennisData).subscribe(data => {
      if(data.length > 0){
        this.tableData = data;
        this.dataSource = new MatTableDataSource<TableData>(this.tableData);
        this.table.renderRows();
      }

    })
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  rowClicked(row: TableData){
    this.tableService.getTeamResults(row.id).subscribe({
      next: (results) => {
        this.resultsToShow = results;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
