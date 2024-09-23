import {ActionReducerMap} from "@ngrx/store";
import * as fromAuth from "../modules/auth/store/auth/auth.reducer";
import * as fromAdminPanel from "../modules/auth/store/admin-panel/admin-panel.reducer";
import * as fromPlayerPage from "../modules/player/store/player-page/player-page.reducer";
import * as fromCourts from "../modules/events/store/courts/courts.reducer";
import * as fromHalls from "../modules/events/store/halls/halls.reducer";
import * as fromEvents from "../modules/events/store/events/events.reducer";
import * as fromNearbyEvents from "../modules/events/store/nearby-events/nearby-events.reducer";
import * as fromTeams from "../modules/teams/store/teams/teams.reducer";
import * as fromPrivateEvents from "../modules/teams/store/private-events/private-events.reducer";

export interface AppState{
  auth: fromAuth.State;
  adminPanel: fromAdminPanel.State;
  playerPage: fromPlayerPage.State;
  courts: fromCourts.State;
  halls: fromHalls.State;
  events: fromEvents.State;
  nearbyEvents: fromNearbyEvents.State;
  teams: fromTeams.State;
  privateEvents: fromPrivateEvents.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  adminPanel: fromAdminPanel.adminPanelReducer,
  playerPage: fromPlayerPage.playerPageReducer,
  courts: fromCourts.courtsReducer,
  halls: fromHalls.hallsReducer,
  events: fromEvents.eventReducer,
  nearbyEvents: fromNearbyEvents.reducer,
  teams: fromTeams.teamReducer,
  privateEvents: fromPrivateEvents.privateEventsReducer
}
