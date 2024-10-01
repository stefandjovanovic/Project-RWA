import {createAction, props} from "@ngrx/store";
import {TableData} from "../../interfaces/table-data.interface";


export const getTableData = createAction(
  '[Table] Get Table Data'
)

export const getTableDataSuccess = createAction(
  '[Table] Get Table Data Success',
  props<{tableData: TableData[]}>()
)

