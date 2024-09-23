import * as fromTeams from './teams.reducer';
import {AppState} from "../../../../store/app.reducer";
import {createSelector} from "@ngrx/store";


export const selectTeamsState = (state: AppState) => state.teams;

export const selectTeams = createSelector(
  selectTeamsState,
  fromTeams.adapter.getSelectors().selectAll
);

export const selectSelectedTeamId = createSelector(
  selectTeamsState,
  (state) => state.selectedTeamId
);

export const selectSelectedTeam = createSelector(
  selectTeamsState,
  selectSelectedTeamId,
  (state, selectedTeamId) => {
    if (!selectedTeamId || !state.entities[selectedTeamId]){
      return null;
    }
    return state.entities[selectedTeamId];
  }
);

