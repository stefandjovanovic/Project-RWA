import {createAction, props} from "@ngrx/store";
import {Team} from "../../interfaces/team.interface";
import {TeamCreate} from "../../interfaces/team-create.interface";
import {TeamMember} from "../../interfaces/team-member.interface";


export const loadTeams = createAction(
  '[Teams] Load Teams'
);

export const loadTeamsSuccess = createAction(
  '[Teams] Load Teams Success',
  props<{teams: Team[]}>()
);

export const createTeam = createAction(
  '[Teams] Create Team',
  props<{team: TeamCreate}>()
);

export const createTeamSuccess = createAction(
  '[Teams] Create Team Success',
  props<{team: Team}>()
);

export const editTeam = createAction(
  '[Teams] Edit Team',
  props<{teamId: string, team: TeamCreate}>()
);

export const editTeamSuccess = createAction(
  '[Teams] Edit Team Success',
  props<{team: Team}>()
);

export const deleteTeam = createAction(
  '[Teams] Delete Team',
  props<{teamId: string}>()
);

export const deleteTeamSuccess = createAction(
  '[Teams] Delete Team Success',
  props<{teamId: string}>()
);

export const addMember = createAction(
  '[Teams] Add Member',
  props<{teamId: string, username: string}>()
);

export const addMemberSuccess = createAction(
  '[Teams] Add Member Success',
  props<{teamId: string, newMember: TeamMember}>()
);

export const removeMember = createAction(
  '[Teams] Remove Member',
  props<{teamId: string, username: string}>()
);

export const removeMemberSuccess = createAction(
  '[Teams] Remove Member Success',
  props<{teamId: string, username: string}>()
);

export const selectTeam = createAction(
  '[Teams] Select Team',
  props<{team: Team}>()
);
