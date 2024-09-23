import {createEntityAdapter, EntityState} from "@ngrx/entity";
import {Team} from "../../interfaces/team.interface";
import {createReducer, on} from "@ngrx/store";
import * as TeamsActions from './teams.actions';


export interface State extends EntityState<Team>{
  selectedTeamId: string | null;
}

export const adapter = createEntityAdapter<Team>();

export const initialState: State = adapter.getInitialState({
  selectedTeamId: null
});

export const teamReducer = createReducer(
  initialState,
  on(TeamsActions.loadTeamsSuccess, (state, {teams}) => adapter.setAll(teams, {... state, selectedTeamId: null})),
  on(TeamsActions.createTeamSuccess, (state, {team}) => adapter.addOne(team, state)),
  on(TeamsActions.editTeamSuccess, (state, {team}) => adapter.updateOne({id: team.id, changes: team}, state)),
  on(TeamsActions.deleteTeamSuccess, (state, {teamId}) => adapter.removeOne(teamId, state)),
  on(TeamsActions.addMemberSuccess, (state, {teamId, newMember}) => {
    if (!state.entities[teamId]){
      return {... state};
    }
    return adapter.updateOne({id: teamId, changes: {members: [...state.entities[teamId].members, newMember]}}, state)
  }),
  on(TeamsActions.removeMember, (state, {teamId, username}) => {
    if (!state.entities[teamId]){
      return {... state};
    }
    return adapter.updateOne({id: teamId, changes: {members: state.entities[teamId].members.filter(member => member.username !== username)}}, state)
  }),
  on(TeamsActions.selectTeam, (state, {team}) => ({... state, selectedTeamId: team.id}))
)
