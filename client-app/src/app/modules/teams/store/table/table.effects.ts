import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as TableActions from './table.actions';
import {switchMap} from "rxjs";
import {TableService} from "../../services/table.service";
import {map} from "rxjs/operators";


@Injectable()
export class TableEffects{
  constructor(
    private actions$: Actions,
    private tableService: TableService
  ) {}

  getTableData$ = createEffect(() => this.actions$.pipe(
    ofType(TableActions.getTableData),
    switchMap(() => this.tableService.getTableData().pipe(
      map(tableData => TableActions.getTableDataSuccess({tableData}))
    ))
  ));


}
