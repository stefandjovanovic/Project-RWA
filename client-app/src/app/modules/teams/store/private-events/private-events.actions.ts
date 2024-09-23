import {createAction, props} from "@ngrx/store";
import {PrivateEvent} from "../../interfaces/private-event.interface";
import {EventCreate} from "../../../events/interfaces/event-create.interface";


export const getPrivateEventsForTeam = createAction(
  '[Private Events] Get Private Events For Team',
  props<{ teamId: string }>()
);

export const getPrivateEventsForTeamSuccess = createAction(
  '[Private Events] Get Private Events For Team Success',
  props<{ privateEvents: PrivateEvent[] }>()
);

export const createPrivateEvent = createAction(
  '[Private Events] Create Private Event',
  props<{ teamId: string, event: EventCreate }>()
);

export const createPrivateEventSuccess = createAction(
  '[Private Events] Create Private Event Success',
  props<{ privateEvent: PrivateEvent }>()
);

export const joinPrivateEvent = createAction(
  '[Private Events] Join Private Event',
  props<{ eventId: string, username: string }>()
);

export const joinPrivateEventSuccess = createAction(
  '[Private Events] Join Private Event Success',
  props<{ eventId: string, username: string }>()
);

export const leavePrivateEvent = createAction(
  '[Private Events] Leave Private Event',
  props<{ eventId: string, username: string }>()
);

export const leavePrivateEventSuccess = createAction(
  '[Private Events] Leave Private Event Success',
  props<{ eventId: string, username: string }>()
);

export const deletePrivateEvent = createAction(
  '[Private Events] Delete Private Event',
  props<{ eventId: string }>()
);

export const deletePrivateEventSuccess = createAction(
  '[Private Events] Delete Private Event Success',
  props<{ eventId: string }>()
);
