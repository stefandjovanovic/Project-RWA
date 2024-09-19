import {createAction, props} from "@ngrx/store";
import {EventInterface} from "../../interfaces/event.inerface";
import {EventCreate} from "../../interfaces/event-create.interface";


export const loadEvents = createAction(
  '[Events] Load Events',
  props<{courtId: string}>()
);

export const loadEventsSuccess = createAction(
  '[Events] Load Events Success',
  props<{events: EventInterface[]}>()
);

export const createEvent = createAction(
  '[Events] Create Event',
  props<{event: EventCreate}>()
);

export const createEventSuccess = createAction(
  '[Events] Create Event Success',
  props<{event: EventInterface}>()
);

export const deleteEvent = createAction(
  '[Events] Delete Event',
  props<{id: string}>()
);

export const deleteEventSuccess = createAction(
  '[Events] Delete Event Success',
  props<{id: string}>()
);

export const joinEvent = createAction(
  '[Events] Join Event',
  props<{eventId: string, username: string}>()
);

export const joinEventSuccess = createAction(
  '[Events] Join Event Success',
  props<{eventId: string, username: string}>()
);

export const leaveEvent = createAction(
  '[Events] Leave Event',
  props<{id: string, username: string}>()
);

export const leaveEventSuccess = createAction(
  '[Events] Leave Event Success',
  props<{id: string, username: string}>()
);
