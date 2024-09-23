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
