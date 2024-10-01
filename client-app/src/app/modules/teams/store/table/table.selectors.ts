import * as fromTable from './table.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";
import {Sport} from "../../../events/enums/sport.enum";


export const selectTableState = (state: AppState) => state.table;

export const selectTableData = createSelector(
  selectTableState,
  fromTable.adapter.getSelectors().selectAll
)

export const selectFootballData = createSelector(
  selectTableData,
  (tableData) => {
    return tableData
      .filter(data => data.sport === Sport.FOOTBALL)
      .sort((a, b) => b.points - a.points);
  }
)

export const selectBasketballData = createSelector(
  selectTableData,
  (tableData) => {
    return tableData
      .filter(data => data.sport === Sport.BASKETBALL)
      .sort((a, b) => b.points - a.points);
  }
)

export const selectTennisData = createSelector(
  selectTableData,
  (tableData) => {
    return tableData
      .filter(data => data.sport === Sport.TENNIS)
      .sort((a, b) => b.points - a.points);
  }
)
