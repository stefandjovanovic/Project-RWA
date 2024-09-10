import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";
import * as fromAdminPanel from './admin-panel.reducer';

export const selectAdminPanelState = (state: AppState) => state.adminPanel;

export const selectUsers = createSelector(
  selectAdminPanelState,
  fromAdminPanel.adapter.getSelectors().selectAll
);
