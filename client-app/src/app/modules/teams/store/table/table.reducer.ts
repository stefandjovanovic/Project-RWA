import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {TableData} from "../../interfaces/table-data.interface";
import {createReducer, on} from "@ngrx/store";
import * as TableActions from './table.actions';

export interface State extends EntityState<TableData>{

}

export const adapter = createEntityAdapter<TableData>();

export const initialState: State = adapter.getInitialState();

export const tableReducer = createReducer(
  initialState,
  on(TableActions.getTableDataSuccess, (state, {tableData}) => adapter.setAll(tableData, state))
)
